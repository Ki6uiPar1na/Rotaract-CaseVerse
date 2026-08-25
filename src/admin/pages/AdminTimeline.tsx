import { useState, useEffect } from "react";
import { Calendar, Plus, Trash2, Edit2 } from "lucide-react";
import { api } from "@/lib/api";
import type { TimelineItem } from "@/types/timeline";

export default function AdminTimeline() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [editing, setEditing] = useState<TimelineItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { api.timeline.list().then(setItems).catch(() => {}); }, []);

  const handleAdd = async (data: TimelineItem) => {
    await api.timeline.create(data);
    setItems((prev) => [...prev, data]);
    setShowForm(false);
  };

  const handleUpdate = async (updated: TimelineItem) => {
    await api.timeline.update(updated.id, updated);
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this timeline item?")) return;
    await api.timeline.remove(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">Timeline</h1>
          <p className="text-sm text-muted mt-1">{items.length} milestone{items.length !== 1 && "s"}</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">
          <Plus className="w-4 h-4" /> Add Milestone
        </button>
      </div>

      {(showForm || editing) && (
        <TimelineForm item={editing} onSubmit={(editing ? handleUpdate : handleAdd) as (data: TimelineItem) => void} onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Calendar className="w-5 h-5 text-primary" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-text truncate">{item.title}</p>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-surface-light text-muted">{item.type}</span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  {new Date(item.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  {item.startDate !== item.endDate && (<> — {new Date(item.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</>)}
                </p>
                {item.description && <p className="text-xs text-muted mt-1 line-clamp-1">{item.description}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => { setEditing(item); setShowForm(false); }} className="p-2 text-muted hover:text-text rounded-md hover:bg-surface-light transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-muted hover:text-danger rounded-md hover:bg-danger/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-xl bg-surface border border-border text-center">
          <Calendar className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-sm text-muted">No timeline items yet.</p>
        </div>
      )}
    </div>
  );
}

function TimelineForm({ item, onSubmit, onCancel }: { item: TimelineItem | null; onSubmit: (data: TimelineItem) => void; onCancel: () => void }) {
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [type, setType] = useState(item?.type || "pre-event");
  const [startDate, setStartDate] = useState(item?.startDate?.split("T")[0] || "");
  const [endDate, setEndDate] = useState(item?.endDate?.split("T")[0] || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDate) return;
    onSubmit({ id: item?.id || `timeline-${Date.now()}`, title: title.trim(), description: description.trim(), type, startDate, endDate: endDate || startDate, status: item?.status || "upcoming" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-surface border border-border mb-6">
      <h3 className="font-heading text-lg font-bold text-text mb-4">{item ? "Edit" : "Add"} Milestone</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2"><label className="block text-xs font-medium text-muted mb-1.5">Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="Milestone title" /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as TimelineItem["type"])} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary">
            <option value="pre-event">Pre-Event</option><option value="registration">Registration</option><option value="round">Competition</option><option value="finale">Finale</option>
          </select>
        </div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">Start Date *</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" /></div>
        <div><label className="block text-xs font-medium text-muted mb-1.5">End Date</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" /></div>
        <div className="sm:col-span-2"><label className="block text-xs font-medium text-muted mb-1.5">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2.5 text-sm bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary resize-none" placeholder="Brief description..." /></div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button type="submit" className="px-4 py-2 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">{item ? "Update" : "Add"} Milestone</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-muted hover:text-text transition-colors">Cancel</button>
      </div>
    </form>
  );
}
