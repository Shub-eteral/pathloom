/* DashboardPage — command center with radial gauges and gradient module cards */
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import { useApi } from '../contexts/ApiContext';
import { useProfile } from '../contexts/ProfileContext';
import Panel from '../components/ui/Panel';
import RadialGauge from '../components/ui/RadialGauge';
import { BriefcaseIcon, AcademicCapIcon, GlobeIcon, ArrowRightIcon, SparklesIcon, ZapIcon } from '../components/icons/Icons';

export default function DashboardPage() {
  usePageTitle('Dashboard');
  const { roles, connectionStatus, getRoleName } = useApi();
  const { selectedRole, selectedSkills, studyCountry, degreeLevel, targetCareer, getProfileCompleteness } = useProfile();

  const completeness = getProfileCompleteness();

  return (
    <div className="space-y-6 pl-mesh-bg">
      {/* Hero */}
      <div className="rounded-2xl p-8 md:p-10 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--career) 0%, var(--study) 40%, var(--global) 80%, var(--profile) 100%)',
        backgroundSize: '300% 300%',
        animation: 'pl-gradient-shift 12s ease infinite',
        color: 'var(--text-inverse)',
      }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div className="absolute top-[-30%] right-[-15%] w-[45%] h-[160%] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <ZapIcon className="w-4 h-4 opacity-70" />
            <p className="pl-mono text-xs font-medium tracking-wider opacity-70 uppercase">Intelligence Platform</p>
          </div>
          <h1 className="pl-display text-3xl md:text-4xl mt-1">Welcome to Pathloom</h1>
          <p className="mt-3 text-base opacity-85 max-w-lg font-medium leading-relaxed">
            From where you are to where you want to be. Your unified career, study, and global opportunity intelligence.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="pl-btn pl-btn--glass px-4 py-2 text-xs font-semibold">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>{connectionStatus === "online" ? "Engine Online" : "Connecting…"}</span>
            </div>
            <span className="text-sm opacity-50 pl-mono">{roles.length} roles · 140+ skills</span>
          </div>
        </div>
      </div>

      {/* Command Center Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Panel className="p-5 flex flex-col items-center text-center">
          <RadialGauge
            value={completeness}
            size={80}
            strokeWidth={6}
            tone={completeness >= 70 ? 'success' : completeness >= 40 ? 'warning' : 'danger'}
          />
          <span className="pl-label mt-3">Profile</span>
          <span className="pl-display text-sm mt-0.5">{completeness}% Complete</span>
        </Panel>

        <Panel className="p-5">
          <span className="pl-label">Target Role</span>
          <strong className="pl-display text-lg block mt-2" style={{ color: 'var(--text-primary)' }}>
            {selectedRole ? getRoleName(selectedRole) : "Not set"}
          </strong>
          {!selectedRole && (
            <Link to="/career" className="text-xs font-semibold mt-2 inline-block" style={{ color: 'var(--accent)' }}>
              Choose a role →
            </Link>
          )}
        </Panel>

        <Panel className="p-5">
          <span className="pl-label">Skills Mapped</span>
          <strong className="pl-display text-3xl block mt-2" style={{ color: 'var(--text-primary)' }}>
            {selectedSkills.length}
          </strong>
          <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
            {selectedSkills.length === 0 ? 'None added yet' : `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} tracked`}
          </p>
        </Panel>

        <Panel className="p-5">
          <span className="pl-label">Study Destination</span>
          <strong className="pl-display text-lg block mt-2" style={{ color: 'var(--text-primary)' }}>
            {studyCountry || "Not set"}
          </strong>
          {!studyCountry && (
            <Link to="/study" className="text-xs font-semibold mt-2 inline-block" style={{ color: 'var(--study)' }}>
              Set your country →
            </Link>
          )}
        </Panel>
      </div>

      {/* Module Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link to="/career" className="block">
          <div className="pl-section--career pl-section-card p-6 cursor-pointer group h-full">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{
                  background: 'var(--accent-gradient)',
                  boxShadow: '0 4px 12px var(--accent-glow)',
                }}>
                  <BriefcaseIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="pl-panel-title">Career Intelligence</h3>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>3 tools available</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Analyze your career fit, get role recommendations, and compare career paths side-by-side.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                <span>Explore careers</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Link>

        <Link to="/study" className="block">
          <div className="pl-section--study pl-section-card p-6 cursor-pointer group h-full">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{
                  background: 'var(--accent-gradient)',
                  boxShadow: '0 4px 12px var(--accent-glow)',
                }}>
                  <AcademicCapIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="pl-panel-title">Study Intelligence</h3>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>4 tools available</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Build your academic profile, find matching universities, and unlock scholarship opportunities.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                <span>Plan your studies</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Link>

        <Link to="/global" className="block">
          <div className="pl-section--global pl-section-card p-6 cursor-pointer group h-full">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{
                  background: 'var(--accent-gradient)',
                  boxShadow: '0 4px 12px var(--accent-glow)',
                }}>
                  <GlobeIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="pl-panel-title">Global Opportunities</h3>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Coming soon</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Discover immigration pathways, global salary benchmarks, and visa planning for your destinations.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                <span>Explore globally</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Start Guide */}
      {completeness < 30 && (
        <Panel className="p-6" accent>
          <h3 className="pl-panel-title mb-4">Getting Started</h3>
          <div className="space-y-4">
            {[
              { num: 1, text: <><strong>Choose a career path</strong> — Head to <Link to="/career" className="font-semibold underline" style={{ color: 'var(--career)' }}>Career Analysis</Link> and select your target role</> },
              { num: 2, text: <><strong>Map your skills</strong> — Add the skills you already have to see your readiness score</> },
              { num: 3, text: <><strong>Build your academic profile</strong> — Go to <Link to="/study" className="font-semibold underline" style={{ color: 'var(--study)' }}>Study Profile</Link> and fill in your academic details</> },
            ].map((step, i) => (
              <div key={step.num} className="pl-roadmap-item flex gap-4 pl-stagger" style={{ '--stagger-index': i }}>
                <div className="pl-roadmap-index">{step.num}</div>
                <p className="text-sm pt-1.5" style={{ color: 'var(--text-secondary)' }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}
