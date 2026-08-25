import { useState, useEffect } from "react";
import { Users, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp, Mail, Phone, GraduationCap } from "lucide-react";
import { api } from "@/lib/api";
import type { RegistrationSubmission } from "@/types/registration";

export default function AdminRegistrations() {
  const [submissions, setSubmissions] = useState<RegistrationSubmission[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { api.registrations.list().then(setSubmissions).catch(() => {}); }, []);

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  const handleStatusUpdate = async (id: string, updates: Partial<RegistrationSubmission>) => {
    await api.registrations.update(id, updates);
    setSubmissions((prev) => prev.map((s) => s.registrationId === id ? { ...s, ...updates } : s));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">Registrations</h1>
        <p className="text-sm text-muted mt-1">View and manage team registrations.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <p className="font-heading text-2xl font-bold text-text">{submissions.length}</p>
          <p className="text-xs text-muted mt-1">Total</p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <p className="font-heading text-2xl font-bold text-success">{submissions.filter((s) => s.status === "confirmed").length}</p>
          <p className="text-xs text-muted mt-1">Confirmed</p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border text-center">
          <p className="font-heading text-2xl font-bold text-warning">{submissions.filter((s) => s.status === "pending").length}</p>
          <p className="text-xs text-muted mt-1">Pending</p>
        </div>
      </div>

      {submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((reg) => (
            <div key={reg.registrationId} className="rounded-xl bg-surface border border-border overflow-hidden">
              <button onClick={() => toggle(reg.registrationId)} className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-light transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${reg.status === "confirmed" ? "bg-success/10" : reg.status === "pending" ? "bg-warning/10" : "bg-danger/10"}`}>
                    {reg.status === "confirmed" ? <CheckCircle className="w-5 h-5 text-success" /> : reg.status === "pending" ? <Clock className="w-5 h-5 text-warning" /> : <AlertCircle className="w-5 h-5 text-danger" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-bold text-text truncate">{reg.teamName}</p>
                    <p className="text-xs text-muted truncate">{reg.university}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${reg.status === "confirmed" ? "bg-success/10 text-success" : reg.status === "pending" ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger"}`}>{reg.status}</span>
                  {expanded === reg.registrationId ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
                </div>
              </button>
              {expanded === reg.registrationId && (
                <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-bg border border-border">
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Team Details</h4>
                      <div className="space-y-1.5">
                        <p className="text-sm text-text break-all"><span className="text-muted">ID:</span> {reg.registrationId}</p>
                        <p className="text-sm text-text"><span className="text-muted">Team:</span> {reg.teamName}</p>
                        <p className="text-sm text-text"><span className="text-muted">University:</span> {reg.university}</p>
                        <p className="text-sm text-text flex items-center gap-1.5"><Mail className="w-3 h-3 text-muted" /> {reg.contactEmail}</p>
                        <p className="text-sm text-text flex items-center gap-1.5"><Phone className="w-3 h-3 text-muted" /> {reg.contactPhone}</p>
                        <p className="text-xs text-muted">Submitted: {new Date(reg.submittedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-bg border border-border">
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Team Leader</h4>
                      <div className="space-y-1.5">
                        <p className="text-sm font-medium text-text">{reg.leader.name}</p>
                        <p className="text-sm text-text flex items-center gap-1.5"><Mail className="w-3 h-3 text-muted" /> {reg.leader.email}</p>
                        <p className="text-sm text-text flex items-center gap-1.5"><Phone className="w-3 h-3 text-muted" /> {reg.leader.phone}</p>
                        <p className="text-sm text-text flex items-center gap-1.5"><GraduationCap className="w-3 h-3 text-muted" /> {reg.leader.studentId}</p>
                        {reg.leader.department && <p className="text-xs text-muted">Dept: {reg.leader.department}</p>}
                        {reg.leader.year && <p className="text-xs text-muted">Year: {reg.leader.year}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-bg border border-border">
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Members ({reg.members.length})</h4>
                    <div className="space-y-2">
                      {reg.members.map((m, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <span className="w-6 h-6 rounded-full bg-surface-light flex items-center justify-center text-xs text-muted font-medium">{i + 1}</span>
                          <span className="text-text">{m.name || `Member ${i + 1}`}</span>
                          <span className="text-muted">—</span>
                          <span className="text-muted">{m.email || "No email"}</span>
                          {m.studentId && <span className="text-muted hidden sm:inline">| {m.studentId}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Update Status</h4>
                      <select
                        value={reg.status}
                        onChange={(e) => handleStatusUpdate(reg.registrationId, { status: e.target.value as RegistrationSubmission["status"] })}
                        className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-lg text-text"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Round 1</h4>
                      <select
                        value={reg.round1Status}
                        onChange={(e) => handleStatusUpdate(reg.registrationId, { round1Status: e.target.value as RegistrationSubmission["round1Status"] })}
                        className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-lg text-text"
                      >
                        <option value="locked">Locked</option>
                        <option value="pending">Pending</option>
                        <option value="submitted">Submitted</option>
                        <option value="reviewed">Reviewed</option>
                      </select>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Round 2</h4>
                      <select
                        value={reg.round2Status}
                        onChange={(e) => handleStatusUpdate(reg.registrationId, { round2Status: e.target.value as RegistrationSubmission["round2Status"] })}
                        className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-lg text-text"
                      >
                        <option value="locked">Locked</option>
                        <option value="pending">Pending</option>
                        <option value="submitted">Submitted</option>
                        <option value="reviewed">Reviewed</option>
                      </select>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Grand Finale</h4>
                      <select
                        value={reg.grandFinaleStatus}
                        onChange={(e) => handleStatusUpdate(reg.registrationId, { grandFinaleStatus: e.target.value as RegistrationSubmission["grandFinaleStatus"] })}
                        className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-lg text-text"
                      >
                        <option value="locked">Locked</option>
                        <option value="pending">Pending</option>
                        <option value="qualified">Qualified</option>
                        <option value="participated">Participated</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-xl bg-surface border border-border text-center">
          <Users className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-sm text-muted font-medium">No registrations yet</p>
          <p className="text-xs text-muted mt-1">Team registrations will appear here.</p>
        </div>
      )}
    </div>
  );
}
