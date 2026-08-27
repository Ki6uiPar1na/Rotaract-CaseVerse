import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSite, getOrganizers } from "@/lib/data";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";
import type { Organizer } from "@/types/organizer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function About() {
  const [site, setSite] = useState<Record<string, unknown> | null>(null);
  const [organizers, setOrganizers] = useState<Organizer[]>([]);

  useEffect(() => {
    Promise.all([getSite(), getOrganizers()]).then(([s, o]) => { setSite(s); setOrganizers(o); });
  }, []);

  useSeoMetadata({
    title: "About CaseVerse 2026 | National SDG-Aligned Case Competition",
    description: "Learn about CaseVerse — a national SDG-aligned case competition bringing together university students from across Bangladesh.",
  });

  if (!site) return null;

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              About
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
              Where Strategy Meets Sustainability
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted leading-relaxed">
              CaseVerse is a national SDG-aligned case competition that brings together university students
              from across Bangladesh to tackle real-world business challenges through the lens of sustainability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What is CaseVerse */}
      <section className="py-20 lg:py-28 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp}>
                <SectionHeading label="What is CaseVerse?" title="A Platform for Future Leaders" align="left" />
              </motion.div>
              <motion.p variants={fadeUp} className="text-muted leading-relaxed mb-4">
                {site.name as string} is organized by {organizers[0]?.name || "Rotaract Club of JKKNIU"} as part of its commitment to
                fostering leadership, innovation, and sustainable thinking among university students.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted leading-relaxed">
                The competition brings together the brightest minds from universities across Bangladesh,
                challenging them to develop strategic solutions that balance business viability with
                environmental and social responsibility.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp}>
                <SectionHeading label="Why CaseVerse?" title="Making an Impact" align="left" />
              </motion.div>
              <motion.p variants={fadeUp} className="text-muted leading-relaxed mb-4">
                In a world facing complex sustainability challenges, businesses need leaders who can think
                strategically about both profit and purpose. CaseVerse prepares students for exactly that.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted leading-relaxed">
                Participants gain real-world experience in business analysis, strategic planning, and
                sustainable innovation — skills that are increasingly valued in today's global marketplace.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Philosophy"
            title="Business + Sustainability + Real-World Impact"
          />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { title: "Business", desc: "Every solution must be commercially viable and strategically sound." },
              { title: "Sustainability", desc: "Solutions must align with at least one of the 8 target SDGs." },
              { title: "Real-World Impact", desc: "Proposals must demonstrate tangible, measurable impact." },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-surface border border-border text-center"
              >
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Participants Gain */}
      <section className="py-20 lg:py-28 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Benefits"
            title="What Participants Gain"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              "Real-world case analysis experience",
              "National-level networking opportunities",
              "Sustainability-focused business thinking",
              "Professional development and mentorship",
              "Team leadership and collaboration skills",
              "Exposure to industry judges and experts",
              "Platform to showcase innovation",
              "Certificates and recognition",
            ].map((benefit) => (
              <div key={benefit} className="p-4 rounded-xl bg-bg border border-border">
                <p className="text-sm text-muted leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Join CaseVerse?"
        description="Form your team and register now to be part of Bangladesh's premier national case competition."
        primaryAction={{ label: "Register Your Team", path: "/register" }}
        secondaryAction={{ label: "Competition Details", path: "/competition" }}
      />
    </div>
  );
}
