# Pathloom Frontend

React + Vite application powering the Pathloom user interface.

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.6 | UI framework |
| Vite | 8.0.12 | Build tool + dev server with HMR |
| Tailwind CSS | 4.3.1 | Utility-first CSS framework |
| @vitejs/plugin-react | 6.0.1 | React Refresh (Oxc-based) |
| ESLint | 10.3.0 | Code linting |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Design System

The frontend uses a custom design system with the following tokens:

### Colors
- **Canvas:** `#F5F6F9` — Page background
- **Panel:** `#FFFFFF` — Card/section backgrounds
- **Ink:** `#161A2C` — Primary text
- **Indigo:** `#232C52` — Brand primary, buttons, selections
- **Brass:** `#AD7F2C` — Accent, best match badges
- **Rust:** `#AE4F37` — Warnings, missing skills
- **Teal:** `#1F6F61` — Success, readiness scores

### Typography
- **Display:** Space Grotesk (headings, hero text)
- **Body:** IBM Plex Sans (paragraph text, labels)
- **Data:** IBM Plex Mono (scores, stats, code)

### Signature Component
The **Thread Gauge** — a progress bar styled as a woven measuring tape. Used throughout for readiness scores, match scores, and comparison charts.

## Architecture

### Source Structure

```
src/
├── App.jsx              # Main application (career + study modes)
├── App.css              # Vite boilerplate styles
├── main.jsx             # React entry point
├── index.css            # Tailwind CSS import
├── components/
│   └── ComparisonChart.jsx  # Career comparison bar chart
├── data/
│   ├── countries.js     # Study destination data (5 countries)
│   ├── universities.js  # University catalog (3 universities)
│   └── scholarships.js  # Scholarship catalog (3 scholarships)
└── assets/
    ├── hero.png         # Hero image
    ├── react.svg        # React logo
    └── vite.svg         # Vite logo
```

### Navigation Modes

The app has two modes toggled via buttons:

1. **Career Mode** — Career analysis, recommendations, comparison
2. **Study Mode** — Academic profile, university finder, scholarship matching

### API Integration

The frontend communicates with the FastAPI backend via REST API calls. The base URL defaults to `http://127.0.0.1:8000` and can be overridden with the `VITE_API_BASE` environment variable.

### State Management

All state is managed via React `useState` hooks in the main `App` component. No external state management library is used.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE` | `http://127.0.0.1:8000` | Backend API URL |

## Development Notes

- The app requires the FastAPI backend to be running for career mode features
- Study mode works offline using static data files in `src/data/`
- The frontend uses both Tailwind CSS utilities and custom CSS classes (prefixed with `pl-`)
- All custom styles are defined in the `GlobalStyles` component within `App.jsx`
