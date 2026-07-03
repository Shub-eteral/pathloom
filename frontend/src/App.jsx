import { useEffect, useState, useRef } from "react";
import ComparisonChart from "./components/ComparisonChart";

// Task 4.2: Import dynamic dataset for global study countries
import countries from "./data/countries";
import universities from "./data/universities";
import scholarships from "./data/scholarships";
import roadmapTemplates from "./data/applicationRoadmap";
const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

/* ============================================================
   PATHLOOM — 3D DESIGN SYSTEM (WOW EDITION)
   Canvas  #F5F6F9   Panel  #FFFFFF   Ink  #161A2C
   Indigo  #232C52   Brass  #AD7F2C   Rust #AE4F37   Teal #1F6F61
   Display: Space Grotesk · Body: IBM Plex Sans · Data: IBM Plex Mono
   Signature: the "thread gauge" — now a living 3D tape measure
   ============================================================ */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

      :root {
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
        --shadow-depth: 0 10px 30px rgba(0,0,0,0.1);
        --shadow-hover: 0 20px 40px rgba(0,0,0,0.15);
        --perspective: 1000px;
      }

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
        --shadow-depth: 0 10px 30px rgba(0,0,0,0.1);
        --shadow-hover: 0 20px 40px rgba(0,0,0,0.15);
        --perspective: 1000px;

        background-color: var(--canvas);
        background-image:
          repeating-linear-gradient(
            90deg,
            rgba(35, 44, 82, 0.035) 0px,
            rgba(35, 44, 82, 0.035) 1px,
            transparent 1px,
            transparent 64px
          ),
          radial-gradient(circle at 20% 30%, rgba(35,44,82,0.05) 0%, transparent 20%),
          radial-gradient(circle at 80% 70%, rgba(35,44,82,0.03) 0%, transparent 20%);
        color: var(--ink);
        font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
        min-height: 100vh;
        perspective: var(--perspective);
        overflow-x: hidden;
        position: relative;
      }

      .pl-root::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:
          radial-gradient(circle at 30% 30%, rgba(35,44,82,0.08) 0%, transparent 40%),
          radial-gradient(circle at 70% 70%, rgba(35,44,82,0.05) 0%, transparent 40%);
        pointer-events: none;
        z-index: -1;
      }

      .pl-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      .pl-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

      /* ---------- header ---------- */
      .pl-header {
        background: var(--panel);
        border-bottom: 1px solid var(--line);
        position: sticky;
        top: 0;
        z-index: 50;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: var(--shadow-depth);
        transform: translateZ(0);
      }
      .pl-brand-mark {
        width: 48px; height: 48px;
        border-radius: 16px;
        background: var(--indigo);
        color: var(--brass-soft);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
      }
      .pl-brand-mark:hover {
        transform: rotateY(15deg) rotateX(-10deg) translateZ(10px);
      }
      .pl-brand-name {
        font-weight: 700;
        font-size: 1.4rem;
        letter-spacing: -0.01em;
        color: var(--ink);
      }
      .pl-brand-version {
        font-size: 0.7rem;
        color: var(--ink-faint);
        letter-spacing: 0.08em;
      }
      .pl-status {
        display: flex; align-items: center; gap: 0.5rem;
        font-size: 0.75rem; font-weight: 600;
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.7);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      .pl-status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
      .pl-status--online { color: var(--teal); background: var(--teal-soft); border-color: rgba(31,111,97,0.18); }
      .pl-status--online .pl-status-dot { background: var(--teal); animation: pl-pulse 2.2s ease infinite; }
      .pl-status--connecting { color: var(--brass); background: var(--brass-soft); border-color: rgba(173,127,44,0.2); }
      .pl-status--connecting .pl-status-dot { background: var(--brass); animation: pl-pulse 1.1s ease infinite; }
      .pl-status--offline { color: var(--rust); background: var(--rust-soft); border-color: rgba(174,79,55,0.2); }
      .pl-status--offline .pl-status-dot { background: var(--rust); }
      @keyframes pl-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

      /* ---------- 3D panel shell ---------- */
      .pl-panel {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 20px;
        box-shadow:
          0 1px 3px rgba(22,26,44,0.04),
          0 8px 24px -12px rgba(22,26,44,0.08),
          0 0 0 1px rgba(255,255,255,0.5) inset;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        animation: pl-fade-up 0.5s ease both;
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .pl-panel::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transform: translateZ(1px);
      }
      .pl-panel:hover {
        transform: translateZ(10px);
        box-shadow: var(--shadow-hover);
      }
      @keyframes pl-fade-up {
        from {
          opacity: 0;
          transform: translateY(12px) rotateX(5deg);
        }
        to {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }
      }
      .pl-panel-head { border-bottom: 1px solid var(--line); }
      .pl-panel-title {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--ink);
        letter-spacing: -0.01em;
        text-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
      .pl-panel-subtitle {
        color: var(--ink-faint);
        font-size: 0.82rem;
        margin-top: 0.18px;
      }
      .pl-eyebrow {
        font-family: 'IBM Plex Mono';
        font-size: 0.68rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ink-faint);
      }

      /* ---------- fields ---------- */
      .pl-field-label {
        font-family: 'IBM Plex Mono';
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink-faint);
        display: block;
      }
      .pl-input, .pl-select {
        width: 100%;
        background: rgba(245,246,249,0.7);
        border: 1px solid var(--line);
        color: var(--ink);
        border-radius: 14px;
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.85rem 1rem;
        transition: all 0.2s ease;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.03) inset;
      }
      .pl-input:focus, .pl-select:focus {
        outline: none;
        background: var(--panel);
        border-color: var(--indigo);
        box-shadow:
          0 0 0 3px rgba(35,44,82,0.12),
          0 4px 12px rgba(0,0,0,0.08);
      }
      .pl-select {
        appearance: none;
        cursor: pointer;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%23232C52' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1.2em;
      }

      /* ---------- dropdown ---------- */
      .pl-dropdown {
        background: rgba(255,255,255,0.9);
        border: 1px solid var(--line);
        border-radius: 16px;
        box-shadow: 0 12px 32px -8px rgba(22,26,44,0.18);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        animation: pl-fade-up 0.15s ease both;
        position: relative;
        z-index: 100;
      }
      .pl-dropdown::-webkit-scrollbar { width: 8px; }
      .pl-dropdown::-webkit-scrollbar-thumb {
        background: var(--line);
        border-radius: 999px;
      }
      .pl-option {
        cursor: pointer;
        border-radius: 10px;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--ink-soft);
        transition: all 0.15s ease;
        padding: 0.75rem 1rem;
      }
      .pl-option:hover {
        background: var(--indigo-soft);
        transform: translateZ(4px);
      }
      .pl-option--selected {
        background: var(--indigo-soft);
        color: var(--indigo);
        font-weight: 600;
        transform: translateZ(2px);
      }
      .pl-option-check { color: var(--indigo); }
      .pl-checkbox { accent-color: var(--indigo); }

      /* ---------- chips ---------- */
      .pl-chip {
        background: var(--indigo-soft);
        color: var(--indigo);
        border: 1px solid rgba(35,44,82,0.12);
        border-radius: 12px;
        font-size: 0.76rem;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        transition: all 0.2s ease;
        transform-style: preserve-3d;
      }
      .pl-chip:hover {
        background: #E3E6F2;
        transform: translateZ(4px) scale(1.05);
      }
      .pl-chip-remove {
        color: var(--indigo);
        opacity: 0.55;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pl-chip-remove:hover {
        opacity: 1;
        background: rgba(35,44,82,0.12);
        transform: scale(1.1);
      }
      .pl-chip-empty {
        color: var(--ink-faint);
        font-size: 0.82rem;
        font-style: italic;
      }
      .pl-chip--selected {
        background: var(--indigo);
        color: #fff;
        border-color: var(--indigo);
        transform: translateZ(2px);
      }
      .pl-chip--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* ---------- alerts ---------- */
      .pl-alert {
        border-radius: 14px;
        font-size: 0.82rem;
        font-weight: 600;
        line-height: 1.5;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
      }
      .pl-alert--rust {
        background: var(--rust-soft);
        color: #8C3E2B;
        border: 1px solid rgba(174,79,55,0.18);
      }
      .pl-alert--teal {
        background: var(--teal-soft);
        color: #185B4F;
        border: 1px solid rgba(31,111,97,0.18);
      }

      /* ---------- buttons ---------- */
      .pl-btn {
        font-weight: 600;
        font-size: 0.88rem;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
        border: none;
        box-shadow:
          0 4px 6px rgba(0,0,0,0.05),
          0 1px 3px rgba(0,0,0,0.1);
      }
      .pl-btn:active:not(:disabled) {
        transform: translateY(2px) translateZ(-2px);
      }
      .pl-btn:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      .pl-btn--primary {
        background: var(--indigo);
        color: #fff;
      }
      .pl-btn--primary:hover:not(:disabled) {
        background: var(--indigo-deep);
        transform: translateZ(4px);
        box-shadow: var(--shadow-hover);
      }
      .pl-btn--ghost {
        background: rgba(255,255,255,0.7);
        color: var(--ink-soft);
        border: 1px solid var(--line);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
      }
      .pl-btn--ghost:hover:not(:disabled) {
        background: rgba(245,246,249,0.9);
        color: var(--ink);
        transform: translateZ(2px);
      }
      .pl-btn--outline {
        background: rgba(255,255,255,0.7);
        color: var(--brass);
        border: 1px solid rgba(173,127,44,0.45);
      }
      .pl-btn--outline:hover:not(:disabled) {
        background: var(--brass-soft);
        transform: translateZ(2px);
      }
      .pl-spinner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.35);
        border-top-color: #fff;
        animation: pl-spin 0.7s linear infinite;
      }
      @keyframes pl-spin { to { transform: rotate(360deg); } }

      /* ---------- 3D thread gauge ---------- */
      .pl-gauge {
        position: relative;
        width: 100%;
        border-radius: 999px;
        overflow: hidden;
        border: 1px solid var(--line);
        background:
          linear-gradient(135deg, #ECEEF4 0%, #D6D8E2 100%);
        background-image:
          repeating-linear-gradient(
            -45deg,
            rgba(255,255,255,0.1) 0px,
            rgba(255,255,255,0.1) 2px,
            transparent 2px,
            transparent 6px
          );
        box-shadow:
          0 4px 12px rgba(0,0,0,0.08) inset,
          0 2px 4px rgba(0,0,0,0.1);
        transform-style: preserve-3d;
      }
      .pl-gauge--sm { height: 10px; }
      .pl-gauge--md { height: 14px; }
      .pl-gauge--lg { height: 20px; }
      .pl-gauge-fill {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border-radius: 999px;
        transition: width 0.7s cubic-bezier(.2,.8,.2,1);
        background: var(--indigo);
        box-shadow:
          0 2px 4px rgba(0,0,0,0.2) inset,
          0 1px 2px rgba(0,0,0,0.15);
      }
      .pl-gauge-fill::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.3));
      }
      .pl-gauge--indigo .pl-gauge-fill { background: var(--indigo); }
      .pl-gauge--brass .pl-gauge-fill { background: var(--brass); }
      .pl-gauge--teal .pl-gauge-fill { background: var(--teal); }
      .pl-gauge-fill--light::after {
        background: linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
      }

      /* ---------- tags ---------- */
      .pl-tag {
        border-radius: 999px;
        font-size: 0.78rem;
        font-weight: 700;
      }
      .pl-tag--rust {
        background: var(--rust-soft);
        color: #8C3E2B;
        border: 1px solid rgba(174,79,55,0.18);
      }

      /* ---------- roadmap ---------- */
      .pl-roadmap-item {
        position: relative;
      }
      .pl-roadmap-item:not(:last-child)::before {
        content: "";
        position: absolute;
        left: 16px;
        top: 32px;
        bottom: -26px;
        width: 2px;
        background: var(--line);
        transform: translateZ(-1px);
      }
      .pl-roadmap-index {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--indigo);
        color: #fff;
        font-family: 'IBM Plex Mono';
        font-size: 0.75rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        position: relative;
        z-index: 2;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }
      .pl-roadmap-text {
        background: rgba(245,246,249,0.7);
        border: 1px solid var(--line);
        border-radius: 14px;
        color: var(--ink-soft);
        font-size: 0.88rem;
        line-height: 1.6;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
      }

      /* ---------- empty state ---------- */
      .pl-empty {
        border: 1px dashed var(--line);
        border-radius: 18px;
        background: rgba(245,246,249,0.7);
      }
      .pl-empty-icon {
        color: var(--ink-faint);
        opacity: 0.55;
      }
      .pl-empty-title {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        color: var(--ink);
        font-size: 0.95rem;
      }
      .pl-empty-body {
        color: var(--ink-faint);
        font-size: 0.82rem;
        line-height: 1.6;
      }

      /* ---------- hero / best match ---------- */
      .pl-hero {
        background: var(--indigo);
        background-image:
          repeating-linear-gradient(
            135deg,
            rgba(255,255,255,0.025) 0px,
            rgba(255,255,255,0.025) 1px,
            transparent 1px,
            transparent 10px
          ),
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%);
        border-radius: 20px;
        color: #fff;
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
        box-shadow:
          0 8px 32px rgba(0,0,0,0.2),
          0 0 0 1px rgba(255,255,255,0.1) inset;
      }
      .pl-hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.1) 50%,
            rgba(0,0,0,0.15) 100%
          );
        pointer-events: none;
      }
      .pl-hero-badge {
        background: var(--brass);
        color: #2A1F08;
        font-family: 'IBM Plex Mono';
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 0.4rem 0.8rem;
        transform: translateZ(2px);
      }
      .pl-hero-role {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 1.7rem;
        letter-spacing: -0.01em;
        text-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      .pl-hero-score {
        font-family: 'IBM Plex Mono';
        font-weight: 600;
      }

      /* ---------- stat grid ---------- */
      .pl-stat {
        border-radius: 14px;
        background: rgba(245,246,249,0.6);
        border: 1px solid rgba(255,255,255,0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        transform-style: preserve-3d;
        transition: all 0.3s ease;
      }
      .pl-stat:hover {
        transform: translateZ(6px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      }
      .pl-stat-label {
        font-family: 'IBM Plex Mono';
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        display: block;
      }
      .pl-stat-value {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 1rem;
      }
      .pl-stat--hero {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.1);
      }
      .pl-stat--hero .pl-stat-label {
        color: rgba(255,255,255,0.6);
      }
      .pl-stat--hero .pl-stat-value {
        color: #fff;
      }
      .pl-stat--card {
        background: var(--canvas);
        border: 1px solid var(--line);
      }
      .pl-stat--card .pl-stat-label {
        color: var(--ink-faint);
      }
      .pl-stat--card .pl-stat-value {
        color: var(--ink);
      }

      /* ---------- recommendation card ---------- */
      .pl-card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 18px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
        box-shadow:
          0 4px 12px rgba(0,0,0,0.05),
          0 0 0 1px rgba(255,255,255,0.3) inset;
      }
      .pl-card:hover {
        border-color: rgba(35,44,82,0.35);
        box-shadow:
          0 12px 28px -16px rgba(22,26,44,0.25),
          0 0 0 1px rgba(255,255,255,0.5) inset;
        transform: translateY(-4px) translateZ(8px);
      }
      .pl-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, transparent, var(--indigo), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .pl-card:hover::before {
        opacity: 0.7;
      }

      /* ---------- comparison table formatting ---------- */
      .pl-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        transform-style: preserve-3d;
      }
      .pl-table th {
        background: var(--indigo-soft);
        color: var(--indigo);
        font-family: 'IBM Plex Mono';
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 1.1rem;
        border-bottom: 1px solid var(--line);
        text-align: left;
      }
      .pl-table td {
        padding: 1.1rem;
        border-bottom: 1px solid var(--line);
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--ink-soft);
      }
      .pl-table tr:last-child td {
        border-bottom: none;
      }
      .pl-table tr:hover td {
        background-color: rgba(238,240,247,0.4);
        transform: translateZ(2px);
      }

      /* ---------- focus & motion ---------- */
      .pl-root :focus-visible {
        outline: 2px solid var(--brass);
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        .pl-root * {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
      }
    `}</style>
  );
}

/* ---------- icons ---------- */
function ThreadMark({ className, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...rest}>
      <path d="M3 7c3.5 0 3.5 4 7 4s3.5-4 7-4 3.5 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 12c3.5 0 3.5 4 7 4s3.5-4 7-4 3.5 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <path d="M3 17c3.5 0 3.5 3 7 3s3.5-3 7-3 3.5 3 4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}
function ChevronIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function SearchIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function CloseIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function CheckIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
function AlertIcon({ className, ...rest }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
    </svg>
  );
}

/* ---------- 3D thread gauge: the signature visual ---------- */
function ThreadGauge({ value, tone = "indigo", size = "md", light = false }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className={`pl-gauge pl-gauge--${size} pl-gauge--${tone}`}>
      <div
        className={`pl-gauge-fill${light ? " pl-gauge-fill--light" : ""}`}
        style={{ width: `${clamped}%` }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 9px)',
        mixBlendMode: 'overlay',
        pointerEvents: 'none'
      }}/>
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: '0 2px 6px rgba(0,0,0,0.2) inset',
        borderRadius: '999px'
      }}/>
    </div>
  );
}

function ExamOptionBox({ label, value, selected, onSelect, disabled }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(value)}
      aria-pressed={selected}
      disabled={disabled}
      className={`pl-chip ${selected ? "pl-chip--selected" : ""} ${disabled ? "pl-chip--disabled" : ""}`}
    >
      {label}
    </button>
  );
}

function EmptyState({ title, body }) {
  return (
    <div className="pl-empty text-center py-16 px-10">
      <ThreadMark className="pl-empty-icon w-10 h-10 mx-auto mb-5" />
      <h4 className="pl-empty-title">{title}</h4>
      <p className="pl-empty-body mt-2 max-w-sm mx-auto">{body}</p>
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
    <div className="grid grid-cols-2 gap-4">
      {items.map((it) => (
        <div key={it.label} className={`pl-stat pl-stat--${variant} p-4`}>
          <span className="pl-stat-label mb-1">{it.label}</span>
          <strong className="pl-stat-value">{it.value}</strong>
        </div>
      ))}
    </div>
  );
}

/* ---------- Shared lookup tables ---------- */
const documentLabels = {
  sop: "Statement of Purpose",
  lor: "Letters of Recommendation",
  cv: "CV / Resume",
  passport: "Passport",
  transcripts: "Academic Transcripts",
};

const defaultRoadmapTemplate = [
  { id: "gpa", label: "Meet minimum GPA requirement" },
  { id: "languageExam", label: "Meet minimum language exam score" },
  { id: "admissionExam", label: "Take required admission exam" },
  { id: "sop", label: "Write Statement of Purpose" },
  { id: "lor", label: "Collect Letters of Recommendation" },
  { id: "cv", label: "Prepare CV / Resume" },
  { id: "submit", label: "Submit Application" },
];

function App() {
  const [mode, setMode] = useState("career");
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [studyCountry, setStudyCountry] = useState("");
  const [targetCareer, setTargetCareer] = useState("");

  const [degreeLevel, setDegreeLevel] = useState("");
  const [gpaScale, setGpaScale] = useState("10");
  const [gpaScore, setGpaScore] = useState("");
  const [admissionExam, setAdmissionExam] = useState("");
  const [languageExam, setLanguageExam] = useState("IELTS");
  const [preferredIntake, setPreferredIntake] = useState("");
  const [budget, setBudget] = useState("");
  const [citizenshipStatus, setCitizenshipStatus] = useState("");
  const [currentEducation, setCurrentEducation] = useState("");
  const [workExperienceYears, setWorkExperienceYears] = useState("");
  const [leadershipExperience, setLeadershipExperience] = useState("");
  const [researchProjects, setResearchProjects] = useState("");
  const [publicationCount, setPublicationCount] = useState("");
  const [facultyMatch, setFacultyMatch] = useState(false);
  const [storageStatus, setStorageStatus] = useState("saved");
  const [importAlert, setImportAlert] = useState(null);
  const [countryPreferences, setCountryPreferences] = useState("");
  const [documentReadiness, setDocumentReadiness] = useState({
    sop: false,
    lor: false,
    cv: false,
    passport: false,
    transcripts: false,
  });

  const [examScores, setExamScores] = useState({ IELTS: "", TOEFL: "", GRE: "", GMAT: "", SAT: "", ACT: "", JLPT: "" });

  const [universitySearch, setUniversitySearch] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [universitySort, setUniversitySort] = useState("qs");

  const [skillSearch, setSkillSearch] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [analyzeError, setAnalyzeError] = useState(null);
  const [recommendError, setRecommendError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [comparisonData, setComparisonData] = useState([]);
  const [bestCareer, setBestCareer] = useState(null);

  const [careerInfo, setCareerInfo] = useState({});
  const [explanations, setExplanations] = useState({});
  const [insights, setInsights] = useState({});

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getRecommendedProgramDetails = (university) => {
    if (!university?.programs?.length) return null;
    if (targetCareer && degreeLevel) {
      const exactProgram = university.programs.find(
        (program) => program.level === degreeLevel && program.careers?.includes(targetCareer)
      );
      if (exactProgram) return exactProgram;
    }

    if (targetCareer) {
      const careerProgram = university.programs.find((program) => program.careers?.includes(targetCareer));
      if (careerProgram) return careerProgram;
    }

    if (degreeLevel) {
      const degreeProgram = university.programs.find((program) => program.level === degreeLevel);
      if (degreeProgram) return degreeProgram;
    }

    return university.programs[0];
  };

  const getProgramOptionsForCountry = (country, degree, career) => {
    const availablePrograms = universities
      .filter((u) => !country || u.country === country)
      .flatMap((u) => u.programs || []);

    return availablePrograms.filter((program) => {
      if (degree && program.level !== degree) return false;
      if (career && !program.careers?.includes(career)) return false;
      return true;
    });
  };

  const getSupportedLanguageExams = () => {
    const programs = selectedUniversity
      ? [getRecommendedProgramDetails(selectedUniversity)].filter(Boolean)
      : getProgramOptionsForCountry(studyCountry, degreeLevel, targetCareer);

    const exams = new Set();
    programs.forEach((program) => {
      if (program?.requirements?.ielts) exams.add("IELTS");
      if (program?.requirements?.toefl) exams.add("TOEFL");
    });

    return exams.size ? Array.from(exams) : ["IELTS", "TOEFL"];
  };

  const getAdmissionExamOptions = () => {
    const program = getRecommendedProgramDetails(selectedUniversity);
    const requirements = program?.requirements || {};
    const options = new Set();

    if (degreeLevel === "Bachelor's") {
      if (requirements.sat) options.add("SAT");
      if (requirements.act) options.add("ACT");
      if (!options.size) {
        options.add("SAT");
        options.add("ACT");
      }
    }

    if (degreeLevel === "Master's") {
      if (requirements.gre) options.add("GRE");
      if (requirements.gmat) options.add("GMAT");
      if (!options.size) {
        options.add("GRE");
        options.add("GMAT");
      }
    }

    if (degreeLevel === "PhD") {
      options.add("GRE");
    }

    return Array.from(options);
  };

  const getAdmissionExamHelperText = () => {
    if (!degreeLevel) return "Choose a degree level to see admission test guidance.";
    const examOptions = getAdmissionExamOptions();
    if (examOptions.length === 1) return `This degree path typically requires ${examOptions[0]}.`;
    return `Select the admission exam accepted by your preferred program: ${examOptions.join(" or ")}.`;
  };

  const parseBudgetValue = (value) => {
    const numericText = String(value || "").replace(/[^0-9.]/g, "");
    const parsed = parseFloat(numericText);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const doesUniversityMatchBudget = (university) => {
    const limit = parseBudgetValue(budget);
    if (limit === null) return true;
    const totalAnnualCost = Number(university.tuition || 0) + Number(university.living_cost || 0);
    return totalAnnualCost <= limit;
  };

  const doesUniversityMatchIntake = (university) => {
    if (!preferredIntake) return true;
    return university.intakes?.some((intake) =>
      intake.toLowerCase().includes(preferredIntake.toLowerCase())
    );
  };

  const getStudentProfile = () => ({
    gpa: parseFloat(gpaScore || 0),
    ielts: parseFloat(examScores?.["IELTS"] || 0),
    toefl: parseFloat(examScores?.["TOEFL"] || 0),
    gre: parseFloat(examScores?.["GRE"] || 0),
    gmat: parseFloat(examScores?.["GMAT"] || 0),
    sat: parseFloat(examScores?.["SAT"] || 0),
    act: parseFloat(examScores?.["ACT"] || 0),
    jlpt: examScores?.["JLPT"] || "",
    languageScore: parseFloat(examScores?.[languageExam] || 0),
    admissionScore: parseFloat(examScores?.[admissionExam] || 0),
  });

  const getMatchScore = (university) => {
    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const { gpa, ielts, toefl, gre, gmat, sat, act, jlpt } = getStudentProfile();
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;

    const gpaScorePercent = requiredGpa ? Math.min(100, gpa * (100 / requiredGpa)) : 100;

    let languageScorePercent = 100;
    const supportedLanguageExams = [];
    if (requirements.ielts) supportedLanguageExams.push("IELTS");
    if (requirements.toefl) supportedLanguageExams.push("TOEFL");
    if (supportedLanguageExams.length) {
      if (!languageExam || !supportedLanguageExams.includes(languageExam)) {
        languageScorePercent = 0;
      } else {
        if (languageExam === "IELTS" && requirements.ielts) {
          languageScorePercent = Math.min(100, ielts * (100 / requirements.ielts));
        } else if (languageExam === "TOEFL" && requirements.toefl) {
          languageScorePercent = Math.min(100, toefl * (100 / requirements.toefl));
        }
      }
    }

    let admissionScorePercent = 100;
    const requiredAdmissionExams = [];
    if (requirements.sat) requiredAdmissionExams.push("SAT");
    if (requirements.act) requiredAdmissionExams.push("ACT");
    if (requirements.gre) requiredAdmissionExams.push("GRE");
    if (requirements.gmat) requiredAdmissionExams.push("GMAT");
    if (requiredAdmissionExams.length) {
      if (!requiredAdmissionExams.includes(admissionExam)) {
        admissionScorePercent = 0;
      } else {
        if (admissionExam === "SAT" && requirements.sat) {
          admissionScorePercent = Math.min(100, sat * (100 / requirements.sat));
        } else if (admissionExam === "ACT" && requirements.act) {
          admissionScorePercent = Math.min(100, act * (100 / requirements.act));
        } else if (admissionExam === "GRE" && requirements.gre) {
          admissionScorePercent = Math.min(100, gre * (100 / requirements.gre));
        } else if (admissionExam === "GMAT" && requirements.gmat) {
          admissionScorePercent = Math.min(100, gmat * (100 / requirements.gmat));
        }
      }
    }

    const jlptScorePercent = requirements.jlpt
      ? (jlptSatisfiesRequirement(jlpt, requirements.jlpt) ? 100 : 0)
      : 100;
    const programMatchBonus = getRecommendedProgram(university) !== "No matching program" ? 10 : 0;

    const rawScore =
      gpaScorePercent * 0.35 +
      languageScorePercent * 0.25 +
      admissionScorePercent * 0.2 +
      jlptScorePercent * 0.1 +
      programMatchBonus;

    return Math.max(0, Math.min(100, Math.round(rawScore)));
  };

  const getAdmissionChance = (university) => {
    let score = 0;
    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const { gpa, ielts, toefl, gre, gmat, sat, act, jlpt } = getStudentProfile();
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;

    if (requiredGpa) {
      score += Math.min(40, gpa * (40 / requiredGpa));
    }

    let languageScorePercent = 0;
    const supportedLanguageExams = [];
    if (requirements.ielts) supportedLanguageExams.push("IELTS");
    if (requirements.toefl) supportedLanguageExams.push("TOEFL");
    if (supportedLanguageExams.length) {
      if (languageExam && supportedLanguageExams.includes(languageExam)) {
        if (languageExam === "IELTS" && requirements.ielts) {
          languageScorePercent = ielts * (100 / requirements.ielts);
        } else if (languageExam === "TOEFL" && requirements.toefl) {
          languageScorePercent = toefl * (100 / requirements.toefl);
        }
      }
    }
    score += Math.min(25, languageScorePercent * 0.25);

    let admissionScorePercent = 0;
    const requiredAdmissionExams = [];
    if (requirements.sat) requiredAdmissionExams.push("SAT");
    if (requirements.act) requiredAdmissionExams.push("ACT");
    if (requirements.gre) requiredAdmissionExams.push("GRE");
    if (requirements.gmat) requiredAdmissionExams.push("GMAT");
    if (requiredAdmissionExams.length) {
      if (admissionExam && requiredAdmissionExams.includes(admissionExam)) {
        if (admissionExam === "SAT" && requirements.sat) {
          admissionScorePercent = sat * (100 / requirements.sat);
        } else if (admissionExam === "ACT" && requirements.act) {
          admissionScorePercent = act * (100 / requirements.act);
        } else if (admissionExam === "GRE" && requirements.gre) {
          admissionScorePercent = gre * (100 / requirements.gre);
        } else if (admissionExam === "GMAT" && requirements.gmat) {
          admissionScorePercent = gmat * (100 / requirements.gmat);
        }
      }
    }
    score += Math.min(20, admissionScorePercent * 0.2);

    if (getScholarshipChanceScore(university) >= 80) {
      score += 10;
    }

    if (getProfileCompleteness() >= 80) {
      score += 5;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const getAdmissionTier = (chance) => {
    if (chance >= 90) return "SAFE";
    if (chance >= 75) return "TARGET";
    return "REACH";
  };

  // ✅ FIX 2: all `results.push` corrected to `reasons.push`
  const getAdmissionReasons = (university) => {
    const reasons = [];
    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const { gpa, ielts, toefl, gre, gmat, sat, act, jlpt } = getStudentProfile();
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;

    if (requiredGpa) {
      if (gpa >= requiredGpa) {
        reasons.push("✓ GPA exceeds requirement");
      } else {
        reasons.push("✗ GPA below requirement");
      }
    }

    const supportedLanguageExams = [];
    if (requirements.ielts) supportedLanguageExams.push("IELTS");
    if (requirements.toefl) supportedLanguageExams.push("TOEFL");
    if (supportedLanguageExams.length) {
      if (!languageExam || !supportedLanguageExams.includes(languageExam)) {
        reasons.push(`✗ Language exam required: ${supportedLanguageExams.join(" or ")} not taken`);
      } else {
        if (languageExam === "IELTS" && requirements.ielts) {
          if (ielts >= requirements.ielts) {
            reasons.push("✓ Language requirement met");
          } else {
            reasons.push("✗ Language score below requirement");
          }
        } else if (languageExam === "TOEFL" && requirements.toefl) {
          if (toefl >= requirements.toefl) {
            reasons.push("✓ Language requirement met");
          } else {
            reasons.push("✗ Language score below requirement");
          }
        }
      }
    }

    const requiredAdmissionExams = [];
    if (requirements.sat) requiredAdmissionExams.push("SAT");
    if (requirements.act) requiredAdmissionExams.push("ACT");
    if (requirements.gre) requiredAdmissionExams.push("GRE");
    if (requirements.gmat) requiredAdmissionExams.push("GMAT");
    if (requiredAdmissionExams.length) {
      if (!admissionExam || !requiredAdmissionExams.includes(admissionExam)) {
        reasons.push(`✗ Admission exam required: ${requiredAdmissionExams.join(" or ")} not taken`);
      } else {
        if (admissionExam === "SAT" && requirements.sat) {
          if (sat >= requirements.sat) {
            reasons.push("✓ SAT requirement met");
          } else {
            reasons.push("✗ SAT score below requirement");
          }
        } else if (admissionExam === "ACT" && requirements.act) {
          if (act >= requirements.act) {
            reasons.push("✓ ACT requirement met");
          } else {
            reasons.push("✗ ACT score below requirement");
          }
        } else if (admissionExam === "GRE" && requirements.gre) {
          if (gre >= requirements.gre) {
            reasons.push("✓ GRE requirement met");
          } else {
            reasons.push("✗ GRE score below requirement");
          }
        } else if (admissionExam === "GMAT" && requirements.gmat) {
          if (gmat >= requirements.gmat) {
            reasons.push("✓ GMAT requirement met");
          } else {
            reasons.push("✗ GMAT score below requirement");
          }
        }
      }
    }

    if (requirements.jlpt && !jlptSatisfiesRequirement(jlpt, requirements.jlpt)) {
      reasons.push("✗ JLPT score below requirement");
    }

    return reasons;
  };

  const getAdmissionRecommendation = (chance) => {
    if (chance >= 90) return "Strong candidate. Apply immediately.";
    if (chance >= 75) return "Competitive profile. Apply with a strong SOP.";
    return "Improve profile before applying.";
  };

  const getAffordability = (university) => {
    if (!budget) return "Unknown";
    const limit = parseBudgetValue(budget);
    if (limit === null) return "Unknown";
    const totalAnnualCost = Number(university.tuition || 0) + Number(university.living_cost || 0);
    if (totalAnnualCost <= limit) return "Affordable";
    return "Over Budget";
  };

  const getRecommendedProgram = (university) => {
    const program = getRecommendedProgramDetails(university);
    return program ? program.course : "No matching program";
  };

  const getCountryScore = (country) => {
    const countryUniversities = universities.filter((u) => u.country === country);
    if (countryUniversities.length === 0) return 0;
    const totalScore = countryUniversities.reduce((sum, u) => sum + getMatchScore(u), 0);
    return Math.round(totalScore / countryUniversities.length);
  };

  const getCountryCategory = (country) => {
    const score = getCountryScore(country);
    if (score >= 85) return "SAFE";
    if (score >= 65) return "TARGET";
    return "REACH";
  };

  // ✅ FIX 1: allCountries now uses Array.from
  const allCountries = Array.from(new Set(universities.map((u) => u.country)));
  const preferredCountryList = countryPreferences
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const uniqueCountries = preferredCountryList.length
    ? [
        preferredCountryList.filter((c) => allCountries.some((ac) => ac.toLowerCase() === c.toLowerCase())),
        allCountries.filter((ac) => !preferredCountryList.some((c) => c.toLowerCase() === ac.toLowerCase())),
      ]
    : [allCountries];

  const getProfileCompleteness = () => {
    const profileFields = [
      studyCountry,
      degreeLevel,
      gpaScore,
      targetCareer,
      languageExam,
      preferredIntake,
      budget,
      citizenshipStatus,
      currentEducation,
      workExperienceYears,
      leadershipExperience,
      researchProjects,
      publicationCount,
      examScores?.[languageExam] || "",
      selectedUniversity ? "selected" : "",
    ];
    const hasSelectedProgram = selectedUniversity ? Boolean(getRecommendedProgramDetails(selectedUniversity)) : false;
    profileFields.push(hasSelectedProgram ? "selected" : "");

    const filledFields = profileFields.filter((value) => String(value).trim() !== "").length;
    const readinessCount = Object.values(documentReadiness).filter(Boolean).length;
    const totalFields = profileFields.length + Object.keys(documentReadiness).length;
    return totalFields > 0 ? Math.round(((filledFields + readinessCount) / totalFields) * 100) : 0;
  };

  const getScholarshipMatchScore = (scholarship) => {
    let score = 0;
    const { gpa, ielts, gre, gmat, sat, act, jlpt } = getStudentProfile();

    if (gpa >= scholarship.min_gpa_10) {
      score += 50;
    } else {
      score += Math.max(0, gpa * (50 / scholarship.min_gpa_10));
    }

    if (ielts >= scholarship.min_ielts) {
      score += 30;
    } else {
      score += Math.max(0, ielts * (30 / scholarship.min_ielts));
    }

    if (scholarship.degree_levels.includes(degreeLevel)) {
      score += 20;
    }

    const bonusChecks = [
      [scholarship.min_gre, gre],
      [scholarship.min_gmat, gmat],
      [scholarship.min_sat, sat],
      [scholarship.min_act, act],
    ].filter(([minValue]) => minValue);

    if (bonusChecks.length) {
      const bonusPerCheck = 10 / bonusChecks.length;
      bonusChecks.forEach(([minValue, studentValue]) => {
        score += studentValue >= minValue ? bonusPerCheck : Math.max(0, studentValue * (bonusPerCheck / minValue));
      });
    }

    if (scholarship.min_jlpt && !jlptSatisfiesRequirement(jlpt, scholarship.min_jlpt)) {
      score -= 10;
    }

    return Math.max(0, Math.round(score));
  };

  const getScholarshipCategory = (score) => {
    if (score >= 90) return "HIGH";
    if (score >= 75) return "MEDIUM";
    return "LOW";
  };

  const getScholarshipAnalysis = (scholarship) => {
    const analysis = [];
    const { gpa, ielts, gre, gmat, sat, act, jlpt } = getStudentProfile();

    if (gpa >= scholarship.min_gpa_10) {
      analysis.push("✓ GPA requirement met");
    } else {
      analysis.push("✗ GPA below requirement");
    }

    if (ielts >= scholarship.min_ielts) {
      analysis.push("✓ Language requirement met");
    } else {
      analysis.push("✗ Language score below requirement");
    }

    if (scholarship.min_gre) {
      analysis.push(gre >= scholarship.min_gre ? "✓ GRE requirement met" : "✗ GRE below requirement");
    }
    if (scholarship.min_gmat) {
      analysis.push(gmat >= scholarship.min_gmat ? "✓ GMAT requirement met" : "✗ GMAT below requirement");
    }
    if (scholarship.min_sat) {
      analysis.push(sat >= scholarship.min_sat ? "✓ SAT requirement met" : "✗ SAT below requirement");
    }
    if (scholarship.min_act) {
      analysis.push(act >= scholarship.min_act ? "✓ ACT requirement met" : "✗ ACT below requirement");
    }
    if (scholarship.min_jlpt) {
      analysis.push(
        jlptSatisfiesRequirement(jlpt, scholarship.min_jlpt) ? "✓ JLPT requirement met" : "✗ JLPT below requirement"
      );
    }

    return analysis;
  };

  const getScholarshipRecommendation = (score) => {
    if (score >= 90) return "Strong candidate. Apply.";
    if (score >= 75) return "Competitive. Worth applying.";
    return "Improve profile before applying.";
  };

  const matchingScholarships = scholarships
    .filter((scholarship) => scholarship.country === studyCountry)
    .filter((scholarship) => scholarship.degree_levels.includes(degreeLevel))
    .sort((a, b) => getScholarshipMatchScore(b) - getScholarshipMatchScore(a));

  const getScholarshipChanceScore = (university) => {
    if (!university) return 0;
    const scholarshipFlags = Object.values(university.scholarships || {}).filter(Boolean).length;
    const scholarshipStrength = scholarshipFlags / 5;
    const budgetFactor = (() => {
      const limit = parseBudgetValue(budget);
      if (limit === null || limit === 0) return 0.8;
      const totalAnnualCost = Number(university.tuition || 0) + Number(university.living_cost || 0);
      return Math.min(1, totalAnnualCost <= limit ? 1 : limit / totalAnnualCost);
    })();
    const chance = Math.round(Math.min(100, scholarshipStrength * 70 + budgetFactor * 30));
    const eligibility = getEligibilityResult(university);
    return eligibility.eligible ? chance : Math.max(chance - 20, 0);
  };

  // ✅ FIX 3: removed extra `}` between publications and faculty_match
  const getEligibilityResult = (university) => {
    const { gpa, ielts, toefl, gre, gmat, sat, act, jlpt } = getStudentProfile();

    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const courseName = program?.course || "this program";
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;

    if (requiredGpa && gpa < requiredGpa) {
      return { eligible: false, reason: `${courseName} requires a minimum GPA of ${requiredGpa}.` };
    }

    const supportedLanguageExams = [];
    if (requirements.ielts) supportedLanguageExams.push("IELTS");
    if (requirements.toefl) supportedLanguageExams.push("TOEFL");

    if (supportedLanguageExams.length) {
      if (!languageExam || !supportedLanguageExams.includes(languageExam)) {
        return {
          eligible: false,
          reason: `${courseName} requires ${supportedLanguageExams.join(" or ")} for language proficiency.`,
        };
      }
      if (languageExam === "IELTS" && requirements.ielts && ielts < requirements.ielts) {
        return { eligible: false, reason: `${courseName} requires IELTS ${requirements.ielts} or higher.` };
      }
      if (languageExam === "TOEFL" && requirements.toefl && toefl < requirements.toefl) {
        return { eligible: false, reason: `${courseName} requires TOEFL ${requirements.toefl} or higher.` };
      }
    }

    const requiresBachelorExam = degreeLevel === "Bachelor's" && (requirements.sat || requirements.act);
    if (requiresBachelorExam) {
      if (!admissionExam) {
        return { eligible: false, reason: `${courseName} requires SAT or ACT. Select one to continue.` };
      }
      if (admissionExam === "SAT") {
        if (requirements.sat && sat < requirements.sat) {
          return { eligible: false, reason: `${courseName} requires SAT ${requirements.sat} or higher.` };
        }
        if (requirements.act && !requirements.sat) {
          return { eligible: false, reason: `${courseName} requires ACT rather than SAT.` };
        }
      }
      if (admissionExam === "ACT") {
        if (requirements.act && act < requirements.act) {
          return { eligible: false, reason: `${courseName} requires ACT ${requirements.act} or higher.` };
        }
        if (requirements.sat && !requirements.act) {
          return { eligible: false, reason: `${courseName} requires SAT rather than ACT.` };
        }
      }
    }

    const requiresMasterExam = degreeLevel === "Master's" && (requirements.gre || requirements.gmat);
    if (requiresMasterExam) {
      if (!admissionExam) {
        return { eligible: false, reason: `${courseName} requires GRE or GMAT. Select one to continue.` };
      }
      if (admissionExam === "GRE") {
        if (requirements.gre && gre < requirements.gre) {
          return { eligible: false, reason: `${courseName} requires GRE ${requirements.gre} or higher.` };
        }
        if (requirements.gmat && !requirements.gre) {
          return { eligible: false, reason: `${courseName} requires GMAT rather than GRE.` };
        }
      }
      if (admissionExam === "GMAT") {
        if (requirements.gmat && gmat < requirements.gmat) {
          return { eligible: false, reason: `${courseName} requires GMAT ${requirements.gmat} or higher.` };
        }
        if (requirements.gre && !requirements.gmat) {
          return { eligible: false, reason: `${courseName} requires GRE rather than GMAT.` };
        }
      }
    }

    if (degreeLevel === "PhD") {
      if (requirements.gre && gre < requirements.gre) {
        return { eligible: false, reason: `${courseName} requires GRE ${requirements.gre} or higher.` };
      }
      if (requirements.research_projects && parseFloat(researchProjects || 0) < requirements.research_projects) {
        return { eligible: false, reason: `${courseName} expects at least ${requirements.research_projects} research project(s).` };
      }
      if (requirements.publications && parseFloat(publicationCount || 0) < requirements.publications) {
        return { eligible: false, reason: `${courseName} expects at least ${requirements.publications} publication(s).` };
      }
      if (requirements.faculty_match && !facultyMatch) {
        return { eligible: false, reason: `${courseName} requires a faculty match.` };
      }
    }

    if (requirements.jlpt && !jlptSatisfiesRequirement(jlpt, requirements.jlpt)) {
      return { eligible: false, reason: `${courseName} requires JLPT ${requirements.jlpt} or higher.` };
    }

    return { eligible: true, reason: `Eligible for ${courseName}.` };
  };

  const getApplicationRoadmap = (university) => {
    if (!university) return [];

    const program = getRecommendedProgramDetails(university);
    const requirements = program?.requirements || {};
    const template = roadmapTemplates[degreeLevel] || defaultRoadmapTemplate;

    const { gpa, languageScore, admissionScore } = getStudentProfile();
    const requiredGpa = gpaScale === "10" ? requirements.gpa10 : requirements.gpa4;
    const requiredLanguageScore = languageExam === "TOEFL" ? requirements.toefl : requirements.ielts;

    const admissionExamRequired = requirements.sat || requirements.act || requirements.gre || requirements.gmat;
    const requiredAdmissionScore =
      admissionExam === "SAT" ? requirements.sat :
      admissionExam === "ACT" ? requirements.act :
      admissionExam === "GRE" ? requirements.gre :
      admissionExam === "GMAT" ? requirements.gmat :
      null;

    const roadmap = [];

    template.forEach(({ id, label }) => {
      switch (id) {
        case "gpa":
          if (requiredGpa && gpa < requiredGpa) {
            roadmap.push({ step: `Raise GPA from ${gpa || 0} to ${requiredGpa}`, completed: false });
          }
          break;
        case "languageExam":
          if (requiredLanguageScore && languageScore < requiredLanguageScore) {
            roadmap.push({
              step: `Improve ${languageExam} from ${languageScore || 0} to ${requiredLanguageScore}`,
              completed: false,
            });
          }
          break;
        case "admissionExam":
          if (admissionExamRequired) {
            if (!admissionExam) {
              roadmap.push({ step: label, completed: false });
            } else if (requiredAdmissionScore && admissionScore < requiredAdmissionScore) {
              roadmap.push({
                step: `Improve ${admissionExam} from ${admissionScore || 0} to ${requiredAdmissionScore}`,
                completed: false,
              });
            }
          }
          break;
        case "publications":
          if (requirements.publications) {
            roadmap.push({
              step: `Reach ${requirements.publications} publication(s)`,
              completed: parseFloat(publicationCount || 0) >= requirements.publications,
            });
          }
          break;
        case "researchProjects":
          if (requirements.research_projects) {
            roadmap.push({
              step: `Complete ${requirements.research_projects} research project(s)`,
              completed: parseFloat(researchProjects || 0) >= requirements.research_projects,
            });
          }
          break;
        case "facultyMatch":
          if (requirements.faculty_match) {
            roadmap.push({ step: label, completed: facultyMatch });
          }
          break;
        case "sop":
          roadmap.push({ step: label, completed: documentReadiness.sop });
          break;
        case "lor":
          roadmap.push({ step: label, completed: documentReadiness.lor });
          break;
        case "cv":
          roadmap.push({ step: label, completed: documentReadiness.cv });
          break;
        case "submit":
          roadmap.push({ step: label, completed: false });
          break;
        default:
          break;
      }
    });

    return roadmap;
  };

  const getRoadmapProgress = (roadmap) => {
    if (!roadmap.length) return 100;
    const completed = roadmap.filter((step) => step.completed).length;
    return Math.round((completed / roadmap.length) * 100);
  };

  const getMissingDocuments = () => {
    return Object.entries(documentReadiness)
      .filter(([, ready]) => !ready)
      .map(([doc]) => documentLabels[doc] || doc);
  };

  const getNextAction = (roadmap) => {
    const next = roadmap.find((step) => !step.completed);
    return next ? next.step : "Ready to Apply";
  };

  const getPreparationMonths = (roadmap) => {
    const remainingSteps = roadmap.filter((step) => !step.completed).length;
    if (!remainingSteps) return 0;
    return Math.max(1, Math.ceil(remainingSteps / 2));
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  useEffect(() => {
    setUniversitySearch("");
    setSelectedUniversity(null);
  }, [studyCountry]);

  useEffect(() => {
    const supportedLanguageExams = getSupportedLanguageExams();
    if (languageExam && !supportedLanguageExams.includes(languageExam)) {
      setLanguageExam(supportedLanguageExams[0] || "IELTS");
    }
  }, [studyCountry, degreeLevel, targetCareer, selectedUniversity]);

  useEffect(() => {
    const availableAdmissionExams = getAdmissionExamOptions();
    if (admissionExam && !availableAdmissionExams.includes(admissionExam)) {
      setAdmissionExam(availableAdmissionExams[0] || "");
    }
    if (degreeLevel === "PhD" && admissionExam !== "GRE") {
      setAdmissionExam("GRE");
    }
  }, [degreeLevel, selectedUniversity, targetCareer]);

  const exportProfile = () => {
    const profile = {
      target_role: selectedRole,
      selected_skills: selectedSkills,
      skill_count: selectedSkills.length,
      study_country: studyCountry,
      study_degree: degreeLevel,
      degree_level: degreeLevel,
      gpa_scale: gpaScale,
      gpa_score: gpaScore,
      admission_exam: admissionExam,
      language_exam: languageExam,
      preferred_intake: preferredIntake,
      budget,
      citizenship_status: citizenshipStatus,
      current_education: currentEducation,
      work_experience_years: workExperienceYears,
      leadership_experience: leadershipExperience,
      research_projects: researchProjects,
      publication_count: publicationCount,
      faculty_match: facultyMatch,
      country_preferences: countryPreferences,
      document_readiness: documentReadiness,
      exam_scores: examScores,
      target_career: targetCareer,
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

  const importProfile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const profile = JSON.parse(e.target.result);

        if (profile.target_role) setSelectedRole(profile.target_role);
        if (profile.selected_skills) setSelectedSkills(profile.selected_skills);
        if (profile.study_country) setStudyCountry(profile.study_country);
        if (profile.study_degree || profile.degree_level) setDegreeLevel(profile.degree_level || profile.study_degree);
        if (profile.gpa_scale) setGpaScale(profile.gpa_scale);
        if (profile.gpa_score) setGpaScore(profile.gpa_score);
        if (profile.exam_scores) setExamScores(profile.exam_scores);
        if (profile.admission_exam) setAdmissionExam(profile.admission_exam);
        if (profile.language_exam) setLanguageExam(profile.language_exam);
        if (profile.preferred_intake) setPreferredIntake(profile.preferred_intake);
        if (profile.budget) setBudget(profile.budget);
        if (profile.citizenship_status) setCitizenshipStatus(profile.citizenship_status);
        if (profile.current_education) setCurrentEducation(profile.current_education);
        if (profile.work_experience_years) setWorkExperienceYears(profile.work_experience_years);
        if (profile.leadership_experience) setLeadershipExperience(profile.leadership_experience);
        if (profile.research_projects) setResearchProjects(profile.research_projects);
        if (profile.publication_count) setPublicationCount(profile.publication_count);
        if (typeof profile.faculty_match === "boolean") setFacultyMatch(profile.faculty_match);
        if (profile.country_preferences) setCountryPreferences(profile.country_preferences);
        if (profile.document_readiness) setDocumentReadiness(profile.document_readiness);
        if (profile.target_career) setTargetCareer(profile.target_career);

        setImportAlert({ type: "success", message: "Profile imported successfully." });
      } catch {
        setImportAlert({ type: "error", message: "Invalid profile file." });
      }
    };

    reader.readAsText(file);
  };

  // ✅ FIX 4: toggleSkill — use spread operator
  const toggleSkill = (skillId) => {
    const id = String(skillId);
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((existingId) => existingId !== id) : [...prev, id]
    );
  };

  const convertGpaScore = (value, fromScale, toScale) => {
    const numeric = parseFloat(value);
    if (Number.isNaN(numeric)) return "";

    if (fromScale === toScale) {
      return String(numeric);
    }

    let converted = numeric;
    if (fromScale === "10" && toScale === "4") {
      converted = (numeric / 10) * 4;
    }
    if (fromScale === "4" && toScale === "10") {
      converted = (numeric / 4) * 10;
    }

    return String(Math.round(converted * 100) / 100);
  };

  const handleGpaScaleChange = (newScale) => {
    setGpaScore((prevScore) => convertGpaScore(prevScore, gpaScale, newScale));
    setGpaScale(newScale);
  };

  // ✅ FIX 5: handleExamScoreChange — use spread operator
  const handleExamScoreChange = (exam, value) => {
    setExamScores((prev) => ({
      ...prev,
      [exam]: value,
    }));
  };

  const jlptLevelValue = (level) => {
    const normalized = String(level || "").trim().toUpperCase();
    const order = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
    return order[normalized] || 0;
  };

  const jlptSatisfiesRequirement = (applicantJlpt, requiredJlpt) => {
    if (!requiredJlpt) return true;
    return jlptLevelValue(applicantJlpt) >= jlptLevelValue(requiredJlpt);
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
    if (isLoadingRecommendations) return;

    setIsLoadingRecommendations(true);
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
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // ✅ FIX 6: loadCareerInfo — use spread operator
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

  // ✅ FIX 7: loadExplanation — use spread operator
  const loadExplanation = async (roleId) => {
    try {
      const response = await fetch(
        `${API_BASE}/explain?role_id=${roleId}&skills_input=${selectedSkills.join(",")}`
      );
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setExplanations((prev) => ({
        ...prev,
        [roleId]: data,
      }));
    } catch (error) {
      console.error(error);
      setRecommendError((prev) => prev || "Could not load explanation details.");
    }
  };

  // ✅ FIX 8: loadInsight — use spread, fix routeId→roleId, fix closing
  const loadInsight = async (roleId) => {
    try {
      const response = await fetch(
        `${API_BASE}/insight?role_id=${roleId}&skills_input=${selectedSkills.join(",")}`
      );
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setInsights((prev) => ({
        ...prev,
        [roleId]: data.insight,
      }));
    } catch (error) {
      console.error(error);
      setRecommendError((prev) => prev || "Could not load insight details.");
    }
  };

  // ✅ FIX 9: compareTopRoles — routeIds→roleIds
  const compareTopRoles = async (recommendationsList) => {
    try {
      const roleIds = recommendationsList
        .slice(0, 3)
        .map((r) => r.role_id)
        .join(",");

      const response = await fetch(
        `${API_BASE}/compare?role_ids=${roleIds}&skills_input=${selectedSkills.join(",")}`
      );
      if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);
      const data = await response.json();
      setComparisonData(data);

      if (data.length > 0) {
        setBestCareer(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ FIX 10: clearSelection — assignments converted to function calls
  const clearSelection = () => {
    setSelectedRole("");
    setSelectedSkills([]);
    setSkillSearch("");
    setStudyCountry("");
    setTargetCareer("");
    setDegreeLevel("");
    setGpaScale("10");
    setGpaScore("");
    setExamScores({ IELTS: "", TOEFL: "", GRE: "", GMAT: "", SAT: "", ACT: "", JLPT: "" });
    setAdmissionExam("");
    setLanguageExam("IELTS");
    setPreferredIntake("");
    setBudget("");
    setCitizenshipStatus("");
    setCurrentEducation("");
    setWorkExperienceYears("");
    setLeadershipExperience("");
    setResearchProjects("");
    setPublicationCount("");
    setFacultyMatch(false);
    setCountryPreferences("");
    setDocumentReadiness({ sop: false, lor: false, cv: false, passport: false, transcripts: false });
    setUniversitySearch("");
    setSelectedUniversity(null);
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

  const filteredUniversityBase = universities.filter(
    (u) =>
      u.country === studyCountry &&
      u.name.toLowerCase().includes(universitySearch.toLowerCase()) &&
      doesUniversityMatchBudget(u) &&
      doesUniversityMatchIntake(u)
  );

  const universityScoreCache = new Map(
    filteredUniversityBase.map((u) => [
      u,
      {
        eligible: getEligibilityResult(u).eligible,
        matchScore: getMatchScore(u),
        admissionChance: getAdmissionChance(u),
      },
    ])
  );

  // ✅ FIX 11: filteredUniversityList — remove brackets around array
  const filteredUniversityList = filteredUniversityBase.sort((a, b) => {
    if (universitySort === "tuition") {
      return (a.tuition || 0) - (b.tuition || 0);
    }
    if (universitySort === "scholarship") {
      const aScore = Object.values(a.scholarships || {}).filter(Boolean).length;
      const bScore = Object.values(b.scholarships || {}).filter(Boolean).length;
      return bScore - aScore;
    }
    if (universitySort === "eligibility") {
      const aEligibility = universityScoreCache.get(a).eligible ? 0 : 1;
      const bEligibility = universityScoreCache.get(b).eligible ? 0 : 1;
      return aEligibility - bEligibility;
    }
    if (universitySort === "match") {
      return universityScoreCache.get(b).matchScore - universityScoreCache.get(a).matchScore;
    }
    if (universitySort === "admission") {
      return universityScoreCache.get(b).admissionChance - universityScoreCache.get(a).admissionChance;
    }
    return (a.qs_rank || 0) - (b.qs_rank || 0);
  });

  const filteredSkills = Object.entries(skills).filter(([, skillName]) =>
    skillName.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const getRoleName = (roleId) => {
    const role = roles.find((r) => String(r.role_id) === String(roleId));
    return role ? role.role_name : `Role #${roleId}`;
  };

  // ✅ FIX 12: bestMatch — use spread, not brackets
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

  const selectedProgram = selectedUniversity ? getRecommendedProgramDetails(selectedUniversity) : null;
  const selectedMatchScore = selectedUniversity ? getMatchScore(selectedUniversity) : 0;
  const selectedEligibility = selectedUniversity ? getEligibilityResult(selectedUniversity) : { eligible: false, reason: "No university selected" };
  const selectedRoadmap = selectedUniversity ? getApplicationRoadmap(selectedUniversity) : [];
  const missingDocuments = getMissingDocuments();

  return (
    <div className="pl-root antialiased"
         style={{
           transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
         }}
         onMouseMove={(e) => {
           const x = (e.clientX / window.innerWidth - 0.5) * 2;
           const y = (e.clientY / window.innerHeight - 0.5) * 2;
           setMousePosition({ x, y });
         }}
         onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <GlobalStyles />

      {/* Header */}
      <header className="pl-header">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="pl-brand-mark">
              <ThreadMark className="w-6 h-6" />
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
          <h2 className="text-2xl font-bold mb-4">Choose Your Journey</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setMode("career")}
              className={`px-6 py-3 rounded-lg font-bold ${
                mode === "career" ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-800"
              }`}
            >
              💼 Career
            </button>
            <button
              onClick={() => setMode("study")}
              className={`px-6 py-3 rounded-lg font-bold ${
                mode === "study" ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-800"
              }`}
            >
              🎓 Study
            </button>
          </div>
        </div>

        {/* Global Dashboard Profile Card Overview Component */}
        <div className="pl-panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="pl-eyebrow">User Profile</p>
              <h2 className="pl-panel-title mt-1">👤 Personal Profile</h2>
            </div>
            <div className={`pl-status ${storageStatus === "failed" ? "pl-status--offline" : "pl-status--online"}`}>
              <span className="pl-status-dot"></span>
              <span>{storageStatus === "failed" ? "Save failed" : storageStatus === "saving" ? "Saving " : "Saved"}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-5">
            <div className="pl-stat pl-stat--card p-3">
              <span className="pl-stat-label">Target Role</span>
              <strong className="pl-stat-value">
                {selectedRole ? getRoleName(selectedRole) : "Not Selected"}
              </strong>
            </div>
            <div className="pl-stat pl-stat--card p-3">
              <span className="pl-stat-label">Skills Selected</span>
              <strong className="pl-stat-value">{selectedSkills.length}</strong>
            </div>
            <div className="pl-stat pl-stat--card p-3">
              <span className="pl-stat-label">Study Country</span>
              <strong className="pl-stat-value">{studyCountry || "Not Set"}</strong>
            </div>
            <div className="pl-stat pl-stat--card p-3">
              <span className="pl-stat-label">Degree Goal</span>
              <strong className="pl-stat-value">{degreeLevel || "Not Set"}</strong>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={exportProfile}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              📄 Export Profile
            </button>

            <label className="ml-3 px-4 py-2 rounded-lg bg-slate-700 text-white cursor-pointer hover:bg-slate-800">
              📂 Import Profile
              <input type="file" accept=".json" className="hidden" onChange={importProfile} />
            </label>
            {importAlert && (
              <div className={`pl-alert ${importAlert.type === "error" ? "pl-alert--rust" : "pl-alert--teal"} mt-3 p-4`}>
                {importAlert.message}
              </div>
            )}
          </div>
        </div>

        {/* Day 19/20 Dashboard Summary Card Component */}
        {mode === "study" && (
          <div className="pl-panel p-6">
            <h2 className="text-xl font-bold mb-4">Profile Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border">
                <p className="text-sm font-medium text-slate-500">Profile Completeness</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{getProfileCompleteness()}%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border">
                <p className="text-sm font-medium text-slate-500">Scholarship Potential Strength</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">
                  {selectedUniversity ? getScholarshipChanceScore(selectedUniversity) : 0}%
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border">
                <p className="text-sm font-medium text-slate-500">Admission Chance</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">
                  {selectedUniversity ? getAdmissionChance(selectedUniversity) : 0}%
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border">
                <p className="text-sm font-medium text-slate-500">Roadmap Progress</p>
                <p className="text-2xl font-bold text-teal-700 mt-1">
                  {selectedUniversity ? getRoadmapProgress(selectedRoadmap) : 0}%
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border sm:col-span-2 lg:col-span-1">
                <p className="text-sm font-medium text-slate-500">Next Action</p>
                <p className="text-lg font-bold text-slate-800 mt-1">
                  {selectedUniversity ? getNextAction(selectedRoadmap) : "Select a university"}
                </p>
              </div>
            </div>
          </div>
        )}

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
              {/* LEFT — configuration panels */}
              <section className="lg:col-span-5 pl-panel p-6 relative">
                <div className="pl-panel-head pb-5 mb-5">
                  <h2 className="pl-panel-title">Build your profile</h2>
                  <p className="pl-panel-subtitle">Set a target role, then add the skills you bring.</p>
                </div>

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
                    <div id="skill-listbox" role="listbox" className="pl-dropdown absolute left-0 right-0 mt-2 max-h-64 overflow-y-auto z-50 p-2">
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
                                <input type="checkbox" className="pl-checkbox rounded h-4 w-4 pointer-events-none" checked={isChecked} readOnly />
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
                        <button onClick={() => toggleSkill(skillId)} aria-label={`Remove ${skills[skillId] ?? skillId}`} className="pl-chip-remove p-0.5">
                          <CloseIcon className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                {analyzeError && <div className="pl-alert pl-alert--rust mt-4 p-3.5">{analyzeError}</div>}

                <div className="flex flex-col gap-2 mt-8 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
                  <div className="flex gap-2">
                    <button onClick={analyzeCareer} disabled={isLoading} className="pl-btn pl-btn--primary flex-1 px-5 py-3.5">
                      {isLoading ? (
                        <>
                          <div className="pl-spinner" />
                          <span>Analyzing…</span>
                        </>
                      ) : (
                        <span>Analyze fit</span>
                      )}
                    </button>
                    <button onClick={clearSelection} disabled={isLoading} className="pl-btn pl-btn--ghost px-4 py-3.5">
                      Clear
                    </button>
                  </div>

                  <button
                    onClick={getRecommendations}
                    disabled={isLoadingRecommendations}
                    aria-busy={isLoadingRecommendations}
                    className="pl-btn pl-btn--outline w-full px-5 py-3.5"
                  >
                    {isLoadingRecommendations ? "Loading alternatives…" : "Find alternative roles"}
                  </button>
                </div>
              </section>

              {/* RIGHT — analytic metric displays */}
              <div className="lg:col-span-7 space-y-6">
                <div className="pl-panel p-6">
                  <div className="pl-panel-head pb-4 mb-5">
                    <h2 className="pl-panel-title">Fit analysis</h2>
                    <p className="pl-panel-subtitle">See how your skills measure up to the role.</p>
                  </div>

                  {!result ? (
                    <EmptyState title="No analysis yet" body="Choose a target role and add your skills, then run the analysis." />
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl" style={{ background: "var(--canvas)", border: "1px solid var(--line)" }}>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="pl-field-label">Readiness score</span>
                        </div>
                        <span className="pl-mono pl-hero-score text-base" style={{ color: "var(--teal)" }}>{result.readiness_score}%</span>
                        <ThreadGauge value={result.readiness_score} tone="teal" size="lg" />

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
                                <span key={index} className="pl-tag pl-tag--rust px-3 py-1">{skill}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pl-panel p-6">
                  <div className="pl-panel-head pb-4 mb-5">
                    <h2 className="pl-panel-title">Alternative matches</h2>
                  </div>
                  <p className="pl-panel-subtitle">Explore alternate professions with high core matching affinity ratios.</p>

                  {recommendations.length === 0 ? (
                    <EmptyState title="No recommendations yet" body="Add your unique skills matrix on the configuration frame to generate predictive alternatives maps." />
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

                              {explanations[item.role_id] && (
                                <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
                                  <h4 className="font-semibold text-sm mb-2 pl-display">Why This Role?</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="font-medium mb-1 text-xs" style={{ color: "var(--teal)" }}>Matched</p>
                                      <ul className="text-sm space-y-0.5" style={{ color: "var(--ink-soft)" }}>
                                        {explanations[item.role_id].matched.map((skill, index) => (
                                          <li key={index} className="truncate">✓ {skill}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <p className="font-medium mb-1 text-xs" style={{ color: "var(--rust)" }}>Missing</p>
                                      <ul className="text-sm space-y-0.5" style={{ color: "var(--ink-soft)" }}>
                                        {explanations[item.role_id].missing.map((skill, index) => (
                                          <li key={index} className="truncate">✗ {skill}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {insights[item.role_id] && (
                                <div className="mt-4">
                                  <div className="border border-indigo-200 rounded-xl p-4" style={{ backgroundColor: "var(--indigo-soft)" }}>
                                    <h4 className="font-semibold text-indigo-700 mb-2" style={{ color: "var(--indigo)" }}>🤖 AI Insight</h4>
                                    <p className="text-sm text-slate-700" style={{ color: "var(--ink-soft)" }}>{insights[item.role_id]}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {comparisonData.length > 0 && (
                  <section className="pl-panel p-6 mt-10">
                    <div className="pl-panel-head pb-4 mb-5">
                      <h2 className="pl-panel-title flex items-center gap-2">⚖️ Career Comparison</h2>
                      <p className="pl-panel-subtitle">Side-by-side metric cross-matching analysis for top tracked roles.</p>
                    </div>
                    {bestCareer && (
                      <div className="mb-8 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 shadow-lg">
                        <div className="text-sm font-semibold uppercase tracking-wider pl-mono">🏆 Recommended Career</div>
                        <h2 className="text-3xl font-bold mt-2 pl-display">{bestCareer.role_name}</h2>
                        <p className="mt-2 text-lg font-medium">Match Score: {bestCareer.readiness_score}%</p>
                        <div className="mt-4 text-sm space-y-1.5 pl-mono">
                          <p>💰 Salary: <span className="font-semibold">{bestCareer.salary}</span></p>
                          <p>📊 Demand: <span className="font-semibold">{bestCareer.demand}</span></p>
                          <p>⚡ Difficulty: <span className="font-semibold">{bestCareer.difficulty}</span></p>
                          <p>⏳ Learning Time: <span className="font-semibold">{bestCareer.learning_time}</span></p>
                        </div>
                        <p className="mt-3 text-sm opacity-90">Highest readiness score among compared careers and strongest alignment with your current skills.</p>
                      </div>
                    )}

                    <div className="mb-8 bg-white rounded-2xl shadow p-6 border border-slate-100">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">📊 Readiness Comparison</h2>
                      <ComparisonChart data={comparisonData} />
                    </div>
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
                              <td className="font-semibold text-slate-800" style={{ color: "var(--ink)" }}>{career.role_name}</td>
                              <td>
                                <div className="flex items-center gap-2.5 min-w-[100px]">
                                  <span className="pl-mono font-semibold" style={{ color: "var(--teal)" }}>{career.readiness_score}%</span>
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
            <h2 className="text-3xl font-bold mb-4">🎓 Study Planner</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
              <p className="text-slate-600">Plan your global education journey based on your unique profile metrics.</p>
              <div className="text-sm text-slate-500">
                Profile completeness: {getProfileCompleteness()}%
              </div>
            </div>

            {/* Academic Profile Form Element */}
            <div className="pl-panel p-6 mt-6">
              <h2 className="text-2xl font-bold mb-6">🎓 Academic Profile</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="degree-level-select" className="block mb-2 font-medium">Degree Level</label>
                  <select
                    id="degree-level-select"
                    value={degreeLevel}
                    onChange={(e) => setDegreeLevel(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Select Degree</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>PhD</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="gpa-scale-select" className="block mb-2 font-medium">GPA Scale</label>
                  <select
                    id="gpa-scale-select"
                    value={gpaScale}
                    onChange={(e) => handleGpaScaleChange(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="4">4.0 Scale</option>
                    <option value="10">10.0 Scale</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="gpa-score-input" className="block mb-2 font-medium">GPA Score</label>
                  <input
                    id="gpa-score-input"
                    type="number"
                    step="0.01"
                    min="0"
                    max={gpaScale === "10" ? "10" : "4"}
                    value={gpaScore}
                    onChange={(e) => setGpaScore(e.target.value)}
                    placeholder="Enter GPA"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              {/* Standardized Exam Scores Inputs Component */}
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">✍️ Standardized Exam Scores</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Admission Test</label>
                    <div className="flex flex-wrap gap-3">
                      {degreeLevel === "Bachelor's" && ["SAT", "ACT"].map((exam) => (
                        <ExamOptionBox
                          key={exam}
                          label={exam}
                          value={exam}
                          selected={admissionExam === exam}
                          onSelect={setAdmissionExam}
                        />
                      ))}

                      {degreeLevel === "Master's" && ["GRE", "GMAT"].map((exam) => (
                        <ExamOptionBox
                          key={exam}
                          label={exam}
                          value={exam}
                          selected={admissionExam === exam}
                          onSelect={setAdmissionExam}
                        />
                      ))}

                      {degreeLevel === "PhD" && (
                        <ExamOptionBox
                          label="GRE"
                          value="GRE"
                          selected={true}
                          onSelect={() => {}}
                          disabled={true}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{getAdmissionExamHelperText()}</p>

                  <div className="grid md:grid-cols-3 gap-4">
                    {degreeLevel && admissionExam && degreeLevel === "Bachelor's" && admissionExam === "SAT" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium">SAT Score</label>
                        <input
                          type="number"
                          min="400"
                          max="1600"
                          value={examScores.SAT}
                          onChange={(e) => handleExamScoreChange("SAT", e.target.value)}
                          placeholder="e.g. 1400"
                          className="w-full p-3 border rounded-lg pl-mono"
                        />
                      </div>
                    )}
                    {degreeLevel && admissionExam && degreeLevel === "Bachelor's" && admissionExam === "ACT" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium">ACT Score</label>
                        <input
                          type="number"
                          min="1"
                          max="36"
                          value={examScores.ACT}
                          onChange={(e) => handleExamScoreChange("ACT", e.target.value)}
                          placeholder="e.g. 33"
                          className="w-full p-3 border rounded-lg pl-mono"
                        />
                      </div>
                    )}
                    {degreeLevel && admissionExam && degreeLevel === "Master's" && admissionExam === "GRE" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium">GRE Score</label>
                        <input
                          type="number"
                          min="260"
                          max="340"
                          value={examScores.GRE}
                          onChange={(e) => handleExamScoreChange("GRE", e.target.value)}
                          placeholder="e.g. 320"
                          className="w-full p-3 border rounded-lg pl-mono"
                        />
                      </div>
                    )}
                    {degreeLevel && admissionExam && degreeLevel === "Master's" && admissionExam === "GMAT" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium">GMAT Score</label>
                        <input
                          type="number"
                          min="200"
                          max="800"
                          value={examScores.GMAT}
                          onChange={(e) => handleExamScoreChange("GMAT", e.target.value)}
                          placeholder="e.g. 720"
                          className="w-full p-3 border rounded-lg pl-mono"
                        />
                      </div>
                    )}
                    {degreeLevel === "PhD" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium">GRE Score</label>
                        <input
                          type="number"
                          min="260"
                          max="340"
                          value={examScores.GRE}
                          onChange={(e) => handleExamScoreChange("GRE", e.target.value)}
                          placeholder="e.g. 325"
                          className="w-full p-3 border rounded-lg pl-mono"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block mb-2 text-sm font-medium">{languageExam} Score</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={examScores[languageExam]}
                        onChange={(e) => handleExamScoreChange(languageExam, e.target.value)}
                        placeholder={languageExam === "IELTS" ? "e.g. 7.5" : "e.g. 100"}
                        className="w-full p-3 border rounded-lg pl-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Geographic and Academic Pathway Destination Track Selectors */}
              <div className="mb-6 mt-6">
                <label htmlFor="target-career-select" className="block mb-2 font-medium">Target Career</label>
                <select
                  id="target-career-select"
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Career</option>
                  {roles.map((role) => (
                    <option key={role.role_id} value={role.role_name}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="study-country-select" className="block mb-2 font-medium">Target Country</label>
                <select
                  id="study-country-select"
                  className="w-full p-3 border rounded-lg"
                  value={studyCountry}
                  onChange={(e) => setStudyCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="country-preferences-input" className="block mb-2 font-medium">Preferred Countries (Country Strategy)</label>
                <input
                  id="country-preferences-input"
                  value={countryPreferences}
                  onChange={(e) => setCountryPreferences(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="e.g. Canada, Germany, Japan"
                />
                <p className="text-xs text-slate-500 mt-1">Comma-separated. These are listed first in Country Strategy below.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div>
                  <label htmlFor="preferred-intake-input" className="block mb-2 font-medium">Preferred Intake</label>
                  <input
                    id="preferred-intake-input"
                    value={preferredIntake}
                    onChange={(e) => setPreferredIntake(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="e.g. Fall 2027"
                  />
                </div>
                <div>
                  <label htmlFor="budget-input" className="block mb-2 font-medium">Budget</label>
                  <input
                    id="budget-input"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="e.g. 20000"
                  />
                </div>
                <div>
                  <label htmlFor="citizenship-status-select" className="block mb-2 font-medium">Citizenship Status</label>
                  <select
                    id="citizenship-status-select"
                    value={citizenshipStatus}
                    onChange={(e) => setCitizenshipStatus(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Select Status</option>
                    <option value="International">International</option>
                    <option value="Domestic">Domestic</option>
                    <option value="Permanent Resident">Permanent Resident</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div>
                  <label htmlFor="current-education-input" className="block mb-2 font-medium">Current Education</label>
                  <input
                    id="current-education-input"
                    value={currentEducation}
                    onChange={(e) => setCurrentEducation(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="e.g. High school diploma"
                  />
                </div>
                {(degreeLevel === "Master's" || degreeLevel === "PhD") && (
                  <div>
                    <label htmlFor="work-experience-input" className="block mb-2 font-medium">Work Experience</label>
                    <input
                      id="work-experience-input"
                      type="number"
                      min="0"
                      value={workExperienceYears}
                      onChange={(e) => setWorkExperienceYears(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Years of experience"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="leadership-experience-input" className="block mb-2 font-medium">Leadership Experience</label>
                  <input
                    id="leadership-experience-input"
                    value={leadershipExperience}
                    onChange={(e) => setLeadershipExperience(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="e.g. Team lead, club president"
                  />
                </div>
              </div>

              {degreeLevel === "PhD" && (
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <label htmlFor="research-projects-input" className="block mb-2 font-medium">Research Projects</label>
                    <input
                      id="research-projects-input"
                      type="number"
                      min="0"
                      value={researchProjects}
                      onChange={(e) => setResearchProjects(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Number of projects"
                    />
                  </div>
                  <div>
                    <label htmlFor="publication-count-input" className="block mb-2 font-medium">Publications</label>
                    <input
                      id="publication-count-input"
                      type="number"
                      min="0"
                      value={publicationCount}
                      onChange={(e) => setPublicationCount(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Number of publications"
                    />
                  </div>
                  <div>
                    <label htmlFor="faculty-match-select" className="block mb-2 font-medium">Faculty Match</label>
                    <select
                      id="faculty-match-select"
                      value={facultyMatch ? "yes" : "no"}
                      onChange={(e) => setFacultyMatch(e.target.value === "yes")}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block mb-2 font-medium">Document Readiness</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(documentReadiness).map(([doc, ready]) => (
                      <label key={doc} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={ready}
                          onChange={() =>
                            setDocumentReadiness((prev) => ({
                              ...prev,
                              [doc]: !prev[doc],
                            }))
                          }
                          className="h-4 w-4"
                        />
                        {doc.toUpperCase()}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {targetCareer && studyCountry && (
                <div className="pl-panel p-6 mt-6">
                  <h2 className="text-2xl font-bold mb-4">
                    🎯 Career-Aligned Programs
                  </h2>

                  <div className="grid gap-4 md:grid-cols-[1fr_auto] mb-6">
                    <input
                      type="text"
                      placeholder="Search universities"
                      value={universitySearch}
                      onChange={(e) => setUniversitySearch(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                    <div>
                      <label htmlFor="university-sort-select" className="block mb-2 text-sm font-medium">Sort universities</label>
                      <select
                        id="university-sort-select"
                        value={universitySort}
                        onChange={(e) => setUniversitySort(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                      >
                        <option value="qs">Best QS rank</option>
                        <option value="tuition">Lowest cost</option>
                        <option value="scholarship">Scholarship strength</option>
                        <option value="eligibility">Admission fit</option>
                        <option value="admission">Admission Chance</option>
                      </select>
                    </div>
                  </div>

                  {filteredUniversityBase.length === 0 ? (
                    <p className="text-sm text-slate-600">No universities match your filters.</p>
                  ) : (
                    filteredUniversityBase.map((u) => {
                      const eligibility = getEligibilityResult(u);
                      const scholarshipChance = getScholarshipChanceScore(u);
                      const admissionChance = getAdmissionChance(u);
                      const admissionTier = getAdmissionTier(admissionChance);

                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setSelectedUniversity(u)}
                          className={`w-full text-left border rounded-lg p-4 mb-4 transition-colors ${
                            selectedUniversity?.id === u.id
                              ? "border-indigo-600 bg-indigo-50/40"
                              : "hover:bg-slate-50 border-slate-200"
                          }`}
                        >
                          <h3 className="font-bold text-lg">{u.name}</h3>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <p className="font-medium text-slate-700">
                              Admission Chance: <span className="font-bold text-indigo-600">{admissionChance}%</span>
                            </p>
                            <p className="font-medium text-slate-700">
                              Tier: <span className={`font-bold ${admissionTier === "SAFE" ? "text-green-600" : admissionTier === "TARGET" ? "text-yellow-600" : "text-red-600"}`}>{admissionTier}</span>
                            </p>
                            <p className="text-slate-600">Affordability: <span className="font-semibold text-slate-800">{getAffordability(u)}</span></p>
                            <p className={`font-bold ${eligibility.eligible ? "text-green-600" : "text-red-600"}`}>
                              {eligibility.eligible ? "✅ Eligible" : "❌ Not Eligible"}
                            </p>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">{eligibility.reason}</p>
                          <div className="mt-2 text-xs text-slate-600 flex gap-4">
                            <span>QS Rank: {u.qs_rank}</span>
                            <span>Scholarship chance: {scholarshipChance}%</span>
                          </div>
                          <p className="text-xs font-medium text-indigo-700 mt-1">Recommended Course: {getRecommendedProgram(u)}</p>
                        </button>
                      );
                    })
                  )}
                </div>
              )}

              {/* Step 6: Dynamic Selected Institution Deep Data Intelligence Extraction Component Card */}
              {selectedUniversity && (
                <div className="mt-8 pl-panel p-6 space-y-4">
                  <h2 className="text-2xl font-bold border-b pb-2">
                    🏫 University Profile
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Name:</strong> {selectedUniversity.name}</p>
                      <p><strong>Country:</strong> {selectedUniversity.country}</p>
                      <p><strong>QS Rank:</strong> {selectedUniversity.qs_rank}</p>
                      <p><strong>Recommended Program:</strong> {getRecommendedProgram(selectedUniversity)}</p>
                      <p><strong>Tuition:</strong> ${selectedUniversity.tuition}/year</p>
                      <p><strong>Affordability:</strong> {getAffordability(selectedUniversity)}</p>
                    </div>
                    <div>
                      <p><strong>Match Score:</strong> {selectedMatchScore}%</p>
                      <p><strong>Scholarship chance:</strong> {getScholarshipChanceScore(selectedUniversity)}%</p>
                      <p><strong>Eligibility:</strong> {selectedEligibility.eligible ? "✅ Eligible" : "❌ Not Eligible"}</p>
                      <p className="text-sm text-slate-600"><strong>Reason:</strong> {selectedEligibility.reason}</p>
                      <p><strong>Employment Score:</strong> {selectedUniversity.employment_score}/10</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-2">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">🎯 Admission Analysis</h3>
                    <div className="space-y-1 bg-white p-3 rounded-lg border text-sm font-medium">
                      {getAdmissionReasons(selectedUniversity).map((item, index) => (
                        <p key={index} className={item.startsWith("✓") ? "text-green-700" : "text-red-700"}>
                          {item}
                        </p>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2 pt-2 text-sm font-semibold">
                      <p className="p-2 bg-white rounded border">
                        Admission Chance: <span className="text-indigo-600 font-bold">{getAdmissionChance(selectedUniversity)}%</span>
                      </p>
                      <p className="p-2 bg-white rounded border">
                        Category: <span className="text-indigo-600 font-bold">{getAdmissionTier(getAdmissionChance(selectedUniversity))}</span>
                      </p>
                      <p className="p-2 bg-white rounded border sm:col-span-1">
                        Recommendation: <span className="text-indigo-600 font-bold">{getAdmissionRecommendation(getAdmissionChance(selectedUniversity))}</span>
                      </p>
                    </div>
                  </div>

                  {selectedProgram && (
                    <div className="pt-4 border-t text-sm grid md:grid-cols-2 gap-2 text-slate-600">
                      <p><strong>Minimum GPA:</strong> {gpaScale === "10" ? selectedProgram.requirements.gpa10 : selectedProgram.requirements.gpa4}</p>
                      <p><strong>Minimum IELTS:</strong> {selectedProgram.requirements.ielts || "N/A"}</p>
                      <p><strong>Minimum TOEFL:</strong> {selectedProgram.requirements.toefl || "N/A"}</p>
                      <p><strong>Minimum GRE:</strong> {selectedProgram.requirements.gre || "N/A"}</p>
                      <p><strong>Minimum GMAT:</strong> {selectedProgram.requirements.gmat || "N/A"}</p>
                      <p><strong>JLPT Requirement:</strong> {selectedProgram.requirements.jlpt || "N/A"}</p>
                      <p><strong>Program Language Track:</strong> {selectedProgram.language_track || "N/A"}</p>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-teal-50/50 rounded-xl border border-teal-100 space-y-3">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">🛣 Application Roadmap</h3>

                    <div className="space-y-1.5 bg-white p-3 rounded-lg border">
                      {selectedRoadmap.length > 0 ? (
                        selectedRoadmap.map((step, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm font-medium">
                            <input type="checkbox" checked={step.completed} readOnly className="h-4 w-4 accent-teal-600" />
                            <span className={step.completed ? "text-slate-400 line-through" : "text-slate-700"}>
                              {step.step}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-green-700 font-medium">✅ All requirements met — ready to apply.</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          style={{ width: `${getRoadmapProgress(selectedRoadmap)}%` }}
                          className="bg-green-500 h-4 rounded-full transition-all"
                        />
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Roadmap Progress: {getRoadmapProgress(selectedRoadmap)}%</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 pt-1 text-sm font-semibold">
                      <p className="p-2 bg-white rounded border">
                        Next Action: <span className="text-teal-700 font-bold">{getNextAction(selectedRoadmap)}</span>
                      </p>
                      <p className="p-2 bg-white rounded border">
                        Estimated Preparation: <span className="text-teal-700 font-bold">
                          {getPreparationMonths(selectedRoadmap)} Month{getPreparationMonths(selectedRoadmap) === 1 ? "" : "s"}
                        </span>
                      </p>
                    </div>

                    {missingDocuments.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-sm font-semibold text-slate-700 mb-1 mt-2">Missing Documents</p>
                        {missingDocuments.map((doc) => (
                          <p key={doc} className="text-sm text-slate-600">• {doc}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {targetCareer && studyCountry && (
                <div className="pl-panel p-6 mt-6">
                  <h2 className="text-2xl font-bold mb-4">
                    🌍 Country Strategy
                  </h2>

                  {uniqueCountries.flat().map((country) => {
                    const score = getCountryScore(country);
                    const category = getCountryCategory(country);
                    const isPreferred = preferredCountryList.some((c) => c.toLowerCase() === country.toLowerCase());
                    const categoryColor =
                      category === "SAFE" ? "text-green-600" :
                      category === "TARGET" ? "text-yellow-600" : "text-red-600";

                    return (
                      <div key={country} className="mb-4 pb-4 border-b last:border-b-0">
                        <p className="font-bold text-lg">
                          {country}
                          {isPreferred && (
                            <span className="ml-2 text-xs font-semibold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full align-middle">
                              Preferred
                            </span>
                          )}
                        </p>
                        <p className={`font-bold ${categoryColor}`}>{category}</p>
                        <p className="text-slate-600">Match Score: {score}%</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {targetCareer && studyCountry && degreeLevel && (
                <div className="pl-panel p-6 mt-6">
                  <h2 className="text-2xl font-bold mb-4">
                    🎓 Scholarship Intelligence
                  </h2>

                  {matchingScholarships.length > 0 ? (
                    matchingScholarships.map((s) => {
                      const score = getScholarshipMatchScore(s);
                      const category = getScholarshipCategory(score);
                      const categoryColor =
                        category === "HIGH" ? "text-green-600" :
                        category === "MEDIUM" ? "text-yellow-600" : "text-red-600";

                      return (
                        <div
                          key={s.id}
                          className="border rounded-lg p-4 mb-4 last:mb-0 bg-slate-50"
                        >
                          <h3 className="font-bold text-lg">{s.name}</h3>
                          <p className="text-sm text-slate-600 mb-2">Type: {s.type}</p>
                          <p className="text-sm text-slate-600 mb-3">Amount: {s.amount}</p>

                          <div className="mb-3 pb-3 border-b">
                            <p className={`font-bold ${categoryColor}`}>Match: {score}% ({category})</p>
                          </div>

                          <div className="mb-3 pb-3 border-b">
                            <p className="text-sm font-semibold mb-2">Analysis:</p>
                            {getScholarshipAnalysis(s).map((item, index) => (
                              <p key={index} className="text-sm text-slate-700">{item}</p>
                            ))}
                          </div>

                          <p className="text-sm">
                            <strong>Recommendation:</strong> {getScholarshipRecommendation(score)}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-slate-600">No scholarships match your profile yet. Try adjusting your degree level or target country.</p>
                  )}
                </div>
              )}

              <div className="mt-6 p-4 rounded-lg bg-slate-100">
                <h3 className="font-semibold mb-2">Coming Soon</h3>
                <ul className="list-disc ml-5 text-sm space-y-1 text-slate-600">
                  <li>AI Study Coach (powered by the Application Roadmap Engine)</li>
                  <li>Visa Planning</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
