import { useState, useEffect } from "react";
import { Newspaper, Plus, Trash2, Edit2, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import { NEWS_CATEGORIES } from "@/lib/constants";
import type { NewsArticle } from "@/types/news";

export default function AdminNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { api.news.list().then(setArticles).catch(() => {}); }, []);

  const handleAdd = async (data: NewsArticle) => {
    await api.news.create(data);
    setArticles((prev) => [...prev, data]);
    setShowForm(false);
  };

  const handleUpdate = async (updated: NewsArticle) => {
    await api.news.update(updated.id, updated);
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await api.news.remove(id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">News</h1>
          <p className="text-sm text-muted mt-1">{articles.length} article{articles.length !== 1 && "s"}</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">
          <Plus className="w-4 h-4" /> Add Article
        </button>
      </div>

      {(showForm || editing) && (
        <NewsForm article={editing} onSubmit={(editing ? handleUpdate : handleAdd) as (data: NewsArticle) => void} onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}

      {articles.length > 0 ? (
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/20 transition-colors">
              {article.coverImage && (<img src={article.coverImage} alt="" className="w-16 h-12 rounded-lg object-cover shrink-0 hidden sm:block" />)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{article.category}</span>
                  {article.linkUrl && <ExternalLink className="w-3 h-3 text-muted" />}
                </div>
                <p className="text-sm font-medium text-text truncate">{article.title}</p>
                <p className="text-xs text-muted mt-0.5">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {article.author}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => { setEditing(article); setShowForm(false); }} className="p-2 text-muted hover:text-text rounded-md hover:bg-surface-light transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(article.id)} className="p-2 text-muted hover:text-danger rounded-md hover:bg-danger/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-xl bg-surface border border-border text-center">
          <Newspaper className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-sm text-muted">No articles yet. Add one to get started.</p>
        </div>
      )}
    </div>
  );
}

function NewsForm({ article, onSubmit, onCancel }: { article: NewsArticle | null; onSubmit: (data: NewsArticle) => void; onCancel: () => void }) {
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [category, setCategory] = useState(article?.category || "announcement");
  const [author, setAuthor] = useState(article?.author || "");
  const [coverImage, setCoverImage] = useState(article?.coverImage || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [content, setContent] = useState(article?.content || "");
  const [contentFormat, setContentFormat] = useState<"plain" | "markdown">(article?.contentFormat || "plain");
  const [tags, setTags] = useState(article?.tags?.join(", ") || "");
  const [linkUrl, setLinkUrl] = useState(article?.linkUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    onSubmit({ id: article?.id || `news-${Date.now()}`, title: title.trim(), slug: slug.trim(), category, date: article?.date || new Date().toISOString(), author: author.trim(), coverImage: coverImage.trim(), excerpt: excerpt.trim(), content: content.trim(), contentFormat, featured: article?.featured || false, tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [], linkUrl: linkUrl.trim() || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-surface border border-border mb-6">
      <h3 className="font-heading text-lg font-bold text-text mb-4">{article ? "Edit" : "Add"} Article</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-medium text-muted mb-1.5">Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="Article title" /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Slug *</label><input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="url-friendly-slug" /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary">
            {NEWS_CATEGORIES.map((cat) => <option key={cat.key} value={cat.key}>{cat.label}</option>)}
          </select>
        </div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Author</label><input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="Author name" /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Cover Image URL</label><input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="https://..." /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">External Link URL</label><input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="https://..." /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Content Format</label>
          <select value={contentFormat} onChange={(e) => setContentFormat(e.target.value as "plain" | "markdown")} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary">
            <option value="plain">Plain Text</option><option value="markdown">Markdown</option>
          </select>
        </div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Tags (comma separated)</label><input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="sdg, competition, update" /></div>
        <div className="sm:col-span-2"><label className="block text-xs font-medium text-muted mb-1.5">Excerpt</label><textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary resize-none" placeholder="Short summary..." /></div>
        <div className="sm:col-span-2"><label className="block text-xs font-medium text-muted mb-1.5">Content {contentFormat === "markdown" && "(Markdown)"}</label><textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary resize-y font-mono" placeholder="Article content..." /></div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button type="submit" className="px-4 py-2 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">{article ? "Update" : "Publish"} Article</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-muted hover:text-text transition-colors">Cancel</button>
      </div>
    </form>
  );
}
