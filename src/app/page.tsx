import Link from "next/link";
import { ArrowRight, Atom, BookOpen, FlaskConical, Microscope, ShieldCheck, Sparkles } from "lucide-react";

const subjects = [
  { name: "Physics", text: "Explore motion, electricity and optics with interactive apparatus.", icon: <Atom size={21} />, color: "physics" },
  { name: "Chemistry", text: "Practise titration, reaction rates and qualitative analysis.", icon: <FlaskConical size={21} />, color: "chemistry" },
  { name: "Biology", text: "Investigate cells, food tests and transport in living things.", icon: <Microscope size={21} />, color: "biology" },
];

export default function HomePage() {
  return (
    <main className="welcome-page">
      <header className="welcome-nav"><Link href="/" className="brand-lockup"><span className="brand-mark"><FlaskConical size={21} /></span><span><strong>digitalab</strong><small>NG · VIRTUAL LAB</small></span></Link><span className="welcome-tag"><ShieldCheck size={15} /> Built for Nigerian classrooms</span></header>
      <section className="welcome-hero"><div className="hero-copy"><span className="hero-kicker"><Sparkles size={15} /> YOUR CLASSROOM, REIMAGINED</span><h1>Curiosity is the first step to <em>discovery.</em></h1><p>A practical science laboratory for every student. Run real experiments, record your observations and learn by doing — wherever you are.</p><div className="welcome-actions"><Link href="/student" className="button button-primary">Enter as a student <ArrowRight size={16} /></Link><Link href="/teacher" className="button button-outline">Teacher portal <ArrowRight size={16} /></Link></div><div className="demo-hint"><CheckMark /> Demo accounts are ready — no sign-up or database setup needed.</div></div><div className="hero-art" aria-hidden="true"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-flask"><FlaskConical size={90} strokeWidth={1.1} /><span /></div><div className="float-card float-physics"><Atom size={16} /><span>Physics</span><b>g = 9.81 m/s²</b></div><div className="float-card float-chemistry"><FlaskConical size={16} /><span>Chemistry</span><b>Endpoint reached</b></div><div className="float-card float-biology"><Microscope size={16} /><span>Biology</span><b>40× magnification</b></div><span className="hero-sparkle sparkle-a">✳</span><span className="hero-sparkle sparkle-b">✳</span></div></section>
      <section className="welcome-subjects"><div className="welcome-section-title"><div><p className="eyebrow">THREE SCIENCES. ENDLESS DISCOVERIES.</p><h2>Step into your laboratory.</h2></div><p>Curriculum-aligned for WAEC, NECO and JAMB practical science.</p></div><div className="welcome-subject-grid">{subjects.map((subject) => <article className={`welcome-subject ${subject.color}`} key={subject.name}><span className="subject-icon">{subject.icon}</span><h3>{subject.name}</h3><p>{subject.text}</p><Link href="/student/labs">Explore lab <ArrowRight size={14} /></Link></article>)}</div></section>
      <section className="welcome-bottom"><span className="bottom-icon"><BookOpen size={19} /></span><div><b>Your work stays yours.</b><p>Notebook entries, assignments and grades save privately in this browser. Supabase is optional.</p></div><span className="bottom-safe"><ShieldCheck size={15} /> Safe demo environment</span></section>
      <footer className="welcome-footer"><span>© 2026 Digitalab NG</span><span>Making practical science accessible across Nigeria</span><span>WAEC · NECO · JAMB aligned</span></footer>
    </main>
  );
}

function CheckMark() {
  return <span className="check-mark">✓</span>;
}
