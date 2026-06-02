import React from 'react';
import { Compass, Mail, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="portfolio-footer"
      className="bg-deep-space text-silver font-sans text-xs border-t border-lead/20 py-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Outer bottom copyright strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-lead text-[11px] font-mono whitespace-nowrap">
          <div>
            © {currentYear} SANSKAR SHRESTHA. ALL RIGHTS SECURED.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#about" className="hover:text-starlight transition-colors">ABOUT</a>
            <a href="#experience" className="hover:text-starlight transition-colors">TIMELINE</a>
            <a href="#skills" className="hover:text-starlight transition-colors">SKILLS</a>
            <a href="#resume" className="hover:text-starlight transition-colors">CV</a>
            <a href="#contact" className="hover:text-starlight transition-colors">CONTACT</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
