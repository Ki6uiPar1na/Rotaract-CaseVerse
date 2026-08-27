import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { api } from "@/lib/api";
import judgesData from "@/data/judges.json";
import type { Judge } from "@/types/judge";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Judges() {
  const [judges, setJudges] = useState<Judge[]>(() => judgesData as Judge[]);
  useEffect(() => { api.judges.list().then(setJudges).catch(() => {}); }, []);

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Judges</motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">Meet Our Judges</motion.h1>
          </motion.div>
        </div>
      </section>
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {judges.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {judges.map((judge) => (
                <motion.div key={judge.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-xl bg-surface border border-border">
                  <div className="w-20 h-20 rounded-full bg-surface-light flex items-center justify-center mb-4">
                    {judge.photo ? (<img src={judge.photo} alt={judge.name} className="w-full h-full rounded-full object-cover" />) : (<User className="w-10 h-10 text-muted" />)}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text">{judge.name}</h3>
                  <p className="text-sm text-primary">{judge.designation}</p>
                  <p className="text-xs text-muted mt-1">{judge.organization}</p>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{judge.bio}</p>
                  {judge.linkedin && (<a href={judge.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-xs text-muted hover:text-text transition-colors">LinkedIn Profile</a>)}
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Judges Coming Soon" description="Our panel of expert judges will be announced soon. Stay tuned for updates." />
          )}
        </div>
      </section>
    </div>
  );
}
