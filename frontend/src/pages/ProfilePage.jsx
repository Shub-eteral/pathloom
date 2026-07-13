/* ProfilePage — profile overview with radial gauge centerpiece */
import { useApi } from '../contexts/ApiContext';
import usePageTitle from '../hooks/usePageTitle';
import { useProfile } from '../contexts/ProfileContext';
import useProfileExport from '../hooks/useProfileExport';
import Panel, { PanelHead } from '../components/ui/Panel';
import Button from '../components/ui/Button';
import RadialGauge from '../components/ui/RadialGauge';
import StatCard from '../components/ui/StatCard';

export default function ProfilePage() {
  usePageTitle('My Profile');
  const { getRoleName } = useApi();
  const {
    selectedRole, selectedSkills, studyCountry, degreeLevel,
    targetCareer, gpaScore, gpaScale, languageExam, examScores,
    budget, citizenshipStatus, currentEducation,
    getProfileCompleteness, clearSelection,
  } = useProfile();
  const { exportProfile, importProfile, importAlert } = useProfileExport();

  const completeness = getProfileCompleteness();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="pl-page-title">My Profile</h1>
        <p className="pl-page-subtitle">
          Overview of your Pathloom profile and data management.
        </p>
      </div>

      {/* Completeness — radial gauge centerpiece */}
      <Panel className="p-6 md:p-8" accent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <RadialGauge
            value={completeness}
            size={120}
            strokeWidth={8}
            label="Complete"
            tone={completeness >= 70 ? 'success' : completeness >= 40 ? 'warning' : 'danger'}
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="pl-panel-title text-lg">Profile Completeness</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {completeness >= 70
                ? "Great job! Your profile is well-filled. The more data you add, the better your matches."
                : completeness >= 40
                ? "Good progress! Fill in more details for better university and scholarship matching."
                : "Just getting started. Complete your career and academic profile for the best results."}
            </p>
          </div>
        </div>
      </Panel>

      {/* Overview Grid */}
      <Panel className="p-6">
        <PanelHead title="Profile Summary" subtitle="Your current selections across Career and Study modes." />
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-3">
          <StatCard label="Target Role" value={selectedRole ? getRoleName(selectedRole) : "Not Selected"} />
          <StatCard label="Skills Selected" value={selectedSkills.length} />
          <StatCard label="Study Country" value={studyCountry || "Not Set"} />
          <StatCard label="Degree Goal" value={degreeLevel || "Not Set"} />
          <StatCard label="Career Goal" value={targetCareer || "Not Set"} />
          <StatCard label="GPA" value={gpaScore ? `${gpaScore} / ${gpaScale}` : "Not Set"} />
          <StatCard label="Language Exam" value={examScores[languageExam] ? `${languageExam}: ${examScores[languageExam]}` : "Not Set"} />
          <StatCard label="Citizenship" value={citizenshipStatus || "Not Set"} />
        </div>
      </Panel>

      {/* Actions */}
      <Panel className="p-6">
        <PanelHead title="Data Management" subtitle="Export, import, or reset your profile data." />
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={exportProfile} className="px-5 py-2.5">
            Export Profile (JSON)
          </Button>
          <label className="pl-btn pl-btn--ghost px-5 py-2.5 cursor-pointer">
            Import Profile
            <input type="file" accept=".json" className="hidden" onChange={importProfile} />
          </label>
          <Button variant="ghost" onClick={clearSelection} className="px-5 py-2.5" style={{ color: 'var(--danger)' }}>
            Reset All Data
          </Button>
        </div>
        {importAlert && (
          <div className={`pl-alert ${importAlert.type === "error" ? "pl-alert--rust" : "pl-alert--teal"} mt-4 p-3`}>
            {importAlert.message}
          </div>
        )}
      </Panel>
    </div>
  );
}
