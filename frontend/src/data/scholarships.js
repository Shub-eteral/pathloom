const scholarships = [
  // Japan
  { id: 1, name: "MEXT Scholarship", country: "Japan", amount: "Full Tuition + ¥143,000/month Stipend", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["Bachelor's", "Master's", "PhD"], type: "Government", deadline: "April (annually)", eligibility_notes: "Must be under 35 for research students. Embassy and university recommendation tracks available." },
  { id: 2, name: "JASSO Scholarship", country: "Japan", amount: "¥48,000/month (~$500)", min_gpa_10: 8.0, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's"], type: "Government", deadline: "Varies by university", eligibility_notes: "For privately-funded international students already enrolled." },

  // Germany
  { id: 3, name: "DAAD Scholarship", country: "Germany", amount: "Full Tuition + €934-1,300/month", min_gpa_10: 8.3, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "October (annually)", eligibility_notes: "Covers health insurance, travel allowance. Must have completed bachelor's with above-average results." },
  { id: 4, name: "Deutschland Stipendium", country: "Germany", amount: "€300/month", min_gpa_10: 7.5, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's"], type: "University", deadline: "Varies by university", eligibility_notes: "Merit-based, co-funded by federal government and private donors." },

  // USA
  { id: 5, name: "Fulbright Foreign Student Program", country: "USA", amount: "Full Tuition + Living + Travel", min_gpa_10: 8.8, min_ielts: 7.0, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "February (annually)", eligibility_notes: "Highly competitive. Must demonstrate leadership and academic excellence." },
  { id: 6, name: "Hubert H. Humphrey Fellowship", country: "USA", amount: "Full Support (non-degree)", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "Government", deadline: "June (annually)", eligibility_notes: "For mid-career professionals with leadership potential." },

  // Canada
  { id: 7, name: "Vanier Canada Graduate Scholarships", country: "Canada", amount: "CAD $50,000/year (3 years)", min_gpa_10: 9.0, min_ielts: 7.0, degree_levels: ["PhD"], type: "Government", deadline: "November (annually)", eligibility_notes: "Canada's most prestigious doctoral award. Must demonstrate leadership and research potential." },
  { id: 8, name: "Ontario Graduate Scholarship", country: "Canada", amount: "CAD $15,000/year", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "Varies by university", eligibility_notes: "Available at Ontario universities. Both domestic and international students." },

  // Australia
  { id: 9, name: "Australia Awards Scholarships", country: "Australia", amount: "Full Tuition + Living + Return Travel", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "April (annually)", eligibility_notes: "For students from partner developing countries. Includes pre-departure support." },
  { id: 10, name: "Research Training Program (RTP)", country: "Australia", amount: "Full Tuition + AUD $28,854/year", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["PhD"], type: "Government", deadline: "Varies by university", eligibility_notes: "Australian Government-funded research degree support." },

  // United Kingdom
  { id: 11, name: "Chevening Scholarships", country: "United Kingdom", amount: "Full Tuition + £1,133/month Living", min_gpa_10: 8.0, min_ielts: 6.5, degree_levels: ["Master's"], type: "Government", deadline: "November (annually)", eligibility_notes: "UK Government's global scholarship. Requires 2+ years work experience and return to home country." },
  { id: 12, name: "Commonwealth Scholarships", country: "United Kingdom", amount: "Full Tuition + Stipend + Travel", min_gpa_10: 8.5, min_ielts: 7.0, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "December (annually)", eligibility_notes: "For Commonwealth country citizens. Strong academic and development impact required." },

  // South Korea
  { id: 13, name: "Korean Government Scholarship (KGSP)", country: "South Korea", amount: "Full Tuition + ₩900,000/month", min_gpa_10: 8.0, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's", "PhD"], type: "Government", deadline: "February (annually)", eligibility_notes: "Includes 1 year Korean language training. Applicants must be under 40." },

  // Netherlands
  { id: 14, name: "Holland Scholarship", country: "Netherlands", amount: "€5,000 (one-time)", min_gpa_10: 7.5, min_ielts: 6.0, degree_levels: ["Bachelor's", "Master's"], type: "Government", deadline: "February (annually)", eligibility_notes: "For non-EEA students. First-time applicants to Dutch universities only." },

  // Singapore
  { id: 15, name: "Singapore International Graduate Award (SINGA)", country: "Singapore", amount: "Full Tuition + SGD $2,200/month", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["PhD"], type: "Government", deadline: "January & June (biannual)", eligibility_notes: "For PhD students at NUS, NTU, SUTD, and A*STAR research institutes." },

  // France
  { id: 16, name: "Eiffel Excellence Scholarship", country: "France", amount: "€1,181/month (Master's) or €1,700/month (PhD)", min_gpa_10: 8.5, min_ielts: 6.5, degree_levels: ["Master's", "PhD"], type: "Government", deadline: "January (annually)", eligibility_notes: "French Government scholarship for outstanding international students. Institution must nominate." },
];

export default scholarships;