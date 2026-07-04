const universities = [
  // === JAPAN ===
  {
    id: 1, country: "Japan", city: "Tokyo", name: "University of Tokyo", qs_rank: 32,
    tuition: 6000, living_cost: 14000,
    scholarships: { merit: true, need: false, government: false, university: true, research: true },
    employment_score: 9.8, employment_rate: 0.92, average_salary: "$48,000",
    work_rights: "Student visa + part-time", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["Data Scientist", "ML Engineer"], course: "Master of Data Science", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 7.0, toefl: 95, gre: 320 } },
      { careers: ["AI Engineer", "ML Engineer"], course: "Master of Artificial Intelligence", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.4, gpa4: 3.35, ielts: 7.0, toefl: 95, gre: 320 } },
      { careers: ["Business Analyst", "Product Manager"], course: "MBA", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.2, gpa4: 3.3, ielts: 6.5, toefl: 90, gmat: 650, work_experience_years: 3 } },
      { careers: ["AI Researcher", "Data Scientist"], course: "PhD in Artificial Intelligence", level: "PhD", language_track: "english",
        requirements: { gpa10: 9.0, gpa4: 3.7, ielts: 7.5, toefl: 100, gre: 325, research_projects: 2, publications: 1, faculty_match: true } },
    ],
  },
  {
    id: 2, country: "Japan", city: "Kyoto", name: "Kyoto University", qs_rank: 50,
    tuition: 5500, living_cost: 12000,
    scholarships: { merit: true, need: true, government: false, university: true, research: true },
    employment_score: 9.5, employment_rate: 0.88, average_salary: "$45,000",
    work_rights: "Student visa + part-time", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["Data Scientist"], course: "BSc Information Science", level: "Bachelor's", language_track: "english",
        requirements: { gpa10: 8.4, gpa4: 3.35, ielts: 6.0, toefl: 85, sat: 1380, act: 30 } },
      { careers: ["AI Engineer"], course: "BSc Computer Science", level: "Bachelor's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 6.5, toefl: 90, sat: 1400, act: 31 } },
      { careers: ["Data Scientist"], course: "Master of Data Analytics", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.2, gpa4: 3.3, ielts: 6.5, toefl: 90, gre: 315 } },
    ],
  },

  // === GERMANY ===
  {
    id: 3, country: "Germany", city: "Munich", name: "Technical University of Munich", qs_rank: 28,
    tuition: 1000, living_cost: 12000,
    scholarships: { merit: true, need: true, government: true, university: true, research: false },
    employment_score: 9.4, employment_rate: 0.91, average_salary: "$46,000",
    work_rights: "EU part-time visa privileges", intakes: ["Fall 2027", "Summer 2028"],
    programs: [
      { careers: ["Data Scientist", "AI Engineer"], course: "BSc Computer Science", level: "Bachelor's", language_track: "english",
        requirements: { gpa10: 8.2, gpa4: 3.3, ielts: 6.5, toefl: 90, sat: 1430, act: 31 } },
      { careers: ["Data Scientist"], course: "MSc Data Engineering and Analytics", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.0, gpa4: 3.2, ielts: 6.5, toefl: 90, gre: 310 } },
      { careers: ["AI Engineer"], course: "MSc Artificial Intelligence", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.0, gpa4: 3.2, ielts: 6.5, toefl: 90, gre: 310 } },
    ],
  },
  {
    id: 4, country: "Germany", city: "Berlin", name: "Humboldt University of Berlin", qs_rank: 120,
    tuition: 500, living_cost: 11000,
    scholarships: { merit: true, need: true, government: true, university: false, research: true },
    employment_score: 8.5, employment_rate: 0.85, average_salary: "$42,000",
    work_rights: "EU part-time visa privileges", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["Data Scientist", "Business Analyst"], course: "MSc Statistics", level: "Master's", language_track: "english",
        requirements: { gpa10: 7.8, gpa4: 3.1, ielts: 6.5, toefl: 88, gre: 305 } },
      { careers: ["AI Researcher"], course: "PhD in Computer Science", level: "PhD", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 7.0, toefl: 95, gre: 315, research_projects: 1, publications: 1, faculty_match: true } },
    ],
  },

  // === USA ===
  {
    id: 5, country: "USA", city: "Stanford", name: "Stanford University", qs_rank: 2,
    tuition: 55000, living_cost: 22000,
    scholarships: { merit: true, need: true, government: false, university: true, research: true },
    employment_score: 9.9, employment_rate: 0.96, average_salary: "$120,000",
    work_rights: "OPT/STEM OPT (1-3 years)", intakes: ["Fall 2027"],
    programs: [
      { careers: ["AI Engineer", "ML Engineer", "Data Scientist"], course: "MS Computer Science (AI)", level: "Master's", language_track: "english",
        requirements: { gpa10: 9.2, gpa4: 3.8, ielts: 7.5, toefl: 105, gre: 330 } },
      { careers: ["AI Researcher"], course: "PhD in Computer Science", level: "PhD", language_track: "english",
        requirements: { gpa10: 9.5, gpa4: 3.9, ielts: 7.5, toefl: 105, gre: 335, research_projects: 3, publications: 2, faculty_match: true } },
    ],
  },
  {
    id: 6, country: "USA", city: "Boston", name: "Massachusetts Institute of Technology", qs_rank: 1,
    tuition: 57000, living_cost: 20000,
    scholarships: { merit: true, need: true, government: false, university: true, research: true },
    employment_score: 9.9, employment_rate: 0.97, average_salary: "$125,000",
    work_rights: "OPT/STEM OPT (1-3 years)", intakes: ["Fall 2027"],
    programs: [
      { careers: ["AI Engineer", "Data Scientist"], course: "MEng in EECS", level: "Master's", language_track: "english",
        requirements: { gpa10: 9.3, gpa4: 3.85, ielts: 7.5, toefl: 105, gre: 332 } },
      { careers: ["Software Engineer", "Full Stack Developer"], course: "BSc Computer Science", level: "Bachelor's", language_track: "english",
        requirements: { gpa10: 9.5, gpa4: 3.9, ielts: 7.0, toefl: 100, sat: 1550, act: 35 } },
    ],
  },

  // === CANADA ===
  {
    id: 7, country: "Canada", city: "Toronto", name: "University of Toronto", qs_rank: 21,
    tuition: 45000, living_cost: 16000,
    scholarships: { merit: true, need: true, government: false, university: true, research: true },
    employment_score: 9.3, employment_rate: 0.90, average_salary: "$65,000",
    work_rights: "PGWP (up to 3 years)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["Data Scientist", "ML Engineer"], course: "MSc Applied Computing", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 7.0, toefl: 95, gre: 318 } },
      { careers: ["AI Engineer"], course: "MASc in ECE (ML Focus)", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.3, gpa4: 3.3, ielts: 7.0, toefl: 93, gre: 315 } },
    ],
  },
  {
    id: 8, country: "Canada", city: "Vancouver", name: "University of British Columbia", qs_rank: 34,
    tuition: 40000, living_cost: 15000,
    scholarships: { merit: true, need: true, government: false, university: true, research: false },
    employment_score: 9.0, employment_rate: 0.88, average_salary: "$60,000",
    work_rights: "PGWP (up to 3 years)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["Data Scientist", "Business Analyst"], course: "Master of Data Science", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.0, gpa4: 3.2, ielts: 6.5, toefl: 90, gre: 310 } },
      { careers: ["Software Engineer"], course: "BSc Computer Science", level: "Bachelor's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 6.5, toefl: 90, sat: 1400, act: 31 } },
    ],
  },

  // === AUSTRALIA ===
  {
    id: 9, country: "Australia", city: "Melbourne", name: "University of Melbourne", qs_rank: 14,
    tuition: 42000, living_cost: 16000,
    scholarships: { merit: true, need: false, government: true, university: true, research: true },
    employment_score: 9.2, employment_rate: 0.90, average_salary: "$55,000",
    work_rights: "Post-study work visa (2-4 years)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["Data Scientist", "AI Engineer"], course: "Master of IT (AI)", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.0, gpa4: 3.2, ielts: 6.5, toefl: 88, gre: 310 } },
      { careers: ["Software Engineer"], course: "Master of Software Engineering", level: "Master's", language_track: "english",
        requirements: { gpa10: 7.8, gpa4: 3.1, ielts: 6.5, toefl: 88, gre: 305 } },
    ],
  },
  {
    id: 10, country: "Australia", city: "Sydney", name: "University of Sydney", qs_rank: 18,
    tuition: 44000, living_cost: 17000,
    scholarships: { merit: true, need: false, government: true, university: true, research: false },
    employment_score: 9.0, employment_rate: 0.88, average_salary: "$52,000",
    work_rights: "Post-study work visa (2-4 years)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["Data Scientist"], course: "Master of Data Science", level: "Master's", language_track: "english",
        requirements: { gpa10: 7.5, gpa4: 3.0, ielts: 6.5, toefl: 85, gre: 305 } },
      { careers: ["Business Analyst", "Product Manager"], course: "MBA", level: "Master's", language_track: "english",
        requirements: { gpa10: 7.8, gpa4: 3.1, ielts: 7.0, toefl: 95, gmat: 620, work_experience_years: 2 } },
    ],
  },

  // === UNITED KINGDOM ===
  {
    id: 11, country: "United Kingdom", city: "London", name: "Imperial College London", qs_rank: 6,
    tuition: 38000, living_cost: 18000,
    scholarships: { merit: true, need: false, government: false, university: true, research: true },
    employment_score: 9.6, employment_rate: 0.93, average_salary: "$65,000",
    work_rights: "Graduate Route (2 years)", intakes: ["Fall 2027"],
    programs: [
      { careers: ["AI Engineer", "ML Engineer"], course: "MSc Computing (AI & ML)", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.8, gpa4: 3.6, ielts: 7.0, toefl: 100, gre: 322 } },
      { careers: ["Data Scientist"], course: "MSc Data Science", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 7.0, toefl: 100, gre: 318 } },
    ],
  },
  {
    id: 12, country: "United Kingdom", city: "London", name: "University College London", qs_rank: 9,
    tuition: 35000, living_cost: 17000,
    scholarships: { merit: true, need: true, government: false, university: true, research: false },
    employment_score: 9.3, employment_rate: 0.90, average_salary: "$58,000",
    work_rights: "Graduate Route (2 years)", intakes: ["Fall 2027"],
    programs: [
      { careers: ["Data Scientist", "ML Engineer"], course: "MSc Machine Learning", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 7.0, toefl: 95, gre: 320 } },
      { careers: ["Software Engineer"], course: "BSc Computer Science", level: "Bachelor's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 6.5, toefl: 92, sat: 1450, act: 32 } },
    ],
  },

  // === SOUTH KOREA ===
  {
    id: 13, country: "South Korea", city: "Seoul", name: "Seoul National University", qs_rank: 31,
    tuition: 7000, living_cost: 10000,
    scholarships: { merit: true, need: true, government: true, university: true, research: true },
    employment_score: 9.3, employment_rate: 0.91, average_salary: "$38,000",
    work_rights: "D-10 visa (2 years)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["AI Engineer", "Data Scientist"], course: "MSc Computer Science (AI)", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 6.5, toefl: 90, gre: 315 } },
      { careers: ["Data Scientist"], course: "MSc Data Science", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.2, gpa4: 3.3, ielts: 6.5, toefl: 88, gre: 310 } },
    ],
  },
  {
    id: 14, country: "South Korea", city: "Daejeon", name: "KAIST", qs_rank: 42,
    tuition: 5000, living_cost: 8000,
    scholarships: { merit: true, need: false, government: true, university: true, research: true },
    employment_score: 9.5, employment_rate: 0.93, average_salary: "$42,000",
    work_rights: "D-10 visa (2 years)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["AI Engineer", "ML Engineer"], course: "MS in AI", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.8, gpa4: 3.5, ielts: 6.5, toefl: 90, gre: 318 } },
      { careers: ["AI Researcher"], course: "PhD in AI", level: "PhD", language_track: "english",
        requirements: { gpa10: 9.0, gpa4: 3.7, ielts: 7.0, toefl: 95, gre: 325, research_projects: 2, publications: 1, faculty_match: true } },
    ],
  },

  // === NETHERLANDS ===
  {
    id: 15, country: "Netherlands", city: "Delft", name: "TU Delft", qs_rank: 47,
    tuition: 18000, living_cost: 12000,
    scholarships: { merit: true, need: false, government: false, university: true, research: false },
    employment_score: 9.0, employment_rate: 0.89, average_salary: "$48,000",
    work_rights: "Orientation Year (1 year)", intakes: ["Fall 2027"],
    programs: [
      { careers: ["AI Engineer", "Data Scientist"], course: "MSc Computer Science (AI)", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.0, gpa4: 3.2, ielts: 6.5, toefl: 90, gre: 310 } },
      { careers: ["Data Engineer", "Software Engineer"], course: "MSc Computer Engineering", level: "Master's", language_track: "english",
        requirements: { gpa10: 7.8, gpa4: 3.1, ielts: 6.5, toefl: 88, gre: 305 } },
    ],
  },
  {
    id: 16, country: "Netherlands", city: "Amsterdam", name: "University of Amsterdam", qs_rank: 53,
    tuition: 15000, living_cost: 13000,
    scholarships: { merit: true, need: true, government: false, university: true, research: false },
    employment_score: 8.8, employment_rate: 0.87, average_salary: "$45,000",
    work_rights: "Orientation Year (1 year)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["Data Scientist", "AI Engineer"], course: "MSc Artificial Intelligence", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.0, gpa4: 3.2, ielts: 6.5, toefl: 90, gre: 308 } },
      { careers: ["Business Analyst"], course: "MSc Business Analytics", level: "Master's", language_track: "english",
        requirements: { gpa10: 7.5, gpa4: 3.0, ielts: 6.5, toefl: 88, gmat: 600 } },
    ],
  },

  // === SINGAPORE ===
  {
    id: 17, country: "Singapore", city: "Singapore", name: "National University of Singapore", qs_rank: 8,
    tuition: 35000, living_cost: 16000,
    scholarships: { merit: true, need: true, government: true, university: true, research: true },
    employment_score: 9.6, employment_rate: 0.94, average_salary: "$55,000",
    work_rights: "LTVP (1 year)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["AI Engineer", "Data Scientist"], course: "MSc Computer Science (AI)", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 6.5, toefl: 90, gre: 320 } },
      { careers: ["Business Analyst", "Product Manager"], course: "MBA", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.0, gpa4: 3.2, ielts: 6.5, toefl: 90, gmat: 680, work_experience_years: 2 } },
    ],
  },
  {
    id: 18, country: "Singapore", city: "Singapore", name: "Nanyang Technological University", qs_rank: 15,
    tuition: 32000, living_cost: 14000,
    scholarships: { merit: true, need: false, government: true, university: true, research: true },
    employment_score: 9.4, employment_rate: 0.92, average_salary: "$50,000",
    work_rights: "LTVP (1 year)", intakes: ["Fall 2027", "Spring 2028"],
    programs: [
      { careers: ["AI Engineer", "ML Engineer"], course: "MSc AI", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.2, gpa4: 3.3, ielts: 6.5, toefl: 88, gre: 315 } },
      { careers: ["Data Scientist"], course: "MSc Data Science", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.0, gpa4: 3.2, ielts: 6.5, toefl: 88, gre: 310 } },
    ],
  },

  // === FRANCE ===
  {
    id: 19, country: "France", city: "Paris", name: "Université PSL (Paris Sciences et Lettres)", qs_rank: 24,
    tuition: 5000, living_cost: 14000,
    scholarships: { merit: true, need: true, government: true, university: true, research: true },
    employment_score: 9.1, employment_rate: 0.88, average_salary: "$42,000",
    work_rights: "APS (1 year)", intakes: ["Fall 2027"],
    programs: [
      { careers: ["AI Researcher", "Data Scientist"], course: "MSc Mathematics and AI", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.5, gpa4: 3.4, ielts: 6.5, toefl: 90, gre: 315 } },
      { careers: ["AI Researcher"], course: "PhD in Machine Learning", level: "PhD", language_track: "english",
        requirements: { gpa10: 9.0, gpa4: 3.7, ielts: 7.0, toefl: 100, gre: 320, research_projects: 2, publications: 1, faculty_match: true } },
    ],
  },
  {
    id: 20, country: "France", city: "Paris", name: "École Polytechnique", qs_rank: 38,
    tuition: 12000, living_cost: 13000,
    scholarships: { merit: true, need: false, government: true, university: true, research: false },
    employment_score: 9.3, employment_rate: 0.91, average_salary: "$50,000",
    work_rights: "APS (1 year)", intakes: ["Fall 2027"],
    programs: [
      { careers: ["AI Engineer", "Data Scientist"], course: "MSc Data Science for Business", level: "Master's", language_track: "english",
        requirements: { gpa10: 8.2, gpa4: 3.3, ielts: 6.5, toefl: 90, gre: 312 } },
      { careers: ["Software Engineer"], course: "BSc in Science and Engineering", level: "Bachelor's", language_track: "english",
        requirements: { gpa10: 8.8, gpa4: 3.5, ielts: 6.5, toefl: 90, sat: 1450, act: 32 } },
    ],
  },
];

export default universities;