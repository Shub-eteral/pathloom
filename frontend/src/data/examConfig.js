export const EXAMS = {
  IELTS: { min: 0, max: 9, step: 0.5, label: "IELTS Academic", type: "language" },
  TOEFL: { min: 0, max: 120, step: 1, label: "TOEFL iBT", type: "language" },
  GRE: { min: 260, max: 340, step: 1, label: "GRE General", type: "admission" },
  GMAT: { min: 200, max: 800, step: 10, label: "GMAT", type: "admission" },
  SAT: { min: 400, max: 1600, step: 10, label: "SAT", type: "admission" },
  ACT: { min: 1, max: 36, step: 1, label: "ACT", type: "admission" },
  JLPT: { levels: ["N5", "N4", "N3", "N2", "N1"], label: "JLPT", type: "language" },
  TOPIK: { levels: ["1", "2", "3", "4", "5", "6"], label: "TOPIK", type: "language" },
  DELF: { levels: ["A1", "A2", "B1", "B2", "C1", "C2"], label: "DELF/DALF", type: "language" },
  TestDaF: { min: 3, max: 5, step: 1, label: "TestDaF", type: "language" },
};

export const LANGUAGE_EXAMS = ["IELTS", "TOEFL", "JLPT", "TOPIK", "DELF", "TestDaF"];

export const ADMISSION_EXAMS_BY_LEVEL = {
  "Bachelor's": ["SAT", "ACT"],
  "Master's": ["GRE", "GMAT"],
  "PhD": ["GRE"],
};
