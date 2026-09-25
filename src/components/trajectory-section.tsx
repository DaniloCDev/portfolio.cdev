"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Layers,
  ChevronRight,
} from "lucide-react";

interface Phase {
  id: string;
  year: string;
  periodLabel: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  takeawayKey: string;
  techs: string[];
  projects?: { name: string; url?: string }[];
}

export function TrajectorySection() {
  const t = useTranslations();
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const phases: Phase[] = [
    {
      id: "2018",
      year: "2018",
      periodLabel: "2018",
      titleKey: "traj2018Title",
      subtitleKey: "traj2018Sub",
      descriptionKey: "traj2018Desc",
      takeawayKey: "traj2018Takeaway",
      techs: ["Lógica", "Algoritmos", "Autodidata", "Curiosidade"],
    },
    {
      id: "2022",
      year: "2022",
      periodLabel: "2022",
      titleKey: "traj2022Title",
      subtitleKey: "traj2022Sub",
      descriptionKey: "traj2022Desc",
      takeawayKey: "traj2022Takeaway",
      techs: ["Git", "GitHub", "JavaScript", "TypeScript"],
    },
    {
      id: "2023",
      year: "2023",
      periodLabel: "2023",
      titleKey: "traj2023Title",
      subtitleKey: "traj2023Sub",
      descriptionKey: "traj2023Desc",
      takeawayKey: "traj2023Takeaway",
      techs: ["Node.js", "Event-Driven", "Baileys", "APIs REST"],
      projects: [{ name: "Neko Tracking", url: "https://github.com/DaniloCDev/neko-Tracking" }],
    },
    {
      id: "2024",
      year: "2024",
      periodLabel: "2024",
      titleKey: "traj2024Title",
      subtitleKey: "traj2024Sub",
      descriptionKey: "traj2024Desc",
      takeawayKey: "traj2024Takeaway",
      techs: ["JWT Auth", "PostgreSQL", "MongoDB", "Docker", "Clean Arch"],
      projects: [{ name: "NiceTools", url: "https://github.com/DaniloCDev/NiceTools" }],
    },
    {
      id: "2025-2026",
      year: "2025–26",
      periodLabel: "2025 – 2026",
      titleKey: "traj2025Title",
      subtitleKey: "traj2025Sub",
      descriptionKey: "traj2025Desc",
      takeawayKey: "traj2025Takeaway",
      techs: ["WebSockets", "Mercado Pago Pix", "Prisma", "NestJS", "Express"],
      projects: [
        { name: "Velo Delivery", url: "https://www.velodelivery.shop/" },
        { name: "Nox24Proxy", url: "https://github.com/DaniloCDev/backend-sellproxy" },
      ],
    },
    {
      id: "now",
      year: "AGORA",
      periodLabel: "Momento Atual",
      titleKey: "trajNowTitle",
      subtitleKey: "trajNowSub",
      descriptionKey: "trajNowDesc",
      takeawayKey: "trajNowTakeaway",
      techs: ["Go", "Arquitetura Backend", "Sistemas Resilientes", "Engenharia de Software"],
    },
  ];

  const currentPhase = phases[activePhaseIndex];

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-purple-400" />
          <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
            {t("trajectoryBadge")}
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-200">
          {t("trajectoryTitle")}
        </h2>
        <p className="max-w-[700px] text-sm text-gray-400 md:text-base">
          {t("trajectorySubtitle")}
        </p>
      </div>

      {/* Grid Principal: Timeline à esquerda (ou horizontal no mobile) + Card Detalhado à direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lado esquerdo / topo no mobile: Seletor de Etapas */}
        <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {phases.map((phase, index) => {
            const isActive = index === activePhaseIndex;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhaseIndex(index)}
                className={`flex-shrink-0 flex items-center justify-between text-left px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-purple-950/40 border-purple-500/60 text-gray-100 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                    : "bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-mono font-bold transition-colors ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold tracking-wide text-purple-300">
                      {phase.periodLabel}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-200 line-clamp-1">
                      {t(phase.titleKey)}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`h-4 w-4 hidden lg:block transition-transform duration-200 ${
                    isActive ? "text-purple-400 translate-x-1" : "text-gray-600 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Lado direito: Card Dinâmico rico com 'O que aprendi' e 'Projetos' */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 sm:p-7 shadow-xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-purple-600/10 blur-[60px] pointer-events-none rounded-full" />

              {/* Cabeçalho da Fase */}
              <div className="space-y-1.5 border-b border-gray-800/80 pb-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-0.5 text-xs font-mono text-purple-300">
                  <Calendar className="h-3 w-3" />
                  <span>{currentPhase.periodLabel}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-100">
                  {t(currentPhase.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-purple-300/80 font-medium">
                  {t(currentPhase.subtitleKey)}
                </p>
              </div>

              {/* Descrição do que acontecia na época */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  {t(currentPhase.descriptionKey)}
                </p>
              </div>

              {/* Box de Maturidade: 'O que aprendi / O que mudou' */}
              <div className="rounded-xl border border-purple-900/40 bg-purple-950/20 p-4 sm:p-4.5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
                  <Lightbulb className="h-4 w-4 text-purple-400" />
                  <span>{t("takeawayTitle")}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  "{t(currentPhase.takeawayKey)}"
                </p>
              </div>

              {/* Tags de Tecnologias & Projetos Relacionados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-gray-800/80">
                <div className="space-y-2">
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-gray-500" />
                    <span>{t("techsExplored")}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPhase.techs.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-300 border border-gray-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {currentPhase.projects && currentPhase.projects.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                      <span>{t("relatedProjects")}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentPhase.projects.map((proj) => (
                        <a
                          key={proj.name}
                          href={proj.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-purple-900/60 bg-gray-800/80 px-2.5 py-1 text-xs text-purple-200 hover:border-purple-600 hover:bg-gray-800 transition-colors group"
                        >
                          <span className="font-medium">{proj.name}</span>
                          <ArrowRight className="h-3 w-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
