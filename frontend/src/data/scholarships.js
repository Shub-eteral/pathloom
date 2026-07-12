const scholarships = [
  // === JAPAN ===
  { id: 1, name: "MEXT Scholarship", country: "Japan", amount: "Full Tuition + ¥143,000/month Stipend", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["Bachelor's", "Master's", "PhD"], type: "Government", deadline: "April (annually)", eligibility_notes: "Must be under 35 for research students. Embassy and university recommendation tracks available." },
  { id: 2, name: "JASSO Scholarship", country: "Japan", amount: "¥48,000/month (~$500)", min_gpa_10: 8.0, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's"], type: "Government", deadline: "Varies by university", eligibility_notes: "For privately-funded international students already enrolled." },
  { id: 3, name: "ADB Japan Scholarship", country: "Japan", amount: "Full Tuition + Living Allowance", min_gpa_10: 8.3, min_ielts: 6.5, degree_levels: ["Master's"], type: "Government", deadline: "Varies", eligibility_notes: "For citizens of ADB borrowing member countries. Must return to home country after graduation." },

  // === GERMANY ===
  { id: 4, name: "DAAD Scholarship", country: "Germany", amount: "Full Tuition + €934-1,300/month", min_gpa_10: 8.3, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "October (annually)", eligibility_notes: "Covers health insurance, travel allowance. Must have completed bachelor's with above-average results." },
  { id: 5, name: "Deutschland Stipendium", country: "Germany", amount: "€300/month", min_gpa_10: 7.5, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's"], type: "University", deadline: "Varies by university", eligibility_notes: "Merit-based, co-funded by federal government and private donors." },
  { id: 6, name: "Heinrich Böll Foundation", country: "Germany", amount: "€861-1,200/month + Tuition", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Bachelor's", "Master's", "PhD"], type: "Foundation", deadline: "March & September", eligibility_notes: "For students with outstanding academic records and social/political engagement." },

  // === USA ===
  { id: 7, name: "Fulbright Foreign Student Program", country: "USA", amount: "Full Tuition + Living + Travel", min_gpa_10: 8.8, min_ielts: 7.0, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "February (annually)", eligibility_notes: "Highly competitive. Must demonstrate leadership and academic excellence." },
  { id: 8, name: "Hubert H. Humphrey Fellowship", country: "USA", amount: "Full Support (non-degree)", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "Government", deadline: "June (annually)", eligibility_notes: "For mid-career professionals with leadership potential." },
  { id: 9, name: "Joint Japan/World Bank Scholarship", country: "USA", amount: "Full Tuition + Living", min_gpa_10: 8.0, min_ielts: 7.0, degree_levels: ["Master's"], type: "Foundation", deadline: "April (annually)", eligibility_notes: "For developing country nationals. Must have 2+ years relevant experience." },
  { id: 10, name: "Aga Khan Foundation Scholarship", country: "USA", amount: "50% Tuition (loan/grant)", min_gpa_10: 8.5, min_ielts: 7.0, degree_levels: ["Master's"], type: "Foundation", deadline: "March (annually)", eligibility_notes: "Need-based for students from select developing countries. Half-grant, half-loan." },

  // === CANADA ===
  { id: 11, name: "Vanier Canada Graduate Scholarships", country: "Canada", amount: "CAD $50,000/year (3 years)", min_gpa_10: 9.0, min_ielts: 7.0, degree_levels: ["PhD"], type: "Government", deadline: "November (annually)", eligibility_notes: "Canada's most prestigious doctoral award. Must demonstrate leadership and research potential." },
  { id: 12, name: "Ontario Graduate Scholarship", country: "Canada", amount: "CAD $15,000/year", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "Varies by university", eligibility_notes: "Available at Ontario universities. Both domestic and international students." },
  { id: 13, name: "Lester B. Pearson Scholarship", country: "Canada", amount: "Full Tuition + Books + Living (4 years)", min_gpa_10: 9.0, min_ielts: 7.0, degree_levels: ["Bachelor's"], type: "University", deadline: "November (annually)", eligibility_notes: "University of Toronto's most prestigious undergraduate award. School nomination required." },
  { id: 14, name: "Banting Postdoctoral Fellowships", country: "Canada", amount: "CAD $70,000/year (2 years)", min_gpa_10: 9.0, min_ielts: 7.0, degree_levels: ["PhD"], type: "Government", deadline: "September (annually)", eligibility_notes: "For postdoctoral researchers. Must be within 2 years of PhD completion." },

  // === AUSTRALIA ===
  { id: 15, name: "Australia Awards Scholarships", country: "Australia", amount: "Full Tuition + Living + Return Travel", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "April (annually)", eligibility_notes: "For students from partner developing countries. Includes pre-departure support." },
  { id: 16, name: "Research Training Program (RTP)", country: "Australia", amount: "Full Tuition + AUD $28,854/year", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["PhD"], type: "Government", deadline: "Varies by university", eligibility_notes: "Australian Government-funded research degree support." },
  { id: 17, name: "Endeavour Leadership Program", country: "Australia", amount: "Up to AUD $272,500 (full support)", min_gpa_10: 8.3, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "April (annually)", eligibility_notes: "Covers tuition, travel, living costs, and health insurance." },

  // === UNITED KINGDOM ===
  { id: 18, name: "Chevening Scholarships", country: "United Kingdom", amount: "Full Tuition + £1,133/month Living", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "Government", deadline: "November (annually)", eligibility_notes: "UK Government's global scholarship. Requires 2+ years work experience and return to home country." },
  { id: 19, name: "Commonwealth Scholarships", country: "United Kingdom", amount: "Full Tuition + Stipend + Travel", min_gpa_10: 8.5, min_ielts: 7.0, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "December (annually)", eligibility_notes: "For Commonwealth country citizens. Strong academic and development impact required." },
  { id: 20, name: "Gates Cambridge Scholarship", country: "United Kingdom", amount: "Full Cost of Study + Living", min_gpa_10: 9.0, min_ielts: 7.5, degree_levels: ["PhD", "Master's"], type: "Foundation", deadline: "October & December", eligibility_notes: "One of the world's most prestigious scholarships. Must demonstrate academic excellence, leadership, and commitment to improving others' lives." },
  { id: 21, name: "Rhodes Scholarship (Oxford)", country: "United Kingdom", amount: "Full Tuition + Living (2-3 years)", min_gpa_10: 9.0, min_ielts: 7.5, degree_levels: ["Master's", "PhD"], type: "Foundation", deadline: "July-October (varies by country)", eligibility_notes: "Oldest and most famous international scholarship. Age 19-25. Must show character, leadership, and academic distinction." },

  // === SOUTH KOREA ===
  { id: 22, name: "Korean Government Scholarship (KGSP)", country: "South Korea", amount: "Full Tuition + ₩900,000/month", min_gpa_10: 8.0, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's", "PhD"], type: "Government", deadline: "February (annually)", eligibility_notes: "Includes 1 year Korean language training. Applicants must be under 40." },
  { id: 23, name: "KAIST International Student Scholarship", country: "South Korea", amount: "Full Tuition + Living Stipend", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "University", deadline: "April & October", eligibility_notes: "Automatic consideration for all admitted international students at KAIST." },

  // === NETHERLANDS ===
  { id: 24, name: "Holland Scholarship", country: "Netherlands", amount: "€5,000 (one-time)", min_gpa_10: 7.5, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's"], type: "Government", deadline: "February (annually)", eligibility_notes: "For non-EEA students. First-time applicants to Dutch universities only." },
  { id: 25, name: "Erasmus Mundus Joint Masters", country: "Netherlands", amount: "€25,000 + €1,000/month", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "Government", deadline: "Varies by programme", eligibility_notes: "EU-funded. Multi-country programmes. Highly competitive." },
  { id: 26, name: "Orange Knowledge Programme", country: "Netherlands", amount: "Full Tuition + Living + Travel", min_gpa_10: 7.5, min_ielts: 6.0, degree_levels: ["Master's"], type: "Government", deadline: "March (annually)", eligibility_notes: "For professionals from 49 partner countries. Must have employer sponsorship." },

  // === SINGAPORE ===
  { id: 27, name: "Singapore International Graduate Award (SINGA)", country: "Singapore", amount: "Full Tuition + SGD $2,200/month (4 years)", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["PhD"], type: "Government", deadline: "June & December", eligibility_notes: "A*STAR funded. For research in science and engineering at NUS, NTU, SMU, or SUTD." },
  { id: 28, name: "ASEAN Scholarship", country: "Singapore", amount: "Full Tuition + Living Allowance", min_gpa_10: 8.0, min_ielts: 6.0, degree_levels: ["Bachelor's"], type: "Government", deadline: "March (annually)", eligibility_notes: "For ASEAN country citizens under 25. Covers secondary and pre-university education too." },

  // === FRANCE ===
  { id: 29, name: "Eiffel Excellence Scholarship", country: "France", amount: "€1,181/month (Master's) or €1,700/month (PhD)", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "January (annually)", eligibility_notes: "French Government's flagship scholarship. University must nominate the candidate." },
  { id: 30, name: "Emile Boutmy Scholarship (Sciences Po)", country: "France", amount: "€5,000-€10,000/year", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Bachelor's", "Master's"], type: "University", deadline: "December (annually)", eligibility_notes: "For non-EU students at Sciences Po. Based on academic excellence and profile diversity." },

  // === SWEDEN ===
  { id: 31, name: "Swedish Institute Scholarships (SISS)", country: "Sweden", amount: "Full Tuition + SEK 10,000/month + Travel", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "Government", deadline: "February (annually)", eligibility_notes: "For students from 40+ eligible countries. Must demonstrate leadership and sustainability interest." },
  { id: 32, name: "KTH Tuition Fee Waiver", country: "Sweden", amount: "Full or Partial Tuition Waiver", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "University", deadline: "January (annually)", eligibility_notes: "For non-EU/EEA students with outstanding academic records admitted to KTH." },

  // === SWITZERLAND ===
  { id: 33, name: "Swiss Government Excellence Scholarships", country: "Switzerland", amount: "CHF 1,920/month + Tuition", min_gpa_10: 8.5, min_ielts: 7.0, degree_levels: ["PhD", "Master's"], type: "Government", deadline: "November (annually)", eligibility_notes: "Promotes international exchange. For PhD research and select Master's at Swiss universities." },
  { id: 34, name: "ETH Zurich Excellence Scholarship", country: "Switzerland", amount: "CHF 12,000/semester + Living Stipend", min_gpa_10: 9.0, min_ielts: 7.0, degree_levels: ["Master's"], type: "University", deadline: "December (annually)", eligibility_notes: "For top 5% of admitted Master's students. Must have outstanding academic record." },

  // === NEW ZEALAND ===
  { id: 35, name: "New Zealand Scholarships", country: "New Zealand", amount: "Full Tuition + Living + Travel", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "March (annually)", eligibility_notes: "MFAT-funded. For citizens from eligible Pacific, Asian, and African countries." },

  // === IRELAND ===
  { id: 36, name: "Government of Ireland Scholarships", country: "Ireland", amount: "€10,000/year + Tuition", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["PhD"], type: "Government", deadline: "October (annually)", eligibility_notes: "IRC-funded. Open to all nationalities for doctoral research at Irish universities." },
  { id: 37, name: "Trinity College Dublin Provost PhD Awards", country: "Ireland", amount: "Full Tuition + €18,500/year Stipend", min_gpa_10: 8.5, min_ielts: 7.0, degree_levels: ["PhD"], type: "University", deadline: "February (annually)", eligibility_notes: "Fully funded 4-year positions. Open to outstanding international researchers." },

  // === FINLAND ===
  { id: 38, name: "Finnish Government Scholarship Pool", country: "Finland", amount: "€1,500/month (3-9 months)", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["PhD"], type: "Government", deadline: "February (annually)", eligibility_notes: "For doctoral research and studies. Available to citizens of 60+ countries." },
  { id: 39, name: "Aalto University Scholarships", country: "Finland", amount: "Full or 50% Tuition Waiver", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "University", deadline: "January (annually)", eligibility_notes: "Automatic consideration upon admission. Based on academic merit." },

  // === DENMARK ===
  { id: 40, name: "Danish Government Scholarships", country: "Denmark", amount: "Full or Partial Tuition Waiver + DKK 6,243/month", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "Government", deadline: "March (annually)", eligibility_notes: "For highly qualified non-EU/EEA students at Danish universities." },

  // === NORWAY ===
  { id: 41, name: "Norwegian State Educational Loan Fund (Lånekassen)", country: "Norway", amount: "NOK 11,870/month (loan convertible to grant)", min_gpa_10: 7.0, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's", "PhD"], type: "Government", deadline: "Continuous", eligibility_notes: "Public universities charge no tuition. This fund covers living costs. Up to 40% converted to grant upon completion." },

  // === ITALY ===
  { id: 42, name: "Italian Government Scholarships", country: "Italy", amount: "€900/month + Tuition Waiver", min_gpa_10: 8.0, min_ielts: 6.0, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "Varies (usually March)", eligibility_notes: "For foreign citizens and Italian citizens abroad. Covers 6-9 month study/research periods." },
  { id: 43, name: "Politecnico di Milano Merit Scholarship", country: "Italy", amount: "€10,000/year Tuition Reduction", min_gpa_10: 8.5, min_ielts: 6.0, degree_levels: ["Master's"], type: "University", deadline: "April (annually)", eligibility_notes: "Merit-based for top international applicants. Automatic consideration." },

  // === SPAIN ===
  { id: 44, name: "Spanish Government Scholarships (AECID)", country: "Spain", amount: "€600-€900/month + Tuition", min_gpa_10: 7.5, min_ielts: 6.0, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "Varies", eligibility_notes: "Through the Spanish Agency for International Development Cooperation." },

  // === MALAYSIA ===
  { id: 45, name: "Malaysian International Scholarship (MIS)", country: "Malaysia", amount: "Full Tuition + Monthly Allowance + Travel", min_gpa_10: 8.0, min_ielts: 6.0, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "April (annually)", eligibility_notes: "Malaysian Government scholarship for outstanding international students at public universities." },
];

export default scholarships;