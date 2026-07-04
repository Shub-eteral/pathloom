/* ScholarshipPage — scholarship matching and eligibility */
import { useProfile } from '../../contexts/ProfileContext';
import usePageTitle from '../../hooks/usePageTitle';
import useStudyEligibility from '../../hooks/useStudyEligibility';
import Panel, { PanelHead } from '../../components/ui/Panel';
import ThreadGauge from '../../components/ui/ThreadGauge';
import EmptyState from '../../components/ui/EmptyState';
import scholarships from '../../data/scholarships';

export default function ScholarshipPage() {
  usePageTitle('Scholarships');
  const { studyCountry, degreeLevel } = useProfile();
  const {
    getScholarshipMatchScore, getScholarshipCategory,
    getScholarshipAnalysis, getScholarshipRecommendation,
  } = useStudyEligibility();

  const filtered = scholarships
    .filter((s) => !studyCountry || s.country === studyCountry)
    .filter((s) => !degreeLevel || s.degree_levels.includes(degreeLevel))
    .sort((a, b) => getScholarshipMatchScore(b) - getScholarshipMatchScore(a));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="pl-display text-2xl font-bold">Scholarship Intelligence</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          {studyCountry
            ? `Scholarships available in ${studyCountry}${degreeLevel ? ` for ${degreeLevel} programs` : ""}.`
            : "Set your target country and degree level in Academic Profile to see matching scholarships."}
        </p>
      </div>

      {filtered.length === 0 ? (
        <Panel className="p-6">
          <EmptyState
            title="No matching scholarships"
            body="Try adjusting your target country or degree level in your Academic Profile."
          />
        </Panel>
      ) : (
        <div className="space-y-4">
          {filtered.map((s) => {
            const score = getScholarshipMatchScore(s);
            const category = getScholarshipCategory(score);
            const analysis = getScholarshipAnalysis(s);
            const recommendation = getScholarshipRecommendation(score);
            const catColor = category === "HIGH" ? "var(--teal)" : category === "MEDIUM" ? "var(--brass)" : "var(--rust)";

            return (
              <Panel key={s.id} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: "var(--ink)" }}>{s.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--ink-faint)" }}>{s.country} · {s.type} · {s.degree_levels.join(", ")}</p>
                  </div>
                  <span className="pl-tag px-2.5 py-0.5 text-xs font-bold" style={{ background: `color-mix(in srgb, ${catColor} 15%, white)`, color: catColor, border: `1px solid color-mix(in srgb, ${catColor} 25%, white)` }}>
                    {category} MATCH
                  </span>
                </div>

                <div className="p-3 rounded-lg mb-4" style={{ background: "var(--canvas)", border: "1px solid var(--line)" }}>
                  <span className="pl-field-label mb-1.5">Award Amount</span>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{s.amount}</p>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="pl-field-label">Match Score</span>
                  <span className="pl-mono font-bold text-sm" style={{ color: catColor }}>{score}%</span>
                </div>
                <ThreadGauge value={score} tone={category === "HIGH" ? "teal" : category === "MEDIUM" ? "brass" : "rust"} size="sm" />

                <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                  <h4 className="pl-field-label mb-2">Eligibility Analysis</h4>
                  <div className="space-y-1">
                    {analysis.map((item, i) => (
                      <p key={i} className="text-sm" style={{ color: item.startsWith("✓") ? "var(--teal)" : "var(--rust)" }}>{item}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-lg" style={{ background: "var(--indigo-soft)" }}>
                  <p className="text-sm font-medium" style={{ color: "var(--indigo)" }}>
                    <strong>Recommendation:</strong> {recommendation}
                  </p>
                </div>

                {s.deadline && (
                  <p className="text-xs mt-3" style={{ color: "var(--ink-faint)" }}>
                    Deadline: {s.deadline}
                  </p>
                )}
                {s.eligibility_notes && (
                  <p className="text-xs mt-1" style={{ color: "var(--ink-faint)" }}>
                    Note: {s.eligibility_notes}
                  </p>
                )}
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}
