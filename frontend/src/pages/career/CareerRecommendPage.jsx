/* CareerRecommendPage — best match hero + recommendation cards with gradient accents */
import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import { useApi } from '../../contexts/ApiContext';
import { useProfile } from '../../contexts/ProfileContext';
import useCareerAnalysis from '../../hooks/useCareerAnalysis';
import Panel, { PanelHead } from '../../components/ui/Panel';
import Button, { Spinner } from '../../components/ui/Button';
import RadialGauge from '../../components/ui/RadialGauge';
import ThreadGauge from '../../components/ui/ThreadGauge';
import EmptyState from '../../components/ui/EmptyState';
import { CareerStats } from '../../components/ui/StatCard';
import { CheckIcon, CloseIcon, SparklesIcon } from '../../components/icons/Icons';

export default function CareerRecommendPage() {
  usePageTitle('Career Recommendations');
  const { getRoleName } = useApi();
  const { selectedSkills } = useProfile();
  const {
    recommendations, isLoadingRecommendations, recommendError,
    careerInfo, explanations, insights,
    getRecommendations, bestMatch, otherRecommendations,
  } = useCareerAnalysis();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="pl-page-title">Career Recommendations</h1>
          <p className="pl-page-subtitle">
            Alternative career paths matched to your skill profile.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={getRecommendations}
          disabled={isLoadingRecommendations || selectedSkills.length === 0}
          className="px-5 py-2.5"
        >
          {isLoadingRecommendations ? <><Spinner /><span>Loading…</span></> : "Refresh Matches"}
        </Button>
      </div>

      {recommendError && <div className="pl-alert pl-alert--rust p-3">{recommendError}</div>}

      {recommendations.length === 0 ? (
        <Panel className="p-6">
          <EmptyState
            icon={<SparklesIcon className="w-10 h-10" />}
            title="No recommendations yet"
            body="Go to Career Analysis, add your skills, and click 'Find alternative roles' to see recommendations here."
          />
        </Panel>
      ) : (
        <div className="space-y-5">
          {/* Best Match Hero */}
          {bestMatch && (
            <div className="pl-hero p-6 md:p-8">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <RadialGauge
                  value={bestMatch.score}
                  size={110}
                  strokeWidth={7}
                  tone="warning"
                  className="shrink-0"
                />
                <div className="flex-1">
                  <span className="pl-hero-badge px-3 py-1 inline-block">Best Match</span>
                  <h3 className="pl-hero-role mt-2">{getRoleName(bestMatch.role_id)}</h3>
                  <p className="mt-1 text-sm opacity-70">Highest skill alignment with your profile</p>

                  <div className="mt-4">
                    <CareerStats info={careerInfo[bestMatch.role_id]} variant="hero" />
                  </div>
                </div>
              </div>

              {explanations[bestMatch.role_id] && (
                <div className="relative z-10 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <h4 className="font-semibold text-sm mb-3 pl-display">Why This Role?</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-1.5 text-xs opacity-60">Matched Skills</p>
                      <ul className="text-sm space-y-1 opacity-90">
                        {explanations[bestMatch.role_id].matched.map((s, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <CheckIcon className="w-3.5 h-3.5 shrink-0 opacity-80" />{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-1.5 text-xs opacity-60">Skills to Build</p>
                      <ul className="text-sm space-y-1 opacity-90">
                        {explanations[bestMatch.role_id].missing.map((s, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <CloseIcon className="w-3.5 h-3.5 shrink-0 opacity-80" />{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other Recommendations */}
          {otherRecommendations.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherRecommendations.map((item, index) => (
                <div
                  key={item.role_id}
                  className="pl-card p-5 flex flex-col justify-between pl-stagger"
                  style={{ '--stagger-index': index }}
                >
                  <div>
                    <span className="pl-eyebrow text-[10px]">Alternative track</span>
                    <h4 className="font-bold text-sm mt-1" style={{ color: 'var(--text-primary)' }}>{getRoleName(item.role_id)}</h4>
                    <div className="mt-3 flex items-center justify-between mb-1">
                      <span className="pl-label" style={{ fontSize: '0.55rem' }}>Match Score</span>
                      <span className="pl-mono font-bold text-xs" style={{ color: 'var(--accent)' }}>{item.score}%</span>
                    </div>
                    <ThreadGauge value={item.score} tone="accent" size="sm" />
                  </div>

                  <div className="mt-4">
                    <CareerStats info={careerInfo[item.role_id]} variant="card" />
                  </div>

                  {explanations[item.role_id] && (
                    <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <h4 className="font-semibold text-sm mb-2">Why This Role?</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="font-medium mb-1 text-xs" style={{ color: 'var(--success)' }}>Matched</p>
                          <ul className="text-sm space-y-0.5" style={{ color: 'var(--text-secondary)' }}>
                            {explanations[item.role_id].matched.map((s, i) => (
                              <li key={i} className="flex items-center gap-1.5 truncate">
                                <CheckIcon className="w-3 h-3 shrink-0" style={{ color: 'var(--success)' }} />{s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium mb-1 text-xs" style={{ color: 'var(--danger)' }}>Missing</p>
                          <ul className="text-sm space-y-0.5" style={{ color: 'var(--text-secondary)' }}>
                            {explanations[item.role_id].missing.map((s, i) => (
                              <li key={i} className="flex items-center gap-1.5 truncate">
                                <CloseIcon className="w-3 h-3 shrink-0" style={{ color: 'var(--danger)' }} />{s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {insights[item.role_id] && (
                    <div className="mt-4">
                      <div className="rounded-xl p-4" style={{ background: 'var(--accent-soft)', border: '1px solid var(--border)' }}>
                        <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--accent-text)' }}>
                          <SparklesIcon className="w-3.5 h-3.5" />
                          AI Insight
                        </h4>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{insights[item.role_id]}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Link to Compare */}
          <div className="text-center">
            <Link to="/career/compare">
              <Button variant="outline" className="px-6 py-2.5">
                Compare top careers side-by-side
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
