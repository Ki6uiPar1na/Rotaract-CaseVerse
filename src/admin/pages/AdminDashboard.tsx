import { useState, useEffect } from "react";
import { Users, CheckCircle, Clock, AlertCircle, Building2, Trophy } from "lucide-react";
import { api } from "@/lib/api";
import type { RegistrationSubmission } from "@/types/registration";

function StatCard({ icon: Icon, label, value, color }: {
  icon: typeof Users; label: string; value: number | string; color: string;
}) {
  return (
    <div className="p-5 rounded-xl bg-surface border border-border">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5 text-text" />
      </div>
      <p className="font-heading text-2xl font-bold text-text">{value}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<RegistrationSubmission[]>([]);
  const [phasesCount, setPhasesCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);

  useEffect(() => {
    api.registrations.list().then(setSubmissions).catch(() => {});
    api.results.list().then((r) => { setPhasesCount(r.length); setPublishedCount(r.filter((p) => p.status === "published").length); }).catch(() => {});
  }, []);

  const confirmed = submissions.filter((s) => s.status === "confirmed").length;
  const pending = submissions.filter((s) => s.status === "pending").length;
  const latest = submissions.length > 0 ? submissions[0] : null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Welcome back. Here's an overview of CaseVerse 2026.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Registrations" value={submissions.length} color="bg-primary/10" />
        <StatCard icon={CheckCircle} label="Confirmed" value={confirmed} color="bg-success/10" />
        <StatCard icon={Clock} label="Pending" value={pending} color="bg-warning/10" />
        <StatCard icon={Trophy} label="Published Phases" value={`${publishedCount}/${phasesCount}`} color="bg-accent/10" />
      </div>

      {latest && (
        <div className="mt-8 p-6 rounded-xl bg-surface border border-border">
          <h2 className="font-heading text-lg font-bold text-text mb-4">Latest Registration</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><p className="text-xs text-muted">Team</p><p className="text-sm font-medium text-text">{latest.teamName}</p></div>
            <div><p className="text-xs text-muted">University</p><p className="text-sm font-medium text-text">{latest.university}</p></div>
            <div><p className="text-xs text-muted">Leader</p><p className="text-sm font-medium text-text">{latest.leader.name}</p></div>
            <div><p className="text-xs text-muted">Status</p>
              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${latest.status === "confirmed" ? "bg-success/10 text-success" : latest.status === "pending" ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger"}`}>{latest.status}</span>
            </div>
          </div>
        </div>
      )}

      {submissions.length === 0 && (
        <div className="mt-8 p-8 rounded-xl bg-surface border border-border text-center">
          <AlertCircle className="w-10 h-10 text-muted mx-auto mb-3 opacity-50" />
          <p className="text-sm text-muted">No registrations yet. Teams will appear here once they register.</p>
        </div>
      )}

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <a href="/admin/registrations" className="p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors">
          <Users className="w-5 h-5 text-primary mb-2" />
          <p className="text-sm font-medium text-text">Manage Registrations</p>
          <p className="text-xs text-muted mt-1">View and manage team registrations</p>
        </a>
        <a href="/admin/results" className="p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors">
          <Trophy className="w-5 h-5 text-primary mb-2" />
          <p className="text-sm font-medium text-text">Update Results</p>
          <p className="text-xs text-muted mt-1">Publish competition results</p>
        </a>
        <a href="/admin/news" className="p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors">
          <Building2 className="w-5 h-5 text-primary mb-2" />
          <p className="text-sm font-medium text-text">Manage Content</p>
          <p className="text-xs text-muted mt-1">News, sponsors, judges, and more</p>
        </a>
      </div>
    </div>
  );
}
