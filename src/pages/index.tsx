import { useRef, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MainNav } from "@/components/main-nav";
import { LetterShuffle } from "@/components/letter-shuffle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail, Map, Workflow, Database, ShoppingBag, ExternalLink, X, ZoomIn, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SkillsSection } from "@/components/skills-section";
import { TrajectorySection } from "@/components/trajectory-section";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: string }) {
  const messages = (await import(`../public/messages/${locale}.json`)).default;
  return {

    props: {
      messages
    }
  };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// shortest signed distance from `active` to `index` on a circular track of `length` items
function getCarouselOffset(index: number, active: number, length: number) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export default function Home() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; title: string; link?: string; linkText?: string } | null>(null);

  const highlights = [
    t("highlight1"),
    t("highlight2"),
    t("highlight3"),
    t("highlight4"),
    t("highlight5"),
    t("highlight6"),
  ];

  const aboutParagraphs = t("aboutText").split("\n\n");
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);

  const projects = [
    {
      title: "Velo Delivery",
      description: t("projectDesc0"),
      live: "https://www.velodelivery.shop/",
      image: "/velo-delivery.png",
      icon: ShoppingBag,
      gradient: "from-teal-950 via-teal-900 to-gray-900",
      techs: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "WebSockets", "Mercado Pago", "Docker"],
    },
    {
      title: "Nox24Proxy",
      description: t("projectDescNox"),
      github: "https://github.com/DaniloCDev/backend-sellproxy",
      image: "/nox24proxy.png",
      icon: Shield,
      gradient: "from-indigo-950 via-purple-900 to-gray-900",
      techs: ["Node.js", "TypeScript", "Express", "PostgreSQL", "Prisma", "Docker", "Mercado Pago"],
    },
    {
      title: "Neko Tracking",
      description: t("projectDesc1"),
      github: "https://github.com/DaniloCDev/neko-Tracking",
      image: "/neko-tracking.png",
      icon: Map,
      gradient: "from-emerald-900 via-emerald-800 to-gray-900",
      techs: ["Node.js", "Baileys", "TypeScript", "Event-Driven"],
    },
    {
      title: "NiceTools",
      description: t("projectDesc2"),
      github: "https://github.com/DaniloCDev/NiceTools",
      icon: Workflow,
      gradient: "from-blue-900 via-blue-800 to-gray-900",
      techs: ["Node.js", "Express", "MongoDB", "JWT Auth"],
    },
  ];

  const [activeProject, setActiveProject] = useState(0);
  const goToPrevProject = () =>
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  const goToNextProject = () => setActiveProject((prev) => (prev + 1) % projects.length);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Head>
        <title>{t("pageTitle")}</title>
        <meta name="description" content={t("description")} />
        <meta property="og:title" content={t("pageTitle")} />
        <meta property="og:description" content={t("description")} />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
      </Head>

      <MainNav open={open} setOpen={setOpen} />

      <main className="flex min-h-screen flex-col items-start justify-start pt-20 md:pt-16 md:ml-64">
        <motion.div
          className="container px-4 md:px-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 px-6 py-7 md:px-10 md:py-8">
            {/* Base grid pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Glowing purple / lilac ambient atmosphere & lines passing behind the text */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Soft purple and lilac glow spots */}
              <div className="absolute -left-12 -top-12 h-56 w-80 rounded-full bg-purple-600/25 blur-[100px]" />
              <div className="absolute left-1/3 top-1/4 h-48 w-80 rounded-full bg-fuchsia-600/15 blur-[90px]" />
              <div className="absolute -right-12 bottom-0 h-40 w-64 rounded-full bg-violet-600/20 blur-[80px]" />

              {/* Horizontal glowing purple and lilac lines */}
              <motion.div
                className="absolute left-0 top-[28%] h-[1.5px] w-full bg-gradient-to-r from-transparent via-purple-400/80 to-transparent shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                animate={{ opacity: [0.5, 0.9, 0.5], x: ["-5%", "5%", "-5%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-0 top-[52%] h-[1px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent shadow-[0_0_8px_rgba(232,121,249,0.5)]"
                animate={{ opacity: [0.3, 0.7, 0.3], x: ["5%", "-5%", "5%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute left-0 top-[76%] h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            </div>

            <div className="relative flex flex-col items-start gap-4 text-left">
              <div className="w-full">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-100">
                    Danilo Lopes
                  </h1>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/60 bg-emerald-950/40 px-3 py-0.5 text-xs font-medium text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span>{t("availableForWork")}</span>
                  </div>
                </div>

                <p className="mt-1 text-lg font-medium text-purple-300/90">{t("subtitle")}</p>
                <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed text-sm md:text-base">
                  {t("heroBio")}
                </p>

                {/* Stacks em destaque: Node.js, TypeScript, Go, PostgreSQL, Docker, C++ */}
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full border border-purple-900/60 bg-gray-900/90 px-3 py-0.5 text-xs font-medium text-purple-200 transition-colors hover:border-purple-600/80"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Contatos compactos e elegantes */}
                <div id="contact" className="mt-5 pt-4 border-t border-gray-800/80 w-full flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="mailto:danilo.c.dev@gmail.com"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-purple-500/50 hover:bg-gray-800 hover:text-white"
                    >
                      <Mail className="h-3.5 w-3.5 text-purple-400" />
                      <span>Email</span>
                    </a>

                    <a
                      href="https://github.com/DaniloCDev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-purple-500/50 hover:bg-gray-800 hover:text-white"
                    >
                      <Github className="h-3.5 w-3.5 text-purple-400" />
                      <span>GitHub</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/danilo-c-dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-purple-500/50 hover:bg-gray-800 hover:text-white"
                    >
                      <Linkedin className="h-3.5 w-3.5 text-purple-400" />
                      <span>LinkedIn</span>
                    </a>
                  </div>

                  <span className="text-xs text-gray-400 font-mono">
                    danilo.c.dev@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Seção Sobre */}
        <motion.div
          className="w-full py-6 md:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <section id="about" className="flex flex-col items-start justify-start space-y-3 text-left max-w-4xl">
              <div ref={aboutRef} className="flex flex-col items-start space-y-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-purple-400" />
                  <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                    {t("about")}
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-200">{t("about")}</h2>
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {aboutParagraphs.map((paragraph, index) => (
                    <p key={index}>
                      <LetterShuffle
                        text={paragraph}
                        play={aboutInView && index <= revealedParagraphs}
                        onDone={() => setRevealedParagraphs((prev) => prev + 1)}
                      />
                    </p>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </motion.div>

        {/* Seção Trajetória dedicada */}
        <motion.div
          className="w-full py-6 md:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <section id="trajectory" className="flex flex-col items-start justify-start text-left w-full">
              <TrajectorySection />
            </section>
          </div>
        </motion.div>

        {/* Seção Projetos e Habilidades lado a lado */}
        <motion.div
          className="w-full py-6 md:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10 items-start">
              {/* Coluna 1: Projetos */}
              <section id="projects" className="flex flex-col items-start justify-start space-y-4 text-left w-full">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-purple-400" />
                    <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                      Portfolio
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-200">{t("projects")}</h2>
                  <p className="max-w-[700px] text-sm text-gray-400 md:text-base">
                    {t("projectsDescription")}
                  </p>
                </div>
                <div className="w-full">
                  <div className="relative h-[430px] overflow-hidden">
                    {projects.map((project, index) => {
                      const offset = getCarouselOffset(index, activeProject, projects.length);
                      const isActive = offset === 0;
                      const isVisible = Math.abs(offset) <= 1;

                      return (
                        <motion.div
                          key={project.title}
                          className="absolute left-1/2 top-0 w-[290px] sm:w-[360px] md:w-[410px]"
                          animate={{
                            x: `calc(-50% + ${offset * 105}%)`,
                            scale: isActive ? 1.02 : 0.85,
                            opacity: isVisible ? (isActive ? 1 : 0.35) : 0,
                            zIndex: isActive ? 10 : 5,
                          }}
                          whileHover={
                            isActive
                              ? {
                                  y: -6,
                                  scale: 1.04,
                                  transition: { duration: 0.25, ease: "easeOut" },
                                }
                              : {}
                          }
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          style={{ pointerEvents: isActive ? "auto" : "none" }}
                        >
                          <Card className="gap-0 overflow-hidden bg-gray-900/95 border-gray-800 hover:border-purple-500/50 py-0 flex flex-col justify-between h-[420px] shadow-xl hover:shadow-[0_12px_32px_rgba(168,85,247,0.22)] rounded-xl transition-all duration-300">
                            <div>
                              <div
                                onClick={() => {
                                  if (project.image) {
                                    setModalImage({
                                      src: project.image,
                                      title: project.title,
                                      link: project.live || project.github,
                                      linkText: project.live ? "Abrir plataforma" : "Ver no GitHub",
                                    });
                                  }
                                }}
                                className={`group/img relative flex h-28 sm:h-32 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient} ${
                                  project.image ? "cursor-zoom-in" : ""
                                }`}
                              >
                                {project.image ? (
                                  <>
                                    <Image
                                      src={project.image}
                                      alt={project.title}
                                      fill
                                      sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, 420px"
                                      priority={index === 0}
                                      className="object-cover object-top opacity-90 transition-transform duration-300 group-hover/img:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100 flex items-center justify-center gap-1.5 text-xs text-white font-medium backdrop-blur-[2px]">
                                      <ZoomIn className="h-4 w-4" />
                                      <span>Ampliar</span>
                                    </div>
                                  </>
                                ) : (
                                  <project.icon className="h-9 w-9 text-white/90" strokeWidth={1.5} />
                                )}
                              </div>
                              <CardContent className="p-4 sm:p-5 space-y-2.5">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-100 tracking-tight">{project.title}</h3>
                                <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed font-normal">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {project.techs.map((tech) => (
                                    <span
                                      key={tech}
                                      className="rounded bg-gray-800/90 px-2 py-0.5 text-[11px] font-medium text-gray-200 border border-gray-700/70"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </CardContent>
                            </div>
                            <div className="p-4 sm:p-5 pt-0 flex gap-2">
                              {project.live && (
                                <a
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 py-2 px-3 text-xs sm:text-sm text-white bg-purple-600 hover:bg-purple-500 rounded-lg border border-purple-400/50 shadow-sm flex justify-center items-center gap-1.5 font-medium transition-all"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  <span>{t("viewProjectLive")}</span>
                                </a>
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 py-2 px-3 text-xs sm:text-sm text-gray-200 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 flex justify-center items-center gap-2 font-medium transition-colors"
                                >
                                  <Github className="h-4 w-4" />
                                  <span>{t("viewProjectCode")}</span>
                                </a>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPrevProject}
                      aria-label={t("previousProject")}
                      className="border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex gap-1.5">
                      {projects.map((project, index) => (
                        <span
                          key={project.title}
                          className={`h-1.5 w-1.5 rounded-full ${
                            index === activeProject ? "bg-gray-200" : "bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextProject}
                      aria-label={t("nextProject")}
                      className="border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </section>

              {/* Coluna 2: Habilidades */}
              <section id="skills" className="flex flex-col items-start justify-start text-left w-full">
                <SkillsSection />
              </section>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Lightbox Modal com efeito de foco e animação suave */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 md:p-10 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-5xl w-full overflow-hidden rounded-2xl border border-gray-700/80 bg-gray-900 shadow-2xl cursor-default"
            >
              {/* Header do Modal */}
              <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-gray-200">{modalImage.title}</span>
                </div>
                <button
                  onClick={() => setModalImage(null)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Imagem em tamanho grande */}
              <div className="relative aspect-[16/10] w-full max-h-[75vh] bg-gray-950 flex items-center justify-center p-2">
                <Image
                  src={modalImage.src}
                  alt={modalImage.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Footer com link de acesso rápido */}
              <div className="flex items-center justify-between border-t border-gray-800 bg-gray-900/90 px-5 py-3 text-xs text-gray-400">
                <span>Clique fora ou no botão para fechar</span>
                {modalImage.link && (
                  <a
                    href={modalImage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    <span>{modalImage.linkText || "Acessar link"}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
