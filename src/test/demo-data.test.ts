import { describe, expect, it } from "vitest";
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
} from "@/lib/demo-data";

describe("Digitalab demo data", () => {
  it("provides the documented student, teacher and example submissions", () => {
    expect(demoStudent.email).toBe("student@digitalab.ng");
    expect(demoTeacher.email).toBe("teacher@digitalab.ng");
    expect(demoStudents.map((student) => student.name)).toContain("Amina Bello");
    expect(demoStudents.filter((student) => student.status === "Submitted")).toHaveLength(2);
  });

  it("includes the practicals for each science subject", () => {
    for (const subject of ["Physics", "Chemistry", "Biology"]) {
      expect(experiments.some((experiment) => experiment.subject === subject)).toBe(true);
    }
    expect(experiments).toHaveLength(9);
  });

  it("calculates the pendulum period, Ohm's law and titration concentration", () => {
    expect(pendulumPeriod(1, 9.81)).toBeCloseTo(2.006, 2);
    expect(ohmsCurrent(6, 10)).toBeCloseTo(0.6);
    expect(acidConcentration(0.1, 25, 25)).toBeCloseTo(0.1);
  });

  it("maps practical totals to WAEC-style grade bands and rubric marks", () => {
    expect([85, 75, 65, 55, 45, 25].map(gradeBand)).toEqual(["A", "B", "C", "D", "E", "F"]);
    expect(rubricCriteria).toHaveLength(8);
    expect(rubricCriteria.reduce((total, criterion) => total + criterion.max, 0)).toBe(100);
  });
});
