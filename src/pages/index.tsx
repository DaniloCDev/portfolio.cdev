import { useRef, useState } from "react";
import Head from "next/head";
import { motion, useInView } from "framer-motion";
import { MainNav } from "@/components/main-nav";
import { LetterShuffle } from "@/components/letter-shuffle";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail, Map, Workflow, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SkillsSection } from "@/components/skills-section";
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

  const highlights = [t("highlight1"), t("highlight2"), t("highlight3"), t("highlight4")];

  const aboutParagraphs = t("aboutText").split("\n\n");
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);

  const projects = [
    {
      title: "Neko Tracking",
      description: t("projectDesc1"),
      github: "https://github.com/DaniloCDev/neko-Tracking",
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
    {
      title: "Person API",
      description: t("projectDesc3"),
      github: "https://github.com/DaniloCDev/csharp_webapi_mysql",
      icon: Database,
      gradient: "from-purple-900 via-purple-800 to-gray-900",
      techs: ["C#", "ASP.NET Core", "MySQL", "Clean Arch"],
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
        <link rel="icon" href="/favicon.ico" />
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
          <div className="relative w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 px-6 py-10 md:px-12 md:py-14">
            {/* Base grid pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Glowing purple / lilac ambient atmosphere & lines passing behind the text */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Soft purple and lilac glow spots */}
              <div className="absolute -left-12 -top-12 h-64 w-96 rounded-full bg-purple-600/25 blur-[100px]" />
              <div className="absolute left-1/3 top-1/4 h-56 w-96 rounded-full bg-fuchsia-600/15 blur-[90px]" />
              <div className="absolute -right-12 bottom-0 h-48 w-72 rounded-full bg-violet-600/20 blur-[80px]" />

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
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-100">
                  Danilo Lopes
                </h1>
                <p className="mt-2 text-xl font-medium text-purple-300/90">{t("subtitle")}</p>
                <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed md:text-lg">
                  {t("heroBio")}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full border border-purple-900/60 bg-gray-900/90 px-3.5 py-1 text-xs font-medium text-purple-200 transition-colors hover:border-purple-700/80"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-full py-6 md:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
              <section id="about" className="flex flex-col items-start justify-start space-y-3 text-left">
                <div ref={aboutRef} className="flex flex-col items-start space-y-3">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-200">{t("about")}</h2>
                  <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
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

              <section id="projects" className="flex flex-col items-start justify-start space-y-4 text-left">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-200">{t("projects")}</h2>
                  <p className="max-w-[900px] text-base text-gray-400 md:text-lg">
                    {t("projectsDescription")}
                  </p>
                </div>
                <div className="w-full max-w-xl">
                  <div className="relative h-[395px] overflow-hidden">
                    {projects.map((project, index) => {
                      const offset = getCarouselOffset(index, activeProject, projects.length);
                      const isActive = offset === 0;
                      const isVisible = Math.abs(offset) <= 1;

                      return (
                        <motion.div
                          key={project.title}
                          className="absolute left-1/2 top-0 w-[300px] sm:w-[380px] md:w-[420px]"
                          animate={{
                            x: `calc(-50% + ${offset * 105}%)`,
                            scale: isActive ? 1.02 : 0.85,
                            opacity: isVisible ? (isActive ? 1 : 0.35) : 0,
                            zIndex: isActive ? 10 : 5,
                          }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          style={{ pointerEvents: isActive ? "auto" : "none" }}
                        >
                          <Card className="gap-0 overflow-hidden bg-gray-900 border-gray-700 py-0 flex flex-col justify-between h-[385px] shadow-lg rounded-xl">
                            <div>
                              <div
                                className={`flex h-28 sm:h-32 w-full items-center justify-center bg-gradient-to-br ${project.gradient}`}
                              >
                                <project.icon className="h-9 w-9 text-white/90" strokeWidth={1.5} />
                              </div>
                              <CardContent className="p-4 sm:p-5 space-y-2">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-100">{project.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {project.techs.map((tech) => (
                                    <span
                                      key={tech}
                                      className="rounded bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-300 border border-gray-700/60"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </CardContent>
                            </div>
                            <div className="p-4 sm:p-5 pt-0">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2 px-3 text-xs sm:text-sm text-gray-200 bg-gray-800/80 hover:bg-gray-700 rounded-lg border border-gray-700 flex justify-center items-center gap-2 font-medium transition-colors"
                              >
                                <Github className="h-4 w-4" />
                                <span>{t("viewProjectCode")}</span>
                              </a>
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
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full py-6 md:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 items-start">
              <section id="skills" className="flex flex-col items-start justify-start text-left">
                <SkillsSection />
              </section>

              <section id="contact" className="flex flex-col items-start justify-start space-y-4 text-left">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-200">{t("getTouch")}</h2>
                  <p className="max-w-[700px] text-sm text-gray-400 md:text-base">
                    {t("getTouchDescription")}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 pb-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/60 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span>{t("availableForWork")}</span>
                  </div>
                </div>

                <div className="w-full max-w-lg rounded-xl border border-gray-800 bg-gray-900 p-5 sm:p-6 shadow-md flex flex-col justify-between h-[350px]">
                  <div className="space-y-3.5">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {t("contactCardIntro")}
                    </p>

                    <div className="space-y-2.5">
                      <a
                        href="mailto:danilo.c.dev@gmail.com"
                        className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/60 p-3 transition-colors hover:border-gray-700 hover:bg-gray-800 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-gray-300 group-hover:text-primary">
                            <Mail className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-gray-200">Email</div>
                            <div className="text-[11px] text-gray-400">danilo.c.dev@gmail.com</div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{t("sendEmailAction")}</span>
                      </a>

                      <a
                        href="https://github.com/DaniloCDev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/60 p-3 transition-colors hover:border-gray-700 hover:bg-gray-800 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-gray-300 group-hover:text-primary">
                            <Github className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-gray-200">GitHub</div>
                            <div className="text-[11px] text-gray-400">github.com/DaniloCDev</div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{t("viewReposAction")}</span>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/danilo-c-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/60 p-3 transition-colors hover:border-gray-700 hover:bg-gray-800 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-gray-300 group-hover:text-primary">
                            <Linkedin className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-gray-200">LinkedIn</div>
                            <div className="text-[11px] text-gray-400">linkedin.com/in/danilo-c-dev</div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{t("connectAction")}</span>
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-gray-800/80 pt-2.5 flex items-center justify-between text-xs text-gray-500">
                    <span>Danilo Lopes · Backend</span>
                    <span className="text-emerald-400 font-medium">Online</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
