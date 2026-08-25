import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { api } from "@/lib/api";
import type { ResultPhase, ResultEntry } from "@/types/result";

export default function AdminResults() {
  const [phases, setPhases] = useState<ResultPhase[]>([]);
  useEffect(() => { api.results.list().then(setPhases).catch(() => {}); }, []);

  const handleUpdate = async (updated: ResultPhase) => {
    await api.results.update(updated.id, updated);
    setPhases((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddEntry = (phaseId: string) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return;
    const newEntry: ResultEntry = { rank: phase.results.length + 1, teamName: "", university: "" };
    handleUpdate({ ...phase, results: [...phase.results, newEntry], status: "published" });
  };

  const handleUpdateEntry = (phaseId: string, index: number, entry: ResultEntry) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return;
    const results = [...phase.results];
    results[index] = entry;
    handleUpdate({ ...phase, results });
  };

  const handleDeleteEntry = (phaseId: string, index: number) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return;
    const results = phase.results.filter((_, i) => i !== index).map((r, i) => ({ ...r, rank: i + 1 }));
    handleUpdate({ ...phase, results });
  };

  const handleMoveEntry = (phaseId: string, index: number, direction: "up" | "down") => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return;
    const results = [...phase.results];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= results.length) return;
    [results[index], results[targetIndex]] = [results[targetIndex], results[index]];
    handleUpdate({ ...phase, results: results.map((r, i) => ({ ...r, rank: i + 1 })) });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">Results</h1>
        <p className="text-sm text-muted mt-1">Manage competition results for each phase.</p>
      </div>
      <div className="space-y-6">
        {phases.map((phase) => (
          <div key={phase.id} className="rounded-xl bg-surface border border-border overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 className="font-heading text-lg font-bold text-text">{phase.title}</h2>
                <p className="text-xs text-muted mt-0.5">{phase.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${phase.status === "published" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{phase.status}</span>
                <button onClick={() => handleUpdate({ ...phase, status: phase.status === "published" ? "upcoming" : "published" })} className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-muted hover:text-text hover:bg-surface-light transition-colors">Toggle Status</button>
              </div>
            </div>
            <div className="p-5">
              {phase.results.length > 0 ? (
                <div className="space-y-2">
                  {phase.results.map((entry, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-bg border border-border">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${entry.rank === 1 ? "bg-accent/20 text-accent" : entry.rank === 2 ? "bg-primary/20 text-primary" : entry.rank === 3 ? "bg-warning/20 text-warning" : "bg-surface-light text-muted"}`}>{entry.rank}</span>
                      <div className="flex-1 min-w-0 grid sm:grid-cols-2 gap-2">
                        <input value={entry.teamName} onChange={(e) => handleUpdateEntry(phase.id, i, { ...entry, teamName: e.target.value })} className="px-2 py-1.5 text-sm bg-surface border border-border rounded-md text-text focus:outline-none focus:border-primary" placeholder="Team name" />
                        <input value={entry.university} onChange={(e) => handleUpdateEntry(phase.id, i, { ...entry, university: e.target.value })} className="px-2 py-1.5 text-sm bg-surface border border-border rounded-md text-text focus:outline-none focus:border-primary" placeholder="University" />
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => handleMoveEntry(phase.id, i, "up")} disabled={i === 0} className="p-1 text-muted hover:text-text disabled:opacity-30 transition-colors"><ChevronUp className="w-4 h-4" /></button>
                        <button onClick={() => handleMoveEntry(phase.id, i, "down")} disabled={i === phase.results.length - 1} className="p-1 text-muted hover:text-text disabled:opacity-30 transition-colors"><ChevronDown className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteEntry(phase.id, i)} className="p-1 text-muted hover:text-danger transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (<p className="text-sm text-muted text-center py-4">No results yet.</p>)}
              <button onClick={() => handleAddEntry(phase.id)} className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"><Plus className="w-3.5 h-3.5" /> Add Entry</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
