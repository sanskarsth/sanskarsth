import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useActiveSection } from './hooks/useActiveSection';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminTestimonials from './pages/AdminTestimonials';

export default function App() {
  const location = useLocation();
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const activeSection = useActiveSection();

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-deep-space text-starlight antialiased font-sans flex flex-col selection:bg-[#5266eb]/30 selection:text-starlight">
        <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

        <main className="flex-grow pt-24">
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <>
                    <About onPlanJourney={() => scrollToSection('contact')} />
                    <Experience />
                    <Skills />
                    <Testimonials />
                    <Resume />
                    <Contact />
                  </>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminTestimonials />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer onNavigate={scrollToSection} />
      </div>
    </AuthProvider>
  );
}

