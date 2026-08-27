import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, ScrollText, Star } from "lucide-react";
import { getCompetition, data } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy className="w-8 h-8 text-primary" />,
  medal: <Medal className="w-8 h-8 text-primary" />,
  award: <Award className="w-8 h-8 text-primary" />,
  scroll: <ScrollText className="w-8 h-8 text-primary" />,
  star: <Star className="w-8 h-8 text-primary" />,
};

export default function Prizes() {
  const [competition, setCompetition] = useState<Record<string, unknown> | null>(() => data.competition);
  useEffect(() => { getCompetition().then(setCompetition).catch(() => {}); }, []);
  if (!competition) return null;

  const prizes = (competition.prizes || []) as { place: string; title: string; description: string; icon: string }[];

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Prizes</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
              Prizes &amp; Recognition
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Awards" description="Prize details will be announced closer to the competition. Here's what to expect." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {prizes.map((prize) => (
              <motion.div
                key={prize.place}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-surface border border-border text-center"
              >
                {iconMap[prize.icon] || <Trophy className="w-8 h-8 text-primary" />}
                <h3 className="mt-4 font-heading text-xl font-bold text-text">{prize.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{prize.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Compete for the Top Spot"
        description="Register your team and aim for the championship."
        primaryAction={{ label: "Register Now", path: "/register" }}
      />
    </div>
  );
}
