/* ProfilePage — profile overview, export/import, settings */
import { useApi } from '../contexts/ApiContext';
import usePageTitle from '../hooks/usePageTitle';
import { useProfile } from '../contexts/ProfileContext';
import useProfileExport from '../hooks/useProfileExport';
import Panel, { PanelHead } from '../components/ui/Panel';
import Button from '../components/ui/Button';
import ThreadGauge from '../components/ui/ThreadGauge';
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
    <div className="space-y-6">
      <div>
        <h1 className="pl-display text-2xl font-bold">My Profile</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Overview of your Pathloom profile and data management.
        </p>
      </div>

      {/* Completeness */}
      <Panel className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="pl-panel-title">Profile Completeness</h3>
          <span className="pl-mono font-bold text-lg" style={{ color: completeness >= 70 ? "var(--teal)" : "var(--brass)" }}>{completeness}%</span>
        </div>
        <ThreadGauge value={completeness} tone={completeness >= 70 ? "teal" : completeness >= 40 ? "brass" : "rust"} size="lg" />
      </Panel>

      {/* Overview Grid */}
      <Panel className="p-6">
        <PanelHead title="Profile Summary" subtitle="Your current selections across Career and Study modes." />
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
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
          <Button variant="primary" onClick={exportProfile} className="px-5 py-3">
            Export Profile (JSON)
          </Button>
          <label className="pl-btn pl-btn--ghost px-5 py-3 cursor-pointer">
            Import Profile
            <input type="file" accept=".json" className="hidden" onChange={importProfile} />
          </label>
          <Button variant="ghost" onClick={clearSelection} className="px-5 py-3" style={{ color: "var(--rust)" }}>
            Reset All Data
          </Button>
        </div>
        {importAlert && (
          <div className={`pl-alert ${importAlert.type === "error" ? "pl-alert--rust" : "pl-alert--teal"} mt-4 p-4`}>
            {importAlert.message}
          </div>
        )}
      </Panel>
    </div>
  );
}
