/* StatCard — stat display for hero and card variants */

export default function StatCard({ label, value, variant = "card" }) {
  return (
    <div className={`pl-stat pl-stat--${variant} p-3`}>
      <span className="pl-stat-label mb-0.5">{label}</span>
      <strong className="pl-stat-value">{value}</strong>
    </div>
  );
}

export function StatGrid({ items, variant = "card", columns = 2 }) {
  const colClass = columns === 4 ? "grid-cols-2 md:grid-cols-4" : columns === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className={`grid ${colClass} gap-3`}>
      {items.map((item) => (
        <StatCard key={item.label} label={item.label} value={item.value} variant={variant} />
      ))}
    </div>
  );
}

export function CareerStats({ info, variant = "card" }) {
  if (!info) return null;
  const items = [
    { label: "Salary", value: info.salary },
    { label: "Demand", value: info.demand },
    { label: "Difficulty", value: info.difficulty },
    { label: "Time to learn", value: info.learning_time },
  ];
  return <StatGrid items={items} variant={variant} />;
}
