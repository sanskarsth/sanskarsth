import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, Eye, EyeOff, CheckCircle, ExternalLink } from 'lucide-react';
import heroImage from '../assets/images/hero_himalayas_1780318764999.png';
import resumePdf from '../assets/cv/SanskarShresthaResume.pdf';

export default function Resume() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resumePdfUrl = resumePdf;
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(navigator.userAgent);

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdfUrl;
    link.download = 'Sanskar_Shrestha_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="resume"
      className="py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10"
    >
      <motion.img
        src={heroImage}
        alt="Mountain panorama background"
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover opacity-22 blur-sm"
        initial={{ y: 22, opacity: 0.16, scale: 1.04 }}
        whileInView={{ y: 0, opacity: 0.34, scale: 1.0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.7, ease: 'easeOut' }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#171721]/88 via-[#171721]/75 to-[#171721]/97" />

      <div className="max-w-4xl mx-auto">
        
        {/* Editorial Heading */}
        <div className="text-center md:text-left md:flex justify-between items-end mb-16">
          <div className="max-w-lg">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5266eb] block mb-3">
              ACADEMIC & FIELD CREDENTIALS
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-starlight tracking-tight leading-none mb-5">
              Professional CV
            </h2>
            <p className="font-sans text-silver text-sm font-light leading-relaxed">
              Access my fully compiled curriculum vitae. Below, you can toggle the print-ready on-screen preview to inspect my mountaineering metrics and download direct files.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8 md:mt-0">
            <button
              onClick={triggerPdfDownload}
              className="inline-flex items-center space-x-2 bg-graphite hover:bg-[#272735] border border-lead hover:border-starlight text-starlight text-xs font-mono uppercase tracking-wider px-5 py-3 rounded-full transition-all duration-300 cursor-pointer"
              title="Download resume as PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#5266eb]" />
              <span>Download CV (PDF)</span>
            </button>

            <button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="inline-flex items-center space-x-2 bg-[#5266eb] hover:bg-[#5266eb]/90 border border-transparent text-starlight text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-md cursor-pointer"
            >
              {isPreviewOpen ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Layout</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Interactive Preview</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live On-Screen Preview Area */}
        <AnimatePresence>
          {isPreviewOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="space-y-6"
            >
              
              {/* The Paper A4 sheet layout structure container */}
              <div id="printable-cv-sheet" className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xl mx-auto max-w-full">
                {isMobile ? (
                  <div className="p-10 text-center">
                    <p className="text-sm text-stone-700 mb-6">
                      Mobile browsers often do not render embedded PDF previews inline. Tap below to view the exact CV in your PDF viewer.
                    </p>
                    <a
                      href={resumePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-[#5266eb] px-6 py-3 text-sm font-mono uppercase tracking-[0.25em] text-starlight transition-all duration-300 hover:bg-[#4057d6]"
                    >
                      Open CV in PDF Viewer
                    </a>
                  </div>
                ) : (
                  <iframe
                    title="Resume Preview"
                    src={resumePdfUrl}
                    className="w-full min-h-[1100px] border-0"
                  />
                )}
              </div>

            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-midnight-slate border border-lead/20 rounded-2xl p-8 text-center"
            >
              <FileText className="w-12 h-12 text-[#5266eb]/30 mx-auto mb-4" />
              <p className="font-sans text-silver text-sm font-light mb-4 leading-relaxed">
                The print-preview layout shows a high-fidelity white A4 paper sheet styling preloaded with clean margins and print-media instructions suitable for instant browser-saving to PDF.
              </p>
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="bg-graphite hover:bg-[#5266eb] border border-lead hover:border-transparent text-starlight hover:text-white text-xs font-mono uppercase tracking-widest py-3 px-6 rounded-full transition-colors cursor-pointer"
              >
                Inspect Print Preview
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
