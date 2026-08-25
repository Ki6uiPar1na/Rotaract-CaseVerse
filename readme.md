# MASTER DEVELOPMENT PROMPT — CASEVERSE 2026

## Role

You are a senior frontend architect, UI/UX designer, and React/TypeScript engineer.

Build a production-quality, highly polished, responsive frontend website for:

**CaseVerse: Where Strategy Meets Sustainability**
**CaseVerse National SDG-Aligned Case Competition 2026**

The event is organized by:

**Rotaract Club of Jatiya Kabi Kazi Nazrul Islam University (RAC JKKNIU)**

The website must feel like a **premium national-level business/case competition platform**, not a generic university club website.

The visual quality should be comparable to modern international competition, consulting, sustainability, startup, and university-event websites.

---

# 1. SOURCE OF TRUTH

Use the provided CaseVerse sponsorship proposal PDF as the primary source for event-specific information.

Do NOT invent:

* judges
* sponsors
* prize amounts
* finalist count
* competition rules
* registration fees
* dates not confirmed by the source
* contact information
* event requirements

If information is not available in the source, create an appropriate placeholder in the JSON data rather than inventing information.

The proposal establishes:

* CaseVerse is a National SDG-Aligned Case Competition.
* It brings together university students across Bangladesh.
* It focuses on strategic thinking, business innovation, and sustainable solutions.
* It is aligned with SDGs 3, 4, 6, 8, 9, 11, 12 and 13.
* The philosophy is Business + Sustainability + Real-World Impact.
* The competition consists of three rounds.
* Teams consist of 3–4 undergraduate students.
* Target registration is 200+ teams.
* Round 1 involves case solution submission.
* Round 1 requires a maximum 16-slide pitch deck and one-page executive summary.
* Round 2 involves a 3-minute Online Video Content submission.
* Round 3 is the Grand Finale involving live pitch presentation and FGD.
* The venue is Jatiya Kabi Kazi Nazrul Islam University, Trishal, Mymensingh.
* Official contact details are provided in the source document.

Important: the source contains an inconsistency regarding the number of Grand Finale teams: one section says 7 teams while another says 8 finalist teams. Do not silently choose one. Keep the value configurable in JSON and use a neutral placeholder until confirmed.

---

# 2. CURRENT PROJECT SCOPE

Build ONLY the frontend for now.

There is NO real backend yet.

All dynamic website content must come from local JSON files.

The architecture must be designed so that the JSON data layer can later be replaced by a REST API/database without rewriting the UI.

Current:

JSON → Data Service → React Components

Future:

API → Data Service → React Components

Do not tightly couple components to JSON imports.

---

# 3. TECH STACK

Use:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* shadcn/ui where appropriate
* Framer Motion for controlled animations
* Lucide React for icons

Use modern React patterns.

Prefer:

* functional components
* reusable components
* typed data
* composition
* reusable hooks
* clean separation of concerns

Avoid unnecessary dependencies.

---

# 4. PROJECT STRUCTURE

Create a clean architecture similar to:

src/

├── assets/

├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── competition/
│   ├── timeline/
│   ├── sponsors/
│   ├── judges/
│   ├── news/
│   ├── faq/
│   ├── registration/
│   └── footer/

├── data/
│   ├── site.json
│   ├── competition.json
│   ├── rounds.json
│   ├── timeline.json
│   ├── sponsors.json
│   ├── judges.json
│   ├── news.json
│   ├── faq.json
│   └── organizers.json

├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Competition.tsx
│   ├── RoundDetails.tsx
│   ├── Timeline.tsx
│   ├── Sponsors.tsx
│   ├── Judges.tsx
│   ├── News.tsx
│   ├── NewsDetails.tsx
│   ├── Results.tsx
│   ├── FAQ.tsx
│   ├── Contact.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── NotFound.tsx

├── hooks/
├── lib/
│   ├── data.ts
│   ├── utils.ts
│   └── constants.ts

├── types/
│   ├── competition.ts
│   ├── news.ts
│   ├── sponsor.ts
│   └── registration.ts

├── App.tsx
├── main.tsx
└── index.css

public/

├── images/
│   ├── branding/
│   ├── sponsors/
│   ├── judges/
│   ├── news/
│   └── gallery/
│
├── documents/
└── favicon/

---

# 5. DESIGN DIRECTION

The website must look:

* premium
* modern
* sophisticated
* minimal
* editorial
* trustworthy
* national-level
* business-oriented
* sustainability-oriented
* youthful but not childish

Visual inspiration should feel closer to:

* international case competitions
* consulting firms
* sustainability organizations
* premium university competitions
* modern startup/event platforms

Do NOT make it look like:

* a basic university club site
* a template landing page
* an overly colorful student event
* a generic SaaS dashboard
* an AI-generated-looking website

---

# 6. VISUAL LANGUAGE

Use a dark sophisticated base with sustainability-inspired accents.

Suggested starting palette:

Background:
#07110F

Surface:
#0D1A17

Primary:
#0E7C66

Accent:
#B8E986

Text:
#F5F7F5

Muted:
#9AA8A3

Border:
#1E302B

These are starting values. Create CSS variables so they can easily be changed later.

Use subtle gradients.

Use thin borders.

Use generous whitespace.

Use strong typography.

---

# 7. TYPOGRAPHY

Use:

Heading:
Space Grotesk

Body:
Inter

Create a strong typographic hierarchy.

Hero heading:
large and bold

Section headings:
strong but restrained

Body:
highly readable

Do not overuse uppercase text.

Use uppercase primarily for labels, metadata, and small section markers.

---

# 8. GLOBAL NAVIGATION

Desktop navbar:

CASEVERSE

Home
About
Competition
Timeline
News
Sponsors
FAQ
Contact

Primary CTA:

REGISTER NOW

Competition should have a dropdown:

Competition

* Overview
* Round 1
* Round 2 — OVC
* Grand Finale

Navbar requirements:

* sticky
* transparent over hero initially
* transitions to solid/glass background on scroll
* subtle border
* responsive
* mobile menu
* accessible keyboard navigation

---

# 9. HOME PAGE

Create a high-impact homepage.

## Hero

Display:

CASEVERSE 2026

WHERE STRATEGY
MEETS SUSTAINABILITY

National SDG-Aligned Case Competition

Primary CTA:
Register Your Team

Secondary CTA:
Explore Competition

Add a countdown component.

Countdown must be driven by JSON/configuration.

Do not hardcode countdown values.

Create subtle animated background elements:

* grid
* abstract geometric shapes
* soft gradient glow
* restrained motion

Avoid excessive particles.

---

# 10. EVENT STATISTICS

Create a premium statistics section.

Example:

200+
Target Teams

3
Competition Rounds

8
SDG Areas

1
Grand Finale

However, only display statistics that are confirmed or configurable in JSON.

Do not permanently hardcode the finalist count because the source document contains conflicting information.

---

# 11. ABOUT CASEVERSE

Create an editorial section explaining:

What is CaseVerse?

Why CaseVerse?

What participants gain.

Use the source's philosophy:

Business
+
Sustainability
+
Real-World Impact

Make this visually prominent.

Do not write fake marketing claims that are not supported by the event information.

---

# 12. SDG SECTION

Create a premium SDG section.

Display:

SDG 3
SDG 4
SDG 6
SDG 8
SDG 9
SDG 11
SDG 12
SDG 13

Each should be a reusable card.

Data must come from JSON.

Each card should support:

* SDG number
* title
* description
* icon/image
* optional link

Do not invent descriptions if they are not available.

---

# 13. COMPETITION JOURNEY

Create a visually impressive three-stage journey.

ROUND 01
Case Solution Submission

ROUND 02
Online Video Content

ROUND 03
Grand Finale

Use:

01 → 02 → 03

Each card should link to its detailed page.

Add scroll-triggered animations.

---

# 14. COMPETITION OVERVIEW PAGE

Route:

/competition

Include:

* overview
* eligibility
* team size
* target participation
* competition format
* three rounds
* judging information if confirmed
* venue
* important documents
* CTA

Create reusable information cards.

---

# 15. ROUND 1 PAGE

Route:

/competition/round-1

Title:

Case Solution Submission

Explain:

Pitch Deck:

* maximum 16 slides
* problem analysis
* proposed solution
* implementation strategy
* expected impact

Executive Summary:

* one page
* case overview
* key solution
* implementation approach
* anticipated outcomes

Add:

Submission Requirements
Important Dates
Guidelines
FAQ
CTA

All information must come from JSON.

---

# 16. ROUND 2 PAGE

Route:

/competition/round-2

Title:

Online Video Content

Display:

3-minute OVC

Include:

* case analysis
* proposed solution
* implementation strategy
* expected impact
* innovation
* execution plan

Add submission status UI.

Since there is no backend yet, use a mock/disabled submission interface.

Example:

Submission Portal
Coming Soon

Do not pretend a real upload exists.

---

# 17. GRAND FINALE PAGE

Route:

/competition/grand-finale

Create a premium final-event page.

Display:

Grand Finale

Venue:
Jatiya Kabi Kazi Nazrul Islam University
Trishal, Mymensingh

Include:

Live Pitch Presentation

*

Focus Group Discussion

Explain the FGD assessment areas:

* critical thinking
* problem solving
* collaboration
* strategic decision-making

Finalist count must remain configurable because of the source inconsistency.

---

# 18. TIMELINE PAGE

Route:

/timeline

Create a visually impressive responsive timeline.

Every timeline item should have:

* ID
* title
* description
* start date
* end date
* type
* status

Types:

pre-event
registration
round
finale

Desktop:
horizontal or alternating timeline.

Mobile:
vertical timeline.

Do not manually hardcode timeline elements inside JSX.

---

# 19. NEWS

Route:

/news

Create:

* featured news
* latest news
* category filter
* date
* search
* pagination/load-more if needed

News cards must be JSON-driven.

Each news article:

/news/:slug

Include:

* title
* category
* date
* author
* cover image
* content
* related articles
* social share buttons

---

# 20. ANNOUNCEMENTS

Treat announcements separately from editorial news when appropriate.

Examples:

Registration Open
Deadline Update
Case Released
Shortlist Published
Submission Open

Create a reusable announcement banner/component for the homepage.

---

# 21. SPONSORS

Route:

/sponsors

Create categories:

* Title Sponsor
* Gold Sponsor
* Silver Sponsor
* Media Partner
* Knowledge Partner
* Strategic Partner
* Supporting Organization

Only display categories that exist in JSON.

Do not create fake sponsors.

Use logo wall + premium cards.

Support:

* logo
* name
* category
* website
* description

---

# 22. JUDGES

Route:

/judges

Create professional profile cards.

Each judge:

* photo
* name
* designation
* organization
* bio
* LinkedIn if available

If no judges are confirmed, show a polished "Judges will be announced soon" state.

Do not fabricate names.

---

# 23. PRIZES

Create a prizes section/page.

If prize amounts are unavailable:

DO NOT invent them.

Show:

Prizes & Recognition

Champion
1st Runner-up
2nd Runner-up
Certificates
Special Recognition

Make the content configurable.

---

# 24. REGISTRATION PAGE

Route:

/register

Create a professional multi-step team registration interface.

Steps:

01
Team Information

02
Team Leader

03
Team Members

04
Review

05
Confirmation

Team structure:

* team name
* university
* team leader
* members
* contact information

Support 3–4 members.

Validate forms.

Show errors clearly.

Use React state/form management.

Since there is no backend:

* save draft to localStorage
* simulate submission
* generate mock registration ID
* show confirmation screen

Clearly structure the code so the submit function can later be replaced with an API request.

---

# 25. PARTICIPANT DASHBOARD

Route:

/dashboard

This is a frontend mock dashboard.

Show:

CaseVerse 2026

Team name

Registration ID

Registration status

Round 1 status

Round 2 status

Grand Finale status

Announcements

Documents

Team members

Create mock state using localStorage.

Example:

Registration
✓ Complete

Round 1
Pending

Round 2
Locked

Grand Finale
Locked

Do not implement real authentication yet.

---

# 26. RESULTS PAGE

Route:

/results

Before results:

Results will be announced after the Grand Finale.

After data becomes available:

* Champion
* Runner-up
* finalists
* category results if applicable

Everything JSON-driven.

---

# 27. FAQ

Route:

/faq

Create an accessible accordion.

Questions should come from JSON.

Do not invent policy information.

Use placeholder entries where information needs organizer confirmation.

---

# 28. CONTACT

Route:

/contact

Use only official contact information from the source.

Display:

Rotaract Club of Jatiya Kabi Kazi Nazrul Islam University

Jatiya Kabi Kazi Nazrul Islam University

Trishal, Mymensingh-2220, Bangladesh

Phone:
01626-845941

Email:
[rotaract.jkkniu@gmail.com](mailto:rotaract.jkkniu@gmail.com)

Website:
racjkkniu.club

Add:

* contact card
* email CTA
* phone CTA
* location
* map placeholder
* social links if provided later

---

# 29. FOOTER

Footer should include:

CaseVerse 2026

Where Strategy Meets Sustainability

Organized by:
Rotaract Club of JKKNIU

Navigation

Competition

Resources

Contact

Social links

Copyright

Privacy Policy
Terms & Conditions

Do not create fake social URLs.

---

# 30. JSON-FIRST ARCHITECTURE

All dynamic content must come from JSON.

Create:

site.json
competition.json
rounds.json
timeline.json
sponsors.json
judges.json
news.json
faq.json
organizers.json

Create typed interfaces for every JSON structure.

Example:

```ts
interface Sponsor {
  id: string;
  name: string;
  logo: string;
  category: string;
  website?: string;
  description?: string;
}
```

Create a centralized data service:

```ts
import site from "../data/site.json";
import competition from "../data/competition.json";
import rounds from "../data/rounds.json";
import timeline from "../data/timeline.json";
import sponsors from "../data/sponsors.json";
import judges from "../data/judges.json";
import news from "../data/news.json";
import faq from "../data/faq.json";

export const data = {
  site,
  competition,
  rounds,
  timeline,
  sponsors,
  judges,
  news,
  faq
};
```

Components should consume `data`, not import JSON files individually whenever possible.

---

# 31. JSON RULES

Every configurable value should live in JSON.

Examples:

* event name
* tagline
* dates
* registration deadline
* venue
* rounds
* sponsors
* judges
* news
* FAQ
* SDGs
* prizes
* statistics
* contact information
* navigation labels

Do NOT scatter event-specific strings throughout JSX.

---

# 32. COMPONENT SYSTEM

Create reusable components.

Examples:

Navbar
MobileMenu
Footer
SectionHeading
Hero
Countdown
StatCard
SDGCard
RoundCard
Timeline
TimelineItem
SponsorCard
SponsorGrid
JudgeCard
NewsCard
NewsGrid
FAQAccordion
CTASection
ContactCard
RegistrationStepper
TeamMemberForm
StatusCard
EmptyState
LoadingState
ErrorState

Components should be composable and reusable.

---

# 33. ANIMATION

Use Framer Motion.

Animations should be:

* subtle
* smooth
* intentional
* fast

Use:

* fade-in
* slide-up
* scale on hover
* staggered cards
* section reveal
* number animation
* navigation transition
* modal transition

Respect:

prefers-reduced-motion

Do not over-animate.

---

# 34. RESPONSIVENESS

Design mobile-first.

Support:

320px+
640px+
768px+
1024px+
1280px+
1536px+

The website must work perfectly on:

* mobile
* tablet
* laptop
* large desktop

Registration must be especially optimized for mobile.

---

# 35. PERFORMANCE

Prioritize smooth performance.

Implement:

* lazy-loaded images
* responsive image sizes
* WebP/AVIF where possible
* route-level code splitting
* optimized assets
* minimal dependencies
* no unnecessary re-renders
* no huge background videos
* lazy-loaded gallery
* optimized fonts

Avoid excessive animation.

---

# 36. ACCESSIBILITY

Implement:

* semantic HTML
* ARIA where necessary
* keyboard navigation
* visible focus states
* accessible forms
* proper labels
* alt text
* color contrast
* reduced-motion support
* screen-reader friendly navigation

---

# 37. SEO

Every route should have configurable:

* page title
* meta description
* Open Graph title
* Open Graph description
* Open Graph image

Example:

CaseVerse 2026 | National SDG-Aligned Case Competition

Create reusable SEO metadata handling.

---

# 38. ERROR / LOADING / EMPTY STATES

Every data-driven section must handle:

Loading
Error
Empty

Examples:

No sponsors yet.

Judges will be announced soon.

No news available.

Results will be announced after the Grand Finale.

Do not leave blank sections.

---

# 39. LOCAL STORAGE

For the frontend-only registration prototype:

Use localStorage for:

* registration draft
* mock registration
* participant dashboard state

Create a small storage utility.

Do not directly call localStorage from dozens of components.

Use:

```ts
storage.get()
storage.set()
storage.remove()
```

---

# 40. FUTURE BACKEND COMPATIBILITY

Create a service abstraction.

Current:

```ts
dataService.getCompetition()
dataService.getRounds()
dataService.getSponsors()
dataService.getNews()
```

Currently these read JSON.

Later they can become:

```ts
GET /api/competition
GET /api/rounds
GET /api/sponsors
GET /api/news
```

The React UI should not care where the data originates.

---

# 41. SECURITY MINDSET

Even though this is frontend-only:

* never expose secrets
* never put API keys in JSON
* never pretend client-side validation is secure
* sanitize rendered content where necessary
* don't store sensitive information unnecessarily

When backend integration happens later, all important validation must move server-side.

---

# 42. ROUTES

Implement:

/

/about

/competition

/competition/round-1

/competition/round-2

/competition/grand-finale

/timeline

/news

/news/:slug

/sponsors

/judges

/results

/prizes

/faq

/contact

/register

/dashboard

*

Create a polished 404 page.

---

# 43. DESIGN DETAILS

Use:

* rounded corners but not excessive
* subtle shadows
* thin borders
* large whitespace
* strong section rhythm
* asymmetric editorial layouts
* large typography
* image overlays
* elegant hover states
* subtle gradients

Avoid:

* excessive glassmorphism
* excessive rounded cards
* rainbow gradients
* generic purple AI aesthetic
* emoji-heavy UI
* excessive shadows

Use icons from Lucide instead of emoji for UI.

---

# 44. HOMEPAGE SECTION ORDER

Use this exact general structure:

1. Navbar
2. Hero
3. Event stats
4. About CaseVerse
5. Business + Sustainability + Real-World Impact
6. SDG alignment
7. Competition journey
8. Timeline preview
9. Why participate
10. Sponsors
11. Latest news
12. FAQ preview
13. Registration CTA
14. Contact
15. Footer

Make sections visually distinct.

---

# 45. CONTENT PHILOSOPHY

Use concise, professional copy.

Do not fill the website with huge paragraphs.

Use:

* strong headings
* short descriptions
* visual storytelling
* data
* cards
* timelines
* icons
* whitespace

The website should communicate quickly.

---

# 46. IMPORTANT SOURCE CONSISTENCY RULE

If the source document contains conflicting or unclear information:

DO NOT silently fix it.

Instead:

1. Make it configurable.
2. Use neutral wording where possible.
3. Add a TODO comment for organizer confirmation.
4. Never invent the missing value.

Known example:

Grand Finale finalist count is inconsistent in the source.

Keep:

```json
"finalistCount": null
```

until officially confirmed.

---

# 47. DEVELOPMENT QUALITY

Code must be:

* clean
* typed
* maintainable
* modular
* reusable
* readable
* production-oriented

Avoid:

* giant components
* duplicated JSX
* inline hardcoded content
* unnecessary state
* unnecessary useEffect
* prop drilling where avoidable
* magic numbers
* magic strings

---

# 48. README

Create a README explaining:

* project setup
* installation
* development
* build
* folder structure
* JSON data editing
* adding sponsors
* adding judges
* adding news
* modifying timeline
* modifying competition rounds
* changing colors
* future backend integration

Example:

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

# 49. DEVELOPMENT METHOD

Build the website incrementally.

Do NOT create a huge unstructured file in one shot.

Recommended order:

PHASE 1
Project setup + design system

PHASE 2
Global layout + navbar + footer

PHASE 3
Homepage

PHASE 4
Competition pages

PHASE 5
Timeline + news + sponsors + judges

PHASE 6
Registration prototype

PHASE 7
Participant dashboard

PHASE 8
SEO + accessibility + performance

PHASE 9
Final polish

After every phase:

* run the application
* check TypeScript
* check console errors
* check responsive layout
* fix issues before continuing

---

# 50. FINAL EXPECTATION

The final result should feel like a real national competition platform that could confidently be shown to:

* university students
* faculty
* corporate sponsors
* judges
* media partners
* organizers
* national participants

It should communicate:

STRATEGY

SUSTAINABILITY

INNOVATION

IMPACT

and the identity:

CASEVERSE 2026
Where Strategy Meets Sustainability

The site must be visually impressive without sacrificing usability, accessibility, responsiveness, performance, or maintainability.

Build the frontend as a **real production-quality application**, not a demo landing page.

Start by creating the project architecture and design system, then implement the website phase by phase. Do not skip the data architecture or responsive foundation.
