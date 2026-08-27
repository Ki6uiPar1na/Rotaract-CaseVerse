import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import timeline from "@/data/timeline.json";
import type { TimelineItem } from "@/types/timeline";

const typedTimeline = timeline as unknown as TimelineItem[];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function TimelineItemCard({ item, index }: { item: TimelineItem; index: number }) {
  const isLeft = index % 2 === 0;
  const typeColors: Record<string, string> = {
    "pre-event": "border-l-muted",
    registration: "border-l-primary",
    round: "border-l-accent",
    finale: "border-l-accent",
  };

  return (
    <motion.div variants={fadeUp} className="relative flex items-start gap-6">
      <div className={cn("hidden lg:flex w-full items-start gap-8", isLeft ? "flex-row" : "flex-row-reverse")}>
        <div className={cn("w-1/2", isLeft ? "text-right" : "text-left")}>
          <div className={cn("p-6 rounded-xl bg-surface border border-border border-l-4", typeColors[item.type])}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted">
                {new Date(item.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                {item.startDate !== item.endDate && (<>) — {new Date(item.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</>)}
              </span>
            </div>
            <h3 className="font-heading text-lg font-bold text-text">{item.title}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
          </div>
        </div>
        <div className="w-8 flex flex-col items-center shrink-0">
          <div className="w-3 h-3 rounded-full bg-primary" />
          {index < 7 && <div className="w-px flex-1 bg-border min-h-[40px]" />}
        </div>
        <div className="w-1/2" />
      </div>

      <div className="lg:hidden flex items-start gap-4">
        <div className="flex flex-col items-center shrink-0">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-px flex-1 bg-border min-h-[20px]" />
        </div>
        <div className={cn("flex-1 p-5 rounded-xl bg-surface border border-border border-l-4 pb-6 mb-4", typeColors[item.type])}>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted">{new Date(item.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <h3 className="font-heading text-base font-bold text-text">{item.title}</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const timelineData = typedTimeline;

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Timeline</motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">Competition Timeline</motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted leading-relaxed max-w-3xl">Follow the key milestones throughout CaseVerse 2026. Stay on track with important dates.</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {timelineData.map((item, index) => (<TimelineItemCard key={item.id} item={item} index={index} />))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
