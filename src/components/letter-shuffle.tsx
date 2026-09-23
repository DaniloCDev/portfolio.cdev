import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// avoids the "useLayoutEffect does nothing on the server" warning during SSR
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface LetterShuffleProps {
  text: string;
  play: boolean;
  onDone?: () => void;
  className?: string;
}

interface CharOffset {
  y: number;
}

// letters only rise into place (no horizontal drift/rotation) so the sentence shape stays readable mid-animation
function randomOffset(): CharOffset {
  return {
    y: 10 + Math.random() * 10,
  };
}

export function LetterShuffle({ text, play, onDone, className }: LetterShuffleProps) {
  const [mounted, setMounted] = useState(false);

  // swapped for the shuffled version before the first client paint, so SSR output stays deterministic
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={className}>{text}</span>;
  }

  return <ShuffleChars text={text} play={play} onDone={onDone} className={className} />;
}

function ShuffleChars({ text, play, onDone, className }: LetterShuffleProps) {
  const words = text.split(" ");
  const totalChars = text.replace(/ /g, "").length;

  const offsetsRef = useRef<CharOffset[] | null>(null);
  if (!offsetsRef.current) {
    offsetsRef.current = Array.from({ length: totalChars }, randomOffset);
  }
  const offsets = offsetsRef.current;
  const doneRef = useRef(false);

  let charCounter = 0;

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          {/* each word is an atomic, non-wrapping block so letters of the same word never split across lines */}
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((char, charIndex) => {
              const globalIndex = charCounter++;
              const offset = offsets[globalIndex];
              const isLast = globalIndex === totalChars - 1;
              const scrambledState = { opacity: 0.15, y: offset.y };
              const resolvedState = { opacity: 1, y: 0 };

              return (
                <motion.span
                  key={charIndex}
                  style={{ display: "inline-block" }}
                  initial={scrambledState}
                  animate={play ? resolvedState : scrambledState}
                  transition={{ duration: 0.35, delay: globalIndex * 0.012, ease: "easeOut" }}
                  onAnimationComplete={() => {
                    if (play && isLast && !doneRef.current) {
                      doneRef.current = true;
                      onDone?.();
                    }
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
