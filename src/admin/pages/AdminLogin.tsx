import { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    if (!onLogin(password)) {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-text">Admin Panel</h1>
          <p className="mt-2 text-sm text-muted">CaseVerse 2026 Management</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-surface border border-border">
          <div className="mb-4">
            <label className="block text-xs font-medium text-muted mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-3 py-2.5 pr-10 text-sm bg-bg border border-border rounded-lg text-text placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="mb-4 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
