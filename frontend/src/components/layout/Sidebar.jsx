/* Sidebar — section-colored navigation with gradient pill active indicators */
import { NavLink } from 'react-router-dom';
import {
  HomeIcon, BriefcaseIcon, SparklesIcon, ChartBarIcon,
  AcademicCapIcon, BuildingIcon, CurrencyIcon, MapIcon,
  GlobeIcon, UserIcon,
} from '../icons/Icons';

const navSections = [
  {
    label: "Overview",
    section: "dashboard",
    items: [
      { to: "/", icon: HomeIcon, label: "Dashboard", end: true },
    ],
  },
  {
    label: "Career",
    section: "career",
    items: [
      { to: "/career", icon: BriefcaseIcon, label: "Fit Analysis", end: true },
      { to: "/career/recommend", icon: SparklesIcon, label: "Recommendations" },
      { to: "/career/compare", icon: ChartBarIcon, label: "Compare Careers" },
    ],
  },
  {
    label: "Study",
    section: "study",
    items: [
      { to: "/study", icon: AcademicCapIcon, label: "Academic Profile", end: true },
      { to: "/study/universities", icon: BuildingIcon, label: "University Finder" },
      { to: "/study/scholarships", icon: CurrencyIcon, label: "Scholarships" },
      { to: "/study/countries", icon: MapIcon, label: "Country Strategy" },
    ],
  },
  {
    label: "Global",
    section: "global",
    items: [
      { to: "/global", icon: GlobeIcon, label: "Opportunities" },
    ],
  },
  {
    label: "Account",
    section: "profile",
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
        <nav className="py-3">
          {navSections.map((section, sectionIdx) => (
            <div key={section.label} className={`pl-nav-section pl-section--${section.section}`}>
              {sectionIdx > 0 && (
                isCollapsed ? (
                  <div className="pl-nav-divider" />
                ) : (
                  <div className="pl-nav-section-label">{section.label}</div>
                )
              )}
              {sectionIdx === 0 && !isCollapsed && (
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
