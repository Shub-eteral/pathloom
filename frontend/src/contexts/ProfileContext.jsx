/* ProfileContext — centralized user profile state for career + study */
import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  // Career state
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Study destination state
  const [studyCountry, setStudyCountry] = useState("");
  const [targetCareer, setTargetCareer] = useState("");

  // Academic profile state
  const [degreeLevel, setDegreeLevel] = useState("");
  const [gpaScale, setGpaScale] = useState("10");
  const [gpaScore, setGpaScore] = useState("");
  const [admissionExam, setAdmissionExam] = useState("");
  const [languageExam, setLanguageExam] = useState("IELTS");
  const [preferredIntake, setPreferredIntake] = useState("");
  const [budget, setBudget] = useState("");
  const [citizenshipStatus, setCitizenshipStatus] = useState("");
  const [currentEducation, setCurrentEducation] = useState("");
  const [workExperienceYears, setWorkExperienceYears] = useState("");
  const [leadershipExperience, setLeadershipExperience] = useState("");
  const [researchProjects, setResearchProjects] = useState("");
  const [publicationCount, setPublicationCount] = useState("");
  const [facultyMatch, setFacultyMatch] = useState(false);
  const [countryPreferences, setCountryPreferences] = useState("");
  const [documentReadiness, setDocumentReadiness] = useState({
    sop: false, lor: false, cv: false, passport: false, transcripts: false,
  });

  // Exam scores
  const [examScores, setExamScores] = useState({
    IELTS: "", TOEFL: "", GRE: "", GMAT: "", SAT: "", ACT: "", JLPT: "",
  });

  // Skill management
  const toggleSkill = (skillId) => {
    const id = String(skillId);
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((existingId) => existingId !== id) : [...prev, id]
    );
  };

  // GPA conversion
  const convertGpaScore = (value, fromScale, toScale) => {
    const numeric = parseFloat(value);
    if (Number.isNaN(numeric)) return "";
    if (fromScale === toScale) return String(numeric);
    let converted = numeric;
    if (fromScale === "10" && toScale === "4") converted = (numeric / 10) * 4;
    if (fromScale === "4" && toScale === "10") converted = (numeric / 4) * 10;
    return String(Math.round(converted * 100) / 100);
  };

  const handleGpaScaleChange = (newScale) => {
    setGpaScore((prevScore) => convertGpaScore(prevScore, gpaScale, newScale));
    setGpaScale(newScale);
  };

  const handleExamScoreChange = (exam, value) => {
    setExamScores((prev) => ({ ...prev, [exam]: value }));
  };

  // Profile completeness
  const getProfileCompleteness = () => {
    const profileFields = [
      studyCountry, degreeLevel, gpaScore, targetCareer, languageExam,
      preferredIntake, budget, citizenshipStatus, currentEducation,
      workExperienceYears, leadershipExperience, researchProjects, publicationCount,
    ];
    const filledFields = profileFields.filter((value) => String(value).trim() !== "").length;
    const readinessCount = Object.values(documentReadiness).filter(Boolean).length;
    const totalFields = profileFields.length + Object.keys(documentReadiness).length;
    return totalFields > 0 ? Math.round(((filledFields + readinessCount) / totalFields) * 100) : 0;
  };

  // Clear all
  const clearSelection = () => {
    setSelectedRole("");
    setSelectedSkills([]);
    setStudyCountry("");
    setTargetCareer("");
    setDegreeLevel("");
    setGpaScale("10");
    setGpaScore("");
    setExamScores({ IELTS: "", TOEFL: "", GRE: "", GMAT: "", SAT: "", ACT: "", JLPT: "" });
    setAdmissionExam("");
    setLanguageExam("IELTS");
    setPreferredIntake("");
    setBudget("");
    setCitizenshipStatus("");
    setCurrentEducation("");
    setWorkExperienceYears("");
    setLeadershipExperience("");
    setResearchProjects("");
    setPublicationCount("");
    setFacultyMatch(false);
    setCountryPreferences("");
    setDocumentReadiness({ sop: false, lor: false, cv: false, passport: false, transcripts: false });
  };

  // Build serializable profile object
  const getProfileData = () => ({
    target_role: selectedRole,
    selected_skills: selectedSkills,
    skill_count: selectedSkills.length,
    study_country: studyCountry,
    degree_level: degreeLevel,
    gpa_scale: gpaScale,
    gpa_score: gpaScore,
    admission_exam: admissionExam,
    language_exam: languageExam,
    preferred_intake: preferredIntake,
    budget,
    citizenship_status: citizenshipStatus,
    current_education: currentEducation,
    work_experience_years: workExperienceYears,
    leadership_experience: leadershipExperience,
    research_projects: researchProjects,
    publication_count: publicationCount,
    faculty_match: facultyMatch,
    country_preferences: countryPreferences,
    document_readiness: documentReadiness,
    exam_scores: examScores,
    target_career: targetCareer,
    exported_at: new Date().toISOString(),
  });

  // Restore from imported profile
  const restoreProfile = (profile) => {
    if (profile.target_role) setSelectedRole(profile.target_role);
    if (profile.selected_skills) setSelectedSkills(profile.selected_skills);
    if (profile.study_country) setStudyCountry(profile.study_country);
    if (profile.study_degree || profile.degree_level) setDegreeLevel(profile.degree_level || profile.study_degree);
    if (profile.gpa_scale) setGpaScale(profile.gpa_scale);
    if (profile.gpa_score) setGpaScore(profile.gpa_score);
    if (profile.exam_scores) setExamScores(profile.exam_scores);
    if (profile.admission_exam) setAdmissionExam(profile.admission_exam);
    if (profile.language_exam) setLanguageExam(profile.language_exam);
    if (profile.preferred_intake) setPreferredIntake(profile.preferred_intake);
    if (profile.budget) setBudget(profile.budget);
    if (profile.citizenship_status) setCitizenshipStatus(profile.citizenship_status);
    if (profile.current_education) setCurrentEducation(profile.current_education);
    if (profile.work_experience_years) setWorkExperienceYears(profile.work_experience_years);
    if (profile.leadership_experience) setLeadershipExperience(profile.leadership_experience);
    if (profile.research_projects) setResearchProjects(profile.research_projects);
    if (profile.publication_count) setPublicationCount(profile.publication_count);
    if (typeof profile.faculty_match === "boolean") setFacultyMatch(profile.faculty_match);
    if (profile.country_preferences) setCountryPreferences(profile.country_preferences);
    if (profile.document_readiness) setDocumentReadiness(profile.document_readiness);
    if (profile.target_career) setTargetCareer(profile.target_career);
  };

  const value = {
    // Career
    selectedRole, setSelectedRole,
    selectedSkills, setSelectedSkills, toggleSkill,

    // Study destination
    studyCountry, setStudyCountry,
    targetCareer, setTargetCareer,

    // Academic
    degreeLevel, setDegreeLevel,
    gpaScale, gpaScore, setGpaScore,
    handleGpaScaleChange,
    admissionExam, setAdmissionExam,
    languageExam, setLanguageExam,
    examScores, handleExamScoreChange,
    preferredIntake, setPreferredIntake,
    budget, setBudget,
    citizenshipStatus, setCitizenshipStatus,
    currentEducation, setCurrentEducation,
    workExperienceYears, setWorkExperienceYears,
    leadershipExperience, setLeadershipExperience,
    researchProjects, setResearchProjects,
    publicationCount, setPublicationCount,
    facultyMatch, setFacultyMatch,
    countryPreferences, setCountryPreferences,
    documentReadiness, setDocumentReadiness,

    // Computed
    getProfileCompleteness,
    clearSelection,
    getProfileData,
    restoreProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
}
