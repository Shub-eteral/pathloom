/* useStudyEligibility — eligibility, admission, and scholarship scoring logic */
import { useProfile } from '../contexts/ProfileContext';
import universities from '../data/universities';
import scholarships from '../data/scholarships';

export default function useStudyEligibility() {
  const {
    degreeLevel, gpaScale, gpaScore, examScores,
    languageExam, admissionExam, studyCountry, targetCareer,
    budget, preferredIntake, facultyMatch,
    researchProjects, publicationCount,
  } = useProfile();

  const parseBudgetValue = (value) => {
    const numericText = String(value || "").replace(/[^0-9.]/g, "");
    const parsed = parseFloat(numericText);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const jlptLevelValue = (level) => {
    const normalized = String(level || "").trim().toUpperCase();
    const order = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
    return order[normalized] || 0;
  };

  const jlptSatisfiesRequirement = (applicantJlpt, requiredJlpt) => {
    if (!requiredJlpt) return true;
    return jlptLevelValue(applicantJlpt) >= jlptLevelValue(requiredJlpt);
  };

  const getRecommendedProgramDetails = (university) => {
    if (!university?.programs?.length) return null;
    if (targetCareer && degreeLevel) {
      const exact = university.programs.find(
        (p) => p.level === degreeLevel && p.careers?.includes(targetCareer)
      );
      if (exact) return exact;
    }
    if (targetCareer) {
      const career = university.programs.find((p) => p.careers?.includes(targetCareer));
      if (career) return career;
    }
    if (degreeLevel) {
      const degree = university.programs.find((p) => p.level === degreeLevel);
      if (degree) return degree;
    }
    return university.programs[0];
  };

  const getRecommendedProgram = (university) => {
    const program = getRecommendedProgramDetails(university);
    return program ? program.course : "No matching program";
  };

  const doesUniversityMatchBudget = (university) => {
    const limit = parseBudgetValue(budget);
    if (limit === null) return true;
    const totalAnnualCost = Number(university.tuition || 0) + Number(university.living_cost || 0);
    return totalAnnualCost <= limit;
  };

  const doesUniversityMatchIntake = (university) => {
    if (!preferredIntake) return true;
    return university.intakes?.some((intake) =>
      intake.toLowerCase().includes(preferredIntake.toLowerCase())
    );
  };

  const getEligibilityResult = (university) => {
    const gpa = parseFloat(gpaScore || 0);
    const ielts = parseFloat(examScores?.["IELTS"] || 0);
    const toefl = parseFloat(examScores?.["TOEFL"] || 0);
    const gre = parseFloat(examScores?.["GRE"] || 0);
    const gmat = parseFloat(examScores?.["GMAT"] || 0);
    const sat = parseFloat(examScores?.["SAT"] || 0);
    const act = parseFloat(examScores?.["ACT"] || 0);
    const jlpt = examScores?.["JLPT"] || "";

    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const courseName = program?.course || "this program";
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;

    if (requiredGpa && gpa < requiredGpa) {
      return { eligible: false, reason: `${courseName} requires a minimum GPA of ${requiredGpa}.` };
    }

    const supportedLanguageExams = [];
    if (requirements.ielts) supportedLanguageExams.push("IELTS");
    if (requirements.toefl) supportedLanguageExams.push("TOEFL");

    if (supportedLanguageExams.length) {
      if (!languageExam || !supportedLanguageExams.includes(languageExam)) {
        return { eligible: false, reason: `${courseName} requires ${supportedLanguageExams.join(" or ")} for language proficiency.` };
      }
      if (languageExam === "IELTS" && requirements.ielts && ielts < requirements.ielts) {
        return { eligible: false, reason: `${courseName} requires IELTS ${requirements.ielts} or higher.` };
      }
      if (languageExam === "TOEFL" && requirements.toefl && toefl < requirements.toefl) {
        return { eligible: false, reason: `${courseName} requires TOEFL ${requirements.toefl} or higher.` };
      }
    }

    const requiresBachelorExam = degreeLevel === "Bachelor's" && (requirements.sat || requirements.act);
    if (requiresBachelorExam) {
      if (!admissionExam) return { eligible: false, reason: `${courseName} requires SAT or ACT.` };
      if (admissionExam === "SAT" && requirements.sat && sat < requirements.sat) return { eligible: false, reason: `${courseName} requires SAT ${requirements.sat}+.` };
      if (admissionExam === "ACT" && requirements.act && act < requirements.act) return { eligible: false, reason: `${courseName} requires ACT ${requirements.act}+.` };
    }

    const requiresMasterExam = degreeLevel === "Master's" && (requirements.gre || requirements.gmat);
    if (requiresMasterExam) {
      if (!admissionExam) return { eligible: false, reason: `${courseName} requires GRE or GMAT.` };
      if (admissionExam === "GRE" && requirements.gre && gre < requirements.gre) return { eligible: false, reason: `${courseName} requires GRE ${requirements.gre}+.` };
      if (admissionExam === "GMAT" && requirements.gmat && gmat < requirements.gmat) return { eligible: false, reason: `${courseName} requires GMAT ${requirements.gmat}+.` };
    }

    if (degreeLevel === "PhD") {
      if (requirements.gre && gre < requirements.gre) return { eligible: false, reason: `${courseName} requires GRE ${requirements.gre}+.` };
      if (requirements.research_projects && parseFloat(researchProjects || 0) < requirements.research_projects) return { eligible: false, reason: `${courseName} expects at least ${requirements.research_projects} research project(s).` };
      if (requirements.publications && parseFloat(publicationCount || 0) < requirements.publications) return { eligible: false, reason: `${courseName} expects at least ${requirements.publications} publication(s).` };
      if (requirements.faculty_match && !facultyMatch) return { eligible: false, reason: `${courseName} requires a faculty match.` };
    }

    if (requirements.jlpt && !jlptSatisfiesRequirement(jlpt, requirements.jlpt)) {
      return { eligible: false, reason: `${courseName} requires JLPT ${requirements.jlpt}+.` };
    }

    return { eligible: true, reason: `Eligible for ${courseName}.` };
  };

  const getMatchScore = (university) => {
    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const gpa = parseFloat(gpaScore || 0);
    const ielts = parseFloat(examScores?.["IELTS"] || 0);
    const toefl = parseFloat(examScores?.["TOEFL"] || 0);
    const gre = parseFloat(examScores?.["GRE"] || 0);
    const gmat = parseFloat(examScores?.["GMAT"] || 0);
    const sat = parseFloat(examScores?.["SAT"] || 0);
    const act = parseFloat(examScores?.["ACT"] || 0);
    const jlpt = examScores?.["JLPT"] || "";
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;

    const gpaScorePercent = requiredGpa ? Math.min(100, (gpa / requiredGpa) * 100) : 100;

    let languageScorePercent = 100;
    if (requirements.ielts || requirements.toefl) {
      if (languageExam === "IELTS" && requirements.ielts) languageScorePercent = Math.min(100, (ielts / requirements.ielts) * 100);
      else if (languageExam === "TOEFL" && requirements.toefl) languageScorePercent = Math.min(100, (toefl / requirements.toefl) * 100);
      else if (requirements.ielts) languageScorePercent = Math.min(100, (ielts / requirements.ielts) * 100);
      else if (requirements.toefl) languageScorePercent = Math.min(100, (toefl / requirements.toefl) * 100);
    }

    let admissionScorePercent = 100;
    if (degreeLevel === "Bachelor's" && (requirements.sat || requirements.act)) {
      if (admissionExam === "SAT" && requirements.sat) admissionScorePercent = Math.min(100, (sat / requirements.sat) * 100);
      else if (admissionExam === "ACT" && requirements.act) admissionScorePercent = Math.min(100, (act / requirements.act) * 100);
      else admissionScorePercent = 0;
    }
    if (degreeLevel === "Master's" && (requirements.gre || requirements.gmat)) {
      if (admissionExam === "GRE" && requirements.gre) admissionScorePercent = Math.min(100, (gre / requirements.gre) * 100);
      else if (admissionExam === "GMAT" && requirements.gmat) admissionScorePercent = Math.min(100, (gmat / requirements.gmat) * 100);
      else admissionScorePercent = 0;
    }
    if (degreeLevel === "PhD" && requirements.gre) admissionScorePercent = Math.min(100, (gre / requirements.gre) * 100);

    const jlptScorePercent = requirements.jlpt ? (jlptSatisfiesRequirement(jlpt, requirements.jlpt) ? 100 : 0) : 100;
    const programMatchBonus = getRecommendedProgram(university) !== "No matching program" ? 10 : 0;

    const rawScore = gpaScorePercent * 0.35 + languageScorePercent * 0.25 + admissionScorePercent * 0.2 + jlptScorePercent * 0.1 + programMatchBonus;
    return Math.max(0, Math.min(100, Math.round(rawScore)));
  };

  const getAdmissionChance = (university) => {
    let score = 0;
    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const gpa = parseFloat(gpaScore || 0);
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;

    if (requiredGpa) score += Math.min(40, (gpa / requiredGpa) * 40);
    const languageScore = parseFloat(examScores[languageExam] || 0);
    if (requirements.ielts) score += Math.min(25, (languageScore / requirements.ielts) * 25);
    const admScore = parseFloat(examScores[admissionExam] || 0);
    if (requirements.gre && admissionExam === "GRE") score += Math.min(20, (admScore / requirements.gre) * 20);
    if (getScholarshipChanceScore(university) >= 80) score += 10;
    if (getProfileCompleteness() >= 80) score += 5;

    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const getProfileCompleteness = () => {
    const fields = [studyCountry, degreeLevel, gpaScore, targetCareer, languageExam, preferredIntake, budget];
    return Math.round((fields.filter((v) => String(v).trim() !== "").length / fields.length) * 100);
  };

  const getAdmissionTier = (chance) => {
    if (chance >= 90) return "SAFE";
    if (chance >= 75) return "TARGET";
    return "REACH";
  };

  const getAdmissionReasons = (university) => {
    const reasons = [];
    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const gpa = parseFloat(gpaScore || 0);
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;

    if (gpa >= requiredGpa) reasons.push("✓ GPA exceeds requirement");
    else reasons.push("✗ GPA below requirement");

    const langScore = parseFloat(examScores[languageExam] || 0);
    if (langScore >= (requirements.ielts || 0)) reasons.push("✓ Language requirement met");
    else reasons.push("✗ Language score below requirement");

    if (requirements.gre && admissionExam === "GRE") {
      const gre = parseFloat(examScores.GRE || 0);
      if (gre >= requirements.gre) reasons.push("✓ GRE requirement met");
      else reasons.push("✗ GRE below requirement");
    }

    return reasons;
  };

  const getScholarshipChanceScore = (university) => {
    if (!university) return 0;
    const scholarshipFlags = Object.values(university.scholarships || {}).filter(Boolean).length;
    const scholarshipStrength = scholarshipFlags / 5;
    const budgetFactor = (() => {
      const limit = parseBudgetValue(budget);
      if (limit === null || limit === 0) return 0.8;
      const totalAnnualCost = Number(university.tuition || 0) + Number(university.living_cost || 0);
      return Math.min(1, totalAnnualCost <= limit ? 1 : limit / totalAnnualCost);
    })();
    const chance = Math.round(Math.min(100, scholarshipStrength * 70 + budgetFactor * 30));
    const eligibility = getEligibilityResult(university);
    return eligibility.eligible ? chance : Math.max(chance - 20, 0);
  };

  const getScholarshipMatchScore = (scholarship) => {
    let score = 0;
    const gpa = parseFloat(gpaScore || 0);
    const langScore = parseFloat(examScores[languageExam] || 0);

    if (gpa >= scholarship.min_gpa_10) score += 50;
    else score += Math.max(0, (gpa / scholarship.min_gpa_10) * 50);

    if (langScore >= scholarship.min_ielts) score += 30;
    else score += Math.max(0, (langScore / scholarship.min_ielts) * 30);

    if (scholarship.degree_levels.includes(degreeLevel)) score += 20;
    return Math.round(score);
  };

  const getScholarshipCategory = (score) => {
    if (score >= 90) return "HIGH";
    if (score >= 75) return "MEDIUM";
    return "LOW";
  };

  const getScholarshipAnalysis = (scholarship) => {
    const analysis = [];
    const gpa = parseFloat(gpaScore || 0);
    const langScore = parseFloat(examScores[languageExam] || 0);

    if (gpa >= scholarship.min_gpa_10) analysis.push("✓ GPA requirement met");
    else analysis.push("✗ GPA below requirement");

    if (langScore >= scholarship.min_ielts) analysis.push("✓ Language requirement met");
    else analysis.push("✗ Language score below requirement");

    return analysis;
  };

  const getScholarshipRecommendation = (score) => {
    if (score >= 90) return "Strong candidate. Apply.";
    if (score >= 75) return "Competitive. Worth applying.";
    return "Improve profile before applying.";
  };

  const getCountryScore = (country) => {
    const countryUniversities = universities.filter((u) => u.country === country);
    if (countryUniversities.length === 0) return 0;
    const totalScore = countryUniversities.reduce((sum, u) => sum + getMatchScore(u), 0);
    return Math.round(totalScore / countryUniversities.length);
  };

  const getCountryCategory = (country) => {
    const score = getCountryScore(country);
    if (score >= 85) return "SAFE";
    if (score >= 65) return "TARGET";
    return "REACH";
  };

  const getAffordability = (university) => {
    if (!budget) return "Unknown";
    const limit = parseBudgetValue(budget);
    if (limit === null) return "Unknown";
    return university.tuition <= limit ? "Affordable" : "Over Budget";
  };

  const uniqueCountries = [...new Set(universities.map((u) => u.country))];

  const matchingScholarships = scholarships
    .filter((s) => s.country === studyCountry)
    .filter((s) => s.degree_levels.includes(degreeLevel))
    .sort((a, b) => getScholarshipMatchScore(b) - getScholarshipMatchScore(a));

  const getSupportedLanguageExams = (selectedUniversity) => {
    const programs = selectedUniversity
      ? [getRecommendedProgramDetails(selectedUniversity)].filter(Boolean)
      : universities
          .filter((u) => !studyCountry || u.country === studyCountry)
          .flatMap((u) => u.programs || [])
          .filter((p) => {
            if (degreeLevel && p.level !== degreeLevel) return false;
            if (targetCareer && !p.careers?.includes(targetCareer)) return false;
            return true;
          });

    const exams = new Set();
    programs.forEach((p) => {
      if (p?.requirements?.ielts) exams.add("IELTS");
      if (p?.requirements?.toefl) exams.add("TOEFL");
    });
    return exams.size ? Array.from(exams) : ["IELTS", "TOEFL"];
  };

  const getAdmissionExamOptions = (selectedUniversity) => {
    const program = getRecommendedProgramDetails(selectedUniversity);
    const requirements = program?.requirements || {};
    const options = new Set();

    if (degreeLevel === "Bachelor's") {
      if (requirements.sat) options.add("SAT");
      if (requirements.act) options.add("ACT");
      if (!options.size) { options.add("SAT"); options.add("ACT"); }
    }
    if (degreeLevel === "Master's") {
      if (requirements.gre) options.add("GRE");
      if (requirements.gmat) options.add("GMAT");
      if (!options.size) { options.add("GRE"); options.add("GMAT"); }
    }
    if (degreeLevel === "PhD") options.add("GRE");
    return Array.from(options);
  };

  return {
    getRecommendedProgramDetails, getRecommendedProgram,
    doesUniversityMatchBudget, doesUniversityMatchIntake,
    getEligibilityResult, getMatchScore,
    getAdmissionChance, getAdmissionTier, getAdmissionReasons,
    getScholarshipChanceScore, getScholarshipMatchScore,
    getScholarshipCategory, getScholarshipAnalysis, getScholarshipRecommendation,
    getCountryScore, getCountryCategory, getAffordability,
    uniqueCountries, matchingScholarships,
    getSupportedLanguageExams, getAdmissionExamOptions,
  };
}
