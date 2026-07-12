/* CareerAnalysisPage — role selection + fit analysis with amber accent */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import { useApi } from '../../contexts/ApiContext';
import { useProfile } from '../../contexts/ProfileContext';
import useCareerAnalysis from '../../hooks/useCareerAnalysis';
import Panel, { PanelHead } from '../../components/ui/Panel';
import Button, { Spinner } from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import SearchInput from '../../components/ui/SearchInput';
import ChipGroup from '../../components/ui/ChipGroup';
import EmptyState from '../../components/ui/EmptyState';
import ThreadGauge from '../../components/ui/ThreadGauge';
import Alert from '../../components/ui/Alert';
import { CheckIcon } from '../../components/icons/Icons';

export default function CareerAnalysisPage() {
  usePageTitle('Career Fit Analysis');
  const navigate = useNavigate();
  const { roles, skills, loadError } = useApi();
  const { selectedRole, setSelectedRole, selectedSkills, toggleSkill } = useProfile();
  const {
    result, isLoading, analyzeError,
    isLoadingRecommendations, recommendError,
    analyzeCareer, getRecommendations, clearResults,
  } = useCareerAnalysis();

  const [skillSearch, setSkillSearch] = useState("");

  const filteredSkills = Object.entries(skills).filter(([, name]) =>
    name.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const roleOptions = roles.map((r) => ({ value: r.role_id, label: r.role_name }));

  const handleClear = () => {
    clearResults();
  };

  const handleFindAlternatives = async () => {
    await getRecommendations();
    navigate("/career/recommend");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="pl-page-title">Career Fit Analysis</h1>
        <p className="pl-page-subtitle">
          Select a target role and your skills to analyze career readiness.
        </p>
      </div>

      {loadError && (
        <Alert variant="rust">
          <h4 className="font-bold text-sm">Connection problem</h4>
          <p className="mt-0.5 font-medium">{loadError}</p>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT — Configuration */}
        <section className="lg:col-span-5">
          <Panel className="p-6" accent>
            <PanelHead title="Build your profile" subtitle="Set a target role, then add the skills you bring." />

            <Select
              id="role-select"
              label="Target role"
              value={selectedRole}
              onChange={setSelectedRole}
              options={roleOptions}
              placeholder="Select a role…"
            />

            <div className="mt-5">
              <SearchInput
                id="skill-search"
                label="Your skills"
                placeholder="Search skills…"
                items={filteredSkills}
                selectedIds={selectedSkills}
                onToggle={toggleSkill}
                searchValue={skillSearch}
                onSearchChange={setSkillSearch}
              />
              <div className="mt-3">
                <ChipGroup
                  items={selectedSkills}
                  labels={skills}
                  onRemove={toggleSkill}
                  emptyText="No skills added yet"
                />
              </div>
            </div>

            {analyzeError && <div className="pl-alert pl-alert--rust mt-4 p-3">{analyzeError}</div>}

            <div className="flex flex-col gap-2 mt-6 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex gap-2">
                <Button variant="primary" onClick={analyzeCareer} disabled={isLoading} className="flex-1 px-5 py-3">
                  {isLoading ? <><Spinner /><span>Analyzing…</span></> : <span>Analyze fit</span>}
                </Button>
                <Button variant="ghost" onClick={handleClear} disabled={isLoading} className="px-4 py-3">
                  Clear
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={handleFindAlternatives}
                disabled={isLoadingRecommendations}
                className="w-full px-5 py-3"
              >
                {isLoadingRecommendations ? "Loading alternatives…" : "Find alternative roles"}
              </Button>
              {recommendError && <div className="pl-alert pl-alert--rust mt-1 p-3">{recommendError}</div>}
            </div>
          </Panel>
        </section>

        {/* RIGHT — Analysis Results */}
        <div className="lg:col-span-7 space-y-5">
          <Panel className="p-6">
            <PanelHead title="Fit analysis" subtitle="See how your skills measure up to the role." />

            {!result ? (
              <EmptyState
                title="No analysis yet"
                body="Choose a target role and add your skills, then run the analysis."
              />
            ) : (
              <div className="space-y-5">
                <div className="p-4 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="pl-label">Readiness score</span>
                    <span className="pl-mono font-bold text-lg" style={{ color: 'var(--success)' }}>{result.readiness_score}%</span>
                  </div>
                  <ThreadGauge value={result.readiness_score} tone="success" size="lg" />
                </div>

                <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <h3 className="pl-label mb-3">Skills to develop</h3>
                  {result.missing_skills.length === 0 ? (
                    <Alert variant="teal">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-5 h-5 shrink-0" />
                        <span>You have all the required skills for this role.</span>
                      </div>
                    </Alert>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills.map((skill, i) => (
                        <span key={i} className="pl-tag pl-tag--danger px-3 py-1">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <h3 className="pl-label mb-4">Upskilling roadmap</h3>
                  <div className="space-y-4">
                    {result.roadmap.map((step, i) => (
                      <div key={i} className="pl-roadmap-item flex gap-4">
                        <div className="pl-roadmap-index">{i + 1}</div>
                        <div className="pl-roadmap-text flex-1 p-3 font-medium">
                          {step.replace(/^Step \d+:\s*/, "")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
