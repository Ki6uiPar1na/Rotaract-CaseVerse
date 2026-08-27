import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Presentation, MessageSquare } from "lucide-react";
import { getSite, data } from "@/lib/data";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function GrandFinale() {
  const [site, setSite] = useState<Record<string, unknown> | null>(() => data.site);
  useEffect(() => { getSite().then(setSite).catch(() => {}); }, []);

  useSeoMetadata({
    title: "Grand Finale | CaseVerse 2026",
    description: "The Grand Finale of CaseVerse 2026 — live pitch presentation and Focus Group Discussion at JKKNIU, Mymensingh.",
  });

  if (!site) return null;
  const venue = site.venue as { name: string; address: string; country: string };

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Round 03
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-text leading-tight">
              Grand Finale
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted leading-relaxed max-w-3xl">
              The ultimate showdown — where the top teams present their solutions live before a panel of expert judges,
              followed by a Focus Group Discussion to assess strategic thinking and decision-making.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-16 lg:py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-bg border border-border text-center">
            <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-text">{venue.name}</h3>
            <p className="mt-2 text-sm text-muted">{venue.address}, {venue.country}</p>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Finale Components" title="What to Expect" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-surface border border-border"
            >
              <Presentation className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-text mb-3">Live Pitch Presentation</h3>
              <p className="text-sm text-muted leading-relaxed">
                Teams present their complete solution in a live pitch format before the judging panel.
                Duration and format details will be communicated to qualifying teams in advance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-surface border border-border"
            >
              <MessageSquare className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-text mb-3">Focus Group Discussion</h3>
              <p className="text-sm text-muted leading-relaxed">
                Following the pitch, teams participate in a Focus Group Discussion (FGD) designed to assess
                critical thinking, problem-solving, collaboration, and strategic decision-making capabilities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assessment Areas */}
      <section className="py-20 lg:py-28 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Assessment" title="What Judges Look For" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              "Critical Thinking",
              "Problem Solving",
              "Collaboration",
              "Strategic Decision-Making",
            ].map((area) => (
              <div key={area} className="p-5 rounded-xl bg-bg border border-border text-center">
                <span className="font-heading text-sm font-semibold text-text">{area}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Finalist count will be confirmed by the organizers. Check back for updates.
          </p>
        </div>
      </section>

      <CTASection
        title="Aim for the Grand Finale"
        description="Start your journey by registering your team today."
        primaryAction={{ label: "Register Now", path: "/register" }}
        secondaryAction={{ label: "View All Rounds", path: "/competition" }}
      />
    </div>
  );
}
