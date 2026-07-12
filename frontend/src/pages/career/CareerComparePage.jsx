/* CareerComparePage — side-by-side career comparison with warm table styling */
import usePageTitle from '../../hooks/usePageTitle';
import useCareerAnalysis from '../../hooks/useCareerAnalysis';
import Panel, { PanelHead } from '../../components/ui/Panel';
import ThreadGauge from '../../components/ui/ThreadGauge';
import EmptyState from '../../components/ui/EmptyState';
import ComparisonChart from '../../components/ComparisonChart';

export default function CareerComparePage() {
  usePageTitle('Compare Careers');
  const { comparisonData, bestCareer } = useCareerAnalysis();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="pl-page-title">Career Comparison</h1>
        <p className="pl-page-subtitle">
          Side-by-side analysis of your top matched career paths.
        </p>
      </div>

      {comparisonData.length === 0 ? (
        <Panel className="p-6">
          <EmptyState
            title="No comparison data"
            body="Run the career recommendation engine first. Your top matches will appear here for comparison."
          />
        </Panel>
      ) : (
        <>
          {/* Best Career Hero */}
          {bestCareer && (
            <div className="pl-hero p-6">
              <div className="pl-label" style={{ color: 'rgba(255,255,255,0.65)' }}>Recommended Career</div>
              <h2 className="pl-hero-role mt-1">{bestCareer.role_name}</h2>
              <p className="mt-2 text-lg font-semibold">Match Score: {bestCareer.readiness_score}%</p>
              <div className="mt-4 text-sm space-y-1 pl-mono opacity-90">
                <p>Salary: <span className="font-semibold">{bestCareer.salary}</span></p>
                <p>Demand: <span className="font-semibold">{bestCareer.demand}</span></p>
                <p>Difficulty: <span className="font-semibold">{bestCareer.difficulty}</span></p>
                <p>Learning Time: <span className="font-semibold">{bestCareer.learning_time}</span></p>
              </div>
              <div className="mt-4 rounded-lg p-3 text-sm font-medium"
                   style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)' }}>
                Highest readiness score among compared careers and strongest alignment with your current skills.
              </div>
            </div>
          )}

          {/* Chart */}
          <Panel className="p-6">
            <h2 className="pl-panel-title mb-4">Readiness Comparison</h2>
            <ComparisonChart data={comparisonData} />
          </Panel>

          {/* Table */}
          <Panel className="p-6" accent>
            <PanelHead title="Detailed Comparison" subtitle="Complete metrics for your top career matches." />
            <div className="overflow-x-auto">
              <table className="pl-table">
                <thead>
                  <tr>
                    <th>Career</th>
                    <th>Readiness</th>
                    <th>Salary</th>
                    <th>Demand</th>
                    <th>Difficulty</th>
                    <th>Learning Time</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((career) => (
                    <tr key={career.role_id}>
                      <td className="font-semibold" style={{ color: 'var(--text-primary)' }}>{career.role_name}</td>
                      <td>
                        <div className="flex items-center gap-2.5 min-w-[100px]">
                          <span className="pl-mono font-semibold" style={{ color: 'var(--success)' }}>{career.readiness_score}%</span>
                          <div className="flex-1">
                            <ThreadGauge value={career.readiness_score} tone="success" size="sm" />
                          </div>
                        </div>
                      </td>
                      <td className="pl-mono font-medium">{career.salary}</td>
                      <td>
                        <span className="pl-tag pl-tag--success px-2 py-0.5">
                          {career.demand}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{career.difficulty}</td>
                      <td className="text-xs" style={{ color: 'var(--text-secondary)' }}>{career.learning_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}
