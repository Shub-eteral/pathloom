/* Panel — card wrapper with optional accent top border */

export default function Panel({ children, accent, className = "", ...rest }) {
  return (
    <div className={`pl-panel ${accent ? "pl-panel--accent" : ""} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function PanelHead({ title, subtitle, children, className = "" }) {
  return (
    <div className={`pl-panel-head pb-4 mb-4 ${className}`}>
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
