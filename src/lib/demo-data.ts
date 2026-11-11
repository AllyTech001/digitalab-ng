export type Subject = "Physics" | "Chemistry" | "Biology";

export type Experiment = {
  id: string;
  subject: Subject;
  title: string;
  topic: string;
  description: string;
  duration: string;
  equipment: string[];
};

export type Student = {
  id: string;
  name: string;
  email: string;
  className: string;
  school: string;
  status: "Submitted" | "In progress" | "Not started";
  experiment: string;
  score?: number;
};

export const demoStudent = {
  name: "Chioma Adeleke",
  email: "student@digitalab.ng",
  studentId: "DLAB-SS2-2026-042",
  className: "SS2 Science",
  school: "King's College Lagos",
};

export const demoTeacher = {
  name: "Mr. Babatunde Okafor",
  email: "teacher@digitalab.ng",
  school: "King's College Lagos",
  title: "Senior Science Master & HOD",
};

export const experiments: Experiment[] = [
  {
    id: "pendulum",
    subject: "Physics",
    title: "Simple harmonic motion",
    topic: "Pendulum and gravity",
    description: "Measure oscillation periods at different string lengths and estimate gravitational acceleration.",
    duration: "20 min",
    equipment: ["Pendulum bob", "Metre rule", "Stopwatch"],
  },
  {
    id: "ohms-law",
    subject: "Physics",
    title: "Ohm's law",
    topic: "Current electricity",
    description: "Investigate the relationship between potential difference and current in a resistor.",
    duration: "15 min",
    equipment: ["DC power supply", "Resistor", "Ammeter", "Voltmeter"],
  },
  {
    id: "hookes-law",
    subject: "Physics",
    title: "Hooke's law",
    topic: "Elasticity",
    description: "Explore how an applied force changes the extension of a spring.",
    duration: "15 min",
    equipment: ["Spring", "Slotted masses", "Ruler"],
  },
  {
    id: "titration",
    subject: "Chemistry",
    title: "Acid-base titration",
    topic: "Volumetric analysis",
    description: "Find the concentration of an acid using a standard alkali and an indicator.",
    duration: "25 min",
    equipment: ["Burette", "Pipette", "Conical flask", "Indicator"],
  },
  {
    id: "reaction-rate",
    subject: "Chemistry",
    title: "Reaction kinetics",
    topic: "Rates of reaction",
    description: "Observe how concentration affects the rate of a gas-producing reaction.",
    duration: "20 min",
    equipment: ["Calcium carbonate", "Hydrochloric acid", "Gas syringe"],
  },
  {
    id: "qualitative-analysis",
    subject: "Chemistry",
    title: "Qualitative analysis",
    topic: "Ions and identification",
    description: "Use systematic wet tests to identify common cations and anions.",
    duration: "20 min",
    equipment: ["Test tubes", "Reagents", "Bunsen burner"],
  },
  {
    id: "microscope",
    subject: "Biology",
    title: "Using the light microscope",
    topic: "Cells and microscopy",
    description: "Focus prepared slides and identify structures in plant and animal cells.",
    duration: "15 min",
    equipment: ["Light microscope", "Prepared slide", "Lens paper"],
  },
  {
    id: "food-tests",
    subject: "Biology",
    title: "Biochemical food tests",
    topic: "Nutrition",
    description: "Test food samples for starch, reducing sugars, protein and lipids.",
    duration: "20 min",
    equipment: ["Iodine", "Benedict's solution", "Biuret reagent", "Ethanol"],
  },
  {
    id: "osmosis",
    subject: "Biology",
    title: "Osmosis in plant tissue",
    topic: "Transport in plants",
    description: "Compare potato strips in sucrose solutions of different concentrations.",
    duration: "20 min",
    equipment: ["Potato strips", "Sucrose solutions", "Balance", "Ruler"],
  },
];

export const demoStudents: Student[] = [
  { id: "042", name: "Chioma Adeleke", email: "student@digitalab.ng", className: "SS2 Physics", school: "King's College Lagos", status: "In progress", experiment: "Simple harmonic motion" },
  { id: "043", name: "Emeka Nwosu", email: "emeka.nwosu@student.ng", className: "SS2 Physics", school: "King's College Lagos", status: "Submitted", experiment: "Ohm's law", score: 76 },
  { id: "044", name: "Amina Bello", email: "amina.bello@student.ng", className: "SS2 Chemistry", school: "Queen's College Yaba", status: "Submitted", experiment: "Acid-base titration", score: 0 },
  { id: "051", name: "Tunde Bakare", email: "tunde.bakare@student.ng", className: "SS1 Biology", school: "King's College Lagos", status: "Not started", experiment: "Biochemical food tests" },
];

export const rubricCriteria = [
  { name: "Aim and objectives", max: 5 },
  { name: "Apparatus and materials", max: 5 },
  { name: "Experimental procedure", max: 10 },
  { name: "Observation and recording", max: 15 },
  { name: "Graph and presentation", max: 15 },
  { name: "Calculations and accuracy", max: 20 },
  { name: "Discussion and conclusion", max: 15 },
  { name: "Precautions and safety", max: 15 },
];

export function pendulumPeriod(length: number, gravity: number): number {
  return 2 * Math.PI * Math.sqrt(length / gravity);
}

export function ohmsCurrent(voltage: number, resistance: number): number {
  return voltage / resistance;
}

export function acidConcentration(
  baseConcentration: number,
  baseVolume: number,
  acidVolume: number,
): number {
  return (baseConcentration * baseVolume) / acidVolume;
}

export function gradeBand(score: number): string {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  if (score >= 40) return "E";
  return "F";
}
