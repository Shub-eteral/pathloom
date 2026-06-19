import { useEffect, useState, useRef } from "react";
import ComparisonChart from "./components/ComparisonChart";

// Task 4.2: Import dynamic dataset for global study countries
import countries from "./data/countries";

const API_BASE = "http://127.0.0.1:8000";

/* ============================================================
   PATHLOOM — design tokens
   Canvas  #F5F6F9   Panel  #FFFFFF   Ink  #161A2C
   Indigo  #232C52   Brass  #AD7F2C   Rust #AE4F37   Teal #1F6F61
   Display: Space Grotesk · Body: IBM Plex Sans · Data: IBM Plex Mono
   Signature: the "thread gauge" — every score in the app renders
   as a woven measuring tape rather than a flat progress bar.
   ============================================================ */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

      .pl-root {
        --canvas: #F5F6F9;
        --panel: #FFFFFF;
        --ink: #161A2C;
        --ink-soft: #5B6178;
        --ink-faint: #9499AC;
        --line: #E6E8EE;
        --indigo: #232C52;
        --indigo-deep: #181E3D;
        --indigo-soft: #EEF0F7;
        --brass: #AD7F2C;
        --brass-soft: #F6ECD3;
        --rust: #AE4F37;
        --rust-soft: #F8E4DD;
        --teal: #1F6F61;
        --teal-soft: #DEEFEA;

        background-color: var(--canvas);
        background-image: repeating-linear-gradient(
          90deg,
          rgba(35, 44, 82, 0.035) 0px,
          rgba(35, 44, 82, 0.035) 1px,
          transparent 1px,
          transparent 64px
        );
        color: var(--ink);
        font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
        min-height: 100vh;
      }

      .pl-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      .pl-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

      /* ---------- header ---------- */
      .pl-header {
        background: var(--panel);
        border-bottom: 1px solid var(--line);
        position: sticky;
        top: 0;
        z-index: 40;
      }
      .pl-brand-mark {
        width: 42px; height: 42px;
        border-radius: 12px;
        background: var(--indigo);
        color: var(--brass-soft);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .pl-brand-name {
        font-weight: 700;
        font-size: 1.35rem;
        letter-spacing: -0.01em;
        color: var(--ink);
      }
      .pl-brand-version {
        font-size: 0.65rem;
        color: var(--ink-faint);
        letter-spacing: 0.08em;
      }
      .pl-status {
        display: flex; align-items: center; gap: 0.5rem;
        font-size: 0.72rem; font-weight: 600;
        padding: 0.4rem 0.75rem;
        border-radius: 999px;
        border: 1px solid var(--line);
      }
      .pl-status-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
      .pl-status--online { color: var(--teal); background: var(--teal-soft); border-color: rgba(31,111,97,0.18); }
      .pl-status--online .pl-status-dot { background: var(--teal); animation: pl-pulse 2.2s ease infinite; }
      .pl-status--connecting { color: var(--brass); background: var(--brass-soft); border-color: rgba(173,127,44,0.2); }
      .pl-status--connecting .pl-status-dot { background: var(--brass); animation: pl-pulse 1.1s ease infinite; }
      .pl-status--offline { color: var(--rust); background: var(--rust-soft); border-color: rgba(174,79,55,0.2); }
      .pl-status--offline .pl-status-dot { background: var(--rust); }
      @keyframes pl-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

      /* ---------- panel shell ---------- */
      .pl-panel {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 16px;
        box-shadow: 0 1px 2px rgba(22,26,44,0.04), 0 8px 24px -12px rgba(22,26,44,0.08);
        animation: pl-fade-up 0.5s ease both;
      }
      @keyframes pl-fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .pl-panel-head { border-bottom: 1px solid var(--line); }
      .pl-panel-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 1.05rem; color: var(--ink); letter-spacing: -0.01em; }
      .pl-panel-subtitle { color: var(--ink-faint); font-size: 0.78rem; margin-top: 0.15rem; }
      .pl-eyebrow { font-family: 'IBM Plex Mono'; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-faint); }

      /* ---------- fields ---------- */
      .pl-field-label { font-family: 'IBM Plex Mono'; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-faint); display: block; }
      .pl-input, .pl-select {
        width: 100%;
        background: var(--canvas);
        border: 1px solid var(--line);
        color: var(--ink);
        border-radius: 10px;
        font-size: 0.875rem;
        font-weight: 500;
        transition: border-color .15s ease, background-color .15s ease;
      }
      .pl-input:focus, .pl-select:focus { outline: none; background: var(--panel); border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(35,44,82,0.1); }
      .pl-select { appearance: none; cursor: pointer; }

      /* ---------- dropdown ---------- */
      .pl-dropdown {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 12px;
        box-shadow: 0 12px 32px -8px rgba(22,26,44,0.18);
        animation: pl-fade-up 0.15s ease both;
      }
      .pl-dropdown::-webkit-scrollbar { width: 7px; }
      .pl-dropdown::-webkit-scrollbar-thumb { background: var(--line); border-radius: 999px; }
      .pl-option { cursor: pointer; border-radius: 8px; font-size: 0.82rem; font-weight: 500; color: var(--ink-soft); transition: background-color .12s ease, color .12s ease; }
      .pl-option:hover { background: var(--indigo-soft); }
      .pl-option--selected { background: var(--indigo-soft); color: var(--indigo); font-weight: 600; }
      .pl-option-check { color: var(--indigo); }
      .pl-checkbox { accent-color: var(--indigo); }

      /* ---------- chips ---------- */
      .pl-chip {
        background: var(--indigo-soft);
        color: var(--indigo);
        border: 1px solid rgba(35,44,82,0.12);
        border-radius: 999px;
        font-size: 0.74rem;
        font-weight: 600;
        display: inline-flex; align-items: center; gap: 0.4rem;
        transition: background-color .15s ease;
      }
      .pl-chip:hover { background: #E3E6F2; }
      .pl-chip-remove { color: var(--indigo); opacity: 0.55; border-radius: 6px; }
      .pl-chip-remove:hover { opacity: 1; background: rgba(35,44,82,0.12); }
      .pl-chip-empty { color: var(--ink-faint); font-size: 0.78rem; font-style: italic; }

      /* ---------- alerts ---------- */
      .pl-alert { border-radius: 12px; font-size: 0.78rem; font-weight: 600; line-height: 1.5; }
      .pl-alert--rust { background: var(--rust-soft); color: #8C3E2B; border: 1px solid rgba(174,79,55,0.18); }
      .pl-alert--teal { background: var(--teal-soft); color: #185B4F; border: 1px solid rgba(31,111,97,0.18); }

      /* ---------- buttons ---------- */
      .pl-btn {
        font-weight: 600; font-size: 0.85rem;
        border-radius: 10px;
        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        transition: background-color .15s ease, color .15s ease, border-color .15s ease, transform .1s ease;
      }
      .pl-btn:active:not(:disabled) { transform: translateY(1px); }
      .pl-btn:disabled { cursor: not-allowed; opacity: 0.5; }
      .pl-btn--primary { background: var(--indigo); color: #fff; border: 1px solid var(--indigo); }
      .pl-btn--primary:hover:not(:disabled) { background: var(--indigo-deep); }
      .pl-btn--ghost { background: var(--panel); color: var(--ink-soft); border: 1px solid var(--line); }
      .pl-btn--ghost:hover:not(:disabled) { background: var(--canvas); color: var(--ink); }
      .pl-btn--outline { background: var(--panel); color: var(--brass); border: 1px solid rgba(173,127,44,0.45); }
      .pl-btn--outline:hover:not(:disabled) { background: var(--brass-soft); }
      .pl-spinner { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff; animation: pl-spin 0.7s linear infinite; }
      @keyframes pl-spin { to { transform: rotate(360deg); } }

      /* ---------- thread gauge ---------- */
      .pl-gauge {
        position: relative;
        width: 100%;
        border-radius: 999px;
        overflow: hidden;
        border: 1px solid var(--line);
        background-color: #ECEEF4;
        background-image: repeating-linear-gradient(
          135deg,
          rgba(22,26,44,0.05) 0px, rgba(22,26,44,0.05) 2px,
          transparent 2px, transparent 6px
        );
      }
      .pl-gauge--sm { height: 8px; }
      .pl-gauge--md { height: 10px; }
      .pl-gauge--lg { height: 14px; }
      .pl-gauge-fill { position: absolute; top: 0; left: 0; bottom: 0; border-radius: 999px; transition: width 0.7s cubic-bezier(.2,.8,.2,1); }
      .pl-gauge-fill::after { content: ""; position: absolute; top: 0; right: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.55); }
      .pl-gauge--indigo .pl-gauge-fill { background: var(--indigo); }
      .pl-gauge--brass .pl-gauge-fill { background: var(--brass); }
      .pl-gauge--teal .pl-gauge-fill { background: var(--teal); }
      .pl-gauge-fill--light::after { background: rgba(255,255,255,0.85); }

      /* ---------- tags ---------- */
      .pl-tag { border-radius: 999px; font-size: 0.76rem; font-weight: 700; }
      .pl-tag--rust { background: var(--rust-soft); color: #8C3E2B; border: 1px solid rgba(174,79,55,0.18); }

      /* ---------- roadmap ---------- */
      .pl-roadmap-item { position: relative; }
      .pl-roadmap-item:not(:last-child)::before {
        content: ""; position: absolute; left: 13px; top: 28px; bottom: -22px; width: 1px; background: var(--line);
      }
      .pl-roadmap-index {
        width: 26px; height: 26px; border-radius: 50%;
        background: var(--indigo); color: #fff;
        font-family: 'IBM Plex Mono'; font-size: 0.7rem; font-weight: 600;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; position: relative; z-index: 1;
      }
      .pl-roadmap-text { background: var(--canvas); border: 1px solid var(--line); border-radius: 10px; color: var(--ink-soft); font-size: 0.82rem; line-height: 1.55; }

      /* ---------- empty state ---------- */
      .pl-empty { border: 1px dashed var(--line); border-radius: 14px; background: var(--canvas); }
      .pl-empty-icon { color: var(--ink-faint); opacity: 0.55; }
      .pl-empty-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: var(--ink); font-size: 0.9rem; }
      .pl-empty-body { color: var(--ink-faint); font-size: 0.78rem; line-height: 1.55; }

      /* ---------- hero / best match ---------- */
      .pl-hero {
        background: var(--indigo);
        background-image: repeating-linear-gradient(
          135deg,
          rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px,
          transparent 1px, transparent 10px
        );
        border-radius: 16px;
        color: #fff;
        position: relative;
        overflow: hidden;
      }
      .pl-hero-badge {
        background: var(--brass);
        color: #2A1F08;
        font-family: 'IBM Plex Mono'; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
        border-radius: 999px;
      }
      .pl-hero-role { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.55rem; letter-spacing: -0.01em; }
      .pl-hero-score { font-family: 'IBM Plex Mono'; font-weight: 600; }

      /* ---------- stat grid ---------- */
      .pl-stat { border-radius: 10px; }
      .pl-stat-label { font-family: 'IBM Plex Mono'; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; display: block; }
      .pl-stat-value { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 0.92rem; }
      .pl-stat--hero { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); }
      .pl-stat--hero .pl-stat-label { color: rgba(255,255,255,0.6); }
      .pl-stat--hero .pl-stat-value { color: #fff; }
      .pl-stat--card { background: var(--canvas); border: 1px solid var(--line); }
      .pl-stat--card .pl-stat-label { color: var(--ink-faint); }
      .pl-stat--card .pl-stat-value { color: var(--ink); }

      /* ---------- recommendation card ---------- */
      .pl-card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 14px;
        transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
      }
      .pl-card:hover { border-color: rgba(35,44,82,0.35); box-shadow: 0 12px 28px -16px rgba(22,26,44,0.25); transform: translateY(-2px); }

      /* ---------- comparison table formatting ---------- */
      .pl-table { width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
      .pl-table th { background: var(--indigo-soft); color: var(--indigo); font-family: 'IBM Plex Mono'; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 1rem; border-bottom: 1px solid var(--line); text-align: left; }
      .pl-table td { padding: 1rem; border-bottom: 1px solid var(--line); font-size: 0.85rem; font-weight: 500; color: var(--ink-soft); }
      .pl-table tr:last-child td { border-bottom: none; }
      .pl-table tr:hover td { background-color: rgba(238,240,247,0.4); }

      /* ---------- focus & motion ---------- */
      .pl-root :focus-visible { outline: 2px solid var(--brass); outline-offset: 2px; }
      @media (prefers-reduced-motion: reduce) {
        .pl-root * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
      }
    `}</style>
  );
}

/* ---------- icons ---------- */
function ThreadMark({ className, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...rest}>
      <path d="M3 7c3.5 0 3.5 4 7 4s3.5-4 7-4 3.5 4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3 12c3.5 0 3.5 4 7 4s3.5-4 7-4 3.5 4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
      <path d="M3 17c3.5 0 3.5 3 7 3s3.5-3 7-3 3.5 3 4 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}
function ChevronIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function SearchIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function CloseIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function CheckIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
function AlertIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
    </svg>
  );
}

/* ---------- thread gauge: the signature visual ---------- */
function ThreadGauge({ value, tone = "indigo", size = "md", light = false }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className={`pl-gauge pl-gauge--${size} pl-gauge--${tone}`}>
      <div
        className={`pl-gauge-fill${light ? " pl-gauge-fill--light" : ""}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

function EmptyState({ title, body }) {
  return (
    <div className="pl-empty text-center py-14 px-8">
      <ThreadMark className="pl-empty-icon w-9 h-9 mx-auto mb-4" />
      <h4 className="pl-empty-title">{title}</h4>
      <p className="pl-empty-body mt-1.5 max-w-sm mx-auto">{body}</p>
    </div>
  );
}

function CareerStats({ info, variant = "card" }) {
  if (!info) return null;
  const items = [
    { label: "Salary", value: info.salary },
    { label: "Demand", value: info.demand },
    { label: "Difficulty", value: info.difficulty },
    { label: "Time to learn", value: info.learning_time },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((it) => (
        <div key={it.label} className={`pl-stat pl-stat--${variant} p-3`}>
          <span className="pl-stat-label mb-0.5">{it.label}</span>
          <strong className="pl-stat-value">{it.value}</strong>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [mode, setMode] = useState("career");
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);
  
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Persistent states for study mode pathways
  const [studyCountry, setStudyCountry] = useState("");
  const [studyDegree, setStudyDegree] = useState("");

  // Guarded Role Sync
  useEffect(() => {
    if (!isHydrated) return;
    if (selectedRole) {
      localStorage.setItem("pathloom_role", selectedRole);
    } else {
      localStorage.removeItem("pathloom_role");
    }
  }, [selectedRole, isHydrated]);

  // Guarded Skills Sync
  useEffect(() => {
    if (!isHydrated) return;
    console.log("Selected Skills Syncing to Storage:", selectedSkills);
    localStorage.setItem("pathloom_skills", JSON.stringify(selectedSkills));
  }, [selectedSkills, isHydrated]);

  // Sync dynamic country pathways across reboots
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("pathloom_country", studyCountry);
  }, [studyCountry, isHydrated]);

  // Sync dynamic degree targets across reboots
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("pathloom_degree", studyDegree);
  }, [studyDegree, isHydrated]);

  const [skillSearch, setSkillSearch] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [analyzeError, setAnalyzeError] = useState(null);
  const [recommendError, setRecommendError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [bestCareer, setBestCareer] = useState(null);

  // Holds extended data attributes for recommendation entities
  const [careerInfo, setCareerInfo] = useState({});
  
  // Alignment maps and predictions
  const [explanations, setExplanations] = useState({});
  const [insights, setInsights] = useState({});

  // Floating dropdown popover interactive hooks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Central Core Startup/Restoration Block
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [rolesRes, skillsRes] = await Promise.all([
          fetch(`${API_BASE}/roles`),
          fetch(`${API_BASE}/skills`),
        ]);

        if (!rolesRes.ok || !skillsRes.ok) {
          throw new Error("Failed to sync core roles or skills databases.");
        }

        const rolesData = await rolesRes.json();
        const skillsData = await skillsRes.json();

        if (isMounted) {
          setRoles(rolesData);
          setSkills(skillsData);

          // Extract values cleanly from storage first
          const savedRole = localStorage.getItem("pathloom_role");
          const savedSkills = localStorage.getItem("pathloom_skills");

          // Restore academic targets within structural hydration hooks
          const savedCountry = localStorage.getItem("pathloom_country");
          if (savedCountry) {
            setStudyCountry(savedCountry);
          }

          const savedDegree = localStorage.getItem("pathloom_degree");
          if (savedDegree) {
            setStudyDegree(savedDegree);
          }

          // Run hydration adjustments before switching the hydration flag
          if (savedRole) {
            setSelectedRole(savedRole);
          }
          if (savedSkills) {
            setSelectedSkills(JSON.parse(savedSkills));
          }

          // Hydration is complete! Enable state observer storage updates
          setIsHydrated(true);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setLoadError(
            "Couldn't connect to the Pathloom server. Make sure the local API is running at 127.0.0.1:8000."
          );
        }
      }
    };

    loadData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      isMounted = false;
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ---------- Profile Export Utility ---------- */
  const exportProfile = () => {
    const profile = {
      target_role: selectedRole,
      selected_skills: selectedSkills,
      skill_count: selectedSkills.length,
      study_country: studyCountry,
      study_degree: studyDegree,
      exported_at: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pathloom_profile.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---------- Profile Import Utility ---------- */
  const importProfile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const profile = JSON.parse(e.target.result);

        if (profile.target_role) {
          setSelectedRole(profile.target_role);
        }
        if (profile.selected_skills) {
          setSelectedSkills(profile.selected_skills);
        }
        if (profile.study_country) {
          setStudyCountry(profile.study_country);
        }
        if (profile.study_degree) {
          setStudyDegree(profile.study_degree);
        }

        alert("Profile imported successfully!");
      } catch {
        alert("Invalid profile file.");
      }
    };

    reader.readAsText(file);
  };

  const toggleSkill = (skillId) => {
    const id = String(skillId);
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((existingId) => existingId !== id) : [...prev, id]
    );
  };

  const analyzeCareer = async () => {
    setAnalyzeError(null);
    if (!selectedRole) {
      setAnalyzeError("Select a target role to continue.");
      return;
    }
    if (selectedSkills.length === 0) {
      setAnalyzeError("Add at least one skill before analyzing.");
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        role: selectedRole,
        skills_input: selectedSkills.join(","),
      });

      const response = await fetch(`${API_BASE}/analyze?${params.toString()}`);
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setAnalyzeError("Couldn't reach the Pathloom server. Make sure the local API is running at 127.0.0.1:8000.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendations = async () => {
    setRecommendError(null);
    if (selectedSkills.length === 0) {
      setRecommendError("Add at least one skill before finding alternative roles.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/recommend?skills_input=` + selectedSkills.join(",")
      );
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();

      setRecommendations(data);
      compareTopRoles(data);

      data.forEach((item) => {
        loadCareerInfo(item.role_id);
        loadExplanation(item.role_id);
        loadInsight(item.role_id);
      });
    } catch (error) {
      console.error(error);
      setRecommendError("Couldn't load alternative roles. Check your connection and try again.");
    }
  };

  const loadCareerInfo = async (roleId) => {
    try {
      const response = await fetch(`${API_BASE}/career-info/${roleId}`);
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();

      setCareerInfo((prev) => ({
        ...prev,
        [roleId]: data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const loadExplanation = async (roleId) => {
    try {
      const response = await fetch(
        `${API_BASE}/explain?role_id=${roleId}&skills_input=${selectedSkills.join(",")}`
      );
      const data = await response.json();
      setExplanations((prev) => ({
        ...prev,
        [roleId]: data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const loadInsight = async (roleId) => {
    try {
      const response = await fetch(
        `${API_BASE}/insight?role_id=${roleId}&skills_input=${selectedSkills.join(",")}`
      );
      const data = await response.json();
      setInsights((prev) => ({
        ...prev,
        [roleId]: data.insight
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const compareTopRoles = async (recommendations) => {
    try {
      const roleIds = recommendations
        .slice(0, 3)
        .map((r) => r.role_id)
        .join(",");

      const response = await fetch(
        `${API_BASE}/compare?role_ids=${roleIds}&skills_input=${selectedSkills.join(",")}`
      );

      const data = await response.json();
      setComparisonData(data);

      if (data.length > 0) {
        setBestCareer(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearSelection = () => {
    setSelectedRole("");
    setSelectedSkills([]);
    setSkillSearch("");
    setStudyCountry("");
    setStudyDegree("");
    setResult(null);
    setAnalyzeError(null);
    setRecommendError(null);
    setRecommendations([]);
    setComparisonData([]);
    setBestCareer(null);
    setCareerInfo({});
    setExplanations({});
    setInsights({});
  };

  const filteredSkills = Object.entries(skills).filter(([, skillName]) =>
    skillName.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const getRoleName = (roleId) => {
    const role = roles.find((r) => String(r.role_id) === String(roleId));
    return role ? role.role_name : `Role #${roleId}`;
  };

  const bestMatch = recommendations.length > 0
    ? [...recommendations].sort((a, b) => b.score - a.score)[0]
    : null;
  const otherRecommendations = bestMatch
    ? recommendations.filter((item) => item !== bestMatch)
    : recommendations;

  const connectionStatus = loadError
    ? "offline"
    : roles.length > 0 && Object.keys(skills).length > 0
    ? "online"
    : "connecting";

  const connectionLabel =
    connectionStatus === "offline" ? "Server offline" :
    connectionStatus === "connecting" ? "Connecting…" : "Connected";

  return (
    <div className="pl-root antialiased">
      <GlobalStyles />

      {/* Header */}
      <header className="pl-header">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="pl-brand-mark">
              <ThreadMark className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="pl-display pl-brand-name">Pathloom</span>
              <span className="pl-mono pl-brand-version">v2.1</span>
            </div>
          </div>
          <div className={`pl-status pl-status--${connectionStatus}`}>
            <span className="pl-status-dot" />
            <span>{connectionLabel}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-8 space-y-6">
        
        {/* Journey Mode Selector Card */}
        <div className="pl-panel p-6">
          <h2 className="text-2xl font-bold mb-4">
            Choose Your Journey
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setMode("career")}
              className={`px-6 py-3 rounded-lg font-bold ${
                mode === "career"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              💼 Career
            </button>
            <button
              onClick={() => setMode("study")}
              className={`px-6 py-3 rounded-lg font-bold ${
                mode === "study"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              🎓 Study
            </button>
          </div>
        </div>

        {/* Upgraded Personal Profile Card with multi-mode validation tracks */}
        <div className="pl-panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="pl-eyebrow">
                User Profile
              </p>
              <h2 className="pl-panel-title mt-1">
                👤 Personal Profile
              </h2>
            </div>
            <div className="pl-status pl-status--online">
              <span className="pl-status-dot"></span>
              <span>Saved</span>
            </div>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-5">
            <div className="pl-stat pl-stat--card p-3">
              <span className="pl-stat-label">
                Target Role
              </span>
              <strong className="pl-stat-value">
                {
                  selectedRole
                    ? getRoleName(selectedRole)
                    : "Not Selected"
                }
              </strong>
            </div>
            <div className="pl-stat pl-stat--card p-3">
              <span className="pl-stat-label">
                Skills Selected
              </span>
              <strong className="pl-stat-value">
                {selectedSkills.length}
              </strong>
            </div>
            
            {/* Extended Study Profile Analytics Display Fields */}
            <div className="pl-stat pl-stat--card p-3">
              <span className="pl-stat-label">
                Study Country
              </span>
              <strong className="pl-stat-value">
                {studyCountry || "Not Set"}
              </strong>
            </div>
            <div className="pl-stat pl-stat--card p-3">
              <span className="pl-stat-label">
                Degree Goal
              </span>
              <strong className="pl-stat-value">
                {studyDegree || "Not Set"}
              </strong>
            </div>
          </div>

          {/* Action Trigger Block for JSON Payload Delivery */}
          <div className="mt-5">
            <button
              onClick={exportProfile}
              className="
                px-4
                py-2
                rounded-lg
                bg-indigo-600
                text-white
                hover:bg-indigo-700
              "
            >
              📄 Export Profile
            </button>

            <label
              className="
                ml-3
                px-4
                py-2
                rounded-lg
                bg-slate-700
                text-white
                cursor-pointer
                hover:bg-slate-800
              "
            >
              📂 Import Profile
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={importProfile}
              />
            </label>
          </div>
        </div>

        {loadError && (
          <div className="pl-alert pl-alert--rust p-4 flex items-start gap-3">
            <AlertIcon className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-sm" style={{ color: "#7A3324" }}>Connection problem</h4>
              <p className="mt-0.5 font-medium" style={{ color: "#8C3E2B" }}>{loadError}</p>
            </div>
          </div>
        )}

        {/* Career Mode Dashboard Shell */}
        {mode === "career" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT — setup */}
              <section className="lg:col-span-5 pl-panel p-6 relative">
                <div className="pl-panel-head pb-5 mb-5">
                  <h2 className="pl-panel-title">Build your profile</h2>
                  <p className="pl-panel-subtitle">Set a target role, then add the skills you bring.</p>
                </div>

                {/* Target role */}
                <div className="space-y-2">
                  <label htmlFor="role-select" className="pl-field-label">Target role</label>
                  <div className="relative">
                    <select
                      id="role-select"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="pl-select px-4 py-3.5"
                    >
                      <option value="">Select a role…</option>
                      {roles.map((role) => (
                        <option key={role.role_id} value={role.role_id}>
                          {role.role_name}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--ink-faint)" }} />
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-6 relative" ref={dropdownRef}>
                  <label htmlFor="skill-search" className="pl-field-label mb-2">Your skills</label>

                  <div className="relative">
                    <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-faint)" }} />
                    <input
                      id="skill-search"
                      type="text"
                      role="combobox"
                      aria-expanded={isDropdownOpen}
                      aria-controls="skill-listbox"
                      autoComplete="off"
                      placeholder="Search skills…"
                      value={skillSearch}
                      onFocus={() => setIsDropdownOpen(true)}
                      onChange={(e) => {
                        setSkillSearch(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      className="pl-input py-3.5"
                      style={{ paddingLeft: "2.75rem", paddingRight: "1rem" }}
                    />
                  </div>

                  {isDropdownOpen && (
                    <div
                      id="skill-listbox"
                      role="listbox"
                      className="pl-dropdown absolute left-0 right-0 mt-2 max-h-64 overflow-y-auto z-50 p-2"
                    >
                      {filteredSkills.length === 0 ? (
                        <div className="text-center py-4 text-xs font-medium" style={{ color: "var(--ink-faint)" }}>
                          No skills match that search.
                        </div>
                      ) : (
                        filteredSkills.map(([skillId, skillName]) => {
                          const isChecked = selectedSkills.includes(String(skillId));
                          return (
                            <div
                              key={skillId}
                              role="option"
                              aria-selected={isChecked}
                              onClick={() => toggleSkill(skillId)}
                              className={`pl-option flex items-center justify-between px-3 py-2.5 ${isChecked ? "pl-option--selected" : ""}`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  className="pl-checkbox rounded h-4 w-4 pointer-events-none"
                                  checked={isChecked}
                                  readOnly
                                />
                                <span>{skillName}</span>
                              </div>
                              {isChecked && <CheckIcon className="pl-option-check w-4 h-4" />}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-4 min-h-6">
                    {selectedSkills.length === 0 && !isDropdownOpen && (
                      <span className="pl-chip-empty">No skills added yet</span>
                    )}
                    {selectedSkills.map((skillId) => (
                      <span key={skillId} className="pl-chip py-1" style={{ paddingLeft: "0.75rem", paddingRight: "0.4rem" }}>
                        {skills[skillId] ?? skillId}
                        <button
                          onClick={() => toggleSkill(skillId)}
                          aria-label={`Remove ${skills[skillId] ?? skillId}`}
                          className="pl-chip-remove p-0.5"
                        >
                          <CloseIcon className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {analyzeError && (
                  <div className="pl-alert pl-alert--rust mt-4 p-3.5">{analyzeError}</div>
                )}

                <div className="flex flex-col gap-2 mt-8 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
                  <div className="flex gap-2">
                    <button
                      onClick={analyzeCareer}
                      disabled={isLoading}
                      className="pl-btn pl-btn--primary flex-1 px-5 py-3.5"
                    >
                      {isLoading ? (
                        <>
                          <div className="pl-spinner" />
                          <span>Analyzing…</span>
                        </>
                      ) : (
                        <span>Analyze fit</span>
                      )}
                    </button>

                    <button
                      onClick={clearSelection}
                      disabled={isLoading}
                      className="pl-btn pl-btn--ghost px-4 py-3.5"
                    >
                      Clear
                    </button>
                  </div>

                  <button
                    onClick={getRecommendations}
                    disabled={isLoading}
                    className="pl-btn pl-btn--outline w-full px-5 py-3.5"
                  >
                    Find alternative roles
                  </button>

                  {recommendError && (
                    <div className="pl-alert pl-alert--rust mt-1 p-3.5">{recommendError}</div>
                  )}
                </div>
              </section>

              {/* RIGHT — results */}
              <div className="lg:col-span-7 space-y-6">

                {/* Fit analysis */}
                <div className="pl-panel p-6">
                  <div className="pl-panel-head pb-4 mb-5">
                    <h2 className="pl-panel-title">Fit analysis</h2>
                    <p className="pl-panel-subtitle">See how your skills measure up to the role.</p>
                  </div>

                  {!result ? (
                    <EmptyState
                      title="No analysis yet"
                      body="Choose a target role and add your skills, then run the analysis."
                    />
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl" style={{ background: "var(--canvas)", border: "1px solid var(--line)" }}>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="pl-field-label">Readiness score</span>
                          <span className="pl-mono pl-hero-score text-base" style={{ color: "var(--teal)" }}>
                            {result.readiness_score}%
                          </span>
                        </div>
                        <ThreadGauge value={result.readiness_score} tone="teal" size="lg" />
                      </div>

                      <div className="pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                        <h3 className="pl-field-label mb-3">Skills to develop</h3>
                        {result.missing_skills.length === 0 ? (
                          <div className="pl-alert pl-alert--teal p-4 flex items-center gap-3">
                            <CheckIcon className="w-5 h-5 shrink-0" />
                            <span>You have all the required skills for this role!</span>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {result.missing_skills.map((skill, index) => (
                              <span key={index} className="pl-tag pl-tag--rust px-3 py-1">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                        <h3 className="pl-field-label mb-4">Upskilling roadmap</h3>
                        <div className="space-y-4">
                          {result.roadmap.map((step, index) => (
                            <div key={index} className="pl-roadmap-item flex gap-4">
                              <div className="pl-roadmap-index">{index + 1}</div>
                              <div className="pl-roadmap-text flex-1 p-3.5 font-medium">
                                {step.replace(/^Step \d+:\s*/, "")}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendations grid panel container */}
                <div className="pl-panel p-6">
                  <div className="pl-panel-head pb-4 mb-5">
                    <h2 className="pl-panel-title">Alternative matches</h2>
                    <p className="pl-panel-subtitle">Explore alternate professions with high core matching affinity ratios.</p>
                  </div>

                  {recommendations.length === 0 ? (
                    <EmptyState
                      title="No recommendations yet"
                      body="Add your unique skills matrix on the configuration frame to generate predictive alternatives maps."
                    />
                  ) : (
                    <div className="space-y-6">
                      {bestMatch && (
                        <div className="pl-hero p-6">
                          <span className="pl-hero-badge px-2.5 py-0.5 inline-block font-bold">Best Match</span>
                          <h3 className="pl-display pl-hero-role mt-2">{getRoleName(bestMatch.role_id)}</h3>
                          
                          <div className="mt-4 flex items-center justify-between mb-1.5">
                            <span className="pl-field-label" style={{ color: "rgba(255,255,255,0.7)" }}>Match Score</span>
                            <span className="pl-mono pl-hero-score text-base">{bestMatch.score}%</span>
                          </div>
                          <ThreadGauge value={bestMatch.score} tone="brass" size="md" light={true} />

                          <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                            <CareerStats info={careerInfo[bestMatch.role_id]} variant="hero" />
                          </div>

                          {/* Alignment insight for best match container block */}
                          {explanations[bestMatch.role_id] && (
                            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                              <h4 className="font-semibold text-sm mb-2 pl-display">Why This Role?</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-medium mb-1 text-xs" style={{ color: "var(--teal-soft)" }}>Matched</p>
                                  <ul className="text-sm space-y-0.5 opacity-90">
                                    {explanations[bestMatch.role_id].matched.map((skill, index) => (
                                      <li key={index} className="truncate">✓ {skill}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="font-medium mb-1 text-xs" style={{ color: "var(--rust-soft)" }}>Missing</p>
                                  <ul className="text-sm space-y-0.5 opacity-90">
                                    {explanations[bestMatch.role_id].missing.map((skill, index) => (
                                      <li key={index} className="truncate">✗ {skill}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {otherRecommendations.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {otherRecommendations.map((item) => (
                            <div key={item.role_id} className="pl-card p-4 flex flex-col justify-between">
                              <div>
                                <span className="pl-eyebrow text-[10px]">Alternative track</span>
                                <h4 className="font-bold text-slate-800 text-sm mt-0.5">{getRoleName(item.role_id)}</h4>
                                
                                <div className="mt-3 flex items-center justify-between mb-1">
                                  <span className="pl-field-label" style={{ fontSize: "0.58rem" }}>Match Score</span>
                                  <span className="pl-mono font-bold text-xs" style={{ color: "var(--indigo)" }}>{item.score}%</span>
                                </div>
                                <ThreadGauge value={item.score} tone="indigo" size="sm" />
                              </div>

                              <div className="mt-4">
                                <CareerStats info={careerInfo[item.role_id]} variant="card" />
                              </div>

                              {/* Why This Role? */}
                              {explanations[item.role_id] && (
                                <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                                  <h4 className="font-semibold text-sm mb-2 pl-display">
                                    Why This Role?
                                  </h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="font-medium mb-1 text-xs" style={{ color: "var(--teal)" }}>
                                        Matched
                                      </p>
                                      <ul className="text-sm space-y-0.5" style={{ color: "var(--ink-soft)" }}>
                                        {explanations[item.role_id].matched.map((skill, index) => (
                                          <li key={index} className="truncate">
                                            ✓ {skill}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <p className="font-medium mb-1 text-xs" style={{ color: "var(--rust)" }}>
                                        Missing
                                      </p>
                                      <ul className="text-sm space-y-0.5" style={{ color: "var(--ink-soft)" }}>
                                        {explanations[item.role_id].missing.map((skill, index) => (
                                          <li key={index} className="truncate">
                                            ✗ {skill}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* AI Insight section container block */}
                              {
                                insights[item.role_id] && (
                                  <div className="mt-4">
                                    <div className="border border-indigo-200 rounded-xl p-4" style={{ backgroundColor: "var(--indigo-soft)" }}>
                                      <h4 className="font-semibold text-indigo-700 mb-2" style={{ color: "var(--indigo)" }}>
                                        🤖 AI Insight
                                      </h4>
                                      <p className="text-sm text-slate-700" style={{ color: "var(--ink-soft)" }}>
                                        {insights[item.role_id]}
                                      </p>
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Career Comparison Section Frame Area */}
                {comparisonData.length > 0 && (
                  <section className="pl-panel p-6 mt-10">
                    <div className="pl-panel-head pb-4 mb-5">
                      <h2 className="pl-panel-title flex items-center gap-2">
                        <span>⚖️</span> Career Comparison
                      </h2>
                      <p className="pl-panel-subtitle">Side-by-side metric cross-matching analysis for top tracked roles.</p>
                    </div>

                    {/* Champion Recommended Career Showcase Element */}
                    {bestCareer && (
                      <div className="mb-8 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 shadow-lg">
                        <div className="text-sm font-semibold uppercase tracking-wider pl-mono">
                          🏆 Recommended Career
                        </div>
                        <h2 className="text-3xl font-bold mt-2 pl-display">
                          {bestCareer.role_name}
                        </h2>
                        <p className="mt-2 text-lg font-medium">
                          Match Score: {bestCareer.readiness_score}%
                        </p>
                        <div className="mt-4 text-sm space-y-1.5 pl-mono">
                          <p>💰 Salary: <span className="font-semibold">{bestCareer.salary}</span></p>
                          <p>📈 Demand: <span className="font-semibold">{bestCareer.demand}</span></p>
                          <p>⚡ Difficulty: <span className="font-semibold">{bestCareer.difficulty}</span></p>
                          <p>⏳ Learning Time: <span className="font-semibold">{bestCareer.learning_time}</span></p>
                        </div>
                        <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-sm font-medium">
                          Highest readiness score among compared careers and strongest alignment with your current skills.
                        </div>
                      </div>
                    )}

                    {/* Comparison Chart Component Section */}
                    {comparisonData.length > 0 && (
                      <div className="mb-8 bg-white rounded-2xl shadow p-6 border border-slate-100">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                          <span>📊</span> Readiness Comparison
                        </h2>
                        <ComparisonChart data={comparisonData} />
                      </div>
                    )}

                    {/* Grid Comparison Table */}
                    <div className="overflow-x-auto">
                      <table className="pl-table">
                        <thead>
                          <tr>
                            <th>Career</th>
                            <th>Readiness</th>
                            <th>Salary</th>
                            <th>Demand</th>
                            <th>Difficulty</th>
                            <th>Learning Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map((career) => (
                            <tr key={career.role_id}>
                              <td className="font-semibold text-slate-800" style={{ color: "var(--ink)" }}>
                                {career.role_name}
                              </td>
                              <td>
                                <div className="flex items-center gap-2.5 min-w-[100px]">
                                  <span className="pl-mono font-semibold" style={{ color: "var(--teal)" }}>
                                    {career.readiness_score}%
                                  </span>
                                  <div className="flex-1">
                                    <ThreadGauge value={career.readiness_score} tone="teal" size="sm" />
                                  </div>
                                </div>
                              </td>
                              <td className="pl-mono font-medium">{career.salary}</td>
                              <td>
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                  {career.demand}
                                </span>
                              </td>
                              <td>{career.difficulty}</td>
                              <td className="text-xs">{career.learning_time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

              </div>
            </div>
          </>
        )}

        {/* Study Mode Planner Dashboard Shell */}
        {mode === "study" && (
          <div className="pl-panel p-6">
            <h2 className="text-3xl font-bold mb-4">
              🎓 Study Planner
            </h2>
            <p className="text-slate-600 mb-6">
              Plan your global education journey.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">
                  Target Country
                </label>
                {/* Connected dynamic study country selector options mapping */}
                <select 
                  className="w-full p-3 border rounded-lg"
                  value={studyCountry}
                  onChange={(e) => setStudyCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {
                    countries.map((country) => (
                      <option
                        key={country.id}
                        value={country.name}
                      >
                        {country.name}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Degree Level
                </label>
                <select 
                  className="w-full p-3 border rounded-lg"
                  value={studyDegree}
                  onChange={(e) => setStudyDegree(e.target.value)}
                >
                  <option value="">Select Degree</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>

            {/* Task 4.4: Embedded Country Intelligence Card component */}
            {
              studyCountry && (
                <div className="mt-6 bg-white rounded-xl shadow p-5 border border-slate-100">
                  <h3 className="text-xl font-bold mb-4">
                    🌍 Country Intelligence
                  </h3>
                  {
                    countries
                      .filter(
                        c => c.name === studyCountry
                      )
                      .map(country => (
                        <div
                          key={country.id}
                          className="space-y-2 font-medium text-slate-700"
                        >
                          <p>
                            💰 Tuition:
                            {" "}
                            {country.tuition}
                          </p>
                          <p>
                            🛂 Visa Difficulty:
                            {" "}
                            {country.visa_difficulty}
                          </p>
                          <p>
                            🏡 PR Score:
                            {" "}
                            {country.pr_score}/10
                          </p>
                          <p>
                            💼 Work Rights:
                            {" "}
                            {country.work_rights}
                          </p>
                          <p>
                            🎓 Scholarships:
                            {" "}
                            {country.scholarships}
                          </p>
                        </div>
                      ))
                  }
                </div>
              )
            }

            <div className="mt-6 p-4 rounded-lg bg-slate-100">
              <h3 className="font-semibold mb-2">
                Coming Soon
              </h3>
              <ul className="list-disc ml-5 text-sm space-y-1 text-slate-600">
                <li>University Recommendations</li>
                <li>Scholarship Matching</li>
                <li>Country Comparison</li>
                <li>Admission Roadmaps</li>
                <li>Visa Planning</li>
              </ul>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;