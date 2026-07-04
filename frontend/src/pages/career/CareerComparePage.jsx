/* CareerComparePage — side-by-side career comparison */
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
        <h1 className="pl-display text-2xl font-bold">Career Comparison</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
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
            <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 shadow-lg">
              <div className="text-sm font-semibold uppercase tracking-wider pl-mono">Recommended Career</div>
              <h2 className="text-3xl font-bold mt-2 pl-display">{bestCareer.role_name}</h2>
              <p className="mt-2 text-lg font-medium">Match Score: {bestCareer.readiness_score}%</p>
              <div className="mt-4 text-sm space-y-1.5 pl-mono">
                <p>Salary: <span className="font-semibold">{bestCareer.salary}</span></p>
                <p>Demand: <span className="font-semibold">{bestCareer.demand}</span></p>
                <p>Difficulty: <span className="font-semibold">{bestCareer.difficulty}</span></p>
                <p>Learning Time: <span className="font-semibold">{bestCareer.learning_time}</span></p>
              </div>
              <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-sm font-medium">
                Highest readiness score among compared careers and strongest alignment with your current skills.
              </div>
            </div>
          )}

          {/* Chart */}
          <Panel className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "var(--ink)" }}>Readiness Comparison</h2>
            <ComparisonChart data={comparisonData} />
          </Panel>

          {/* Table */}
          <Panel className="p-6">
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
                      <td className="font-semibold" style={{ color: "var(--ink)" }}>{career.role_name}</td>
                      <td>
                        <div className="flex items-center gap-2.5 min-w-[100px]">
                          <span className="pl-mono font-semibold" style={{ color: "var(--teal)" }}>{career.readiness_score}%</span>
                          <div className="flex-1">
                            <ThreadGauge value={career.readiness_score} tone="teal" size="sm" />
                          </div>
                        </div>
                      </td>
                      <td className="pl-mono font-medium">{career.salary}</td>
                      <td>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {career.demand}
                        </span>
                      </td>
                      <td>{career.difficulty}</td>
                      <td className="text-xs">{career.learning_time}</td>
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
