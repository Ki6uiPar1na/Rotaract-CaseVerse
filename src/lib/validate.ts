const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^01[3-9]\d{8}$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PHONE = 20;
const MAX_ID = 50;
const MAX_URL = 500;

export interface ValidationErrors {
  [key: string]: string;
}

function trim(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function email(v: string): string | undefined {
  if (!v) return "Email is required";
  if (v.length > MAX_EMAIL) return `Email must be at most ${MAX_EMAIL} characters`;
  if (!EMAIL_RE.test(v)) return "Invalid email format";
  return undefined;
}

function phone(v: string): string | undefined {
  if (!v) return "Phone is required";
  if (v.length > MAX_PHONE) return `Phone must be at most ${MAX_PHONE} characters`;
  if (!PHONE_RE.test(v)) return "Invalid phone (use 01XXXXXXXXX)";
  return undefined;
}

// ─── Registration ────────────────────────────────────────────────────
export function validateRegistration(d: Record<string, unknown>): ValidationErrors {
  const e: ValidationErrors = {};
  const t = (k: string) => trim(d[k]);

  const teamName = t("teamName");
  const university = t("university");
  const contactEmail = t("contactEmail");
  const contactPhone = t("contactPhone");

  if (!teamName) e.teamName = "Team name is required";
  else if (teamName.length > MAX_NAME) e.teamName = `Team name must be at most ${MAX_NAME} characters`;

  if (!university) e.university = "University is required";
  else if (university.length > MAX_NAME) e.university = `University must be at most ${MAX_NAME} characters`;

  const ce = email(contactEmail);
  if (ce) e.contactEmail = ce;

  const cp = phone(contactPhone);
  if (cp) e.contactPhone = cp;

  const leader = d.leader as Record<string, unknown> | undefined;
  if (leader) {
    const ln = trim(leader.name);
    const le = trim(leader.email);
    const lp = trim(leader.phone);
    const ls = trim(leader.studentId);
    if (!ln) e["leader.name"] = "Name is required";
    else if (ln.length > MAX_NAME) e["leader.name"] = `Name must be at most ${MAX_NAME} characters`;
    const leErr = email(le);
    if (leErr) e["leader.email"] = leErr;
    const lpErr = phone(lp);
    if (lpErr) e["leader.phone"] = lpErr;
    if (!ls) e["leader.studentId"] = "Student ID is required";
    else if (ls.length > MAX_ID) e["leader.studentId"] = `Student ID must be at most ${MAX_ID} characters`;
  }

  const members = d.members as Record<string, unknown>[] | undefined;
  if (Array.isArray(members)) {
    members.forEach((m, i) => {
      const mn = trim(m.name);
      const me = trim(m.email);
      const mp = trim(m.phone);
      const ms = trim(m.studentId);
      if (!mn) e[`member${i}.name`] = "Name is required";
      else if (mn.length > MAX_NAME) e[`member${i}.name`] = `Name must be at most ${MAX_NAME} characters`;
      const meErr = email(me);
      if (meErr) e[`member${i}.email`] = meErr;
      const mpErr = phone(mp);
      if (mpErr) e[`member${i}.phone`] = mpErr;
      if (!ms) e[`member${i}.studentId`] = "Student ID is required";
      else if (ms.length > MAX_ID) e[`member${i}.studentId`] = `Student ID must be at most ${MAX_ID} characters`;
    });
  }

  return e;
}

// ─── Sponsor ─────────────────────────────────────────────────────────
export function validateSponsor(d: Record<string, unknown>): ValidationErrors {
  const e: ValidationErrors = {};
  const name = trim(d.name);
  if (!name) e.name = "Name is required";
  else if (name.length > MAX_NAME) e.name = `Name must be at most ${MAX_NAME} characters`;

  const logo = trim(d.logo);
  if (logo && logo.length > MAX_URL) e.logo = `Logo URL must be at most ${MAX_URL} characters`;

  const website = trim(d.website);
  if (website && website.length > MAX_URL) e.website = `Website must be at most ${MAX_URL} characters`;

  const desc = trim(d.description);
  if (desc.length > 1000) e.description = "Description must be at most 1000 characters";

  const category = trim(d.category);
  if (!category) e.category = "Category is required";

  return e;
}

// ─── Judge ───────────────────────────────────────────────────────────
export function validateJudge(d: Record<string, unknown>): ValidationErrors {
  const e: ValidationErrors = {};
  const name = trim(d.name);
  if (!name) e.name = "Name is required";
  else if (name.length > MAX_NAME) e.name = `Name must be at most ${MAX_NAME} characters`;

  const photo = trim(d.photo);
  if (!photo) e.photo = "Photo URL is required";
  else if (photo.length > MAX_URL) e.photo = `Photo URL must be at most ${MAX_URL} characters`;

  const designation = trim(d.designation);
  if (!designation) e.designation = "Designation is required";
  else if (designation.length > MAX_NAME) e.designation = `Designation must be at most ${MAX_NAME} characters`;

  const organization = trim(d.organization);
  if (!organization) e.organization = "Organization is required";
  else if (organization.length > MAX_NAME) e.organization = `Organization must be at most ${MAX_NAME} characters`;

  const bio = trim(d.bio);
  if (!bio) e.bio = "Bio is required";
  else if (bio.length > 1000) e.bio = "Bio must be at most 1000 characters";

  const linkedin = trim(d.linkedin);
  if (linkedin && linkedin.length > MAX_URL) e.linkedin = `LinkedIn URL must be at most ${MAX_URL} characters`;

  return e;
}

// ─── News ────────────────────────────────────────────────────────────
export function validateNews(d: Record<string, unknown>): ValidationErrors {
  const e: ValidationErrors = {};
  const title = trim(d.title);
  if (!title) e.title = "Title is required";
  else if (title.length > MAX_NAME) e.title = `Title must be at most ${MAX_NAME} characters`;

  const slug = trim(d.slug);
  if (!slug) e.slug = "Slug is required";
  else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) e.slug = "Slug must be lowercase alphanumeric with hyphens";

  const excerpt = trim(d.excerpt);
  if (excerpt.length > 500) e.excerpt = "Excerpt must be at most 500 characters";

  const content = trim(d.content);
  if (!content) e.content = "Content is required";

  const image = trim(d.image);
  if (image && image.length > MAX_URL) e.image = `Image URL must be at most ${MAX_URL} characters`;

  const category = trim(d.category);
  if (!category) e.category = "Category is required";

  return e;
}

// ─── Result Entry ────────────────────────────────────────────────────
export function validateResultEntry(d: Record<string, unknown>): ValidationErrors {
  const e: ValidationErrors = {};
  const teamName = trim(d.teamName);
  if (!teamName) e.teamName = "Team name is required";
  else if (teamName.length > MAX_NAME) e.teamName = `Team name must be at most ${MAX_NAME} characters`;

  const university = trim(d.university);
  if (!university) e.university = "University is required";
  else if (university.length > MAX_NAME) e.university = `University must be at most ${MAX_NAME} characters`;

  return e;
}
