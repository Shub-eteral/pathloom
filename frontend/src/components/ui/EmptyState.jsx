/* EmptyState — placeholder for no-data sections */

export default function EmptyState({ title = "Nothing here yet", body = "" }) {
  return (
    <div className="pl-empty p-8 text-center">
      <div className="pl-empty-icon mb-3">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      </div>
      <h4 className="pl-empty-title">{title}</h4>
      {body && <p className="pl-empty-body mt-1.5 max-w-sm mx-auto">{body}</p>}
    </div>
  );
}
