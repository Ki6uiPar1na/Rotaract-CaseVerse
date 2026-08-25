import { useState, useEffect } from "react";
import { User, Plus, Trash2, Edit2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Judge } from "@/types/judge";

export default function AdminJudges() {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [editing, setEditing] = useState<Judge | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { api.judges.list().then(setJudges).catch(() => {}); }, []);

  const handleAdd = async (data: Judge) => {
    await api.judges.create(data);
    setJudges((prev) => [...prev, data]);
    setShowForm(false);
  };

  const handleUpdate = async (updated: Judge) => {
    await api.judges.update(updated.id, updated);
    setJudges((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this judge?")) return;
    await api.judges.remove(id);
    setJudges((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">Judges</h1>
          <p className="text-sm text-muted mt-1">{judges.length} judge{judges.length !== 1 && "s"}</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">
          <Plus className="w-4 h-4" /> Add Judge
        </button>
      </div>

      {(showForm || editing) && (
        <JudgeForm judge={editing} onSubmit={(editing ? handleUpdate : handleAdd) as (data: Judge) => void} onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}

      {judges.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {judges.map((judge) => (
            <div key={judge.id} className="p-5 rounded-xl bg-surface border border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center overflow-hidden shrink-0">
                    {judge.photo ? (<img src={judge.photo} alt={judge.name} className="w-full h-full object-cover" />) : (<User className="w-6 h-6 text-muted" />)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{judge.name}</p>
                    <p className="text-xs text-primary">{judge.designation}</p>
                    <p className="text-xs text-muted">{judge.organization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => { setEditing(judge); setShowForm(false); }} className="p-1.5 text-muted hover:text-text rounded-md hover:bg-surface-light transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(judge.id)} className="p-1.5 text-muted hover:text-danger rounded-md hover:bg-danger/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              {judge.bio && <p className="mt-3 text-xs text-muted leading-relaxed line-clamp-2">{judge.bio}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-xl bg-surface border border-border text-center">
          <User className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-sm text-muted">No judges yet. Add one to get started.</p>
        </div>
      )}
    </div>
  );
}

function JudgeForm({ judge, onSubmit, onCancel }: { judge: Judge | null; onSubmit: (data: Judge) => void; onCancel: () => void }) {
  const [name, setName] = useState(judge?.name || "");
  const [photo, setPhoto] = useState(judge?.photo || "");
  const [designation, setDesignation] = useState(judge?.designation || "");
  const [organization, setOrganization] = useState(judge?.organization || "");
  const [bio, setBio] = useState(judge?.bio || "");
  const [linkedin, setLinkedin] = useState(judge?.linkedin || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ id: judge?.id || `judge-${Date.now()}`, name: name.trim(), photo: photo.trim(), designation: designation.trim(), organization: organization.trim(), bio: bio.trim(), linkedin: linkedin.trim() || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-surface border border-border mb-6">
      <h3 className="font-heading text-lg font-bold text-text mb-4">{judge ? "Edit" : "Add"} Judge</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-medium text-muted mb-1.5">Name *</label><input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="Full name" /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Photo URL</label><input value={photo} onChange={(e) => setPhoto(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="https://..." /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Designation</label><input value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="e.g. Professor" /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Organization</label><input value={organization} onChange={(e) => setOrganization(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="University / Company" /></div>
        <div className="sm:col-span-2"><label className="block text-xs font-medium text-muted mb-1.5">Bio</label><textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary resize-none" placeholder="Short bio..." /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">LinkedIn URL</label><input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="https://linkedin.com/in/..." /></div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button type="submit" className="px-4 py-2 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">{judge ? "Update" : "Add"} Judge</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-muted hover:text-text transition-colors">Cancel</button>
      </div>
    </form>
  );
}
