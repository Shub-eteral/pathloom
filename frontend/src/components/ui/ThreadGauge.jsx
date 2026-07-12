/* ThreadGauge — clean progress bar with semantic tone support */

export default function ThreadGauge({ value = 0, tone = "accent", size = "md", light = false }) {
  const toneMap = {
    accent: "pl-gauge--accent",
    teal: "pl-gauge--teal",
    brass: "pl-gauge--brass",
    rust: "pl-gauge--rust",
    indigo: "pl-gauge--indigo",
    success: "pl-gauge--success",
    warning: "pl-gauge--warning",
    danger: "pl-gauge--danger",
  };
  const toneClass = toneMap[tone] || "pl-gauge--accent";

  return (
    <div className={`pl-gauge pl-gauge--${size} ${toneClass}`}>
      <div
        className={`pl-gauge-fill ${light ? "pl-gauge-fill--light" : ""}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
