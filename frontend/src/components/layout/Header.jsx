/* Header — frosted glass bar with gradient section line and section indicator */
import { useLocation } from 'react-router-dom';
import { useApi } from '../../contexts/ApiContext';
import StatusBadge from '../ui/StatusBadge';
import ThemeToggle from '../ui/ThemeToggle';

const sectionLabels = {
  '/': 'Dashboard',
  '/career': 'Career Intelligence',
  '/career/recommend': 'Career Recommendations',
  '/career/compare': 'Career Comparison',
  '/study': 'Academic Profile',
  '/study/universities': 'University Finder',
  '/study/scholarships': 'Scholarships',
  '/study/countries': 'Country Strategy',
  '/global': 'Global Opportunities',
  '/profile': 'My Profile',
};

export default function Header({ onLogoClick }) {
  const { connectionStatus, connectionLabel } = useApi();
  const location = useLocation();
  const currentLabel = sectionLabels[location.pathname] || 'Pathloom';

  return (
    <header className="pl-header">
      <div className="max-w-full mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center">
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

          {/* Section breadcrumb */}
          <div className="pl-section-indicator hidden md:flex">
            <div className="pl-section-indicator-dot" />
            <span>{currentLabel}</span>
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
