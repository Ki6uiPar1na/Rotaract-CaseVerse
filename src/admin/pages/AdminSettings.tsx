import { useState } from "react";
import { Key, Trash2, AlertCircle } from "lucide-react";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";

export default function AdminSettings() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    Object.values(STORAGE_KEYS).forEach((key) => storage.remove(key));
    storage.remove("caseverse_admin_sponsors");
    storage.remove("caseverse_admin_judges");
    storage.remove("caseverse_admin_news");
    storage.remove("caseverse_admin_results");
    storage.remove("caseverse_admin_timeline");
    setShowConfirm(false);
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage admin panel settings and data.</p>
      </div>

      {/* Admin Info */}
      <div className="p-6 rounded-xl bg-surface border border-border mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-lg font-bold text-text">Admin Credentials</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted">Password</p>
            <p className="text-sm font-medium text-text font-mono">caseverse2026</p>
          </div>
          <div>
            <p className="text-xs text-muted">Storage</p>
            <p className="text-sm font-medium text-text">TiDB Cloud (MySQL-compatible)</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted leading-relaxed">
          All data is stored in TiDB Cloud database. Data persists across all devices and sessions.
        </p>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-xl bg-surface border border-danger/30">
        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="w-5 h-5 text-danger" />
          <h2 className="font-heading text-lg font-bold text-text">Danger Zone</h2>
        </div>
        <p className="text-sm text-muted mb-4">
          Clear all application data including registrations, sponsors, judges, news, results, and timeline.
          This action cannot be undone.
        </p>

        {cleared && (
          <p className="mb-4 text-sm text-success flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> All data has been cleared.
          </p>
        )}

        {showConfirm ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-danger font-medium">Are you sure?</span>
            <button
              onClick={handleClearData}
              className="px-4 py-2 text-sm font-semibold bg-danger text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Yes, Clear All
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 text-sm text-muted hover:text-text transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 text-sm font-medium border border-danger/30 text-danger rounded-lg hover:bg-danger/10 transition-colors"
          >
            Clear All Data
          </button>
        )}
      </div>
    </div>
  );
}
