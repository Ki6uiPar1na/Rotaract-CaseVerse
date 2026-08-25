export interface RegistrationDraft {
  teamName: string;
  university: string;
  leader: TeamMember;
  members: TeamMember[];
  contactEmail: string;
  contactPhone: string;
}

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
}

export interface RegistrationSubmission extends RegistrationDraft {
  registrationId: string;
  submittedAt: string;
  status: "pending" | "confirmed" | "rejected";
  round1Status: "locked" | "pending" | "submitted" | "reviewed";
  round2Status: "locked" | "pending" | "submitted" | "reviewed";
  grandFinaleStatus: "locked" | "pending" | "qualified" | "participated";
}
