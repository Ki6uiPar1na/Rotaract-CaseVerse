import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import CTASection from "@/components/ui/CTASection";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import type { ResultPhase } from "@/types/result";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const phaseIcons: Record<string, typeof Trophy> = {
  "phase-1": Medal,
  "phase-2": Award,
  final: Trophy,
};

export default function Results() {
  const [results, setResults] = useState<ResultPhase[]>([]);
  useEffect(() => { api.results.list().then(setResults).catch(() => {}); }, []);
  const [activePhase, setActivePhase] = useState("");
  const current = results.find((r) => r.id === activePhase);

  useEffect(() => { if (results.length && !activePhase) setActivePhase(results[0].id); }, [results, activePhase]);

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Results</motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">Competition Results</motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted leading-relaxed max-w-3xl">Track the progress of CaseVerse 2026 across all rounds.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
            {results.map((phase, index) => {
              const Icon = phaseIcons[phase.id] || Trophy;
              const isActive = phase.id === activePhase;
              return (
                <motion.button key={phase.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} onClick={() => setActivePhase(phase.id)}
                  className={cn("flex items-center gap-3 px-5 py-4 rounded-xl border transition-all duration-200 text-left flex-1", isActive ? "bg-primary/10 border-primary/30" : "bg-surface border-border hover:border-primary/20")}>
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", isActive ? "bg-primary/20" : "bg-surface-light")}>
                    <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-semibold uppercase tracking-wider", isActive ? "text-primary" : "text-muted")}>{phase.label}</p>
                    <p className="font-heading text-sm font-semibold text-text mt-0.5 truncate">{phase.title}</p>
                  </div>
                  {phase.status === "published" ? (<CheckCircle2 className="w-4 h-4 text-success shrink-0" />) : (<Clock className="w-4 h-4 text-muted shrink-0" />)}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activePhase} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {current && (
                <div className="rounded-2xl bg-surface border border-border p-8 lg:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="min-w-0">
                      <h2 className="font-heading text-2xl lg:text-3xl font-bold text-text">{current.title}</h2>
                      <p className="mt-2 text-muted">{current.description}</p>
                    </div>
                    <span className={cn("px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 self-start", current.status === "published" ? "bg-success/10 text-success" : "bg-warning/10 text-warning")}>
                      {current.status === "published" ? "Published" : "Upcoming"}
                    </span>
                  </div>
                  {current.status === "published" && current.results.length > 0 ? (
                    <div className="space-y-3">
                      {current.results.map((entry) => (
                        <div key={entry.rank} className="flex items-center gap-4 p-4 rounded-xl bg-bg border border-border">
                          <span className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0", entry.rank === 1 ? "bg-accent/20 text-accent" : entry.rank === 2 ? "bg-primary/20 text-primary" : entry.rank === 3 ? "bg-warning/20 text-warning" : "bg-surface-light text-muted")}>{entry.rank}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-heading text-sm font-semibold text-text">{entry.teamName}</p>
                            <p className="text-xs text-muted">{entry.university}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted shrink-0" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <Clock className="w-10 h-10 text-muted mx-auto mb-4 opacity-50" />
                      <p className="text-sm text-muted font-medium">Results will be announced after this round is completed.</p>
                      <p className="text-xs text-muted mt-1">Check back later for updates.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <CTASection title="Want to Compete?" description="Register your team for CaseVerse 2026 and aim for the top spot." primaryAction={{ label: "Register Now", path: "/register" }} />
    </div>
  );
}
