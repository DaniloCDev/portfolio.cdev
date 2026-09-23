"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Server,
  Database,
  Cloud,
  Layout,
  ChevronLeft,
  ChevronRight,
  Code2,
  Sparkles,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SkillCard {
  id: string;
  icon: typeof Server;
  titleKey: string;
  descKey: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  conceptBadge: string;
  techs: string[];
  concepts: string[];
  projects: string[];
}

function getCarouselOffset(index: number, active: number, length: number) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export function SkillsSection() {
  const t = useTranslations();
  const [activeSkill, setActiveSkill] = useState(0);

  const skills: SkillCard[] = [
    {
      id: "backend",
      icon: Server,
      titleKey: "skillBackendTitle",
      descKey: "skillBackendDesc",
      iconBg: "bg-emerald-950/60 border-emerald-800/80",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-900/70",
      conceptBadge: "bg-emerald-950/60 text-emerald-300 border-emerald-800/60",
      techs: ["Node.js", "C# / .NET Core", "TypeScript", "Express", "Baileys"],
      concepts: ["Clean Architecture", "SOLID", "APIs RESTful", "Event-Driven"],
      projects: ["Neko Tracking", "NiceTools", "Person API"],
    },
    {
      id: "database",
      icon: Database,
      titleKey: "skillDatabaseTitle",
      descKey: "skillDatabaseDesc",
      iconBg: "bg-blue-950/60 border-blue-800/80",
      iconColor: "text-blue-400",
      borderColor: "border-blue-900/70",
      conceptBadge: "bg-blue-950/60 text-blue-300 border-blue-800/60",
      techs: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "EF Core"],
      concepts: ["Modelagem Relacional", "NoSQL", "ACID", "Migrations"],
      projects: ["Person API", "NiceTools"],
    },
    {
      id: "devops",
      icon: Cloud,
      titleKey: "skillDevopsTitle",
      descKey: "skillDevopsDesc",
      iconBg: "bg-amber-950/60 border-amber-800/80",
      iconColor: "text-amber-400",
      borderColor: "border-amber-900/70",
      conceptBadge: "bg-amber-950/60 text-amber-300 border-amber-800/60",
      techs: ["Docker", "Docker Compose", "AWS", "Git", "GitHub Actions"],
      concepts: ["Conteinerização", "12-Factor", "CI/CD", "Git Flow"],
      projects: ["NiceTools", "Neko Tracking", "Person API"],
    },
    {
      id: "frontend",
      icon: Layout,
      titleKey: "skillFrontendTitle",
      descKey: "skillFrontendDesc",
      iconBg: "bg-cyan-950/60 border-cyan-800/80",
      iconColor: "text-cyan-400",
      borderColor: "border-cyan-900/70",
      conceptBadge: "bg-cyan-950/60 text-cyan-300 border-cyan-800/60",
      techs: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      concepts: ["SSR & SSG", "Componentização", "UI/UX", "APIs"],
      projects: ["Portfólio", "NiceTools Web"],
    },
  ];

  const goToPrev = () =>
    setActiveSkill((prev) => (prev - 1 + skills.length) % skills.length);
  const goToNext = () =>
    setActiveSkill((prev) => (prev + 1) % skills.length);

  return (
    <div className="flex flex-col items-start justify-start space-y-4 text-left w-full">
      {/* Title & brief subtitle */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-200">
          {t("skills")}
        </h2>
        <p className="max-w-[700px] text-sm text-gray-400 md:text-base">
          {t("skillsDescription")}
        </p>
      </div>

      {/* Category quick selectors */}
      <div className="flex flex-wrap gap-1.5 pt-1 pb-1">
        {skills.map((skill, index) => {
          const isActive = index === activeSkill;
          return (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(index)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? "bg-gray-200 text-gray-950 shadow-sm"
                  : "border border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700 hover:text-gray-200"
              }`}
            >
              {t(skill.titleKey)}
            </button>
          );
        })}
      </div>

      {/* Carousel Track with proportionate height & width */}
      <div className="w-full max-w-lg">
        <div className="relative h-[360px] overflow-hidden">
          {skills.map((skill, index) => {
            const offset = getCarouselOffset(index, activeSkill, skills.length);
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 1;
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.id}
                className="absolute left-1/2 top-0 w-[320px] sm:w-[390px] md:w-[420px]"
                animate={{
                  x: `calc(-50% + ${offset * 105}%)`,
                  scale: isActive ? 1 : 0.85,
                  opacity: isVisible ? (isActive ? 1 : 0.35) : 0,
                  zIndex: isActive ? 10 : 5,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ pointerEvents: isActive ? "auto" : "none" }}
              >
                <div
                  className={`rounded-xl border ${skill.borderColor} bg-gray-900 p-4 sm:p-5 shadow-md flex flex-col justify-between h-[350px]`}
                >
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${skill.iconBg} ${skill.iconColor}`}
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 tracking-tight">
                        {t(skill.titleKey)}
                      </h3>
                    </div>

                    {/* Full description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-snug">
                      {t(skill.descKey)}
                    </p>

                    {/* Stack tags */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        <Code2 className="h-3 w-3 text-primary" />
                        <span>Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.techs.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-gray-700/80 bg-gray-800/90 px-2 py-0.5 text-xs font-medium text-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Concepts badges */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        <Sparkles className="h-3 w-3 text-amber-400" />
                        <span>Conceitos</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.concepts.map((concept) => (
                          <span
                            key={concept}
                            className={`rounded-full border px-2 py-0.5 text-[10px] sm:text-[11px] font-medium ${skill.conceptBadge}`}
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Project Connection with safe bottom margin */}
                  <div className="border-t border-gray-800/80 pt-2 pb-1 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1 font-medium">
                      <FolderGit2 className="h-3.5 w-3.5 text-primary" />
                      <span>{t("appliedIn")}:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      {skill.projects.map((proj) => (
                        <span
                          key={proj}
                          className="rounded bg-gray-800/70 px-2 py-0.5 text-xs text-gray-300 border border-gray-700/50"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="mt-2.5 flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            aria-label={t("previousSkill")}
            className="h-8 w-8 border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-1.5">
            {skills.map((skill, index) => (
              <button
                key={skill.id}
                onClick={() => setActiveSkill(index)}
                aria-label={t(skill.titleKey)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeSkill ? "w-6 bg-gray-200" : "w-2 bg-gray-700"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            aria-label={t("nextSkill")}
            className="h-8 w-8 border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
