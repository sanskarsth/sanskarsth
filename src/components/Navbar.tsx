import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Resume', id: 'resume' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Header Container bar */}
      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'pt-3 md:pt-4 px-4 md:px-8' 
            : 'pt-6 px-6 md:px-12'
        }`}
      >
        <div
          id="navbar-inner-wrapper"
          className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out rounded-2xl ${
            isScrolled
              ? 'bg-midnight-slate/85 border border-[#70707d]/20 py-3.5 px-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              : 'bg-transparent py-4 px-0 border border-transparent'
          } flex justify-between items-center`}
        >
          {/* Brand Logo */}
          <button
            id="nav-logo"
            onClick={() => handleItemClick('about')}
            className="text-left focus:outline-none group cursor-pointer"
          >
            <div className="font-display font-semibold tracking-[0.2em] text-starlight text-sm sm:text-base leading-none group-hover:text-[#5266eb] transition-colors">
              SANSKAR SHRESTHA
            </div>
          </button>

          {/* Desktop Navigation Links with Framer Motion Sliding Indicator */}
          <div className="hidden md:flex items-center space-x-8 pr-2">
            {navItems.map((item) => {
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className="relative py-2 font-mono text-[10px] tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer focus:outline-none select-none flex flex-col items-center"
                >
                  <span className={`transition-colors duration-300 ${
                    isSelected ? 'text-[#5266eb] font-bold' : 'text-silver hover:text-starlight'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Sliding Indicator Pill under the text */}
                  {isSelected && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 w-1 h-1 bg-[#5266eb] rounded-full shadow-[0_0_6px_#5266eb]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>



          {/* Mobile Navigation Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-starlight focus:outline-none p-2 bg-[#272735]/40 rounded-full border border-[#70707d]/20 hover:border-starlight transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation-panel"
              initial={{ opacity: 0, scale: 0.95, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-full left-4 right-4 mt-2 bg-midnight-slate/95 border border-[#70707d]/20 p-6 rounded-2xl flex flex-col space-y-4 md:hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            >
              {navItems.map((item, index) => {
                const isSelected = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleItemClick(item.id)}
                    className={`font-mono text-left text-xs tracking-widest uppercase font-medium py-2.5 transition-all flex items-center justify-between border-b border-[#70707d]/10 ${
                      isSelected ? 'text-[#5266eb] font-bold pl-2' : 'text-silver'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] text-[#5266eb]/40 font-light">0{index + 1}</span>
                  </motion.button>
                );
              })}
              
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
