import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Newspaper, ExternalLink } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { NEWS_CATEGORIES } from "@/lib/constants";
import { api } from "@/lib/api";
import newsData from "@/data/news.json";
import type { NewsArticle } from "@/types/news";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function News() {
  const [allNews, setAllNews] = useState<NewsArticle[]>(() => newsData as unknown as NewsArticle[]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => { api.news.list().then(setAllNews).catch(() => {}); }, []);

  const filtered = allNews.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      article.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">News</motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
              Latest Updates
            </motion.h1>
          </motion.div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-lg text-text placeholder:text-muted focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory("all")} className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${activeCategory === "all" ? "bg-primary text-bg" : "bg-surface border border-border text-muted hover:text-text"}`}>All</button>
              {NEWS_CATEGORIES.map((cat) => (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${activeCategory === cat.key ? "bg-primary text-bg" : "bg-surface border border-border text-muted hover:text-text"}`}>{cat.label}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => {
                const cardContent = (
                  <>
                    {article.coverImage && (
                      <div className="relative h-44 -m-6 mb-4 overflow-hidden rounded-t-xl">
                        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">{article.category}</span>
                      <span className="text-xs text-muted">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      {article.linkUrl && <ExternalLink className="w-3 h-3 text-muted" />}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-text group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{article.excerpt}</p>
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (<span key={tag} className="px-2 py-0.5 text-xs bg-surface-light rounded text-muted">#{tag}</span>))}
                      </div>
                    )}
                  </>
                );
                return (
                  <motion.div key={article.id} variants={fadeUp}>
                    {article.linkUrl ? (
                      <a href={article.linkUrl} target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors h-full">{cardContent}</a>
                    ) : (
                      <Link to={`/news/${article.slug}`} className="group block p-6 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors h-full">{cardContent}</Link>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <EmptyState title="No articles found" description="Try adjusting your search or filter criteria." icon={<Newspaper className="w-8 h-8 text-muted" />} />
          )}
        </div>
      </section>
    </div>
  );
}
