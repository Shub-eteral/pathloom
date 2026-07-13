/* Panel — card wrapper with glass + accent variants, stagger support */

export default function Panel({ children, accent, glass, className = '', style = {}, ...rest }) {
  const cls = [
    'pl-panel',
    accent ? 'pl-panel--accent' : '',
    glass ? 'pl-panel--glass' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={style} {...rest}>
      {children}
    </div>
  );
}

export function PanelHead({ title, subtitle, children, className = '' }) {
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
