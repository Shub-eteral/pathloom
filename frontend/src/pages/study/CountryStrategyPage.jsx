/* CountryStrategyPage — country comparison with glow badges and gradient accents */
import { useProfile } from '../../contexts/ProfileContext';
import usePageTitle from '../../hooks/usePageTitle';
import useStudyEligibility from '../../hooks/useStudyEligibility';
import countries from '../../data/countries';
import Panel from '../../components/ui/Panel';
import ThreadGauge from '../../components/ui/ThreadGauge';
import EmptyState from '../../components/ui/EmptyState';
import GlowBadge from '../../components/ui/GlowBadge';
import { MapIcon } from '../../components/icons/Icons';

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
          <EmptyState
            icon={<MapIcon className="w-10 h-10" />}
            title="No country data"
            body="Set your academic profile first to see country match scores."
          />
        </Panel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countryData.map((country, index) => {
            const isCurrentTarget = country.name === studyCountry;
            const tierClass = country.category === "SAFE" ? 'pl-card--tier-safe' : country.category === "TARGET" ? 'pl-card--tier-target' : 'pl-card--tier-reach';

            return (
              <Panel
                key={country.id}
                className={`p-5 pl-stagger ${isCurrentTarget ? 'ring-2' : ''} ${tierClass}`}
                style={{
                  '--stagger-index': Math.min(index, 8),
                  ...(isCurrentTarget ? { '--tw-ring-color': 'var(--accent)', boxShadow: 'var(--shadow-glow)' } : {}),
                  borderLeft: tierClass ? undefined : undefined,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      {country.name}
                      {isCurrentTarget && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{
                          background: 'var(--accent-soft)',
                          color: 'var(--accent-text)',
                        }}>Your target</span>
                      )}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {country.language} · {country.currency}
                    </p>
                  </div>
                  <GlowBadge tone={country.category}>{country.category}</GlowBadge>
                </div>

                {country.hasUniversities && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="pl-label" style={{ fontSize: '0.55rem' }}>Profile Match</span>
                      <span className="pl-mono font-bold text-xs" style={{ color: country.category === "SAFE" ? 'var(--success)' : country.category === "TARGET" ? 'var(--warning)' : 'var(--danger)' }}>{country.score}%</span>
                    </div>
                    <ThreadGauge value={country.score} tone={country.category === "SAFE" ? "success" : country.category === "TARGET" ? "warning" : "danger"} size="sm" />
                  </>
                )}

                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    { label: 'Tuition', value: country.tuition },
                    { label: 'Living Cost', value: country.avg_living_cost },
                    { label: 'Visa', value: country.visa_difficulty },
                    { label: 'PR Score', value: `${country.pr_score}/10` },
                  ].map((stat) => (
                    <div key={stat.label} className="p-2.5 rounded-xl" style={{ background: 'var(--surface-2)' }}>
                      <span className="block text-[0.55rem] uppercase font-semibold" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</span>
                      <span className="block text-xs font-bold mt-0.5">{stat.value}</span>
                    </div>
                  ))}
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
