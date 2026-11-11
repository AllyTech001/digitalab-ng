"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Atom,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FlaskConical,
  GraduationCap,
  Microscope,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  acidConcentration,
  demoStudent,
  demoStudents,
  demoTeacher,
  experiments,
  gradeBand,
  ohmsCurrent,
  pendulumPeriod,
  rubricCriteria,
  type Subject,
} from "@/lib/demo-data";

type Role = "student" | "teacher";
type PortalProps = { role: Role; section?: string };
type Assignment = { title: string; subject: Subject; due: string; className: string };
type GradeRecord = { [studentId: string]: { score: number; grade: string; comment: string } };
type NotebookDraft = { objective: string; conclusion: string };

const subjects: Subject[] = ["Physics", "Chemistry", "Biology"];
const subjectClass: Record<Subject, string> = {
  Physics: "physics",
  Chemistry: "chemistry",
  Biology: "biology",
};
const defaultAssignments: Assignment[] = [
  { title: "Simple harmonic motion", subject: "Physics", due: "Today, 4:00 PM", className: "SS2 Science" },
  { title: "Acid-base titration", subject: "Chemistry", due: "Tomorrow", className: "SS2 Science" },
  { title: "Cell structure and microscopy", subject: "Biology", due: "Fri, 14 Nov", className: "SS1 Biology" },
];
const defaultClasses = [
  { name: "SS2 Science", subject: "Physics · Chemistry · Biology", code: "SS2-PHY-904", count: 32, color: "physics" },
  { name: "SS1 Biology", subject: "Biology", code: "SS1-BIO-271", count: 28, color: "biology" },
  { name: "SS3 Chemistry", subject: "Chemistry", code: "SS3-CHE-613", count: 34, color: "chemistry" },
  { name: "SS2 Physics", subject: "Physics", code: "SS2-PHY-426", count: 30, color: "physics" },
];

function readLocal<T>(key: string, fallback: T): T {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getHref(role: Role, section: string): string {
  if (section === "overview") return `/${role}`;
  return `/${role}/${section}`;
}

function IconForSubject({ subject }: { subject: Subject }) {
  if (subject === "Physics") return <Atom size={18} />;
  if (subject === "Chemistry") return <FlaskConical size={18} />;
  return <Microscope size={18} />;
}

function Metric({
  label,
  value,
  note,
  icon,
  tint = "blue",
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
  tint?: string;
}) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tint}`}>{icon}</div>
      <div>
        <p className="metric-label">{label}</p>
        <strong className="metric-value">{value}</strong>
        <p className="metric-note">{note}</p>
      </div>
    </article>
  );
}

export default function Portal({ role, section = "overview" }: PortalProps) {
  const isTeacher = role === "teacher";
  const [assignments, setAssignments] = useState<Assignment[]>(defaultAssignments);
  const [notes, setNotes] = useState<NotebookDraft>({ objective: "", conclusion: "" });
  const [grades, setGrades] = useState<GradeRecord>({});
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setAssignments(readLocal("digitalab.assignments", defaultAssignments));
    setNotes(readLocal("digitalab.notebook.v1", { objective: "", conclusion: "" }));
    setGrades(readLocal("digitalab.grades", {}));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("digitalab.assignments", JSON.stringify(assignments));
  }, [assignments, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("digitalab.notebook.v1", JSON.stringify(notes));
    setSaved(true);
    const timeout = window.setTimeout(() => setSaved(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [notes, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("digitalab.grades", JSON.stringify(grades));
  }, [grades, hydrated]);

  const person = isTeacher ? demoTeacher : demoStudent;
  const pageName = section === "overview" ? "Overview" : section[0].toUpperCase() + section.slice(1);
  const nav: Array<[string, string, React.ReactNode]> = isTeacher
    ? [
        ["overview", "Dashboard", <BarChart3 size={18} key="i" />],
        ["classes", "My classes", <Users size={18} key="i" />],
        ["assignments", "Assignments", <ClipboardCheck size={18} key="i" />],
        ["grading", "Grading studio", <CheckCircle2 size={18} key="i" />],
      ]
    : [
        ["overview", "My dashboard", <BarChart3 size={18} key="i" />],
        ["labs", "Science labs", <FlaskConical size={18} key="i" />],
        ["notebook", "Lab notebook", <BookOpen size={18} key="i" />],
        ["assessments", "Assessments", <ClipboardCheck size={18} key="i" />],
      ];

  function createAssignment(assignment: Assignment) {
    setAssignments((current) => [assignment, ...current]);
  }

  function publishGrade(studentId: string, score: number, comment: string) {
    setGrades((current) => ({ ...current, [studentId]: { score, grade: gradeBand(score), comment } }));
  }

  return (
    <div className="portal-layout">
      <aside className="sidebar">
        <Link href="/" className="brand-lockup" aria-label="Digitalab NG home">
          <span className="brand-mark"><FlaskConical size={21} /></span>
          <span><strong>digitalab</strong><small>NG · VIRTUAL LAB</small></span>
        </Link>
        <div className="school-chip"><span className="school-avatar">K</span><span><b>King&apos;s College</b><small>Lagos · SS2 Science</small></span><ChevronDown size={15} /></div>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {nav.map(([key, label, icon]) => (
            <Link className={`nav-link ${section === key ? "active" : ""}`} href={getHref(role, key)} key={key}>
              {icon}<span>{label}</span>{key === "grading" && isTeacher ? <i className="nav-count">2</i> : null}
            </Link>
          ))}
        </nav>
        {!isTeacher && (
          <>
            <p className="nav-caption">YOUR LABS</p>
            <div className="subject-nav">
              {subjects.map((subject) => (
                <Link className="subject-link" href="/student/labs" key={subject}>
                  <span className={`subject-dot ${subjectClass[subject]}`} /><span>{subject}</span><ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </>
        )}
        <div className="sidebar-bottom">
          <div className="tutor-card"><div className="tutor-icon"><Sparkles size={16} /></div><b>Need a hint?</b><p>DigiTutor can guide your next discovery.</p><button className="text-button" onClick={() => window.alert("DigiTutor: Start with one observation at a time. What do you notice?")}>Ask DigiTutor <ArrowRight size={14} /></button></div>
          <div className="profile-row"><span className="profile-avatar">{person.name.split(" ").slice(-1)[0][0]}</span><span><b>{person.name}</b><small>{isTeacher ? "Teacher account" : "Student account"}</small></span><button className="icon-button" aria-label="Profile options"><ChevronDown size={16} /></button></div>
        </div>
      </aside>
      <main className="main-panel">
        <header className="topbar">
          <div className="breadcrumbs"><span>{isTeacher ? "Teacher portal" : "Student portal"}</span><span className="crumb-separator">/</span><b>{pageName}</b></div>
          <div className="topbar-actions"><span className="term-pill"><span /> 2026 / 2027 · Term 1</span><button className="icon-button notification-button" aria-label="Notifications"><span className="notification-dot" />◉</button><span className="top-avatar">{person.name.split(" ").slice(-1)[0][0]}</span></div>
        </header>
        <div className="page-content">
          {isTeacher ? (
            <TeacherSection
              section={section}
              assignments={assignments}
              grades={grades}
              onCreateAssignment={createAssignment}
              onPublishGrade={publishGrade}
            />
          ) : (
            <StudentSection section={section} assignments={assignments} notes={notes} onNotesChange={setNotes} saved={saved} />
          )}
        </div>
      </main>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div>{action}</div>;
}

function StudentSection({
  section,
  assignments,
  notes,
  onNotesChange,
  saved,
}: {
  section: string;
  assignments: Assignment[];
  notes: NotebookDraft;
  onNotesChange: (value: NotebookDraft) => void;
  saved: boolean;
}) {
  const [search, setSearch] = useState("");
  if (section === "labs") return <Labs />;
  if (section === "notebook") {
    return <Notebook notes={notes} onNotesChange={onNotesChange} saved={saved} />;
  }
  if (section === "assessments") {
    return <Assessments assignments={assignments} />;
  }
  const filtered = experiments.filter((experiment) => `${experiment.title} ${experiment.subject}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <PageHeading eyebrow="WEDNESDAY, 12 NOVEMBER 2026" title={`Good morning, Chioma 👋`} description="Ready to turn today's questions into discoveries? Pick up where you left off." action={<button className="button button-primary" onClick={() => window.location.assign("/student/labs")}><FlaskConical size={17} /> Open a laboratory</button>} />
      <div className="metrics-grid student-metrics">
        <Metric label="PRACTICALS COMPLETED" value="8" note="2 more than last month" icon={<CheckCircle2 size={20} />} tint="green" />
        <Metric label="AVERAGE SCORE" value="78%" note="↑ 6% from last term" icon={<Activity size={20} />} tint="blue" />
        <Metric label="TOPIC MASTERY" value="12 / 18" note="Keep your momentum" icon={<GraduationCap size={20} />} tint="purple" />
        <Metric label="LAB TIME" value="4.5 hrs" note="This week" icon={<Clock3 size={20} />} tint="orange" />
      </div>
      <div className="dashboard-grid">
        <section className="panel upcoming-panel">
          <div className="panel-heading"><div><h2>Up next</h2><p>Your practical work, all in one place</p></div><Link className="inline-link" href="/student/assessments">See all <ArrowRight size={15} /></Link></div>
          <div className="assignment-list">
            {assignments.slice(0, 4).map((assignment, index) => (
              <article className="assignment-row" key={`${assignment.title}-${index}`}>
                <span className={`subject-icon ${subjectClass[assignment.subject]}`}><IconForSubject subject={assignment.subject} /></span>
                <span className="assignment-info"><b>{assignment.title}</b><small>{assignment.subject} · {assignment.className}</small></span>
                <span className="due-label"><Clock3 size={13} /> {assignment.due}</span>
                <Link className="small-action" href="/student/labs" aria-label={`Open ${assignment.title}`}><ArrowRight size={16} /></Link>
              </article>
            ))}
          </div>
        </section>
        <section className="panel mastery-panel">
          <div className="panel-heading"><div><h2>Topic mastery</h2><p>Your learning journey</p></div><button className="icon-button" aria-label="More mastery details"><ArrowDownRight size={17} /></button></div>
          {[
            ["Physics", "Waves & oscillations", 82],
            ["Chemistry", "Acids, bases & salts", 64],
            ["Biology", "Cell structure", 91],
          ].map(([subject, topic, progress]) => (
            <div className="mastery-item" key={topic}><div className="mastery-meta"><span><i className={`subject-dot ${subjectClass[subject as Subject]}`} />{topic}</span><b>{progress}%</b></div><div className="progress-track"><span className={subjectClass[subject as Subject]} style={{ width: `${progress}%` }} /></div><small>{Number(progress) > 85 ? "Mastered" : Number(progress) > 60 ? "Practising" : "In progress"}</small></div>
          ))}
          <Link className="mastery-link" href="/student/assessments">Review all topics <ArrowRight size={14} /></Link>
        </section>
      </div>
      <section className="panel experiments-panel">
        <div className="panel-heading"><div><h2>Explore the laboratories</h2><p>Curriculum-aligned practicals for SS1–SS3</p></div><label className="search-field"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find an experiment" /></label></div>
        <div className="experiment-grid">{filtered.slice(0, 3).map((experiment) => <ExperimentCard key={experiment.id} experiment={experiment} />)}</div>
      </section>
      <div className="quote-strip"><Sparkles size={18} /><p><b>Small steps make strong scientists.</b> Record what you observe, not just what you expect.</p><span>— DigiTutor</span></div>
    </>
  );
}

function ExperimentCard({ experiment }: { experiment: (typeof experiments)[number] }) {
  return <article className={`experiment-card ${subjectClass[experiment.subject]}`}><div className="experiment-card-top"><span className={`subject-icon ${subjectClass[experiment.subject]}`}><IconForSubject subject={experiment.subject} /></span><span className="duration"><Clock3 size={13} />{experiment.duration}</span></div><p className="eyebrow">{experiment.subject} · {experiment.topic}</p><h3>{experiment.title}</h3><p className="experiment-desc">{experiment.description}</p><Link href="/student/labs" className="card-link">Enter laboratory <ArrowRight size={15} /></Link></article>;
}

function Labs() {
  const [subject, setSubject] = useState<Subject>("Physics");
  const [selectedId, setSelectedId] = useState("pendulum");
  const [length, setLength] = useState(0.7);
  const [gravity, setGravity] = useState(9.81);
  const [voltage, setVoltage] = useState(6);
  const [resistance, setResistance] = useState(10);
  const [titre, setTitre] = useState(0);
  const [running, setRunning] = useState(false);
  const [slide, setSlide] = useState("Onion epidermis");
  const [zoom, setZoom] = useState(10);
  const [result, setResult] = useState("");
  const [observations, setObservations] = useState<string[]>([]);
  const [observationsHydrated, setObservationsHydrated] = useState(false);
  const available = experiments.filter((experiment) => experiment.subject === subject);
  const experiment = available.find((item) => item.id === selectedId) ?? available[0];
  const period = pendulumPeriod(length, gravity);

  useEffect(() => {
    setObservations(readLocal("digitalab.observations", []));
    setObservationsHydrated(true);
  }, []);

  useEffect(() => {
    if (observationsHydrated) {
      window.localStorage.setItem("digitalab.observations", JSON.stringify(observations));
    }
  }, [observations, observationsHydrated]);

  function chooseSubject(value: Subject) {
    setSubject(value);
    const first = experiments.find((item) => item.subject === value);
    if (first) setSelectedId(first.id);
    setResult("");
  }

  function saveObservation() {
    if (!experiment) return;
    const observation = experiment.id === "pendulum"
      ? `Length ${length.toFixed(2)} m · Period ${period.toFixed(2)} s · g ${gravity.toFixed(2)} m/s²`
      : experiment.id === "ohms-law"
        ? `${voltage.toFixed(1)} V ÷ ${resistance} Ω = ${ohmsCurrent(voltage, resistance).toFixed(2)} A`
        : experiment.id === "titration"
          ? `Mean titre ${titre.toFixed(2)} cm³ · acid concentration ${acidConcentration(0.1, titre, 25).toFixed(3)} mol/dm³`
          : result || `${experiment.title}: observation recorded`;
    setObservations((items) => [observation, ...items]);
  }

  return (
    <>
      <PageHeading eyebrow="VIRTUAL LABORATORIES" title="Learn by doing." description="Choose a subject, set up your apparatus and investigate at your own pace." action={<span className="saved-badge"><ShieldCheck size={15} /> Safe environment</span>} />
      <div className="subject-tabs">{subjects.map((item) => <button key={item} className={`subject-tab ${item === subject ? "selected" : ""} ${subjectClass[item]}`} onClick={() => chooseSubject(item)}><IconForSubject subject={item} />{item}</button>)}</div>
      <div className="lab-layout">
        <aside className="lab-list panel"><p className="nav-caption">{subject.toUpperCase()} PRACTICALS</p>{available.map((item) => <button className={`lab-option ${item.id === experiment?.id ? "current" : ""}`} key={item.id} onClick={() => { setSelectedId(item.id); setResult(""); }}><b>{item.title}</b><small>{item.topic} · {item.duration}</small></button>)}<div className="safety-note"><ShieldCheck size={16} /><span><b>Safety first</b><small>Follow your teacher&apos;s lab instructions.</small></span></div></aside>
        <section className="lab-workspace panel">
          {experiment && <><div className="lab-title-row"><div><p className="eyebrow">{experiment.subject.toUpperCase()} · {experiment.topic.toUpperCase()}</p><h2>{experiment.title}</h2><p>{experiment.description}</p></div><button className={`button ${running ? "button-soft" : "button-primary"}`} onClick={() => setRunning(!running)}>{running ? <><X size={16} /> Reset experiment</> : <><Activity size={16} /> Start experiment</>}</button></div>
            <div className="apparatus-stage">{experiment.id === "pendulum" ? <PendulumVisual length={length} running={running} /> : experiment.id === "ohms-law" ? <CircuitVisual voltage={voltage} resistance={resistance} /> : experiment.id === "titration" ? <TitrationVisual titre={titre} /> : experiment.id === "microscope" ? <MicroscopeVisual slide={slide} zoom={zoom} /> : <GenericVisual experimentId={experiment.id} result={result} />}</div>
            <div className="controls-grid">
              {experiment.id === "pendulum" && <><Control label="String length" value={`${length.toFixed(2)} m`}><input aria-label="String length" type="range" min="0.2" max="1.2" step="0.05" value={length} onChange={(event) => setLength(Number(event.target.value))} /></Control><Control label="Planetary gravity" value={`${gravity.toFixed(2)} m/s²`}><select aria-label="Planetary gravity" value={gravity} onChange={(event) => setGravity(Number(event.target.value))}><option value={9.81}>Earth · 9.81 m/s²</option><option value={1.62}>Moon · 1.62 m/s²</option><option value={3.71}>Mars · 3.71 m/s²</option></select></Control></>}
              {experiment.id === "ohms-law" && <><Control label="Supply voltage" value={`${voltage.toFixed(1)} V`}><input aria-label="Supply voltage" type="range" min="0.5" max="12" step="0.5" value={voltage} onChange={(event) => setVoltage(Number(event.target.value))} /></Control><Control label="Resistance" value={`${resistance} Ω`}><input aria-label="Resistance" type="range" min="2" max="30" step="1" value={resistance} onChange={(event) => setResistance(Number(event.target.value))} /></Control></>}
              {experiment.id === "titration" && <><Control label="Burette delivery" value={`${titre.toFixed(2)} cm³`}><input aria-label="Burette delivery" type="range" min="0" max="50" step="0.05" value={titre} onChange={(event) => { setTitre(Number(event.target.value)); setResult(""); }} /></Control><Control label="Indicator" value="Phenolphthalein"><select aria-label="Indicator"><option>Phenolphthalein · pink to colourless</option><option>Methyl orange · yellow to orange</option></select></Control></>}
              {experiment.id === "microscope" && <><Control label="Prepared slide" value={slide}><select aria-label="Prepared slide" value={slide} onChange={(event) => setSlide(event.target.value)}><option>Onion epidermis</option><option>Human cheek epithelium</option><option>Spirogyra</option></select></Control><Control label="Objective lens" value={`${zoom}× objective`}><select aria-label="Objective lens" value={zoom} onChange={(event) => setZoom(Number(event.target.value))}><option value={4}>4× objective</option><option value={10}>10× objective</option><option value={40}>40× objective</option></select></Control></>}
              {experiment.id !== "pendulum" && experiment.id !== "ohms-law" && experiment.id !== "titration" && experiment.id !== "microscope" && <GenericControls id={experiment.id} onResult={setResult} />}
            </div>
            <div className="readings-row">{experiment.id === "pendulum" ? <><Reading label="Period, T" value={`${period.toFixed(2)} s`} /><Reading label="T²" value={`${(period * period).toFixed(2)} s²`} /><Reading label="Gravity, g" value={`${gravity.toFixed(2)} m/s²`} /></> : experiment.id === "ohms-law" ? <><Reading label="Current, I" value={`${ohmsCurrent(voltage, resistance).toFixed(2)} A`} /><Reading label="Voltage, V" value={`${voltage.toFixed(1)} V`} /><Reading label="V ÷ I" value={`${resistance.toFixed(1)} Ω`} /></> : experiment.id === "titration" ? <><Reading label="Mean titre" value={`${titre.toFixed(2)} cm³`} /><Reading label="Base concentration" value="0.100 mol/dm³" /><Reading label="Acid concentration" value={`${acidConcentration(0.1, titre || 0, 25).toFixed(3)} mol/dm³`} /></> : <><Reading label="Equipment" value={experiment.equipment[0]} /><Reading label="Observation" value={result || "Ready to investigate"} /><Reading label="Total magnification" value={experiment.id === "microscope" ? `${zoom * 10}×` : "—"} /></>}</div>
            <div className="lab-footer"><div className="safety-check"><ShieldCheck size={15} /> Simulated equipment · no physical hazards</div><button className="button button-outline" onClick={saveObservation}><Plus size={16} /> Add observation to notebook</button></div>
            {observations.length > 0 && <div className="observation-log"><b>Saved observations</b>{observations.slice(0, 3).map((observation, index) => <p key={`${observation}-${index}`}><Check size={14} />{observation}</p>)}</div>}
          </>}
        </section>
      </div>
    </>
  );
}

function Control({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return <label className="control-field"><span><b>{label}</b><small>{value}</small></span>{children}</label>;
}

function Reading({ label, value }: { label: string; value: string }) {
  return <div className="reading"><small>{label}</small><b>{value}</b></div>;
}

function PendulumVisual({ length, running }: { length: number; running: boolean }) {
  return <div className="pendulum-scene"><div className="scene-ruler">0 cm<br />25<br />50<br />75<br />100</div><svg viewBox="0 0 540 190" role="img" aria-label="Animated pendulum apparatus"><line x1="140" y1="25" x2="370" y2="25" stroke="#667b8e" strokeWidth="8" strokeLinecap="round" /><line x1="256" y1="28" x2="256" y2="43" stroke="#d4dfe8" strokeWidth="3" /><line className={running ? "pendulum-string swinging" : "pendulum-string"} x1="256" y1="43" x2="256" y2={43 + length * 112} stroke="#526a7c" strokeWidth="3" /><circle className={running ? "pendulum-bob swinging" : "pendulum-bob"} cx="256" cy={43 + length * 112} r="17" fill="#e1a94f" /><line x1="105" y1="167" x2="420" y2="167" stroke="#d5dde5" strokeWidth="2" /><text x="390" y="156" fill="#64748b" fontSize="12">metre rule</text></svg><span className="scene-label">{running ? "Oscillation in progress" : "Adjust the length to begin"}</span></div>;
}

function CircuitVisual({ voltage, resistance }: { voltage: number; resistance: number }) {
  return <div className="circuit-scene"><svg viewBox="0 0 560 180" role="img" aria-label="Circuit with a power supply, ammeter and resistor"><path d="M110 40 H420 V138 H110 Z" fill="none" stroke="#8495a4" strokeWidth="4" /><path d="M110 40 H200 M300 40 H420" stroke="#8495a4" strokeWidth="4" /><circle cx="250" cy="40" r="27" fill="#fff" stroke="#168a83" strokeWidth="3" /><text x="241" y="46" fill="#142b45" fontSize="17">A</text><rect x="205" y="125" width="95" height="27" rx="4" fill="#f3d9ac" stroke="#b9833c" strokeWidth="2" /><path d="M220 130 l12 17 12 -17 12 17 12 -17 12 17" fill="none" stroke="#875e32" strokeWidth="2" /><circle cx="110" cy="90" r="27" fill="#fff" stroke="#2867a8" strokeWidth="3" /><text x="102" y="96" fill="#142b45" fontSize="16">DC</text><text x="333" y="115" fill="#526a7c" fontSize="13">R = {resistance} Ω</text><text x="77" y="137" fill="#526a7c" fontSize="13">{voltage} V supply</text></svg><span className="scene-label">Closed circuit · conventional current</span></div>;
}

function TitrationVisual({ titre }: { titre: number }) {
  const pink = titre < 24.9 ? "#f5bdd3" : "#f7e9ef";
  return <div className="titration-scene"><div className="burette"><span className="burette-mark">50<br />40<br />30<br />20<br />10<br />0</span><div className="burette-liquid" style={{ height: `${Math.min(titre * 1.45, 70)}%` }} /><span className="burette-tap" /></div><div className="drop-line" /><div className="flask"><div className="flask-liquid" style={{ backgroundColor: pink }} /><span>25 cm³ base<br />+ indicator</span></div><span className="scene-label">White tile · {titre >= 24.9 ? "endpoint reached" : "add titrant dropwise"}</span></div>;
}

function MicroscopeVisual({ slide, zoom }: { slide: string; zoom: number }) {
  return <div className="microscope-scene"><div className="microscope-objective">{zoom}×</div><div className="microscope-view"><div className={`cell-field ${slide === "Spirogyra" ? "spirogyra" : slide.includes("cheek") ? "cheek" : ""}`}><span /><span /><span /><span /><span /><span /><span /><span /><span /></div></div><span className="scene-label">{slide} · total magnification {zoom * 10}×</span></div>;
}

function GenericVisual({ experimentId, result }: { experimentId: string; result: string }) {
  const title = experimentId === "hookes-law" ? "Spring extension" : experimentId === "reaction-rate" ? "Gas volume collected" : experimentId === "food-tests" ? "Sample colour change" : experimentId === "osmosis" ? "Potato strip mass" : "Qualitative observation";
  return <div className="generic-scene"><div className={`generic-illustration ${experimentId}`}><span>{experimentId === "hookes-law" ? "〰" : experimentId === "reaction-rate" ? "◉" : experimentId === "food-tests" ? "●" : experimentId === "osmosis" ? "▰" : "◌"}</span></div><div><p className="eyebrow">SIMULATION READOUT</p><h3>{title}</h3><p>{result || "Adjust the experimental conditions to record your observation."}</p></div></div>;
}

function GenericControls({ id, onResult }: { id: string; onResult: (value: string) => void }) {
  if (id === "hookes-law") return <><Control label="Applied mass" value="0 g"><input type="range" min="0" max="500" step="50" defaultValue="0" onChange={(event) => onResult(`${event.target.value} g · extension ${(Number(event.target.value) * 0.02).toFixed(1)} cm`)} /></Control><Control label="Spring constant" value="50 N/m"><select onChange={(event) => onResult(`Spring constant ${event.target.value} N/m · elastic limit respected`)}><option value="50">Standard spring · 50 N/m</option><option value="25">Soft spring · 25 N/m</option><option value="100">Stiff spring · 100 N/m</option></select></Control></>;
  if (id === "reaction-rate") return <><Control label="Acid concentration" value="1.0 mol/dm³"><input type="range" min="0.2" max="2" step="0.1" defaultValue="1" onChange={(event) => onResult(`${(Number(event.target.value) * 42).toFixed(0)} cm³ CO₂ after 60 s · concentration ${event.target.value} mol/dm³`)} /></Control><Control label="Particle size" value="Chips"><select onChange={(event) => onResult(`Reaction with ${event.target.value.toLowerCase()} calcium carbonate · CO₂ collection active`)}><option>Chips</option><option>Powder</option><option>Large lumps</option></select></Control></>;
  if (id === "food-tests") return <><Control label="Food sample" value="Unknown sample A"><select onChange={(event) => onResult(`Sample ${event.target.value}: ${event.target.value === "A" ? "iodine turns blue-black — starch present" : event.target.value === "B" ? "Benedict's solution turns brick-red — reducing sugar present" : "Biuret solution turns violet — protein present"}`)}><option value="A">Unknown sample A</option><option value="B">Unknown sample B</option><option value="C">Unknown sample C</option></select></Control><button className="button button-primary" onClick={() => onResult("Iodine test: blue-black colour. Starch is present.")}>Add iodine reagent</button></>;
  if (id === "osmosis") return <><Control label="Sucrose concentration" value="0.4 mol/dm³"><input type="range" min="0" max="1" step="0.1" defaultValue="0.4" onChange={(event) => onResult(`0.4 g potato strip · mass change ${((0.4 - Number(event.target.value)) * -18).toFixed(1)}% at ${event.target.value} mol/dm³`)} /></Control><Control label="Immersion time" value="30 min"><select onChange={(event) => onResult(`Potato strip after ${event.target.value} minutes · measure mass and length`)}><option value="10">10 minutes</option><option value="30">30 minutes</option><option value="60">60 minutes</option></select></Control></>;
  return <><Control label="Test reagent" value="Add a reagent"><select onChange={(event) => onResult(event.target.value)}><option>Select a reagent</option><option>Silver nitrate: white precipitate indicates chloride</option><option>Sodium hydroxide: blue precipitate indicates copper(II)</option><option>Barium chloride: white precipitate indicates sulfate</option></select></Control></>;
}

function Notebook({ notes, onNotesChange, saved }: { notes: NotebookDraft; onNotesChange: (value: NotebookDraft) => void; saved: boolean }) {
  const [tableRows, setTableRows] = useState([{ length: "0.40", time: "8.0" }, { length: "0.60", time: "9.8" }, { length: "0.80", time: "11.4" }]);
  const [draftRow, setDraftRow] = useState({ length: "", time: "" });
  const [observations, setObservations] = useState<string[]>([]);
  const [rowsHydrated, setRowsHydrated] = useState(false);
  useEffect(() => {
    setTableRows(readLocal("digitalab.notebook.readings", [{ length: "0.40", time: "8.0" }, { length: "0.60", time: "9.8" }, { length: "0.80", time: "11.4" }]));
    setObservations(readLocal("digitalab.observations", []));
    setRowsHydrated(true);
  }, []);
  useEffect(() => {
    if (rowsHydrated) window.localStorage.setItem("digitalab.notebook.readings", JSON.stringify(tableRows));
  }, [tableRows, rowsHydrated]);
  const rowPeriods = tableRows.map((row) => ({ ...row, period: (Number(row.time) / 10).toFixed(2), squared: ((Number(row.time) / 10) ** 2).toFixed(2) }));
  return <>
    <PageHeading eyebrow="MY SCIENCE JOURNAL" title="Lab notebook" description="Your practical records, calculations and conclusions are saved on this device." action={<button className="button button-outline" onClick={() => window.print()}><BookOpen size={16} /> Print report</button>} />
    <div className="notebook-layout"><section className="panel notebook-main"><div className="panel-heading"><div><h2>Simple harmonic motion</h2><p>Physics · Practical record · 12 Nov 2026</p></div><span className="status-pill in-progress">Draft</span></div><div className="notebook-form"><label>Objective<textarea value={notes.objective} onChange={(event) => onNotesChange({ ...notes, objective: event.target.value })} placeholder="To investigate the relationship between pendulum length and period, and determine g..." rows={3} /></label><div className="notebook-form-row"><label>Apparatus<input defaultValue="Pendulum bob, string, metre rule, stopwatch" /></label><label>Independent variable<input defaultValue="Length of pendulum (m)" /></label></div><label>Observation table</label><div className="table-scroll"><table className="data-table"><thead><tr><th>Length (m)</th><th>10 oscillations (s)</th><th>Period, T (s)</th><th>T² (s²)</th></tr></thead><tbody>{rowPeriods.map((row, index) => <tr key={`${row.length}-${index}`}><td>{row.length}</td><td>{row.time}</td><td>{row.period}</td><td>{row.squared}</td></tr>)}<tr><td><input aria-label="New pendulum length" value={draftRow.length} onChange={(event) => setDraftRow({ ...draftRow, length: event.target.value })} placeholder="Length" /></td><td><input aria-label="New measured time" value={draftRow.time} onChange={(event) => setDraftRow({ ...draftRow, time: event.target.value })} placeholder="Time" /></td><td colSpan={2}><button className="text-button" onClick={() => { if (!draftRow.length || !draftRow.time) return; setTableRows([...tableRows, draftRow]); setDraftRow({ length: "", time: "" }); }}>+ Add reading</button></td></tr></tbody></table></div><label>Conclusion<textarea value={notes.conclusion} onChange={(event) => onNotesChange({ ...notes, conclusion: event.target.value })} placeholder="Summarise the relationship you observed and your estimate for g..." rows={4} /></label>{observations.length > 0 && <div className="notebook-observations"><b>Observations from the virtual labs</b>{observations.slice(0, 5).map((item, index) => <p key={`${item}-${index}`}><CheckCircle2 size={13} />{item}</p>)}</div>}<div className="autosave-note"><CheckCircle2 size={15} />{saved ? "Saved to this device" : "Your notebook saves automatically"}</div></div></section><aside className="panel notebook-aside"><div className="panel-heading"><div><h2>Report checklist</h2><p>WAEC practical format</p></div></div>{["Objective stated", "Apparatus listed", "Observations recorded", "Calculations shown", "Conclusion written", "Precautions included"].map((item, index) => <div className="checklist-item" key={item}><span className={index < 3 ? "check complete" : "check"}>{index < 3 ? <Check size={13} /> : null}</span>{item}</div>)}<div className="notebook-tip"><Sparkles size={16} /><b>DigiTutor tip</b><p>A good conclusion answers your objective and uses evidence from your observation table.</p></div></aside></div>
  </>;
}

function Assessments({ assignments }: { assignments: Assignment[] }) {
  const [selectedTopic, setSelectedTopic] = useState("Pendulum and gravity");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [complete, setComplete] = useState(false);
  const questions = [
    { topic: "Pendulum and gravity", prompt: "What happens to the period of a simple pendulum when its length is increased?", options: ["The period decreases", "The period increases", "The period stays the same", "The bob stops oscillating"], correct: 1, help: "A longer pendulum takes more time to complete each oscillation: T = 2π√(L/g)." },
    { topic: "Pendulum and gravity", prompt: "How many complete oscillations should be timed to reduce stopwatch error?", options: ["One oscillation", "Ten or more oscillations", "Half an oscillation", "No timing is needed"], correct: 1, help: "Timing several oscillations and dividing by the count reduces the effect of reaction-time error." },
    { topic: "Current electricity", prompt: "A 6 V supply is connected across a 3 Ω resistor. What current flows?", options: ["0.5 A", "2 A", "3 A", "18 A"], correct: 1, help: "Ohm’s law gives I = V/R = 6/3 = 2 A." },
    { topic: "Acids, bases & salts", prompt: "What colour change signals the endpoint with phenolphthalein in an acid-base titration?", options: ["Colourless to pale pink", "Pink to colourless", "Blue to red", "Yellow to blue"], correct: 1, help: "Phenolphthalein is pink in alkali and becomes colourless when neutralised by acid." },
    { topic: "Cell structure", prompt: "Which microscope adjustment should be used for precise focusing at high power?", options: ["Coarse focus only", "Fine focus knob", "Stage clip", "Diaphragm lever"], correct: 1, help: "The fine adjustment knob makes small focus changes safely at high magnification." },
  ];
  const question = questions[questionIndex];
  const isCorrect = quizAnswer === question.correct;
  function nextQuestion() {
    if (quizAnswer === null) return;
    if (isCorrect) setCorrectCount((count) => count + 1);
    if (questionIndex === questions.length - 1) {
      setComplete(true);
    } else {
      setQuestionIndex((index) => index + 1);
      setQuizAnswer(null);
    }
  }
  function restartQuiz() {
    setQuestionIndex(0);
    setQuizAnswer(null);
    setCorrectCount(0);
    setComplete(false);
  }
  return <>
    <PageHeading eyebrow="PRACTISE & REFLECT" title="Assessment centre" description="Check your understanding and build confidence before the next practical." />
    <div className="assessment-grid"><section className="panel quiz-panel"><div className="panel-heading"><div><h2>Quick knowledge check</h2><p>{question.topic} · Question {questionIndex + 1} of {questions.length}</p></div><span className="quiz-progress">{String(questionIndex + 1).padStart(2, "0")} / {questions.length}</span></div>{complete ? <div className="quiz-complete"><span className="question-number"><CheckCircle2 size={15} /></span><h3>Knowledge check complete</h3><p>You answered <b>{correctCount} of {questions.length}</b> questions correctly. Revisit a topic and practise again whenever you are ready.</p><button className="button button-outline" onClick={restartQuiz}>Try again</button></div> : <><div className="quiz-question"><span className="question-number">{String(questionIndex + 1).padStart(2, "0")}</span><h3>{question.prompt}</h3><div className="answer-list">{question.options.map((option, index) => <button className={`answer-option ${quizAnswer === index ? (index === question.correct ? "correct" : "incorrect") : ""}`} key={option} onClick={() => setQuizAnswer(index)}><span className="answer-letter">{String.fromCharCode(65 + index)}</span>{option}{quizAnswer === index ? index === question.correct ? <CheckCircle2 size={18} /> : <X size={18} /> : null}</button>)}</div>{quizAnswer !== null && <div className={`feedback-box ${isCorrect ? "positive" : "try-again"}`}><Sparkles size={16} /><p><b>{isCorrect ? "That’s right!" : "Not quite—review this idea."}</b> {question.help}</p></div>}</div><button className="button button-primary" disabled={quizAnswer === null} onClick={nextQuestion}>{questionIndex === questions.length - 1 ? "Finish assessment" : "Next question"} <ArrowRight size={15} /></button></>}</section><aside className="panel topic-panel"><div className="panel-heading"><div><h2>Topic mastery</h2><p>Choose a topic to practise</p></div></div>{[["Pendulum and gravity", "Physics", "82%"], ["Acids, bases & salts", "Chemistry", "64%"], ["Cell structure", "Biology", "91%"], ["Current electricity", "Physics", "48%"]].map(([topic, subject, progress]) => <button className={`topic-row ${selectedTopic === topic ? "chosen" : ""}`} key={topic} onClick={() => setSelectedTopic(topic)}><span className={`subject-dot ${subjectClass[subject as Subject]}`} /><span><b>{topic}</b><small>{subject} · {progress} mastery</small></span><ArrowRight size={15} /></button>)}<div className="mastery-callout"><GraduationCap size={19} /><p><b>Master a topic</b>Practise, reflect and revisit until the ideas click.</p></div></aside></div>
    <section className="panel assignment-table-panel"><div className="panel-heading"><div><h2>Assigned practicals</h2><p>Practical work set by your teacher</p></div></div><div className="table-scroll"><table className="data-table"><thead><tr><th>Practical</th><th>Subject</th><th>Due</th><th>Status</th><th /></tr></thead><tbody>{assignments.map((assignment, index) => <tr key={`${assignment.title}-${index}`}><td><b>{assignment.title}</b></td><td>{assignment.subject}</td><td>{assignment.due}</td><td><span className={`status-pill ${index === 0 ? "in-progress" : "not-started"}`}>{index === 0 ? "In progress" : "Not started"}</span></td><td><Link href="/student/labs" className="table-action">Start <ArrowRight size={14} /></Link></td></tr>)}</tbody></table></div></section>
  </>;
}

function TeacherSection({
  section,
  assignments,
  grades,
  onCreateAssignment,
  onPublishGrade,
}: {
  section: string;
  assignments: Assignment[];
  grades: GradeRecord;
  onCreateAssignment: (assignment: Assignment) => void;
  onPublishGrade: (studentId: string, score: number, comment: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("043");
  if (section === "classes") {
    return <TeacherClasses query={query} onQueryChange={setQuery} />;
  }
  if (section === "assignments") {
    return <TeacherAssignments assignments={assignments} onCreate={onCreateAssignment} />;
  }
  if (section === "grading") {
    return <TeacherGrading key={selectedStudent} grades={grades} selectedStudent={selectedStudent} onSelect={setSelectedStudent} onPublish={onPublishGrade} />;
  }
  return <TeacherDashboard assignments={assignments} grades={grades} />;
}

function TeacherDashboard({ assignments, grades }: { assignments: Assignment[]; grades: GradeRecord }) {
  const submittedCount = demoStudents.filter((student) => student.status === "Submitted").length;
  const pendingCount = submittedCount - Object.keys(grades).length;
  const chartData = [{ label: "0–49", value: 3 }, { label: "50–59", value: 5 }, { label: "60–69", value: 9 }, { label: "70–79", value: 14 }, { label: "80–100", value: 11 }];
  return <>
    <PageHeading eyebrow="TEACHER PORTAL · TERM 1" title="Good morning, Babatunde." description="Here’s what’s happening across your science classes today." action={<Link href="/teacher/assignments" className="button button-primary"><Plus size={17} /> Create assignment</Link>} />
    <div className="metrics-grid teacher-metrics"><Metric label="ACTIVE STUDENTS" value="124" note="Across 4 class cohorts" icon={<Users size={20} />} tint="blue" /><Metric label="PRACTICALS TO GRADE" value={`${Math.max(pendingCount, 2)}`} note="2 submitted this week" icon={<ClipboardCheck size={20} />} tint="orange" /><Metric label="CLASS AVERAGE" value="72%" note="↑ 4% from last term" icon={<Activity size={20} />} tint="green" /><Metric label="ASSIGNMENTS LIVE" value={`${assignments.length}`} note="Across Physics, Chemistry & Biology" icon={<BookOpen size={20} />} tint="purple" /></div>
    <div className="dashboard-grid teacher-dashboard-grid"><section className="panel chart-panel"><div className="panel-heading"><div><h2>Class performance</h2><p>SS2 Science · Latest practical scores</p></div><button className="select-button">This term <ChevronDown size={14} /></button></div><div className="bar-chart" aria-label="Class score distribution">{chartData.map((item) => <div className="bar-column" key={item.label}><span>{item.value}</span><div style={{ height: `${item.value * 10}px` }} /><small>{item.label}</small></div>)}</div><div className="chart-caption"><span><i /> Student submissions</span><span>42 students</span></div></section><section className="panel attention-panel"><div className="panel-heading"><div><h2>Needs your attention</h2><p>Students who may need support</p></div><span className="alert-count">3</span></div>{[["Tunde Bakare", "SS1 Biology", "No practicals this month"], ["Emeka Nwosu", "SS2 Physics", "2 assignments due"], ["Amina Bello", "SS2 Chemistry", "Needs feedback"]].map(([name, className, message]) => <div className="attention-row" key={name}><span className="profile-avatar soft">{name.split(" ")[0][0]}{name.split(" ")[1][0]}</span><span><b>{name}</b><small>{className} · {message}</small></span><ArrowRight size={15} /></div>)}<Link href="/teacher/classes" className="inline-link">View class roster <ArrowRight size={14} /></Link></section></div>
    <section className="panel recent-panel"><div className="panel-heading"><div><h2>Recent submissions</h2><p>Student practical work awaiting your review</p></div><Link className="inline-link" href="/teacher/grading">Open grading studio <ArrowRight size={14} /></Link></div><div className="table-scroll"><table className="data-table"><thead><tr><th>Student</th><th>Practical</th><th>Class</th><th>Submitted</th><th>Status</th><th /></tr></thead><tbody>{demoStudents.filter((student) => student.status === "Submitted").map((student) => <tr key={student.id}><td><b>{student.name}</b><small>{student.email}</small></td><td>{student.experiment}</td><td>{student.className}</td><td>Today, 10:24 AM</td><td><span className="status-pill submitted">Needs grading</span></td><td><Link href="/teacher/grading" className="table-action">Review <ArrowRight size={14} /></Link></td></tr>)}</tbody></table></div></section>
  </>;
}

function TeacherClasses({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) {
  const [classes, setClasses] = useState(defaultClasses);
  const [classesHydrated, setClassesHydrated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [roster, setRoster] = useState(false);
  useEffect(() => {
    setClasses(readLocal("digitalab.classes", defaultClasses));
    setClassesHydrated(true);
  }, []);
  useEffect(() => {
    if (classesHydrated) window.localStorage.setItem("digitalab.classes", JSON.stringify(classes));
  }, [classes, classesHydrated]);
  const filtered = classes.filter((item) => `${item.name} ${item.subject}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <PageHeading eyebrow="CLASS MANAGEMENT" title="My classes" description="Manage your cohorts, share enrolment codes and keep an eye on learner progress." action={<button className="button button-primary" onClick={() => setShowForm(!showForm)}><Plus size={16} /> Create a class</button>} />
    {showForm && <form className="panel create-form" onSubmit={(event) => { event.preventDefault(); if (!newName.trim()) return; setClasses([{ name: newName, subject: "Science", code: `SS2-SCI-${Math.floor(100 + Math.random() * 900)}`, count: 0, color: "biology" }, ...classes]); setNewName(""); setShowForm(false); }}><label>Class name<input required value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="e.g. SS2 Science" /></label><button className="button button-primary" type="submit">Create class</button></form>}
    <div className="class-toolbar"><label className="search-field"><Search size={16} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search classes" /></label><span>{filtered.length} class cohorts</span></div>
    <div className="class-grid">{filtered.map((item) => <article className="panel class-card" key={item.code}><div className={`class-emblem ${item.color}`}><Users size={21} /></div><span className="status-pill in-progress">Active</span><h2>{item.name}</h2><p>{item.subject}</p><div className="class-card-stats"><span><Users size={15} />{item.count} students</span><span><ClipboardCheck size={15} />{item.name === "SS2 Science" ? "3" : "2"} assignments</span></div><div className="enrol-code"><span>ENROLMENT CODE</span><b>{item.code}</b><button onClick={() => navigator.clipboard.writeText(item.code)} aria-label="Copy enrolment code" title="Copy code">▣</button></div><button className="button button-outline full-width" onClick={() => setRoster(!roster)}>View student roster <ArrowRight size={15} /></button></article>)}</div>
    {roster && <section className="panel roster-panel"><div className="panel-heading"><div><h2>SS2 Science roster</h2><p>Students and practical progress</p></div><button className="icon-button" onClick={() => setRoster(false)} aria-label="Close roster"><X size={18} /></button></div><table className="data-table"><thead><tr><th>Student</th><th>Class</th><th>Latest practical</th><th>Status</th></tr></thead><tbody>{demoStudents.map((student) => <tr key={student.id}><td><b>{student.name}</b></td><td>{student.className}</td><td>{student.experiment}</td><td><span className={`status-pill ${student.status === "Submitted" ? "submitted" : "in-progress"}`}>{student.status}</span></td></tr>)}</tbody></table></section>}
  </>;
}

function TeacherAssignments({ assignments, onCreate }: { assignments: Assignment[]; onCreate: (assignment: Assignment) => void }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject>("Physics");
  const [due, setDue] = useState("");
  const [className, setClassName] = useState("SS2 Science");
  const [created, setCreated] = useState(false);
  const matchingExperiments = useMemo(() => experiments.filter((item) => item.subject === subject), [subject]);
  return <>
    <PageHeading eyebrow="PRACTICAL WORK" title="Assignments" description="Set meaningful practicals, choose a cohort and track submissions." />
    <div className="assignment-builder-layout"><section className="panel builder-panel"><div className="panel-heading"><div><h2>Build an assignment</h2><p>Students will see this in their dashboard</p></div><span className="step-badge">NEW</span></div><form className="builder-form" onSubmit={(event) => { event.preventDefault(); if (!title.trim() || !due) return; onCreate({ title, subject, due: new Date(`${due}T12:00:00`).toLocaleDateString("en-NG", { day: "numeric", month: "short" }), className }); setCreated(true); setTitle(""); setDue(""); }}><label>Assignment title<input required value={title} onChange={(event) => { setTitle(event.target.value); setCreated(false); }} placeholder="e.g. Investigating pendulum period" /></label><div className="builder-two-col"><label>Subject<select value={subject} onChange={(event) => setSubject(event.target.value as Subject)}>{subjects.map((item) => <option key={item}>{item}</option>)}</select></label><label>Target class<select value={className} onChange={(event) => setClassName(event.target.value)}><option>SS2 Science</option><option>SS1 Biology</option><option>SS3 Chemistry</option><option>SS2 Physics</option></select></label></div><label>Experiment from curriculum<select value={title} onChange={(event) => setTitle(event.target.value)}><option value="">Choose a practical</option>{matchingExperiments.map((item) => <option key={item.id} value={item.title}>{item.title} · {item.topic}</option>)}</select></label><label>Due date<input required type="date" min="2026-11-12" value={due} onChange={(event) => setDue(event.target.value)} /></label><div className="rubric-preview"><div><ShieldCheck size={17} /><span><b>WAEC practical rubric</b><small>8 assessment criteria · 100 marks total</small></span></div><button type="button" className="text-button" onClick={() => window.alert(rubricCriteria.map((criterion) => `${criterion.name}: ${criterion.max} marks`).join("\\n"))}>Preview rubric <ArrowRight size={14} /></button></div><button className="button button-primary full-width" type="submit"><Plus size={16} /> Publish assignment</button>{created && <p className="success-message"><CheckCircle2 size={16} />Assignment published to {className}.</p>}</form></section><section className="panel live-assignments"><div className="panel-heading"><div><h2>Live assignments</h2><p>{assignments.length} practicals across your classes</p></div></div>{assignments.map((item, index) => <article className="live-assignment" key={`${item.title}-${index}`}><span className={`subject-icon ${subjectClass[item.subject]}`}><IconForSubject subject={item.subject} /></span><div><b>{item.title}</b><small>{item.subject} · {item.className}</small><small className="assignment-due"><Clock3 size={12} />Due {item.due}</small></div><span className="submission-count">{index === 0 ? "14/32" : "8/28"}<small>submitted</small></span></article>)}</section></div>
  </>;
}

function TeacherGrading({
  grades,
  selectedStudent,
  onSelect,
  onPublish,
}: {
  grades: GradeRecord;
  selectedStudent: string;
  onSelect: (id: string) => void;
  onPublish: (id: string, score: number, comment: string) => void;
}) {
  const student = demoStudents.find((item) => item.id === selectedStudent) ?? demoStudents[1];
  const [marks, setMarks] = useState<number[]>([4, 4, 8, 12, 12, 16, 12, 12]);
  const [comment, setComment] = useState("");
  const [published, setPublished] = useState(false);
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  return <>
    <PageHeading eyebrow="ASSESSMENT & FEEDBACK" title="Grading studio" description="Review practical reports and provide clear, criterion-based feedback." action={<span className="status-pill submitted"><span className="pulse-dot" /> {demoStudents.filter((item) => item.status === "Submitted").length} awaiting review</span>} />
    <div className="grading-toolbar"><label className="search-field"><Search size={16} /><input placeholder="Find a student or practical" /></label><select value={selectedStudent} onChange={(event) => { onSelect(event.target.value); setPublished(false); }} aria-label="Select student">{demoStudents.filter((item) => item.status === "Submitted").map((item) => <option key={item.id} value={item.id}>{item.name} · {item.experiment}</option>)}</select><span className="submission-position">Submission 1 of 2</span></div>
    <div className="grading-grid"><section className="panel report-panel"><div className="report-student"><span className="profile-avatar large">{student.name.split(" ").slice(-1)[0][0]}</span><div><h2>{student.name}</h2><p>{student.className} · {student.school}</p><small>Submitted today at 10:24 AM · Attempt 1 of 3</small></div><span className="status-pill submitted">Submitted</span></div><div className="report-content"><p className="eyebrow">PRACTICAL REPORT · PHYSICS</p><h3>{student.experiment}</h3><ReportBlock title="Objective" text={`To investigate ${student.experiment.toLowerCase()} and verify the relationship between measured variables.`} /><ReportBlock title="Apparatus" text="Power supply, connecting wires, ammeter, voltmeter, resistance wire and switch." /><h4>Observation table</h4><table className="data-table compact"><thead><tr><th>Reading</th><th>Voltage (V)</th><th>Current (A)</th><th>Resistance (Ω)</th></tr></thead><tbody>{[["1", "2.0", "0.20", "10.0"], ["2", "4.0", "0.39", "10.3"], ["3", "6.0", "0.60", "10.0"]].map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table><ReportBlock title="Calculation" text="Mean resistance = V / I = 10.1 Ω. The gradient of the V–I graph represents the resistance." /><ReportBlock title="Conclusion" text="Potential difference is directly proportional to current when temperature and resistance are constant." /><ReportBlock title="Precaution" text="The key was opened between readings to prevent heating of the resistance wire." /><div className="student-upload"><BookOpen size={15} />Student notebook record · 3 observation readings attached</div></div></section><aside className="panel rubric-panel"><div className="panel-heading"><div><h2>Marking rubric</h2><p>WAEC practical · 100 marks</p></div><button className="icon-button" aria-label="Rubric information" title="Use the criteria to provide consistent feedback">ⓘ</button></div><div className="rubric-rows">{rubricCriteria.map((criterion, index) => <label className="rubric-row" key={criterion.name}><span><b>{criterion.name}</b><small>Max {criterion.max} marks</small></span><input aria-label={`${criterion.name} mark`} type="number" min="0" max={criterion.max} value={marks[index]} onChange={(event) => { const next = [...marks]; next[index] = Math.max(0, Math.min(criterion.max, Number(event.target.value))); setMarks(next); setPublished(false); }} /></label>)}</div><div className="grade-total"><span>Total mark</span><b>{total}<small> / 100</small></b><span className={`grade-letter grade-${gradeBand(total).toLowerCase()}`}>{gradeBand(total)}</span></div><label className="feedback-label">Overall feedback<textarea value={comment} onChange={(event) => { setComment(event.target.value); setPublished(false); }} placeholder="Share a helpful next step with the student..." rows={3} /></label><div className="grade-actions"><button className="button button-outline" onClick={() => { onPublish(student.id, total, comment); setPublished(false); }}>Save draft</button><button className="button button-primary" onClick={() => { onPublish(student.id, total, comment); setPublished(true); }}>Publish grade <ArrowRight size={15} /></button></div>{published && <p className="success-message"><CheckCircle2 size={15} />Grade {gradeBand(total)} published to {student.name.split(" ")[0]}.</p>}{grades[student.id] && <p className="autosave-note"><CheckCircle2 size={14} />Latest saved: {grades[student.id].score}/100 · Grade {grades[student.id].grade}</p>}</aside></div>
  </>;
}

function ReportBlock({ title, text }: { title: string; text: string }) {
  return <div className="report-block"><h4>{title}</h4><p>{text}</p></div>;
}
