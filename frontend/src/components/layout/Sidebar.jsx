/* Sidebar — page-based navigation with active state highlighting */
import { NavLink } from 'react-router-dom';
import {
  HomeIcon, BriefcaseIcon, SparklesIcon, ChartBarIcon,
  AcademicCapIcon, BuildingIcon, CurrencyIcon, MapIcon,
  GlobeIcon, UserIcon,
} from '../icons/Icons';

const navSections = [
  {
    label: "Overview",
    items: [
      { to: "/", icon: HomeIcon, label: "Dashboard", end: true },
    ],
  },
  {
    label: "Career Intelligence",
    items: [
      { to: "/career", icon: BriefcaseIcon, label: "Fit Analysis", end: true },
      { to: "/career/recommend", icon: SparklesIcon, label: "Recommendations" },
      { to: "/career/compare", icon: ChartBarIcon, label: "Compare Careers" },
    ],
  },
  {
    label: "Study Intelligence",
    items: [
      { to: "/study", icon: AcademicCapIcon, label: "Academic Profile", end: true },
      { to: "/study/universities", icon: BuildingIcon, label: "University Finder" },
      { to: "/study/scholarships", icon: CurrencyIcon, label: "Scholarships" },
      { to: "/study/countries", icon: MapIcon, label: "Country Strategy" },
    ],
  },
  {
    label: "Global",
    items: [
      { to: "/global", icon: GlobeIcon, label: "Opportunities" },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/profile", icon: UserIcon, label: "My Profile" },
    ],
  },
];

export default function Sidebar({ isOpen, onClose, isCollapsed }) {
  return (
    <>
      {isOpen && (
        <div className="pl-sidebar-overlay md:hidden" onClick={onClose} />
      )}
      <aside className={`pl-sidebar ${isOpen ? "pl-sidebar--open" : ""} ${isCollapsed ? "pl-sidebar--collapsed" : ""} hidden md:block`}>
        <nav className="py-4">
          {navSections.map((section) => (
            <div key={section.label} className="pl-nav-section">
              {isCollapsed ? (
                <div className="border-t border-slate-100 my-2 mx-4" />
              ) : (
                <div className="pl-nav-section-label">{section.label}</div>
              )}
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `pl-nav-item ${isActive ? "pl-nav-item--active" : ""} ${isCollapsed ? "justify-center px-0" : ""}`
                  }
                >
                  <item.icon className="pl-nav-icon" />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
