# DIGITALAB NG (NIGERIA'S INTERACTIVE DIGITAL SCIENCE LABORATORY)

[![Build Status](https://img.shields.io/badge/Build-Passing-27845B.svg)](https://github.com)
[![Framework](https://img.shields.io/badge/Next.js-14.2%20App%20Router-142B45.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-2867A8.svg)](https://www.typescriptlang.org)
[![Curriculum](https://img.shields.io/badge/Curriculum-WAEC%20%7C%20NECO%20%7C%20JAMB-168A83.svg)](https://waeconline.org.ng)

**Digitalab NG** is an interactive digital science laboratory designed to make high-quality, practical science education accessible to secondary school students throughout Nigeria (Senior Secondary 1–3) across **Physics**, **Chemistry**, and **Biology**.

The platform provides precision virtual apparatus benches, mathematically accurate simulation engines, a digital laboratory notebook, and a complete instructor grading studio equipped with the standard 8-part WAEC/NECO practical evaluation rubric.

---

## 🔬 Core System Architecture & Highlights

### 1. The Three Subject Science Laboratories
- **Physics Laboratory**:
  - **Simple Harmonic Motion & Pendulum**: Interactive canvas animation with real string length slider ($0.2\,\text{m}$ to $1.2\,\text{m}$), planetary gravity presets (Earth $9.81\,\text{m/s}^2$, Moon, Mars), digital stopwatch with lap timer, automated computation of $T$, $T^2$, and slope determination of $g = 4\pi^2 / S$.
  - **Ohm's Law & Circuit Lab**: Variable DC supply ($0.5\,\text{V} - 12\,\text{V}$), standard resistor wire, plug key switch, dual analog & digital ammeter and voltmeter readouts, verification of $V = IR$, and linear regression plot.
  - **Hooke's Law**: Helical spring, slotted masses, millimeter ruler pointer readings, spring constant calculation, and elastic limit protection.
  - **Optics & Focal Length**: Converging lens optical bench, illuminated object pin, real image formation, and lens formula calculations.
- **Chemistry Laboratory**:
  - **Standard Volumetric Analysis (Titration)**: $50.0\,\text{cm}^3$ precision glass burette with dropwise ($0.05\,\text{cm}^3$) and continuous stream dispense, conical flask with $25.0\,\text{cm}^3$ of base on white ceramic tile, indicator color transitions (Phenolphthalein pink $\rightarrow$ colorless; Methyl orange yellow $\rightarrow$ orange/red), automated concordant titre evaluation ($\pm0.10\,\text{cm}^3$), and stoichiometry concentration deductions ($C_A V_A / C_B V_B = a/b$).
  - **Reaction Kinetics**: Calcium carbonate and hydrochloric acid reaction, gas syringe collection, interval timing, and reaction rate curves.
  - **Qualitative Inorganic Analysis**: Systematic wet tests and flame tests for cations ($\text{Fe}^{2+}, \text{Fe}^{3+}, \text{Cu}^{2+}, \text{Zn}^{2+}, \text{NH}_4^+$) and anions ($\text{Cl}^-, \text{SO}_4^{2-}, \text{CO}_3^{2-}$).
- **Biology Laboratory**:
  - **Interactive Light Microscope**: Eyepiece ($10\times$), objective lenses ($4\times, 10\times, 40\times$), fine and coarse focus knobs with real optical depth-of-field blur rendering, substage light diaphragm, prepared slides (Plant Onion Epidermis, Human Cheek Epithelium, Spirogyra), and anatomical organelle labeling.
  - **Biochemical Food Tests**: Standard qualitative food tests: Iodine for starch, Benedict's test + water bath for reducing sugars, Biuret test for proteins, and ethanol emulsion test for lipids.
  - **Osmosis in Living Plant Tissue**: Graded sucrose concentrations, potato strip mass and length measurements, and turgor/flaccidity determination.

### 2. Teacher & Instructor Portal
- **Class Cohort Management**: Create SS1, SS2, and SS3 classes with auto-generated 6-character enrolment codes (e.g. `SS2-PHY-904`), student rosters, and search.
- **Practical Assignment Builder**: Target specific classes, set due dates and attempt limits, choose from curriculum experiments, and configure the 8-part grading rubric.
- **Dedicated 3-Column Practical Grading Studio**:
  - *Left*: Student identification, submission date, version/attempt history.
  - *Center*: Full student practical report (objective, apparatus, observation table, plotted graph, calculations, conclusions, and post-lab answers).
  - *Right*: Interactive rubric scoring with per-criterion marks and feedback, overall comments, real-time total calculation, automatic WAEC letter grade assignment (A to F), draft saving, and grade publication.
- **Performance Analytics & Marksheet Export**: Real score distribution bar charts, cohort diagnostics, at-risk alerts, and one-click CSV marksheet export.

### 3. Student Laboratory Notebook & Assessment Centre
- Auto-saving observation records and draft reports.
- Observation tables with dynamic calculation of derived variables ($T^2, g, R, C_A$).
- Recharts-powered linear regression and scatter graphs.
- Direct PDF / Print export of laboratory reports.
- Topic mastery tracking (Not Started, In Progress, Practising, Mastered).
- In-simulation **DigiTutor AI** for Socratic conceptual hints and safety reminders.

---

## 🚀 Instant Demo Accounts

The application includes pre-configured, realistic Nigerian secondary school demo accounts accessible via 1-click on the login page or with the following credentials:

| Role | Email | Password | Name & Context |
|---|---|---|---|
| **Demo Student** | `student@digitalab.ng` | *(any or empty in demo mode)* | **Chioma Adeleke** (SS2 Science, King's College Lagos, ID: `DLAB-SS2-2026-042`) |
| **Demo Teacher** | `teacher@digitalab.ng` | *(any or empty in demo mode)* | **Mr. Babatunde Okafor** (Senior Science Master & HOD, King's College Lagos) |

Additional sample students enrolled:
- **Emeka Nwosu** (`emeka.nwosu@student.ng` - SS2, submission awaiting grading in Teacher Portal)
- **Amina Bello** (`amina.bello@student.ng` - SS2, Queen's College Yaba, titration submission awaiting grading)
- **Tunde Bakare** (`tunde.bakare@student.ng` - SS1, King's College Lagos)

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 App Router, TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom scientific palette (`#142B45`, `#0D1B2A`, `#2867A8`, `#168A83`, `#27845B`, `#F5F7FA`)
- **Icons**: Lucide React
- **Visuals & Charts**: HTML5 Canvas animation, SVG apparatus models, Recharts
- **Database & Data Layer**:
  - Remote: Supabase PostgreSQL (`supabase/migrations/001_initial_schema.sql` with full RLS)
  - Local / Demo: Typed In-Memory & LocalStorage Repository Adapter (`src/lib/repository/index.ts`) providing 100% full CRUD operations without requiring an active database connection
- **Validation**: Zod
- **Testing**: Vitest (`src/test/*.test.ts`)

---

## 📦 Setup & Installation Instructions

### Prerequisites
- Node.js (v18.17.0 or later, v20+ recommended)
- npm or pnpm

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd digitalab-ng
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Note: Supabase credentials are optional for local demo mode. If omitted, the local repository adapter automatically provides full persistence and seed data!)*

### 3. Run Automated Tests
```bash
npm test
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## ☁️ Deployment Instructions for Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `digitalab-ng` repository.
4. Framework preset will automatically be detected as **Next.js**.
5. Set environment variables (optional for live Supabase):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY` (optional for live AI provider)
6. Click **Deploy**. Your application will build and deploy in under 2 minutes.

---

## 📊 Database Schema & Row-Level Security (RLS)

The database schema is fully defined in `supabase/migrations/001_initial_schema.sql` and seeded in `supabase/seed.sql`:
- `profiles`: User roles (`student` vs `teacher`), school name, class level, student ID.
- `subjects`: Physics, Chemistry, Biology.
- `topics`: Senior secondary curriculum topics with learning objectives.
- `experiments`: Apparatus lists, procedures, safety instructions, simulation types.
- `classes`: Teacher classes with unique 6-character enrolment codes.
- `class_members`: Student class enrolment records.
- `assignments`: Practical assignments with due dates, attempt limits, and 8-part rubrics.
- `submissions`: Student observation tables, calculated values, and reports.
- `grades` & `grade_items`: Teacher rubric marks, per-criterion feedback, total scores, and grade bands.
- `notifications`: Real in-app alerts for assignments and published grades.
- `curriculum_progress`: Student topic mastery levels (Not Started, In Progress, Practising, Mastered).

---

## 🧪 Automated Test Suite

Vitest automated test files in `src/test/`:
- `simulations.test.ts`: Validates pendulum gravity formulas ($T = 2\pi\sqrt{L/g}$ and $g = 4\pi^2 L / T^2$), Ohm's law ($I = V/R$), titration stoichiometry ($C_A = C_B V_B / V_A$), and microscope optical magnification.
- `repository.test.ts`: Validates demo student and teacher retrieval, experiment listing, grade band categorization ($A, B, C, D, E, F$), and rubric submission grading.
- `security.test.ts`: Validates class enrolment code enforcement, role boundaries, and report version incrementing.

---

## 🏆 Aligned with Nigerian Examination Standards
Developed with meticulous attention to Nigerian educational realities, secondary school laboratory equipment shortages, and examination board requirements (WAEC, NECO, and JAMB UTME practical components).
