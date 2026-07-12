/* App.jsx — application shell with section-aware routing */
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

/* Layout */
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

/* Pages */
import DashboardPage from './pages/DashboardPage';
import CareerAnalysisPage from './pages/career/CareerAnalysisPage';
import CareerRecommendPage from './pages/career/CareerRecommendPage';
import CareerComparePage from './pages/career/CareerComparePage';
import StudyProfilePage from './pages/study/StudyProfilePage';
import UniversityFinderPage from './pages/study/UniversityFinderPage';
import ScholarshipPage from './pages/study/ScholarshipPage';
import CountryStrategyPage from './pages/study/CountryStrategyPage';
import GlobalOpportunityPage from './pages/GlobalOpportunityPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

/* Resolve route to section class for accent scoping */
function getSectionClass(pathname) {
  if (pathname.startsWith('/career')) return 'pl-section--career';
  if (pathname.startsWith('/study')) return 'pl-section--study';
  if (pathname.startsWith('/global')) return 'pl-section--global';
  if (pathname.startsWith('/profile')) return 'pl-section--profile';
  return 'pl-section--dashboard';
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const sectionClass = getSectionClass(location.pathname);

  const handleLogoClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="pl-root">
      <Header onLogoClick={handleLogoClick} />

      <div className="pl-app-layout">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={sidebarCollapsed}
        />

        <main className={`pl-main-content ${sidebarCollapsed ? 'pl-main-content--collapsed' : ''} ${sectionClass}`}>
          <div className="pl-page-enter" key={location.pathname}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/career" element={<CareerAnalysisPage />} />
              <Route path="/career/recommend" element={<CareerRecommendPage />} />
              <Route path="/career/compare" element={<CareerComparePage />} />
              <Route path="/study" element={<StudyProfilePage />} />
              <Route path="/study/universities" element={<UniversityFinderPage />} />
              <Route path="/study/scholarships" element={<ScholarshipPage />} />
              <Route path="/study/countries" element={<CountryStrategyPage />} />
              <Route path="/global" element={<GlobalOpportunityPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}