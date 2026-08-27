import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Download } from "lucide-react";
import { getRoundById } from "@/lib/data";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";
import EmptyState from "@/components/ui/EmptyState";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function RoundDetails({ roundId }: { roundId: string }) {
  const [round, setRound] = useState<Record<string, unknown> | null>(null);

  useEffect(() => { getRoundById(roundId).then((r) => setRound(r ?? null)); }, [roundId]);

  useSeoMetadata({
    title: round ? `${round.title} | CaseVerse 2026` : "Round | CaseVerse 2026",
    description: round?.description as string,
  });

  if (!round) {
    return (
      <div className="pt-24">
        <EmptyState title="Round Not Found" description="This round information is not available yet." />
      </div>
    );
  }

  const requirements = (round.requirements || []) as string[];
  const guidelines = (round.guidelines || []) as string[];
  const documents = (round.documents || []) as { name: string; url: string }[];
  const faq = (round.faq || []) as { question: string; answer: string }[];

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Round {String(round.number as number).padStart(2, "0")}
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight max-w-3xl">
              {round.title as string}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-primary font-medium">{round.subtitle as string}</motion.p>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted leading-relaxed max-w-3xl">{round.description as string}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 lg:py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Requirements" title="Submission Requirements" align="left" />
          <ul className="space-y-3 max-w-3xl">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Guidelines" title="Important Guidelines" align="left" />
          <ul className="space-y-3 max-w-3xl">
            {guidelines.map((guideline, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span className="text-sm text-muted leading-relaxed">{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Documents */}
      {documents.length > 0 && (
        <section className="py-16 lg:py-20 bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading label="Resources" title="Documents" align="left" />
            <div className="space-y-3 max-w-3xl">
              {documents.map((doc, i) => (
                <a
                  key={i}
                  href={doc.url}
                  className="flex items-center gap-4 p-4 rounded-xl bg-bg border border-border hover:border-primary/30 transition-colors"
                >
                  <Download className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-text">{doc.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Round FAQ */}
      {faq.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading label="FAQ" title="Round-Specific Questions" />
            <div className="space-y-3">
              {faq.map((item, i) => (
                <details key={i} className="p-5 rounded-xl bg-surface border border-border">
                  <summary className="cursor-pointer font-heading text-sm font-semibold text-text list-none">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Ready for Round {round.number}?"
        description="Make sure your team is prepared and submit before the deadline."
        primaryAction={{ label: "Register Your Team", path: "/register" }}
        secondaryAction={{ label: "Back to Competition", path: "/competition" }}
      />
    </div>
  );
}
