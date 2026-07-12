/* Header — warm top bar with brand, status badge, and theme toggle */
import { useApi } from '../../contexts/ApiContext';
import StatusBadge from '../ui/StatusBadge';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header({ onLogoClick }) {
  const { connectionStatus, connectionLabel } = useApi();

  return (
    <header className="pl-header">
      <div className="max-w-full mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        <div
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer select-none"
          role="button"
          aria-label="Toggle navigation"
        >
          <img
            src="/pathloom-logo.png"
            alt="Pathloom"
            className="h-9 w-9 rounded-lg object-contain"
            style={{ transition: 'opacity 0.15s ease' }}
          />
          <div className="flex items-center gap-2">
            <span className="pl-brand-name">Pathloom</span>
            <span className="pl-brand-version">v2.1</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <StatusBadge status={connectionStatus} label={connectionLabel} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
