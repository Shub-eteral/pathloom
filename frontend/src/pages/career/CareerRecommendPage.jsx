/* CareerRecommendPage — alternative role recommendations */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import { useApi } from '../../contexts/ApiContext';
import { useProfile } from '../../contexts/ProfileContext';
import useCareerAnalysis from '../../hooks/useCareerAnalysis';
import Panel, { PanelHead } from '../../components/ui/Panel';
import Button, { Spinner } from '../../components/ui/Button';
import ThreadGauge from '../../components/ui/ThreadGauge';
import EmptyState from '../../components/ui/EmptyState';
import { CareerStats } from '../../components/ui/StatCard';

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
          <h1 className="pl-display text-2xl font-bold">Career Recommendations</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
            Alternative career paths matched to your skill profile.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={getRecommendations}
          disabled={isLoadingRecommendations || selectedSkills.length === 0}
          className="px-5 py-3"
        >
          {isLoadingRecommendations ? <><Spinner /><span>Loading…</span></> : "Refresh Matches"}
        </Button>
      </div>

      {recommendError && <div className="pl-alert pl-alert--rust p-3.5">{recommendError}</div>}

      {recommendations.length === 0 ? (
        <Panel className="p-6">
          <EmptyState
            title="No recommendations yet"
            body="Go to Career Analysis, add your skills, and click 'Find alternative roles' to see recommendations here."
          />
        </Panel>
      ) : (
        <div className="space-y-6">
          {/* Best Match Hero */}
          {bestMatch && (
            <div className="pl-hero p-6">
              <span className="pl-hero-badge px-2.5 py-0.5 inline-block font-bold">Best Match</span>
              <h3 className="pl-display pl-hero-role mt-2">{getRoleName(bestMatch.role_id)}</h3>
              <div className="mt-4 flex items-center justify-between mb-1.5">
                <span className="pl-field-label" style={{ color: "rgba(255,255,255,0.7)" }}>Match Score</span>
                <span className="pl-mono pl-hero-score text-base">{bestMatch.score}%</span>
              </div>
              <ThreadGauge value={bestMatch.score} tone="brass" size="md" light={true} />

              <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                <CareerStats info={careerInfo[bestMatch.role_id]} variant="hero" />
              </div>

              {explanations[bestMatch.role_id] && (
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                  <h4 className="font-semibold text-sm mb-2 pl-display">Why This Role?</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-1 text-xs" style={{ color: "var(--teal-soft)" }}>Matched</p>
                      <ul className="text-sm space-y-0.5 opacity-90">
                        {explanations[bestMatch.role_id].matched.map((s, i) => <li key={i} className="truncate">✓ {s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-1 text-xs" style={{ color: "var(--rust-soft)" }}>Missing</p>
                      <ul className="text-sm space-y-0.5 opacity-90">
                        {explanations[bestMatch.role_id].missing.map((s, i) => <li key={i} className="truncate">✗ {s}</li>)}
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
              {otherRecommendations.map((item) => (
                <div key={item.role_id} className="pl-card p-4 flex flex-col justify-between">
                  <div>
                    <span className="pl-eyebrow text-[10px]">Alternative track</span>
                    <h4 className="font-bold text-sm mt-0.5" style={{ color: "var(--ink)" }}>{getRoleName(item.role_id)}</h4>
                    <div className="mt-3 flex items-center justify-between mb-1">
                      <span className="pl-field-label" style={{ fontSize: "0.58rem" }}>Match Score</span>
                      <span className="pl-mono font-bold text-xs" style={{ color: "var(--indigo)" }}>{item.score}%</span>
                    </div>
                    <ThreadGauge value={item.score} tone="indigo" size="sm" />
                  </div>

                  <div className="mt-4">
                    <CareerStats info={careerInfo[item.role_id]} variant="card" />
                  </div>

                  {explanations[item.role_id] && (
                    <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                      <h4 className="font-semibold text-sm mb-2 pl-display">Why This Role?</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium mb-1 text-xs" style={{ color: "var(--teal)" }}>Matched</p>
                          <ul className="text-sm space-y-0.5" style={{ color: "var(--ink-soft)" }}>
                            {explanations[item.role_id].matched.map((s, i) => <li key={i} className="truncate">✓ {s}</li>)}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium mb-1 text-xs" style={{ color: "var(--rust)" }}>Missing</p>
                          <ul className="text-sm space-y-0.5" style={{ color: "var(--ink-soft)" }}>
                            {explanations[item.role_id].missing.map((s, i) => <li key={i} className="truncate">✗ {s}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {insights[item.role_id] && (
                    <div className="mt-4">
                      <div className="rounded-xl p-4" style={{ backgroundColor: "var(--indigo-soft)", border: "1px solid rgba(35,44,82,0.12)" }}>
                        <h4 className="font-semibold text-sm mb-2 pl-display" style={{ color: "var(--indigo)" }}>AI Insight</h4>
                        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{insights[item.role_id]}</p>
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
              <Button variant="outline" className="px-6 py-3">
                Compare top careers side-by-side →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
