/* Panel — card wrapper with optional head section */

export default function Panel({ children, className = "", ...rest }) {
  return (
    <div className={`pl-panel ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function PanelHead({ title, subtitle, children, className = "" }) {
  return (
    <div className={`pl-panel-head pb-5 mb-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="pl-panel-title">{title}</h2>
          {subtitle && <p className="pl-panel-subtitle">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
