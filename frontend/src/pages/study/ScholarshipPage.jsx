/* ScholarshipPage — scholarship matching with glow badges and gradient accents */
import { useProfile } from '../../contexts/ProfileContext';
import usePageTitle from '../../hooks/usePageTitle';
import useStudyEligibility from '../../hooks/useStudyEligibility';
import Panel from '../../components/ui/Panel';
import ThreadGauge from '../../components/ui/ThreadGauge';
import EmptyState from '../../components/ui/EmptyState';
import GlowBadge from '../../components/ui/GlowBadge';
import scholarships from '../../data/scholarships';
import { CheckIcon, CloseIcon, CurrencyIcon, SparklesIcon } from '../../components/icons/Icons';

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
    <div className="space-y-5">
      <div>
        <h1 className="pl-page-title">Scholarship Intelligence</h1>
        <p className="pl-page-subtitle">
          {studyCountry
            ? `Scholarships available in ${studyCountry}${degreeLevel ? ` for ${degreeLevel} programs` : ""}.`
            : "Set your target country and degree level in Academic Profile to see matching scholarships."}
        </p>
      </div>

      {filtered.length === 0 ? (
        <Panel className="p-6">
          <EmptyState
            icon={<CurrencyIcon className="w-10 h-10" />}
            title="No matching scholarships"
            body="Try adjusting your target country or degree level in your Academic Profile."
          />
        </Panel>
      ) : (
        <div className="space-y-4">
          {filtered.map((s, index) => {
            const score = getScholarshipMatchScore(s);
            const category = getScholarshipCategory(score);
            const analysis = getScholarshipAnalysis(s);
            const recommendation = getScholarshipRecommendation(score);

            return (
              <Panel
                key={s.id}
                className="p-5 pl-stagger"
                style={{ '--stagger-index': Math.min(index, 6) }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{s.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{s.country} · {s.type} · {s.degree_levels.join(", ")}</p>
                  </div>
                  <GlowBadge tone={category}>{category} MATCH</GlowBadge>
                </div>

                <div className="p-3.5 rounded-xl mb-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <span className="pl-label mb-1">Award Amount</span>
                  <p className="text-base font-bold pl-display" style={{ color: 'var(--text-primary)' }}>{s.amount}</p>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="pl-label">Match Score</span>
                  <span className="pl-mono font-bold text-sm" style={{ color: category === "HIGH" ? 'var(--success)' : category === "MEDIUM" ? 'var(--warning)' : 'var(--danger)' }}>{score}%</span>
                </div>
                <ThreadGauge value={score} tone={category === "HIGH" ? "success" : category === "MEDIUM" ? "warning" : "danger"} size="sm" />

                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <h4 className="pl-label mb-2">Eligibility Analysis</h4>
                  <div className="space-y-1.5">
                    {analysis.map((item, i) => {
                      const isPass = item.startsWith("\u2713");
                      return (
                        <p key={i} className="text-sm flex items-center gap-1.5" style={{ color: isPass ? 'var(--success)' : 'var(--danger)' }}>
                          {isPass
                            ? <CheckIcon className="w-3.5 h-3.5 shrink-0" />
                            : <CloseIcon className="w-3.5 h-3.5 shrink-0" />
                          }
                          {item.replace(/^[✓✗]\s*/, "")}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 p-3.5 rounded-xl" style={{ background: 'var(--accent-soft)' }}>
                  <p className="text-sm font-medium flex items-start gap-1.5" style={{ color: 'var(--accent-text)' }}>
                    <SparklesIcon className="w-4 h-4 shrink-0 mt-0.5" />
                    <span><strong>Recommendation:</strong> {recommendation}</span>
                  </p>
                </div>

                {s.deadline && (
                  <p className="text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>
                    Deadline: {s.deadline}
                  </p>
                )}
                {s.eligibility_notes && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
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
