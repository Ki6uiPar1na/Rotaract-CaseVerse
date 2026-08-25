import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { SPONSOR_CATEGORIES } from "@/lib/constants";
import { api } from "@/lib/api";
import type { Sponsor } from "@/types/sponsor";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  useEffect(() => { api.sponsors.list().then(setSponsors).catch(() => {}); }, []);

  const grouped = SPONSOR_CATEGORIES.map((cat) => ({ ...cat, sponsors: sponsors.filter((s) => s.category === cat.key) })).filter((cat) => cat.sponsors.length > 0);

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Partners</motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">Sponsors &amp; Partners</motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted leading-relaxed max-w-3xl">We're grateful for the support of our partners who make CaseVerse 2026 possible.</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {grouped.length > 0 ? (
            <div className="space-y-16">
              {grouped.map((cat) => (
                <div key={cat.key}>
                  <h2 className="font-heading text-xl font-bold text-text mb-8 text-center">{cat.label}</h2>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {cat.sponsors.map((sponsor) => {
                      const card = (
                        <motion.div key={sponsor.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                          className="group relative w-48 h-24 rounded-xl bg-surface border border-border flex items-center justify-center p-4 overflow-hidden hover:border-primary/30 transition-colors">
                          {sponsor.logo ? (<img src={sponsor.logo} alt={sponsor.name} className="max-h-12 max-w-full object-contain transition-opacity duration-300 group-hover:opacity-0" />) : (
                            <span className="text-sm text-muted font-medium text-center transition-opacity duration-300 group-hover:opacity-0">{sponsor.name}</span>
                          )}
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">{sponsor.name}</span>
                        </motion.div>
                      );
                      return sponsor.website ? (<a key={sponsor.id} href={sponsor.website} target="_blank" rel="noopener noreferrer">{card}</a>) : card;
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Sponsors Coming Soon" description="We're inviting partners to join CaseVerse 2026. Sponsorship opportunities are available." icon={<Building2 className="w-8 h-8 text-muted" />} />
          )}
        </div>
      </section>
    </div>
  );
}
