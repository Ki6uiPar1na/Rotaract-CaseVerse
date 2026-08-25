import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, Lock, Clock, Users, FileText, AlertCircle, Copy, Check } from "lucide-react";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import { api } from "@/lib/api";
import type { RegistrationSubmission } from "@/types/registration";

const statusConfig = {
  locked: { icon: Lock, color: "text-muted", bg: "bg-surface-light", label: "Locked" },
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10", label: "Pending" },
  submitted: { icon: FileText, color: "text-primary", bg: "bg-primary/10", label: "Submitted" },
  reviewed: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Reviewed" },
  qualified: { icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", label: "Qualified" },
  participated: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Participated" },
  complete: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Complete" },
};

function StatusCard({ label, status }: { label: string; status: string }) {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.locked;
  const Icon = config.icon;

  return (
    <div className="p-4 rounded-xl bg-bg border border-border flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text">{label}</p>
        <p className={`text-xs ${config.color} font-medium`}>{config.label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<RegistrationSubmission | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useSeoMetadata({
    title: "Check Team Status | CaseVerse 2026",
    description: "Enter your unique team code to check your registration status and competition progress.",
  });

  const handleLookup = async () => {
    setError("");
    setResult(null);

    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setError("Please enter your unique team code.");
      return;
    }

    try {
      const found = await api.registrations.get(trimmed);
      setResult(found);
    } catch {
      setError("No registration found for this code. Please check and try again.");
    }
  };

  const handleCopyId = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 min-h-screen">
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Dashboard</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text">Check Team Status</h1>
            <p className="mt-3 text-sm text-muted max-w-md mx-auto">
              Enter your unique team code to view your registration details and competition progress.
            </p>
          </motion.div>

          {/* Lookup Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-lg mx-auto">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">Unique Team Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                  placeholder="e.g. A1B2C3D4-E5F6-47G8-H9I0-JKLMNOPQRSTUV"
                  className="flex-1 px-4 py-3 text-sm bg-bg border border-border rounded-lg text-text placeholder:text-muted/40 focus:outline-none focus:border-primary transition-colors font-mono uppercase"
                />
                <button
                  onClick={handleLookup}
                  className="px-5 py-3 bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors shrink-0"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              {error && (
                <p className="mt-3 text-xs text-danger flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </p>
              )}
            </div>
          </motion.div>

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 space-y-6">
              {/* Team Info */}
              <div className="p-6 rounded-xl bg-surface border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text">{result.teamName}</h2>
                    <p className="text-sm text-muted mt-1">{result.university}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted mb-1">Team Code</p>
                    <p className="font-heading text-sm font-bold text-primary break-all">{result.registrationId}</p>
                    <button
                      onClick={handleCopyId}
                      className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted hover:text-text transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatusCard label="Registration" status={result.status === "confirmed" ? "complete" : result.status} />
                <StatusCard label="Round 1" status={result.round1Status} />
                <StatusCard label="Round 2" status={result.round2Status} />
                <StatusCard label="Grand Finale" status={result.grandFinaleStatus} />
              </div>

              {/* Team Members */}
              <div className="p-6 rounded-xl bg-surface border border-border">
                <h3 className="font-heading text-lg font-bold text-text mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Team Members
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-bg border border-border">
                    <p className="text-sm font-medium text-text">{result.leader.name} <span className="text-xs text-primary">(Leader)</span></p>
                    <p className="text-xs text-muted mt-1">{result.leader.email} | {result.leader.studentId}</p>
                  </div>
                  {result.members.map((member, i) => (
                    <div key={i} className="p-3 rounded-lg bg-bg border border-border">
                      <p className="text-sm font-medium text-text">{member.name || `Member ${i + 1}`}</p>
                      <p className="text-xs text-muted mt-1">{member.email || "No email"} | {member.studentId || "No ID"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements */}
              <div className="p-6 rounded-xl bg-surface border border-border">
                <h3 className="font-heading text-lg font-bold text-text mb-4">Announcements</h3>
                <p className="text-sm text-muted">No new announcements at this time.</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
