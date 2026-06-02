import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { FileText, Download, Printer, Eye, EyeOff, CheckCircle, ExternalLink } from 'lucide-react';
import heroImage from '../assets/images/hero_himalayas_1780318764999.png';

export default function Resume() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const triggerPdfDownload = () => {
    const resumeTextContent = `SANSKAR SHRESTHA
Independent Advisor & Expedition Curator
Kathmandu, Nepal | sanskarshr@gmail.com | +977 98031 21612

=======================================================
SUMMARY
=======================================================
Independent alpine expedition curator and luxury lodge logistics advisor with over a decade of field mastery in the Nepal Himalayas. Expert in altitude safety engineering, bespoke itinerary design, private helicopter routing, and exclusive cultural permissions.

=======================================================
EXPERIENCE
=======================================================
1. Lead Private Expedition Curator
   Sanskar Shrestha Escapes | 2019 - Present
   * Handcrafted over 150+ custom high-altitude itineraries with zero safety incidents.
   * Locked in exclusive room tiers with luxury collections (Aman, Dwarika's, boutique estates).
   * Coordinated satellite communication routes and helicopter dispatch paths for private high-profile clients.

2. Senior Alpine Operations Coordinator
   Himalayan Ridge Logistical Partner Alliance | 2015 - 2019
   * Managed portage teams, shelter permits, and high-elevation logistics manifests.
   * Evaluated, vetted, and contracted over 60 elite certified Sherpa and Gurung field guides.
   * Set up redundant dual-network satellite transceivers in high-altitude dead zones.

3. Expedition Liaison & Field Guide Administrator
   Summit Wilderness Advisors | 2011 - 2015
   * Directed national park regulations clearances and environmental compliance.
   * Negotiated private monastery gateway clearance and sacred village entrances with Abbott Councils.

=======================================================
CORE COMPETENCIES & SKILLS
=======================================================
* Safety: Physiological acclimatization design, oxygen systems, Garmin InReach tracking, UHF radios
* Logistics: Helicopter load balancing, custom flight plans, private transfers, premium camps
* Curation: Aman Partnership, Dwarika's exclusive tiers, specialized travel diets, custom maps
* Cultural: Fluent in Nepali, Tibetan, English; direct contact with remote village keepers

=======================================================
EDUCATION & CERTIFICATIONS
=======================================================
* Wilderness First Responder (WFR) - Wilderness Medical Associates
* High-Altitude Alpine Rescue & Logistics Clearance - National Mountaineering Authority
* Cultural Heritage of the Himalayas Studies - Kathmandu Valley Institute
`;

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    const lineHeight = 16;
    const maxLineWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const lines = doc.splitTextToSize(resumeTextContent, maxLineWidth);
    let cursorY = margin;

    lines.forEach((line) => {
      if (cursorY > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    doc.save('Sanskar_Shrestha_CV.pdf');
  };

  const triggerPrint = () => {
    window.print();
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
      {/* Dynamic inline stylesheet to guarantee that the resume preview dominates the page when printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-cv-sheet, #printable-cv-sheet * {
            visibility: visible !important;
          }
          #printable-cv-sheet {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 2.5cm !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

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
              
              {/* Print Helper Strip */}
              <div className="bg-midnight-slate border border-[#5266eb]/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 text-left">
                  <Printer className="w-4 h-4 text-[#5266eb]" />
                  <div>
                    <p className="font-mono text-[10px] uppercase font-bold text-starlight">SYSTEM DIRECT PRINT INTERFACE</p>
                    <p className="font-sans text-[11px] text-silver font-light">Press print to export this A4 layout directly to PDF or paper.</p>
                  </div>
                </div>
                <button
                  onClick={triggerPrint}
                  className="bg-[#272735] hover:bg-[#5266eb] text-starlight hover:text-white border border-lead/30 hover:border-transparent text-[10px] font-mono uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Print / Export to PDF
                </button>
              </div>

              {/* The Paper A4 sheet layout structure container */}
              <div
                id="printable-cv-sheet"
                className="bg-white text-stone-900 rounded-lg p-10 md:p-16 shadow-2xl border border-stone-200 mx-auto max-w-[210mm] transition-all duration-300 text-left font-serif leading-relaxed pr-8 md:pr-16"
              >
                {/* Header/Letterhead */}
                <div className="border-b-2 border-stone-900 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div>
                    <h3 className="font-sans font-extrabold text-3xl tracking-wide uppercase text-stone-900">
                      Sanskar Shrestha
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#5266eb] font-bold mt-1.5">
                      Expedition Curator & High-Altitude Logistics Advisor
                    </p>
                  </div>
                  <div className="font-sans text-[11px] text-stone-600 space-y-1 text-left sm:text-right">
                    <p>Kathmandu, Nepal</p>
                    <p>sanskarshr@gmail.com</p>
                    <p>+977 98031 21612</p>
                  </div>
                </div>

                {/* Section: Professional Summary */}
                <div className="mb-8">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-3">
                    Professional Statement
                  </h4>
                  <p className="text-stone-700 text-sm leading-relaxed font-light font-serif">
                    Independent alpine expedition curator and expert logistics liaison born and operating in Kathmandu. Over a decade of field planning and risk reduction, securing absolute safety compliance and customized cultural and high-end sanctuary itineraries across Nepal, Tibet, and Bhutan.
                  </p>
                </div>

                {/* Section: Professional Experience */}
                <div className="mb-8">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-4">
                    Advisory & Field Experience
                  </h4>

                  <div className="space-y-6">
                    {/* Item 1 */}
                    <div>
                      <div className="flex justify-between items-start font-sans text-xs mb-1.5">
                        <div>
                          <strong className="text-stone-900 text-sm block font-serif font-bold">Lead Private Expedition Curator</strong>
                          <span className="text-stone-600">Sanskar Shrestha Escapes • Independent</span>
                        </div>
                        <span className="text-stone-500 font-medium">2019 — Present</span>
                      </div>
                      <ul className="list-disc pl-5 text-[13px] text-stone-700 space-y-1 font-serif font-light">
                        <li>Designs and refines day-by-day expedition layouts custom-molded to physical thresholds and elite aesthetic goals.</li>
                        <li>Maintains priority allocations with leading lodge partners including Aman Residences, Dwarika's, and mountain boutiques.</li>
                        <li>Organizes satellite radio assets and automated helicopter backup tracking corridors on high-risk tracks.</li>
                      </ul>
                    </div>

                    {/* Item 2 */}
                    <div>
                      <div className="flex justify-between items-start font-sans text-xs mb-1.5">
                        <div>
                          <strong className="text-stone-900 text-sm block font-serif font-bold">Senior Alpine Operations Coordinator</strong>
                          <span className="text-stone-600">Himalayan Ridge Logistical Partner Alliance</span>
                        </div>
                        <span className="text-stone-500 font-medium">2015 — 2019</span>
                      </div>
                      <ul className="list-disc pl-5 text-[13px] text-stone-700 space-y-1 font-serif font-light">
                        <li>Supervised and routed multi-generation family groups across highly challenging high-altitude terrain layers.</li>
                        <li>Vetted, certified, and managed over 60 elite Gurung and Sherpa guides with direct emergency drills.</li>
                        <li>Administered double-network communication channels across deep gorges and dead telemetry areas.</li>
                      </ul>
                    </div>

                    {/* Item 3 */}
                    <div>
                      <div className="flex justify-between items-start font-sans text-xs mb-1.5">
                        <div>
                          <strong className="text-stone-900 text-sm block font-serif font-bold">Expedition Liaison & Field Administrator</strong>
                          <span className="text-stone-600">Summit Wilderness Advisors</span>
                        </div>
                        <span className="text-stone-500 font-medium">2011 — 2015</span>
                      </div>
                      <ul className="list-disc pl-5 text-[13px] text-stone-700 space-y-1 font-serif font-light">
                        <li>Processed environmental permits and high-elevation park clearances under strict government regulations.</li>
                        <li>Coordinated respect protocols and gateway clearances with monastic communities across Everest valleys.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section: Competencies & Skills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-stone-200 pt-6">
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-stone-900 mb-2.5">
                      Technical Security & Safety
                    </h4>
                    <p className="text-[12px] text-stone-700 space-y-1 leading-relaxed font-serif font-light">
                      • Acclimatization design, clinical-grade oxygen setup<br />
                      • Garmin InReach, VHF/UHF, emergency logistics<br />
                      • High-Altitude wilderness medical response
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-stone-900 mb-2.5">
                      Cultural & Operational
                    </h4>
                    <p className="text-[12px] text-stone-700 space-y-1 leading-relaxed font-serif font-light">
                      • Fluent in English, Nepali, Tibetan, local dialects<br />
                      • Aman Resorts and Dwarika's booking liaison<br />
                      • Eco-sensitive adventure logistics standards
                    </p>
                  </div>
                </div>

                {/* Footer Signature */}
                <div className="border-t border-stone-300 pt-4 flex justify-between items-center text-[10px] font-sans text-stone-500">
                  <span>Certified Wilderness Medical Responder</span>
                  <span className="italic font-serif">Sanskar Shrestha • Kathmandu</span>
                </div>

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
