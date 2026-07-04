/* Thread Gauge — the signature Pathloom progress bar */

export default function ThreadGauge({ value, tone = "indigo", size = "md", light = false }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className={`pl-gauge pl-gauge--${size} pl-gauge--${tone}`}>
      <div
        className={`pl-gauge-fill${light ? " pl-gauge-fill--light" : ""}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
