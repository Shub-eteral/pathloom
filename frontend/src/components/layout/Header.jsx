/* Header — sticky top bar with brand, version, and connection status */
import { useApi } from '../../contexts/ApiContext';
import { MenuIcon } from '../icons/Icons';
import StatusBadge from '../ui/StatusBadge';

export default function Header({ onLogoClick }) {
  const { connectionStatus, connectionLabel } = useApi();

  return (
    <header className="pl-header">
      <div className="max-w-full mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-4">
        <div
          onClick={onLogoClick}
          className="flex items-center gap-3.5 cursor-pointer select-none"
          role="button"
          aria-label="Toggle navigation"
        >
          <img
            src="/pathloom-logo.png"
            alt="Pathloom"
            className="h-10 w-10 rounded-xl object-contain hover:opacity-90 transition-opacity"
            style={{ background: 'var(--indigo)', padding: '4px' }}
          />
          <div className="flex items-baseline gap-2">
            <span className="pl-display pl-brand-name">Pathloom</span>
            <span className="pl-mono pl-brand-version">v2.1</span>
          </div>
        </div>
        <StatusBadge status={connectionStatus} label={connectionLabel} />
      </div>
    </header>
  );
}
