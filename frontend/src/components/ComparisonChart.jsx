/* ComparisonChart — animated gradient bars with staggered entry */

export default function ComparisonChart({ data }) {
  return (
    <div className="space-y-4">
      {data.map((career, index) => (
        <div
          key={career.role_id}
          className="pl-stagger"
          style={{ '--stagger-index': index }}
        >
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {career.role_name}
            </span>
            <span className="pl-mono text-sm font-bold" style={{ color: 'var(--accent)' }}>
              {career.readiness_score}%
            </span>
          </div>
          <div className="pl-comparison-bar-track">
            <div
              className="pl-comparison-bar-fill"
              style={{ width: `${Math.max(career.readiness_score, 8)}%` }}
            >
              <span className="pl-comparison-bar-label">
                {career.readiness_score}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}