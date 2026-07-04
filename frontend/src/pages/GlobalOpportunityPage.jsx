/* GlobalOpportunityPage — coming soon placeholder */
import usePageTitle from '../hooks/usePageTitle';
import Panel from '../components/ui/Panel';
import { GlobeIcon, SparklesIcon } from '../components/icons/Icons';

export default function GlobalOpportunityPage() {
  usePageTitle('Global Opportunities');
  const upcomingFeatures = [
    { tag: "Finance", title: "Global Salary Intelligence", desc: "Compare salaries for your target role across countries with PPP-adjusted data." },
    { tag: "Immigration", title: "Immigration Pathways", desc: "Visa routes, work permits, and permanent residency paths for each destination." },
    { tag: "Market", title: "Market Trends", desc: "Job demand forecasts, emerging skills, and industry growth by region." },
    { tag: "Cost", title: "Cost of Living Simulator", desc: "City-level living cost breakdowns and affordability comparisons." },
    { tag: "Relocation", title: "Migration Planner", desc: "End-to-end relocation planning from visa application to settlement." },
    { tag: "AI System", title: "AI Opportunity Scoring", desc: "AI-powered scoring that combines career, study, and immigration factors." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="pl-display text-2xl font-bold">Global Opportunities</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
          Discover worldwide career and immigration opportunities tailored to your profile.
        </p>
      </div>

      <div className="pl-coming-soon p-8 text-center">
        <GlobeIcon className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--brass)" }} />
        <h2 className="pl-display text-xl font-bold mb-2" style={{ color: "var(--ink)" }}>Coming Soon</h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: "var(--ink-soft)" }}>
          The Global Opportunity Intelligence module is under active development. Here's what's on the way:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingFeatures.map((feature, i) => (
          <Panel key={i} className="p-5 opacity-75">
            <span className="pl-tag pl-tag--indigo px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider">
              {feature.tag}
            </span>
            <h3 className="font-bold text-sm mt-3" style={{ color: "var(--ink)" }}>{feature.title}</h3>
            <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>{feature.desc}</p>
          </Panel>
        ))}
      </div>

      <Panel className="p-5 flex items-center gap-3">
        <SparklesIcon className="w-5 h-5 shrink-0" style={{ color: "var(--brass)" }} />
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          <strong>Expected in Phase 3</strong> — This module requires AI integration (Gemini API) and expanded country data.
          Track progress in the project roadmap.
        </p>
      </Panel>
    </div>
  );
}
