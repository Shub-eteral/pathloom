/* UniversityFinderPage — university search and results */
import { useState } from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import { useProfile } from '../../contexts/ProfileContext';
import useStudyEligibility from '../../hooks/useStudyEligibility';
import universities from '../../data/universities';
import Panel, { PanelHead } from '../../components/ui/Panel';
import ThreadGauge from '../../components/ui/ThreadGauge';
import EmptyState from '../../components/ui/EmptyState';
import { SearchIcon } from '../../components/icons/Icons';

export default function UniversityFinderPage() {
  usePageTitle('University Finder');
  const { studyCountry, degreeLevel, targetCareer } = useProfile();
  const {
    getEligibilityResult, getMatchScore, getAdmissionChance, getAdmissionTier,
    getAdmissionReasons, getRecommendedProgram, getScholarshipChanceScore,
    doesUniversityMatchBudget, doesUniversityMatchIntake, getAffordability,
  } = useStudyEligibility();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("qs");
  const [selectedUni, setSelectedUni] = useState(null);

  const filteredList = universities
    .filter((u) =>
      (!studyCountry || u.country === studyCountry) &&
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      doesUniversityMatchBudget(u) &&
      doesUniversityMatchIntake(u)
    )
    .sort((a, b) => {
      if (sort === "tuition") return (a.tuition || 0) - (b.tuition || 0);
      if (sort === "match") return getMatchScore(b) - getMatchScore(a);
      if (sort === "admission") return getAdmissionChance(b) - getAdmissionChance(a);
      if (sort === "scholarship") {
        const aS = Object.values(a.scholarships || {}).filter(Boolean).length;
        const bS = Object.values(b.scholarships || {}).filter(Boolean).length;
        return bS - aS;
      }
      return (a.qs_rank || 0) - (b.qs_rank || 0);
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="pl-display text-2xl font-bold">University Finder</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Search and compare universities across {studyCountry || "all countries"}.
          {!studyCountry && " Set your target country in Academic Profile for filtered results."}
        </p>
      </div>

      {/* Search & Sort Bar */}
      <Panel className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-faint)" }} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search universities…"
              className="pl-input py-3" style={{ paddingLeft: "2.75rem" }} />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="pl-select px-4 py-3" style={{ width: "auto", minWidth: "160px" }}>
            <option value="qs">Sort by QS Rank</option>
            <option value="tuition">Sort by Tuition</option>
            <option value="match">Sort by Match Score</option>
            <option value="admission">Sort by Admission Chance</option>
            <option value="scholarship">Sort by Scholarships</option>
          </select>
        </div>
        <p className="mt-2 text-xs" style={{ color: "var(--ink-faint)" }}>
          Showing {filteredList.length} of {universities.length} universities
        </p>
      </Panel>

      {/* Results */}
      {filteredList.length === 0 ? (
        <Panel className="p-6">
          <EmptyState title="No universities found" body="Try adjusting your search, country, or budget filters." />
        </Panel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((uni) => {
            const matchScore = getMatchScore(uni);
            const eligibility = getEligibilityResult(uni);
            const admissionChance = getAdmissionChance(uni);
            const tier = getAdmissionTier(admissionChance);
            const program = getRecommendedProgram(uni);
            const scholarshipScore = getScholarshipChanceScore(uni);
            const tierColor = tier === "SAFE" ? "var(--teal)" : tier === "TARGET" ? "var(--brass)" : "var(--rust)";
            const isSelected = selectedUni?.id === uni.id;

            return (
              <div key={uni.id}
                className={`pl-card p-5 cursor-pointer ${isSelected ? "ring-2 ring-[var(--indigo)]" : ""}`}
                onClick={() => setSelectedUni(isSelected ? null : uni)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--ink)" }}>{uni.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--ink-faint)" }}>{uni.city}, {uni.country} · QS #{uni.qs_rank}</p>
                  </div>
                  <span className="pl-tag px-2 py-0.5 text-xs font-bold" style={{ background: `color-mix(in srgb, ${tierColor} 15%, white)`, color: tierColor, border: `1px solid color-mix(in srgb, ${tierColor} 25%, white)` }}>
                    {tier}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="pl-field-label" style={{ fontSize: "0.58rem" }}>Match Score</span>
                  <span className="pl-mono font-bold text-xs" style={{ color: "var(--indigo)" }}>{matchScore}%</span>
                </div>
                <ThreadGauge value={matchScore} tone="indigo" size="sm" />

                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center p-2 rounded-lg" style={{ background: "var(--canvas)" }}>
                    <span className="block text-[0.55rem] uppercase font-semibold" style={{ color: "var(--ink-faint)" }}>Tuition</span>
                    <span className="block text-xs font-bold mt-0.5 pl-mono">${(uni.tuition / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="text-center p-2 rounded-lg" style={{ background: "var(--canvas)" }}>
                    <span className="block text-[0.55rem] uppercase font-semibold" style={{ color: "var(--ink-faint)" }}>Admission</span>
                    <span className="block text-xs font-bold mt-0.5 pl-mono" style={{ color: tierColor }}>{admissionChance}%</span>
                  </div>
                  <div className="text-center p-2 rounded-lg" style={{ background: "var(--canvas)" }}>
                    <span className="block text-[0.55rem] uppercase font-semibold" style={{ color: "var(--ink-faint)" }}>Scholarship</span>
                    <span className="block text-xs font-bold mt-0.5 pl-mono">{scholarshipScore}%</span>
                  </div>
                </div>

                <p className="text-xs mt-3 font-medium" style={{ color: "var(--ink-soft)" }}>Program: {program}</p>

                {eligibility.eligible ? (
                  <p className="text-xs mt-1 font-semibold" style={{ color: "var(--teal)" }}>✓ {eligibility.reason}</p>
                ) : (
                  <p className="text-xs mt-1 font-semibold" style={{ color: "var(--rust)" }}>✗ {eligibility.reason}</p>
                )}

                {/* Expanded Detail */}
                {isSelected && (
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                    <h4 className="pl-field-label mb-2">Admission Analysis</h4>
                    <div className="space-y-1">
                      {getAdmissionReasons(uni).map((reason, i) => (
                        <p key={i} className="text-xs" style={{ color: "var(--ink-soft)" }}>{reason}</p>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="pl-stat pl-stat--card p-2">
                        <span className="pl-stat-label">Avg Salary</span>
                        <strong className="pl-stat-value text-sm">{uni.average_salary}</strong>
                      </div>
                      <div className="pl-stat pl-stat--card p-2">
                        <span className="pl-stat-label">Employment</span>
                        <strong className="pl-stat-value text-sm">{Math.round(uni.employment_rate * 100)}%</strong>
                      </div>
                    </div>
                    <p className="text-xs mt-3" style={{ color: "var(--ink-faint)" }}>
                      Intakes: {uni.intakes?.join(", ")} · Work rights: {uni.work_rights}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
