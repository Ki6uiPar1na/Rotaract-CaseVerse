import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft, RotateCcw, Copy, Check } from "lucide-react";
import { generateId } from "@/lib/utils";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { api } from "@/lib/api";
import { useSeoMetadata } from "@/hooks/useSeoMetadata";
import type { RegistrationDraft, TeamMember, RegistrationSubmission } from "@/types/registration";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const steps = ["Team Info", "Team Leader", "Team Members", "Review", "Confirmation"];

const emptyMember: TeamMember = { name: "", email: "", phone: "", studentId: "", department: "", year: "" };

function InputField({ label, value, onChange, error, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm bg-bg border rounded-lg text-text placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors ${error ? "border-danger" : "border-border"}`}
      />
      {error && <p className="mt-1 text-xs text-danger flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [draft, setDraft] = useState<RegistrationDraft>(() => {
    return storage.get<RegistrationDraft>(STORAGE_KEYS.REGISTRATION_DRAFT) || {
      teamName: "",
      university: "",
      leader: { ...emptyMember },
      members: [{ ...emptyMember }],
      contactEmail: "",
      contactPhone: "",
    };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<RegistrationSubmission | null>(null);
  const [copied, setCopied] = useState(false);

  useSeoMetadata({
    title: "Register Your Team | CaseVerse 2026",
    description: "Register your team of 3–4 members for the CaseVerse 2026 national SDG-aligned case competition.",
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.REGISTRATION_DRAFT, draft);
  }, [draft]);

  const updateDraft = useCallback((updates: Partial<RegistrationDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateLeader = useCallback((updates: Partial<TeamMember>) => {
    setDraft((prev) => ({ ...prev, leader: { ...prev.leader, ...updates } }));
  }, []);

  const updateMember = useCallback((index: number, updates: Partial<TeamMember>) => {
    setDraft((prev) => ({
      ...prev,
      members: prev.members.map((m, i) => (i === index ? { ...m, ...updates } : m)),
    }));
  }, []);

  const addMember = useCallback(() => {
    setDraft((prev) => ({
      ...prev,
      members: [...prev.members, { ...emptyMember }],
    }));
  }, []);

  const removeMember = useCallback((index: number) => {
    setDraft((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!draft.teamName.trim()) newErrors.teamName = "Team name is required";
      if (!draft.university.trim()) newErrors.university = "University is required";
      if (!draft.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
      if (!draft.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required";
    } else if (step === 1) {
      if (!draft.leader.name.trim()) newErrors["leader.name"] = "Name is required";
      if (!draft.leader.email.trim()) newErrors["leader.email"] = "Email is required";
      if (!draft.leader.phone.trim()) newErrors["leader.phone"] = "Phone is required";
      if (!draft.leader.studentId.trim()) newErrors["leader.studentId"] = "Student ID is required";
    } else if (step === 2) {
      draft.members.forEach((member, i) => {
        if (!member.name.trim()) newErrors[`member${i}.name`] = "Name is required";
        if (!member.email.trim()) newErrors[`member${i}.email`] = "Email is required";
        if (!member.phone.trim()) newErrors[`member${i}.phone`] = "Phone is required";
        if (!member.studentId.trim()) newErrors[`member${i}.studentId`] = "Student ID is required";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const submission: RegistrationSubmission = {
      ...draft,
      registrationId: generateId(),
      submittedAt: new Date().toISOString(),
      status: "confirmed",
      round1Status: "pending",
      round2Status: "locked",
      grandFinaleStatus: "locked",
    };
    await api.registrations.create(submission);
    storage.remove(STORAGE_KEYS.REGISTRATION_DRAFT);
    setSubmitted(submission);
    setCurrentStep(4);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    storage.remove(STORAGE_KEYS.REGISTRATION_DRAFT);
    setDraft({
      teamName: "",
      university: "",
      leader: { ...emptyMember },
      members: [{ ...emptyMember }],
      contactEmail: "",
      contactPhone: "",
    });
    setSubmitted(null);
    setCurrentStep(0);
    setErrors({});
    setCopied(false);
  };

  const handleCopyId = () => {
    if (!submitted) return;
    navigator.clipboard.writeText(submitted.registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 min-h-screen">
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Registration</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text">Team Registration</h1>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12 max-w-lg mx-auto">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors ${
                  i < currentStep ? "bg-primary text-bg" :
                  i === currentStep ? "bg-primary text-bg" :
                  "bg-surface border border-border text-muted"
                }`}>
                  {i < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`hidden sm:block w-12 h-px mx-2 ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="hidden sm:flex justify-between max-w-lg mx-auto mb-8">
            {steps.map((step, i) => (
              <span key={step} className={`text-xs ${i === currentStep ? "text-primary font-medium" : "text-muted"}`}>{step}</span>
            ))}
          </div>

          {/* Form Steps */}
          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="p-6 md:p-8 rounded-2xl bg-surface border border-border"
          >
            {currentStep === 0 && (
              <div className="space-y-4">
                <h2 className="font-heading text-xl font-bold text-text mb-6">Team Information</h2>
                <InputField label="Team Name" value={draft.teamName} onChange={(v) => updateDraft({ teamName: v })} error={errors.teamName} placeholder="e.g. Sustainable Innovators" />
                <InputField label="University" value={draft.university} onChange={(v) => updateDraft({ university: v })} error={errors.university} placeholder="e.g. Jatiya Kabi Kazi Nazrul Islam University" />
                <InputField label="Contact Email" type="email" value={draft.contactEmail} onChange={(v) => updateDraft({ contactEmail: v })} error={errors.contactEmail} placeholder="team@example.com" />
                <InputField label="Contact Phone" type="tel" value={draft.contactPhone} onChange={(v) => updateDraft({ contactPhone: v })} error={errors.contactPhone} placeholder="01XXXXXXXXX" />
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="font-heading text-xl font-bold text-text mb-6">Team Leader</h2>
                <InputField label="Full Name" value={draft.leader.name} onChange={(v) => updateLeader({ name: v })} error={errors["leader.name"]} placeholder="Full name" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Email" type="email" value={draft.leader.email} onChange={(v) => updateLeader({ email: v })} error={errors["leader.email"]} placeholder="email@example.com" />
                  <InputField label="Phone" type="tel" value={draft.leader.phone} onChange={(v) => updateLeader({ phone: v })} error={errors["leader.phone"]} placeholder="01XXXXXXXXX" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <InputField label="Student ID" value={draft.leader.studentId} onChange={(v) => updateLeader({ studentId: v })} error={errors["leader.studentId"]} placeholder="Student ID" />
                  <InputField label="Department" value={draft.leader.department} onChange={(v) => updateLeader({ department: v })} placeholder="Department" />
                  <InputField label="Year" value={draft.leader.year} onChange={(v) => updateLeader({ year: v })} placeholder="e.g. 3rd Year" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl font-bold text-text">Team Members</h2>
                  {draft.members.length < 3 && (
                    <button onClick={addMember} className="text-xs font-medium text-primary hover:text-primary-hover transition-colors">+ Add Member</button>
                  )}
                </div>
                {draft.members.map((member, i) => (
                  <div key={i} className="p-4 rounded-xl bg-bg border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted uppercase tracking-wider">Member {i + 1}</span>
                      {draft.members.length > 1 && (
                        <button onClick={() => removeMember(i)} className="text-xs text-danger hover:text-red-400 transition-colors">Remove</button>
                      )}
                    </div>
                    <InputField label="Full Name" value={member.name} onChange={(v) => updateMember(i, { name: v })} error={errors[`member${i}.name`]} placeholder="Full name" />
                    <div className="grid sm:grid-cols-2 gap-3">
                      <InputField label="Email" type="email" value={member.email} onChange={(v) => updateMember(i, { email: v })} error={errors[`member${i}.email`]} placeholder="email@example.com" />
                      <InputField label="Phone" type="tel" value={member.phone} onChange={(v) => updateMember(i, { phone: v })} error={errors[`member${i}.phone`]} placeholder="01XXXXXXXXX" />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <InputField label="Student ID" value={member.studentId} onChange={(v) => updateMember(i, { studentId: v })} error={errors[`member${i}.studentId`]} placeholder="Student ID" />
                      <InputField label="Department" value={member.department} onChange={(v) => updateMember(i, { department: v })} placeholder="Department" />
                      <InputField label="Year" value={member.year} onChange={(v) => updateMember(i, { year: v })} placeholder="Year" />
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted">Minimum 3 members required (including team leader). Maximum 4.</p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-text mb-6">Review & Submit</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-bg border border-border">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Team Details</h3>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted">Team:</span> <span className="text-text">{draft.teamName}</span></div>
                      <div><span className="text-muted">University:</span> <span className="text-text">{draft.university}</span></div>
                      <div><span className="text-muted">Email:</span> <span className="text-text">{draft.contactEmail}</span></div>
                      <div><span className="text-muted">Phone:</span> <span className="text-text">{draft.contactPhone}</span></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-bg border border-border">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Team Leader</h3>
                    <p className="text-sm text-text">{draft.leader.name} — {draft.leader.email}</p>
                    <p className="text-xs text-muted mt-1">{draft.leader.studentId} | {draft.leader.department || "N/A"} | {draft.leader.year || "N/A"}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-bg border border-border">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Members ({draft.members.length})</h3>
                    {draft.members.map((m, i) => (
                      <p key={i} className="text-sm text-text">{m.name || `Member ${i + 1}`} — {m.email || "No email"}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && submitted && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-text">Registration Confirmed!</h2>
                <p className="mt-3 text-sm text-muted max-w-md mx-auto">
                  Your team has been successfully registered for CaseVerse 2026.
                </p>

                {/* Unique Code Box */}
                <div className="mt-6 p-5 rounded-xl bg-bg border border-primary/30 max-w-sm mx-auto">
                  <p className="text-xs text-muted uppercase tracking-wider font-medium mb-2">Your Unique Team Code</p>
                  <p className="font-heading text-xl font-bold text-primary break-all leading-relaxed">{submitted.registrationId}</p>
                  <button
                    onClick={handleCopyId}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-surface border border-border rounded-lg hover:border-primary/40 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                </div>

                <p className="mt-4 text-xs text-warning font-medium max-w-sm mx-auto">
                  Save this code! You'll need it to check your team's status later.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-surface border border-border max-w-sm mx-auto">
                  <div className="grid grid-cols-2 gap-3 text-left text-sm">
                    <div><span className="text-muted">Team:</span> <span className="text-text">{submitted.teamName}</span></div>
                    <div><span className="text-muted">University:</span> <span className="text-text">{submitted.university}</span></div>
                  </div>
                </div>

                <button onClick={handleReset} className="mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors">
                  <RotateCcw className="w-4 h-4" /> Register Another Team
                </button>
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {currentStep < 3 ? (
                <button onClick={handleNext} className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors">
                  Submit Registration <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
