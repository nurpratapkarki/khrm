import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import IndustriesPage from '@/pages/IndustriesPage';
import IndustryDetailPage from '@/pages/IndustryDetailPage';
import TrainingPage from '@/pages/TrainingPage';
import TrainingCourseDetailPage from '@/pages/TrainingCourseDetailPage';
import GalleryPage from '@/pages/GalleryPage';
import GalleryAlbumDetailPage from '@/pages/GalleryAlbumDetailPage';
import DocumentsPage from '@/pages/DocumentsPage';
import EmployerInquiryPage from '@/pages/EmployerInquiryPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import RecruitmentProcessPage from '@/pages/RecruitmentProcessPage';
import CSRPage from '@/pages/CSRPage';
import CSRDetailPage from '@/pages/CSRDetailPage';
import CareersPage from '@/pages/CareersPage';
import CareerDetailPage from '@/pages/CareerDetailPage';
import JapanLandingPage from '@/pages/JapanLandingPage';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobsPage from '@/pages/JobPages';
import JobDetailPage from '@/pages/JobDetails';
import JobApplicationPage from '@/pages/JobApplicationPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          <Routes>
	            <Route path="/" element={<HomePage />} />
	            <Route path="/japan" element={<JapanLandingPage />} />
            <Route path="/about" element={<AboutPage />} />
	            <Route path="/contact" element={<ContactPage />} />
	            <Route path="/industries" element={<IndustriesPage />} />
	            <Route path="/industries/:slug" element={<IndustryDetailPage />} />
	            <Route path="/training" element={<TrainingPage />} />
	            <Route path="/training/:slug" element={<TrainingCourseDetailPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:slug" element={<JobDetailPage />} />
	            <Route path="/jobs/:slug/apply" element={<JobApplicationPage />} />
	            <Route path="/gallery" element={<GalleryPage />} />
	            <Route path="/gallery/:slug" element={<GalleryAlbumDetailPage />} />
	            <Route path="/documents" element={<DocumentsPage />} />
	            <Route path="/employer-inquiry" element={<EmployerInquiryPage />} />
	            <Route path="/privacy" element={<PrivacyPolicyPage />} />
	            <Route path="/terms" element={<TermsOfServicePage />} />
		            <Route path="/csr" element={<CSRPage />} />
		            <Route path="/csr/:slug" element={<CSRDetailPage />} />
		            <Route path="/careers" element={<CareersPage />} />
		            <Route path="/careers/:slug" element={<CareerDetailPage />} />
	            <Route path="/recruitment-process" element={<RecruitmentProcessPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;