import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Compass, Award, Star, Globe, ShieldCheck, Cpu } from 'lucide-react';
import heroImage from '../assets/images/hero_himalayas_1780318764999.png';

interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  tags: string[];
}

export default function Skills() {
  const skillsList: SkillCategory[] = [
    {
      title: 'Altitude Safety Engineering',
      icon: 'ShieldCheck',
      description: 'Expert planning of physiological adaptation curves, high-altitude medical kits, active atmospheric oxygen management, and satellite transceiver configurations.',
      tags: ['Physiological Acclimatization', 'Altitude Illness Mitigation', 'Garmin InReach Tracking', 'UHF/VHF Radio Systems']
    },
    {
      title: 'Alpine Logistical Planning',
      icon: 'Compass',
      description: 'Engineering flight corridors under variable wind, custom private helicopter payloads, and back-to-back porterage coordination across deep wilderness pathways.',
      tags: ['Helicopter Route Charting', 'High-Altitude Manifests', 'Portage Crew Operations', 'Fuel Logistics']
    },
    {
      title: 'Curated Luxury Resourcing',
      icon: 'Award',
      description: 'Managing premium direct accounts with elite global chains, securing priority room allocations, and preparing private-chef culinary menu parameters.',
      tags: ['Aman Resorts Contracts', 'Dwarika’s Heritage Access', 'Custom Dietary Curation', 'Airport VIP Expeditions']
    },
    {
      title: 'Intercultural Diplomacy & Permits',
      icon: 'Globe',
      description: 'Bilingual negotiations with national park directors, Sherpa welfare coordination, and private monastery clearances for hidden archival access.',
      tags: ['Sagarmatha Permit Brokerage', 'Sherpa Welfare Compliance', 'Monastic Archival Walks', 'Tibetan/Bardy Dialogue']
    }
  ];

  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10"
    >
      <motion.img
        src={heroImage}
        alt="Mountain panorama background"
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover opacity-24 blur-sm"
        initial={{ y: 18, opacity: 0.18, scale: 1.04 }}
        whileInView={{ y: 0, opacity: 0.32, scale: 1.0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.9, ease: 'easeOut' }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#171721]/86 via-[#171721]/72 to-[#171721]/96" />
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5266eb] block mb-3">
            TECHNICAL & OPERATIONAL SKILLS
          </span>
          <h2 className="font-display font-medium text-4xl md:text-5xl text-starlight tracking-tight mb-5 leading-tight">
            My Area of Expertise
          </h2>
          <p className="font-sans text-silver text-sm md:text-base font-light leading-relaxed">
            I combine specialized technical security protocols, deep localized partnerships, and premium service curation to replace conventional travel templates with true structural safety.
          </p>
        </div>

        {/* Grid bento layout for skill blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsList.map((skill, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-midnight-slate border border-lead/20 hover:border-[#5266eb]/50 rounded-2xl p-8 relative overflow-hidden group transition-all duration-300"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5266eb]/5 rounded-full blur-3xl group-hover:bg-[#5266eb]/10 transition-all duration-300" />
                
                {/* Render corresponding icon */}
                <div className="w-11 h-11 bg-graphite rounded-xl border border-lead/20 text-[#5266eb] flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#5266eb]/10">
                  {skill.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                  {skill.icon === 'Compass' && <Compass className="w-5 h-5" />}
                  {skill.icon === 'Award' && <Award className="w-5 h-5" />}
                  {skill.icon === 'Globe' && <Globe className="w-5 h-5" />}
                </div>

                <h3 className="font-display font-medium text-lg md:text-xl text-starlight mb-3 group-hover:text-[#5266eb]/90 transition-colors">
                  {skill.title}
                </h3>

                <p className="font-sans text-xs md:text-sm text-silver font-light leading-relaxed mb-6">
                  {skill.description}
                </p>

                {/* Sub-tags details */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-lead/10">
                  {skill.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="font-mono text-[9px] uppercase tracking-wider text-lead bg-graphite/60 border border-lead/15 px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
