/* StudyProfilePage — academic profile setup */
import { useProfile } from '../../contexts/ProfileContext';
import usePageTitle from '../../hooks/usePageTitle';
import useStudyEligibility from '../../hooks/useStudyEligibility';
import Panel, { PanelHead } from '../../components/ui/Panel';
import Select from '../../components/ui/Select';
import ThreadGauge from '../../components/ui/ThreadGauge';
import countries from '../../data/countries';
import careerGoals from '../../data/careerGoals';
import { DEGREE_LEVELS, GPA_SCALES } from '../../data/degreeOptions';
import { ADMISSION_EXAMS_BY_LEVEL } from '../../data/examConfig';
import { BUDGET_RANGES, INTAKE_SEASONS, CITIZENSHIP_OPTIONS, EDUCATION_LEVELS, WORK_EXPERIENCE_OPTIONS, LEADERSHIP_OPTIONS } from '../../data/constants';

export default function StudyProfilePage() {
  usePageTitle('Academic Profile');
  const {
    studyCountry, setStudyCountry,
    targetCareer, setTargetCareer,
    degreeLevel, setDegreeLevel,
    gpaScale, gpaScore, setGpaScore, handleGpaScaleChange,
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
    documentReadiness, setDocumentReadiness,
    getProfileCompleteness,
  } = useProfile();

  const { getSupportedLanguageExams, getAdmissionExamOptions } = useStudyEligibility();
  const completeness = getProfileCompleteness();
  const supportedLanguageExams = getSupportedLanguageExams(null);
  const admissionExamOptions = getAdmissionExamOptions(null);
  const countryOptions = countries.map((c) => ({ value: c.name, label: c.name }));

  const toggleDocument = (key) => {
    setDocumentReadiness((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const documentLabels = {
    sop: "Statement of Purpose (SOP)",
    lor: "Letters of Recommendation (LOR)",
    cv: "CV / Resume",
    passport: "Valid Passport",
    transcripts: "Academic Transcripts",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="pl-display text-2xl font-bold">Academic Profile</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
            Build your academic profile for university and scholarship matching.
          </p>
        </div>
        <div className="text-right">
          <span className="pl-mono text-sm font-semibold" style={{ color: completeness >= 70 ? "var(--teal)" : "var(--brass)" }}>{completeness}%</span>
          <p className="text-xs" style={{ color: "var(--ink-faint)" }}>Profile complete</p>
        </div>
      </div>

      {/* Completeness bar */}
      <Panel className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="pl-field-label">Profile Completeness</span>
          <span className="pl-mono font-semibold text-sm">{completeness}%</span>
        </div>
        <ThreadGauge value={completeness} tone={completeness >= 70 ? "teal" : completeness >= 40 ? "brass" : "rust"} size="md" />
      </Panel>

      {/* Destination & Goal */}
      <Panel className="p-6">
        <PanelHead title="Destination & Goals" subtitle="Where do you want to study and what do you want to become?" />
        <div className="grid md:grid-cols-3 gap-4">
          <Select id="study-country" label="Target Country" value={studyCountry} onChange={setStudyCountry} options={countryOptions} placeholder="Select country…" />
          <Select id="target-career" label="Career Goal" value={targetCareer} onChange={setTargetCareer} options={careerGoals} placeholder="Select career…" />
          <Select id="degree-level" label="Degree Level" value={degreeLevel} onChange={setDegreeLevel} options={DEGREE_LEVELS} placeholder="Select degree…" />
        </div>
      </Panel>

      {/* Academic Scores */}
      <Panel className="p-6">
        <PanelHead title="Academic Scores" subtitle="Your GPA and standardized test results." />
        <div className="grid md:grid-cols-3 gap-4">
          <Select id="gpa-scale" label="GPA Scale" value={gpaScale} onChange={handleGpaScaleChange} options={GPA_SCALES} />
          <div className="space-y-2">
            <label htmlFor="gpa-score" className="pl-field-label">GPA Score</label>
            <input id="gpa-score" type="number" step="0.01" min="0" max={gpaScale === "10" ? "10" : "4"} value={gpaScore}
              onChange={(e) => setGpaScore(e.target.value)} placeholder="Enter GPA" className="pl-input px-4 py-3.5" />
          </div>
          <Select id="preferred-intake" label="Preferred Intake" value={preferredIntake} onChange={setPreferredIntake} options={INTAKE_SEASONS} placeholder="Select intake…" />
        </div>

        {/* Exam Scores */}
        <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--line)" }}>
          <h3 className="pl-field-label mb-4">Standardized Exam Scores</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="pl-field-label mb-2">Language Exam</label>
              <div className="flex flex-wrap gap-2">
                {supportedLanguageExams.map((exam) => (
                  <button key={exam} type="button" onClick={() => setLanguageExam(exam)}
                    className={`pl-chip px-3 py-1.5 font-semibold ${languageExam === exam ? "bg-indigo-600 text-white border-indigo-600" : ""}`}>
                    {exam}
                  </button>
                ))}
              </div>
            </div>
            {degreeLevel && (
              <div>
                <label className="pl-field-label mb-2">Admission Test</label>
                <div className="flex flex-wrap gap-2">
                  {(ADMISSION_EXAMS_BY_LEVEL[degreeLevel] || []).map((exam) => (
                    <button key={exam} type="button" onClick={() => setAdmissionExam(exam)}
                      className={`pl-chip px-3 py-1.5 font-semibold ${admissionExam === exam ? "bg-indigo-600 text-white border-indigo-600" : ""}`}>
                      {exam}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {languageExam && (
              <div className="space-y-2">
                <label className="pl-field-label">{languageExam} Score</label>
                <input type="number" value={examScores[languageExam] || ""} onChange={(e) => handleExamScoreChange(languageExam, e.target.value)}
                  placeholder={`Enter ${languageExam} score`} className="pl-input px-4 py-3.5" />
              </div>
            )}
            {admissionExam && (
              <div className="space-y-2">
                <label className="pl-field-label">{admissionExam} Score</label>
                <input type="number" value={examScores[admissionExam] || ""} onChange={(e) => handleExamScoreChange(admissionExam, e.target.value)}
                  placeholder={`Enter ${admissionExam} score`} className="pl-input px-4 py-3.5" />
              </div>
            )}
          </div>
        </div>
      </Panel>

      {/* Background */}
      <Panel className="p-6">
        <PanelHead title="Background & Experience" subtitle="Your educational and professional background." />
        <div className="grid md:grid-cols-3 gap-4">
          <Select id="citizenship" label="Citizenship" value={citizenshipStatus} onChange={setCitizenshipStatus} options={CITIZENSHIP_OPTIONS} placeholder="Select…" />
          <Select id="education" label="Current Education" value={currentEducation} onChange={setCurrentEducation} options={EDUCATION_LEVELS} placeholder="Select…" />
          <Select id="budget" label="Annual Budget" value={budget} onChange={setBudget} options={BUDGET_RANGES} placeholder="Select budget…" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <Select id="work-exp" label="Work Experience" value={workExperienceYears} onChange={setWorkExperienceYears} options={WORK_EXPERIENCE_OPTIONS} placeholder="Select…" />
          <Select id="leadership" label="Leadership Experience" value={leadershipExperience} onChange={setLeadershipExperience} options={LEADERSHIP_OPTIONS} placeholder="Select…" />
          <div className="space-y-2">
            <label className="pl-field-label">Research Projects</label>
            <input type="number" min="0" value={researchProjects} onChange={(e) => setResearchProjects(e.target.value)} placeholder="0" className="pl-input px-4 py-3.5" />
          </div>
        </div>
        {degreeLevel === "PhD" && (
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <label className="pl-field-label">Publications</label>
              <input type="number" min="0" value={publicationCount} onChange={(e) => setPublicationCount(e.target.value)} placeholder="0" className="pl-input px-4 py-3.5" />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" id="faculty-match" checked={facultyMatch} onChange={(e) => setFacultyMatch(e.target.checked)} className="pl-checkbox h-5 w-5" />
              <label htmlFor="faculty-match" className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Faculty match confirmed</label>
            </div>
          </div>
        )}
      </Panel>

      {/* Document Readiness */}
      <Panel className="p-6">
        <PanelHead title="Document Readiness" subtitle="Track your application document preparation." />
        <div className="grid md:grid-cols-2 gap-3">
          {Object.entries(documentLabels).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
              style={{ border: "1px solid var(--line)" }}>
              <input type="checkbox" checked={documentReadiness[key]} onChange={() => toggleDocument(key)} className="pl-checkbox h-5 w-5" />
              <span className="text-sm font-medium" style={{ color: documentReadiness[key] ? "var(--teal)" : "var(--ink-soft)" }}>
                {documentReadiness[key] ? "✓" : "○"} {label}
              </span>
            </label>
          ))}
        </div>
      </Panel>
    </div>
  );
}
