import { useState, useEffect } from "react";
import { Building2, Plus, Trash2, ExternalLink, Edit2 } from "lucide-react";
import { api } from "@/lib/api";
import { SPONSOR_CATEGORIES } from "@/lib/constants";
import type { Sponsor } from "@/types/sponsor";

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { api.sponsors.list().then(setSponsors).catch(() => {}); }, []);

  const handleAdd = async (data: Sponsor) => {
    await api.sponsors.create(data);
    setSponsors((prev) => [...prev, data]);
    setShowForm(false);
  };

  const handleUpdate = async (updated: Sponsor) => {
    await api.sponsors.update(updated.id, updated);
    setSponsors((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this sponsor?")) return;
    await api.sponsors.remove(id);
    setSponsors((prev) => prev.filter((s) => s.id !== id));
  };

  const grouped = SPONSOR_CATEGORIES.map((cat) => ({ ...cat, sponsors: sponsors.filter((s) => s.category === cat.key) })).filter((cat) => cat.sponsors.length > 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">Sponsors</h1>
          <p className="text-sm text-muted mt-1">{sponsors.length} sponsor{sponsors.length !== 1 && "s"}</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">
          <Plus className="w-4 h-4" /> Add Sponsor
        </button>
      </div>

      {(showForm || editing) && (
        <SponsorForm sponsor={editing} onSubmit={(editing ? handleUpdate : handleAdd) as (data: Sponsor) => void} onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}

      {grouped.length > 0 ? (
        <div className="space-y-8">
          {grouped.map((cat) => (
            <div key={cat.key}>
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">{cat.label}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="p-4 rounded-xl bg-surface border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        {sponsor.logo ? (<img src={sponsor.logo} alt={sponsor.name} className="w-10 h-10 rounded-lg object-contain bg-bg border border-border" />) : (
                          <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center"><Building2 className="w-5 h-5 text-muted" /></div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text truncate">{sponsor.name}</p>
                          {sponsor.website && (<a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-text flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Website</a>)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => { setEditing(sponsor); setShowForm(false); }} className="p-1.5 text-muted hover:text-text rounded-md hover:bg-surface-light transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(sponsor.id)} className="p-1.5 text-muted hover:text-danger rounded-md hover:bg-danger/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-xl bg-surface border border-border text-center">
          <Building2 className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-sm text-muted">No sponsors yet. Add one to get started.</p>
        </div>
      )}
    </div>
  );
}

function SponsorForm({ sponsor, onSubmit, onCancel }: { sponsor: Sponsor | null; onSubmit: (data: Sponsor) => void; onCancel: () => void }) {
  const [name, setName] = useState(sponsor?.name || "");
  const [logo, setLogo] = useState(sponsor?.logo || "");
  const [category, setCategory] = useState(sponsor?.category || "gold");
  const [website, setWebsite] = useState(sponsor?.website || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ id: sponsor?.id || `sponsor-${Date.now()}`, name: name.trim(), logo: logo.trim(), category, website: website.trim() || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-surface border border-border mb-6">
      <h3 className="font-heading text-lg font-bold text-text mb-4">{sponsor ? "Edit" : "Add"} Sponsor</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-medium text-muted mb-1.5">Name *</label><input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="Sponsor name" /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Logo URL</label><input value={logo} onChange={(e) => setLogo(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="https://..." /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary">
            {SPONSOR_CATEGORIES.map((cat) => (<option key={cat.key} value={cat.key}>{cat.label}</option>))}
          </select>
        </div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Website</label><input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="https://..." /></div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button type="submit" className="px-4 py-2 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">{sponsor ? "Update" : "Add"} Sponsor</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-muted hover:text-text transition-colors">Cancel</button>
      </div>
    </form>
  );
}
