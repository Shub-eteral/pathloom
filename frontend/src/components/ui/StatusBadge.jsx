/* StatusBadge — connection/tier status indicators */

export default function StatusBadge({ status = "online", label }) {
  const defaultLabels = {
    online: "Connected",
    connecting: "Connecting…",
    offline: "Server offline",
  };

  return (
    <div className={`pl-status pl-status--${status}`}>
      <span className="pl-status-dot" />
      <span>{label || defaultLabels[status] || status}</span>
    </div>
  );
}
