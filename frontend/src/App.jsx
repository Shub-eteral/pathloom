/* App.jsx — slim application shell with routing */
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

        <main className={`pl-main-content ${sidebarCollapsed ? 'pl-main-content--collapsed' : ''}`}>
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
          <Footer />
        </main>
      </div>
    </div>
  );
}