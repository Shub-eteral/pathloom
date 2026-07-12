/* DashboardPage — landing overview hub with section-colored navigation cards */
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import { useApi } from '../contexts/ApiContext';
import { useProfile } from '../contexts/ProfileContext';
import Panel from '../components/ui/Panel';
import ThreadGauge from '../components/ui/ThreadGauge';
import { BriefcaseIcon, AcademicCapIcon, GlobeIcon, ArrowRightIcon, SparklesIcon } from '../components/icons/Icons';

export default function DashboardPage() {
  usePageTitle('Dashboard');
  const { roles, connectionStatus, getRoleName } = useApi();
  const { selectedRole, selectedSkills, studyCountry, degreeLevel, targetCareer, getProfileCompleteness } = useProfile();

  const completeness = getProfileCompleteness();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl p-8 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--career) 0%, var(--study) 50%, var(--global) 100%)',
        color: 'var(--text-inverse)'
      }}>
        <div className="relative z-10">
          <p className="pl-mono text-xs font-medium tracking-wider opacity-70 uppercase">Welcome to</p>
          <h1 className="pl-display text-3xl mt-1">Pathloom</h1>
          <p className="mt-2 text-base opacity-85 max-w-lg font-medium">
            From where you are to where you want to be. Career, study and global opportunity intelligence.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold pl-mono"
                 style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)' }}>
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>{connectionStatus === "online" ? "Engine Online" : "Connecting"}</span>
            </div>
            <span className="text-sm opacity-60 pl-mono">{roles.length} roles tracked</span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.06]"
             style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Panel className="p-4">
          <span className="pl-label">Profile Completeness</span>
          <strong className="pl-display text-lg block mt-1" style={{ color: 'var(--text-primary)' }}>{completeness}%</strong>
          <div className="mt-2">
            <ThreadGauge value={completeness} tone={completeness >= 70 ? "success" : completeness >= 40 ? "warning" : "danger"} size="sm" />
          </div>
        </Panel>
        <Panel className="p-4">
          <span className="pl-label">Target Role</span>
          <strong className="pl-display text-lg block mt-1" style={{ color: 'var(--text-primary)' }}>
            {selectedRole ? getRoleName(selectedRole) : "Not set"}
          </strong>
        </Panel>
        <Panel className="p-4">
          <span className="pl-label">Skills Mapped</span>
          <strong className="pl-display text-lg block mt-1" style={{ color: 'var(--text-primary)' }}>{selectedSkills.length}</strong>
        </Panel>
        <Panel className="p-4">
          <span className="pl-label">Study Country</span>
          <strong className="pl-display text-lg block mt-1" style={{ color: 'var(--text-primary)' }}>{studyCountry || "Not set"}</strong>
        </Panel>
      </div>

      {/* Quick Navigation — section-colored cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/career" className="block">
          <div className="pl-section--career pl-section-card p-6 cursor-pointer group h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                <BriefcaseIcon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="pl-panel-title">Career Intelligence</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Analyze your career fit, get role recommendations, and compare career paths side-by-side.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              <span>Explore careers</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        <Link to="/study" className="block">
          <div className="pl-section--study pl-section-card p-6 cursor-pointer group h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                <AcademicCapIcon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="pl-panel-title">Study Intelligence</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Build your academic profile, find matching universities, and unlock scholarship opportunities.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              <span>Plan your studies</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        <Link to="/global" className="block">
          <div className="pl-section--global pl-section-card p-6 cursor-pointer group h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                <GlobeIcon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="pl-panel-title">Global Opportunities</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Discover immigration pathways, global salary benchmarks, and visa planning for your destinations.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              <span>Explore globally</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Start Guide */}
      {completeness < 30 && (
        <Panel className="p-6" accent>
          <h3 className="pl-panel-title mb-3">Getting Started</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="pl-roadmap-index text-xs">1</div>
              <p className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>
                <strong>Choose a career path</strong> — Head to <Link to="/career" className="font-semibold underline" style={{ color: 'var(--career)' }}>Career Analysis</Link> and select your target role
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="pl-roadmap-index text-xs">2</div>
              <p className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>
                <strong>Map your skills</strong> — Add the skills you already have to see your readiness score
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="pl-roadmap-index text-xs">3</div>
              <p className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>
                <strong>Build your academic profile</strong> — Go to <Link to="/study" className="font-semibold underline" style={{ color: 'var(--study)' }}>Study Profile</Link> and fill in your academic details
              </p>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}
