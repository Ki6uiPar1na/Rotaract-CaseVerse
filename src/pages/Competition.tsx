import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, MapPin, Target, FileText, ChevronRight } from "lucide-react";
import { getCompetition, getRounds, data } from "@/lib/data";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Competition() {
  const [competition, setCompetition] = useState<Record<string, unknown> | null>(() => data.competition);
  const [rounds, setRounds] = useState<Record<string, unknown>[]>(() => data.rounds);

  useEffect(() => {
    Promise.all([getCompetition(), getRounds()]).then(([c, r]) => { setCompetition(c); setRounds(r); }).catch(() => {});
  }, []);

  useSeoMetadata({
    title: "Competition Overview | CaseVerse 2026",
    description: "Three-round national case competition. Teams of 3–4 students compete across case analysis, video content, and a live grand finale.",
  });

  if (!competition) return null;

  const teamSize = competition.teamSize as { min: number; max: number };
  const eligibility = (competition.eligibility || []) as string[];

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Competition
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight max-w-3xl">
              Competition Overview
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted leading-relaxed max-w-3xl">
              {competition.description as string}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 lg:py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Team Size", value: `${teamSize.min}–${teamSize.max} members` },
              { icon: Target, label: "Target Teams", value: `${competition.targetParticipation}+` },
              { icon: FileText, label: "Rounds", value: "3" },
              { icon: MapPin, label: "Venue", value: "JKKNIU, Mymensingh" },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-xl bg-bg border border-border">
                <item.icon className="w-6 h-6 text-primary mb-3" />
                <p className="text-xs text-muted uppercase tracking-wider">{item.label}</p>
                <p className="mt-1 font-heading text-lg font-semibold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Eligibility" title="Who Can Participate?" align="left" />
          <ul className="space-y-3 max-w-3xl">
            {eligibility.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Three Rounds */}
      <section className="py-20 lg:py-28 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Competition Format" title="Three Rounds to Victory" />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {rounds.map((round) => (
              <Link
                key={round.id as string}
                to={(round.id as string) === "grand-finale" ? "/competition/grand-finale" : `/competition/${round.id}`}
                className="group p-8 rounded-2xl bg-bg border border-border hover:border-primary/30 transition-all duration-300"
              >
                <span className="font-heading text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                  0{round.number as number}
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold text-text">{round.title as string}</h3>
                <p className="mt-1 text-sm text-primary font-medium">{round.subtitle as string}</p>
                <p className="mt-3 text-sm text-muted leading-relaxed">{round.description as string}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Details <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Venue" title="Grand Finale Location" />
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-surface border border-border text-center">
            <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-text">{competition.venue as string}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              The Grand Finale will be held at the JKKNIU campus in Trishal, Mymensingh.
              Directions and accommodation details will be shared with qualifying teams.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Register?"
        description="Form your team and register now to secure your spot in CaseVerse 2026."
        primaryAction={{ label: "Register Now", path: "/register" }}
      />
    </div>
  );
}
