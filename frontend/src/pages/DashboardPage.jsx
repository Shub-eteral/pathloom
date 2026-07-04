/* DashboardPage — landing overview hub */
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
      <div className="pl-hero p-8">
        <p className="pl-mono text-xs font-semibold tracking-wider opacity-60 uppercase">Welcome to</p>
        <h1 className="pl-display text-3xl font-bold mt-1">Pathloom</h1>
        <p className="mt-2 text-base opacity-80 max-w-lg">
          From where you are → to where you want to be. AI-powered career, study &amp; global opportunity intelligence.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="pl-hero-badge px-3 py-1 inline-flex items-center gap-1.5">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>{connectionStatus === "online" ? "Engine Online" : "Connecting…"}</span>
          </div>
          <span className="text-sm opacity-60 pl-mono">{roles.length} roles · 20 skills tracked</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Panel className="p-4">
          <span className="pl-stat-label">Profile Completeness</span>
          <strong className="pl-stat-value text-lg block mt-1">{completeness}%</strong>
          <div className="mt-2">
            <ThreadGauge value={completeness} tone={completeness >= 70 ? "teal" : completeness >= 40 ? "brass" : "rust"} size="sm" />
          </div>
        </Panel>
        <Panel className="p-4">
          <span className="pl-stat-label">Target Role</span>
          <strong className="pl-stat-value text-lg block mt-1">
            {selectedRole ? getRoleName(selectedRole) : "Not set"}
          </strong>
        </Panel>
        <Panel className="p-4">
          <span className="pl-stat-label">Skills Mapped</span>
          <strong className="pl-stat-value text-lg block mt-1">{selectedSkills.length}</strong>
        </Panel>
        <Panel className="p-4">
          <span className="pl-stat-label">Study Country</span>
          <strong className="pl-stat-value text-lg block mt-1">{studyCountry || "Not set"}</strong>
        </Panel>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link to="/career" className="block">
          <Panel className="p-6 hover:border-[var(--indigo)] transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--indigo-soft)" }}>
                <BriefcaseIcon className="w-5 h-5" style={{ color: "var(--indigo)" }} />
              </div>
              <h3 className="pl-panel-title">Career Intelligence</h3>
            </div>
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
              Analyze your career fit, get AI-powered role recommendations, and compare career paths side-by-side.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--indigo)" }}>
              <span>Explore careers</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Panel>
        </Link>

        <Link to="/study" className="block">
          <Panel className="p-6 hover:border-[var(--teal)] transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--teal-soft)" }}>
                <AcademicCapIcon className="w-5 h-5" style={{ color: "var(--teal)" }} />
              </div>
              <h3 className="pl-panel-title">Study Intelligence</h3>
            </div>
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
              Build your academic profile, find matching universities, and unlock scholarship opportunities across 10 countries.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--teal)" }}>
              <span>Plan your studies</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Panel>
        </Link>

        <Link to="/global" className="block">
          <Panel className="p-6 hover:border-[var(--brass)] transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--brass-soft)" }}>
                <GlobeIcon className="w-5 h-5" style={{ color: "var(--brass)" }} />
              </div>
              <h3 className="pl-panel-title">Global Opportunities</h3>
            </div>
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
              Discover immigration pathways, global salary benchmarks, and visa planning tools for your target destinations.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--brass)" }}>
              <span>Explore globally</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Panel>
        </Link>
      </div>

      {/* Quick Start Guide */}
      {completeness < 30 && (
        <Panel className="p-6">
          <h3 className="pl-panel-title mb-3">Getting Started</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="pl-roadmap-index text-xs">1</div>
              <p className="text-sm pt-0.5" style={{ color: "var(--ink-soft)" }}>
                <strong>Choose a career path</strong> — Head to <Link to="/career" className="font-semibold underline" style={{ color: "var(--indigo)" }}>Career Analysis</Link> and select your target role
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="pl-roadmap-index text-xs">2</div>
              <p className="text-sm pt-0.5" style={{ color: "var(--ink-soft)" }}>
                <strong>Map your skills</strong> — Add the skills you already have to see your readiness score
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="pl-roadmap-index text-xs">3</div>
              <p className="text-sm pt-0.5" style={{ color: "var(--ink-soft)" }}>
                <strong>Build your academic profile</strong> — Go to <Link to="/study" className="font-semibold underline" style={{ color: "var(--teal)" }}>Study Profile</Link> and fill in your academic details
              </p>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}
