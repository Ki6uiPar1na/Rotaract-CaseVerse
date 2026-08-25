import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Share2, ExternalLink } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import EmptyState from "@/components/ui/EmptyState";
import { api } from "@/lib/api";
import type { NewsArticle } from "@/types/news";

export default function NewsDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      api.news.get(slug).then(setArticle).catch(() => setNotFound(true));
      api.news.list().then(setAllNews).catch(() => {});
    }
  }, [slug]);

  if (notFound || (!article && allNews.length > 0)) {
    return <div className="pt-24"><EmptyState title="Article Not Found" description="The news article you're looking for doesn't exist." /></div>;
  }
  if (!article) return <div className="pt-24"><div className="py-20 text-center text-muted">Loading...</div></div>;

  const related = allNews.filter((n) => n.id !== article.id).slice(0, 3);
  const handleShare = () => { if (navigator.share) { navigator.share({ title: article.title, text: article.excerpt, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); } };

  return (
    <div className="pt-24">
      <article className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-8"><ArrowLeft className="w-4 h-4" /> Back to News</Link>
            {article.coverImage && (
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{article.category}</span>
              <span className="text-xs text-muted hidden sm:inline">|</span>
              <span className="flex items-center gap-1 text-xs text-muted"><Calendar className="w-3 h-3" />{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="text-xs text-muted hidden sm:inline">|</span>
              <span className="flex items-center gap-1 text-xs text-muted"><User className="w-3 h-3" /> {article.author}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text leading-tight">{article.title}</h1>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-surface border border-border rounded-lg text-muted hover:text-text transition-colors"><Share2 className="w-3.5 h-3.5" /> Share</button>
              {article.linkUrl && (<a href={article.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-colors"><ExternalLink className="w-3.5 h-3.5" /> Visit Link</a>)}
            </div>
            <div className="mt-10 prose prose-invert max-w-none">
              {article.contentFormat === "markdown" ? (
                <Markdown remarkPlugins={[remarkGfm]} components={{
                  h1: ({ children }) => <h1 className="font-heading text-3xl font-bold text-text mt-8 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="font-heading text-2xl font-bold text-text mt-8 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="font-heading text-xl font-semibold text-text mt-6 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="text-muted leading-relaxed mb-4">{children}</p>,
                  strong: ({ children }) => <strong className="text-text font-semibold">{children}</strong>,
                  em: ({ children }) => <em className="text-primary">{children}</em>,
                  a: ({ href, children }) => (<a href={href} className="text-primary hover:text-primary-hover underline underline-offset-2 transition-colors">{children}</a>),
                  ul: ({ children }) => <ul className="list-disc list-inside text-muted mb-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside text-muted mb-4 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  blockquote: ({ children }) => (<blockquote className="border-l-4 border-primary/30 pl-4 py-2 my-4 text-muted italic bg-primary/5 rounded-r-lg">{children}</blockquote>),
                  table: ({ children }) => (<div className="overflow-x-auto my-6"><table className="w-full text-sm text-left">{children}</table></div>),
                  thead: ({ children }) => <thead className="border-b border-border">{children}</thead>,
                  th: ({ children }) => <th className="px-4 py-2 font-heading font-semibold text-text">{children}</th>,
                  td: ({ children }) => <td className="px-4 py-2 text-muted border-b border-border/50">{children}</td>,
                  hr: () => <hr className="my-8 border-border" />,
                  code: ({ children }) => <code className="px-1.5 py-0.5 rounded bg-surface-light text-primary text-sm">{children}</code>,
                }}>{article.content}</Markdown>
              ) : (
                article.content.split("\n\n").map((para, i) => (<p key={i} className="text-muted leading-relaxed mb-4">{para}</p>))
              )}
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (<span key={tag} className="px-3 py-1 text-xs bg-surface border border-border rounded-full text-muted">#{tag}</span>))}
              </div>
            )}
          </motion.div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="py-16 bg-surface/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-text mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link key={item.id} to={`/news/${item.slug}`} className="group p-5 rounded-xl bg-bg border border-border hover:border-primary/30 transition-colors">
                  {item.coverImage && (<div className="h-32 -m-5 mb-4 overflow-hidden rounded-t-xl"><img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" loading="lazy" /></div>)}
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{item.category}</span>
                  <h3 className="mt-2 font-heading text-base font-semibold text-text group-hover:text-primary transition-colors leading-snug">{item.title}</h3>
                  <p className="mt-2 text-xs text-muted line-clamp-2">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
