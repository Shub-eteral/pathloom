/* StatusBadge — connection status indicator */

export default function StatusBadge({ status = "offline", label = "" }) {
  const statusClass = {
    online: "pl-status--online",
    connecting: "pl-status--connecting",
    offline: "pl-status--offline",
  }[status] || "pl-status--offline";

  return (
    <div className={`pl-status ${statusClass}`}>
      <div className="pl-status-dot" />
      <span>{label || status}</span>
    </div>
  );
}
