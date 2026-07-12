/* CountryStrategyPage — country comparison with green accent */
import { useProfile } from '../../contexts/ProfileContext';
import usePageTitle from '../../hooks/usePageTitle';
import useStudyEligibility from '../../hooks/useStudyEligibility';
import countries from '../../data/countries';
import Panel from '../../components/ui/Panel';
import ThreadGauge from '../../components/ui/ThreadGauge';
import EmptyState from '../../components/ui/EmptyState';

export default function CountryStrategyPage() {
  usePageTitle('Country Strategy');
  const { studyCountry, targetCareer } = useProfile();
  const { getCountryScore, getCountryCategory, uniqueCountries } = useStudyEligibility();

  const countryData = countries
    .map((c) => ({
      ...c,
      score: getCountryScore(c.name),
      category: getCountryCategory(c.name),
      hasUniversities: uniqueCountries.includes(c.name),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="pl-page-title">Country Strategy</h1>
        <p className="pl-page-subtitle">
          Compare study destinations based on your profile match, affordability, and opportunities.
        </p>
      </div>

      {countryData.length === 0 ? (
        <Panel className="p-6">
          <EmptyState title="No country data" body="Set your academic profile first to see country match scores." />
        </Panel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countryData.map((country) => {
            const catColor = country.category === "SAFE" ? 'var(--success)' : country.category === "TARGET" ? 'var(--warning)' : 'var(--danger)';
            const isCurrentTarget = country.name === studyCountry;

            return (
              <Panel key={country.id} className={`p-5 ${isCurrentTarget ? 'ring-2' : ''}`}
                style={isCurrentTarget ? { '--tw-ring-color': 'var(--accent)' } : {}}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                      {country.name}
                      {isCurrentTarget && <span className="ml-2 text-xs font-semibold" style={{ color: 'var(--accent)' }}>(Your target)</span>}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {country.language} · {country.currency}
                    </p>
                  </div>
                  <span className="pl-tag px-2.5 py-0.5 text-xs font-bold"
                    style={{
                      background: country.category === "SAFE" ? 'var(--success-soft)' : country.category === "TARGET" ? 'var(--warning-soft)' : 'var(--danger-soft)',
                      color: catColor
                    }}>
                    {country.category}
                  </span>
                </div>

                {country.hasUniversities && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="pl-label" style={{ fontSize: '0.55rem' }}>Profile Match</span>
                      <span className="pl-mono font-bold text-xs" style={{ color: catColor }}>{country.score}%</span>
                    </div>
                    <ThreadGauge value={country.score} tone={country.category === "SAFE" ? "success" : country.category === "TARGET" ? "warning" : "danger"} size="sm" />
                  </>
                )}

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="p-2 rounded-lg" style={{ background: 'var(--surface-2)' }}>
                    <span className="block text-[0.55rem] uppercase font-semibold" style={{ color: 'var(--text-tertiary)' }}>Tuition</span>
                    <span className="block text-xs font-bold mt-0.5">{country.tuition}</span>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: 'var(--surface-2)' }}>
                    <span className="block text-[0.55rem] uppercase font-semibold" style={{ color: 'var(--text-tertiary)' }}>Living Cost</span>
                    <span className="block text-xs font-bold mt-0.5">{country.avg_living_cost}</span>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: 'var(--surface-2)' }}>
                    <span className="block text-[0.55rem] uppercase font-semibold" style={{ color: 'var(--text-tertiary)' }}>Visa</span>
                    <span className="block text-xs font-bold mt-0.5">{country.visa_difficulty}</span>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: 'var(--surface-2)' }}>
                    <span className="block text-[0.55rem] uppercase font-semibold" style={{ color: 'var(--text-tertiary)' }}>PR Score</span>
                    <span className="block text-xs font-bold mt-0.5">{country.pr_score}/10</span>
                  </div>
                </div>

                <div className="mt-3 text-xs space-y-1" style={{ color: 'var(--text-secondary)' }}>
                  <p>Post-study work: {country.post_study_work_visa_duration}</p>
                  <p>Safety: {country.safety_index}/10 · Intl students: {country.international_student_population}</p>
                  <p>Top fields: {country.top_fields?.join(", ")}</p>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}
