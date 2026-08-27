import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Layers, Target, Trophy, Calendar, Newspaper, HelpCircle, ChevronRight, Building2, Mail, Phone } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { getSite, getTimeline, getNews, getFaq, getSponsors } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";
import EmptyState from "@/components/ui/EmptyState";
import type { TimelineItem } from "@/types/timeline";
import type { NewsArticle } from "@/types/news";
import type { Sponsor } from "@/types/sponsor";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function CountdownTimer({ target }: { target: string }) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs text-muted uppercase tracking-wider mt-1">{unit.label}</span>
          </div>
          {i < units.length - 1 && (
            <span className="text-2xl text-border font-light mb-5">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [site, setSite] = useState<Record<string, unknown> | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    Promise.all([getSite(), getTimeline(), getNews(), getFaq(), getSponsors()])
      .then(([s, t, n, f, sp]) => {
        setSite(s);
        setTimeline(t);
        setNews(n);
        setFaq(f);
        setSponsors(sp);
      });
  }, []);

  useSeoMetadata({
    title: "CaseVerse 2026 | National SDG-Aligned Case Competition",
    description: "Where Strategy Meets Sustainability. Join Bangladesh's premier national case competition.",
    ogTitle: "CaseVerse 2026 — Where Strategy Meets Sustainability",
    ogDescription: "National SDG-Aligned Case Competition organized by Rotaract Club of JKKNIU.",
  });

  if (!site) return null;

  const stats = (site.stats || []) as { value: string; label: string }[];
  const sdgs = (site.sdgs || []) as { id: number; title: string; description: string }[];
  const venue = site.venue as { name: string; address: string };
  const contact = site.contact as { email: string; phone: string };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[500px] lg:h-[800px] rounded-full bg-primary/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6 border border-primary/20 px-4 py-2 rounded-full">
                {site.subtitle as string}
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-center">
              <img src="/event-logo.png" alt="CaseVerse 2026" className="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-36 w-auto" />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <CountdownTimer target={site.countdownTarget as string} />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors w-full sm:w-auto"
              >
                Register Your Team
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/competition"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold border border-border text-text rounded-lg hover:bg-surface-light transition-colors w-full sm:w-auto"
              >
                Explore Competition
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center p-6 rounded-xl bg-surface border border-border"
              >
                <span className="font-heading text-3xl lg:text-4xl font-bold text-primary">
                  {stat.value}
                </span>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <SectionHeading
                  label="About CaseVerse"
                  title="Strategy. Sustainability. Impact."
                  align="left"
                  className="mb-6"
                />
              </motion.div>
              <motion.p variants={fadeUp} className="text-muted leading-relaxed mb-6">
                CaseVerse is a national SDG-aligned case competition that brings together university students
                from across Bangladesh to tackle real-world business challenges through the lens of sustainability.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted leading-relaxed mb-8">
                Teams of 3–4 undergraduate students compete across three rounds, developing strategic solutions
                that balance business viability with environmental and social responsibility.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                {["Business", "Sustainability", "Real-World Impact"].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Target, title: "Strategic Thinking", desc: "Analyze complex business cases" },
                { icon: Layers, title: "Sustainable Solutions", desc: "Align with global SDGs" },
                { icon: Users, title: "Team Collaboration", desc: "Work in teams of 3–4" },
                { icon: Trophy, title: "National Platform", desc: "Compete at the highest level" },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="p-5 rounded-xl bg-surface border border-border"
                >
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading text-sm font-semibold text-text">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section className="py-20 lg:py-28 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="SDG Alignment"
            title="Aligned with the Global Goals"
            description="Solutions must demonstrate alignment with at least one of these 8 Sustainable Development Goals."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {sdgs.map((sdg) => (
              <motion.div
                key={sdg.id}
                variants={fadeUp}
                className="group p-5 rounded-xl bg-bg border border-border hover:border-primary/30 transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  SDG {sdg.id}
                </span>
                <h3 className="mt-2 font-heading text-sm font-semibold text-text leading-snug">
                  {sdg.title}
                </h3>
                <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
                  {sdg.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Competition Journey */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Competition Journey"
            title="Three Rounds to Victory"
            description="From case analysis to live pitch — a journey that tests your strategic thinking and innovation."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                num: "01",
                title: "Case Solution",
                subtitle: "Pitch Deck + Executive Summary",
                desc: "Analyze the case and submit a comprehensive 16-slide pitch deck with a one-page executive summary.",
                link: "/competition/round-1",
              },
              {
                num: "02",
                title: "Online Video Content",
                subtitle: "3-Minute OVC",
                desc: "Create a compelling 3-minute video presenting your solution to a broader audience.",
                link: "/competition/round-2",
              },
              {
                num: "03",
                title: "Grand Finale",
                subtitle: "Live Pitch + FGD",
                desc: "Present your solution live before judges, followed by a Focus Group Discussion.",
                link: "/competition/grand-finale",
              },
            ].map((round) => (
              <motion.div key={round.num} variants={fadeUp}>
                <Link
                  to={round.link}
                  className="group block p-8 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 h-full"
                >
                  <span className="font-heading text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {round.num}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-text">
                    {round.title}
                  </h3>
                  <p className="mt-1 text-sm text-primary font-medium">{round.subtitle}</p>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{round.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="py-20 lg:py-28 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Timeline"
            title="Key Dates"
            description="Stay on track with important milestones throughout the competition."
          />
          <div className="space-y-4 max-w-3xl mx-auto">
            {timeline.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-bg border border-border"
              >
                <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-sm font-semibold text-text">{item.title}</h4>
                  <p className="text-xs text-muted mt-1 line-clamp-1">{item.description}</p>
                </div>
                <span className="text-xs text-muted whitespace-nowrap">
                  {new Date(item.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              View Full Timeline <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Partners"
            title="Sponsors & Partners"
          />
          {sponsors.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-8">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="w-40 h-20 rounded-xl bg-surface border border-border flex items-center justify-center"
                >
                  <span className="text-sm text-muted font-medium">{sponsor.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Sponsors Coming Soon"
              description="We're inviting partners to join CaseVerse 2026. Sponsorship opportunities are available."
              icon={<Building2 className="w-8 h-8 text-muted" />}
            />
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 lg:py-28 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="News"
            title="Latest Updates"
            description="Stay informed about CaseVerse 2026 announcements and developments."
          />
          {news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  to={`/news/${article.slug}`}
                  className="group p-6 rounded-xl bg-bg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted">
                      {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No News Yet"
              description="Check back soon for the latest CaseVerse 2026 announcements."
              icon={<Newspaper className="w-8 h-8 text-muted" />}
            />
          )}
          {news.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
              >
                View All News <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
          />
          <div className="space-y-3">
            {faq.slice(0, 5).map((item, index) => (
              <details
                key={index}
                className="group p-5 rounded-xl bg-surface border border-border"
              >
                <summary className="flex items-center justify-between cursor-pointer font-heading text-sm font-semibold text-text list-none">
                  {item.question}
                  <HelpCircle className="w-4 h-4 text-muted shrink-0 ml-4 group-open:text-primary transition-colors" />
                </summary>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <CTASection
        title="Ready to Compete?"
        description="Form your team of 3–4 members and register for CaseVerse 2026. Showcase your strategic thinking and sustainable innovation on a national platform."
        primaryAction={{ label: "Register Your Team", path: "/register" }}
        secondaryAction={{ label: "Learn More", path: "/competition" }}
      />

      {/* Contact */}
      <section className="py-20 lg:py-28 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Contact"
            title="Get in Touch"
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-bg border border-border text-center">
              <Building2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-sm font-semibold text-text">Location</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                {venue.name}, {venue.address}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-bg border border-border text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-sm font-semibold text-text">Email</h3>
              <a href={`mailto:${contact.email}`} className="mt-2 text-xs text-muted hover:text-text transition-colors block">
                {contact.email}
              </a>
            </div>
            <div className="p-6 rounded-xl bg-bg border border-border text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-sm font-semibold text-text">Phone</h3>
              <a href={`tel:${contact.phone}`} className="mt-2 text-xs text-muted hover:text-text transition-colors block">
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
