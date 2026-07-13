/* EmptyState — premium empty state with decorative floating shapes */

export default function EmptyState({ title, body, icon, children, className = '' }) {
  return (
    <div className={`pl-empty p-8 text-center relative ${className}`}>
      <div className="pl-empty-shapes">
        <div className="pl-empty-shape" />
        <div className="pl-empty-shape" />
        <div className="pl-empty-shape" />
      </div>
      <div className="relative z-10">
        {icon && <div className="pl-empty-icon mb-4">{icon}</div>}
        <h3 className="pl-empty-title">{title}</h3>
        <p className="pl-empty-body mt-1.5 max-w-sm mx-auto">{body}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
