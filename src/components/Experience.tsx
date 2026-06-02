import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';

interface CareerMilestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  badge: string;
  description: string;
  achievements: string[];
}

export default function Experience() {
  const milestones: CareerMilestone[] = [
    {
      period: '2019 — PRESENT',
      role: 'Lead Private Expedition Curator & Independent Advisor',
      organization: 'Sanskar Shrestha Escapes',
      location: 'Kathmandu, Nepal (Global Partners)',
      badge: 'Current Practice',
      description: 'Handcrafting bespoke luxury itineraries, altitude physical-prep programs, and high-altitude logistics systems for private families and high-profile teams.',
      achievements: [
        'Curated 150+ ultra-custom high-altitude routes with zero altitude safety incidents.',
        'Established direct partnership agreements with luxury chains (Aman, Dwarika’s, elite boutique estates).',
        'Coordinated private helicopter rescue backup corridors across the entire Everest, Annapurna, and Mustang territory limits.'
      ]
    },
    {
      period: '2015 — 2019',
      role: 'Senior Alpine Operations Coordinator',
      organization: 'Himalayan Ridge Logistical Partner Alliance',
      location: 'Sagarmatha Region & Pokhara, Nepal',
      badge: 'Logistical Leadership',
      description: 'Engineered physical high-elevation transport rosters, mountain porter supply networks, and real-time contingency routing programs.',
      achievements: [
        'Led remote safety dispatch for multi-generational group itineraries ranging from 4 to 18 active travelers.',
        'Sourced, audited, and trained over 60 certified elite high-altitude Gurung and Sherpa field guides.',
        'Implemented dual-network satellite monitoring tracking to guarantee redundant contact in dead zones.'
      ]
    },
    {
      period: '2011 — 2015',
      role: 'Expedition Liaison & Field Guide Administrator',
      organization: 'Summit Wilderness Advisors',
      location: 'Annapurna & Langtang Ranges, Nepal',
      badge: 'Field Expertise',
      description: 'Directed regulatory national-park permit clearances, helicopter dispatch, and direct cultural liaisons with local monastery communities.',
      achievements: [
        'Organized the physical transport and medical safety logs for corporate and academic leadership retreats.',
        'Negotiated unique gateway entries and monastery blessing protocols directly with senior Buddhist Abbott Councils.',
        'Maintained strict environmental conservation footprints and fair-wage policy rules across local staff tiers.'
      ]
    },
    {
      period: '2007 — 2011',
      role: 'Heritage Walk Planner & Cultural Interpreter',
      organization: 'Kathmandu Valley Explorer Collectives',
      location: 'Bhaktapur & Patan, Nepal',
      badge: 'Cultural Roots',
      description: 'Designed custom educational heritage circuits, traditional craftsman masterclass routines, and private spiritual reflection schedules.',
      achievements: [
        'Built a vetted catalog of local historians, architectural restoration artists, and family-owned woodcarving elders.',
        'Pioneered small-scale cultural preservation travel routes returning direct resources to indigenous families.'
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section
      id="experience"
      className="py-24 md:py-32 px-6 md:px-12 bg-midnight-slate/40 relative border-t border-lead/10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5266eb] block mb-3">
              MY ADVOCACY TIMELINE
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-starlight tracking-tight leading-none">
              Professional Journey
            </h2>
          </div>
          <p className="font-sans text-silver text-sm font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Over a decade of orchestrating highly sophisticated high-altitude logistics, direct regional partnerships, and luxury private designs in the world’s most demanding terrains.
          </p>
        </div>

        {/* Layout: Interactive tabbed cards for desktop, linear timeline for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Timeline Navigation Sidebar */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 space-x-4 lg:space-x-0 lg:space-y-3 border-b lg:border-b-0 lg:border-l border-lead/10 scrollbar-none">
            {milestones.map((item, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-shrink-0 text-left px-5 py-4 rounded-xl lg:rounded-none lg:rounded-r-xl border lg:border-none transition-all duration-300 flex items-center space-x-4 cursor-pointer focus:outline-none select-none ${
                    isSelected
                      ? 'bg-[#5266eb]/10 border-[#5266eb]/50 text-[#5266eb] lg:border-l-2 lg:border-[#5266eb]'
                      : 'bg-transparent border-lead/10 text-silver hover:bg-[#272735]/30'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 hidden sm:block ${isSelected ? 'text-[#5266eb]' : 'text-lead'}`} />
                  <div>
                    <span className="block font-mono text-[9px] tracking-wider uppercase opacity-80">
                      {item.period}
                    </span>
                    <span className="block font-display text-xs md:text-sm font-medium mt-0.5 tracking-tight group-hover:text-starlight">
                      {item.organization}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Display Panel with Motion Animations */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-midnight-slate border border-lead/20 rounded-2xl p-8 md:p-10 relative overflow-hidden"
            >
              {/* Corner Watermark Card */}
              <div className="absolute top-6 right-6 font-mono text-[9px] uppercase tracking-widest bg-[#5266eb]/15 text-[#5266eb] px-3 py-1 rounded-full font-semibold border border-[#5266eb]/35">
                {milestones[activeTab].badge}
              </div>

              {/* Role details */}
              <div className="space-y-4 mb-8">
                <span className="inline-flex items-center space-x-2 text-silver text-xs font-mono">
                  <Calendar className="w-3.5 h-3.5 text-lead" />
                  <span>{milestones[activeTab].period}</span>
                </span>
                
                <h3 className="font-display font-medium text-2xl text-starlight tracking-tight leading-tight">
                  {milestones[activeTab].role}
                </h3>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-sans text-silver/80">
                  <span className="font-semibold text-starlight">{milestones[activeTab].organization}</span>
                  <span className="text-lead/50 font-mono">•</span>
                  <span className="inline-flex items-center space-x-1.5">
                    <MapPin className="w-3 h-3 text-lead" />
                    <span>{milestones[activeTab].location}</span>
                  </span>
                </div>
              </div>

              {/* Section Description */}
              <p className="font-sans text-silver font-light text-sm md:text-base leading-relaxed mb-8 border-b border-lead/10 pb-6">
                {milestones[activeTab].description}
              </p>

              {/* Bullet Accomplishments */}
              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#5266eb] mb-4">
                  REPRESENTATIVE DELIVERABLES
                </h4>
                <ul className="space-y-3.5">
                  {milestones[activeTab].achievements.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-3 text-xs md:text-sm font-sans text-silver/90 leading-relaxed font-light">
                      <CheckCircle className="w-3.5 h-3.5 text-[#5266eb] mt-1 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
