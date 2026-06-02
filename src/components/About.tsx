import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Map, ShieldCheck, Compass, CompassIcon } from 'lucide-react';
import signatureImage from '../assets/images/sanskar_headshot_1780321692821.png';
import heroImage from '../assets/images/hero_himalayas_1780318764999.png';

interface AboutProps {
  onPlanJourney: () => void;
}

export default function About({ onPlanJourney }: AboutProps) {
  const expertiseList = [
    {
      title: 'International Flight Ticketing',
      description: 'I book domestic and international flights across all major airlines, finding the best routes, connections, and prices for your destination.',
      metric: 'Global Coverage'
    },
    {
      title: 'Hotel & Accommodation Booking',
      description: 'I secure the best hotels, guesthouses, and serviced apartments — from budget stays to luxury properties — for tourists and business travelers.',
      metric: 'Best Rates'
    },
    {
      title: 'Visa Assistance & Documentation',
      description: 'I guide travelers and job seekers through visa requirements, help prepare applications, and ensure documents meet embassy standards.',
      metric: 'Visa Success'
    },
    {
      title: 'Overseas Manpower Recruitment',
      description: 'I connect Nepali job seekers with employers in the Middle East, Malaysia, Europe, and beyond — handling the full recruitment and placement process.',
      metric: 'Licensed Agency'
    },
    {
      title: 'Complete Travel & Relocation',
      description: 'From flights, hotels, and visas to job placement and pre-departure support — I handle every detail so you don\'t have to worry about a thing.',
      metric: 'End-to-End'
    }
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-20 px-4 md:px-10 bg-deep-space relative overflow-hidden"
    >
      <motion.img
        src={heroImage}
        alt="Mountain panorama background"
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover opacity-25 blur-sm"
        initial={{ y: -20, opacity: 0.2, scale: 1.05 }}
        whileInView={{ y: 0, opacity: 0.36, scale: 1.0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#171721]/85 via-[#171721]/70 to-[#171721]/95" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column - Photography Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Outer border mimicking a high-end travel catalog container framing */}
              <div className="absolute -inset-4 border border-lead/20 rounded-2xl pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-xl border border-lead bg-midnight-slate"
              >
                <img
                  src={signatureImage}
                  alt="Sanskar Shrestha - Travel & Recruitment Specialist at Harvest Moon Group"
                  className="w-full h-[420px] md:h-[480px] min-h-[320px] object-cover object-top filter grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-deep-space via-deep-space/80 to-transparent">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#5266eb] mb-1">
                    Sanskar Shrestha
                  </div>
                  <div className="font-sans font-medium text-starlight text-sm">
                    Travel & Recruitment Specialist | Harvest Moon Group
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column - Editorial Information */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5266eb] block mb-3">
                YOUR TRAVEL & RECRUITMENT PARTNER
              </span>
              
              <h2 className="font-display font-medium text-3xl md:text-5xl text-starlight tracking-tight leading-tight mb-4">
                Meet Sanskar Shrestha
              </h2>
              
              <p className="font-sans text-silver text-base md:text-lg leading-relaxed font-light mb-6 font-serif italic text-starlight">
                “Based in Kathmandu, I work with Harvest Moon Group of Companies as your complete travel and recruitment partner. I handle international flight ticketing, hotel bookings, visa processing, and overseas manpower recruitment — all under one roof. Whether you're planning a vacation, need accommodation, or helping a Nepali job seeker find work in the Middle East, Malaysia, or Europe, I manage the flights, the paperwork, the hotels, and everything in between. My job is to make international movement simple, reliable, and stress-free.”
              </p>

              {/* Custom Expertise Checklist */}
              <div className="space-y-5 mb-8">
                {expertiseList.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 bg-[#272735]/60 rounded-full flex items-center justify-center border border-lead/20 group-hover:border-[#5266eb] transition-colors">
                        <CheckCircle2 className="w-3 h-3 text-[#5266eb]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-display font-medium text-starlight text-sm md:text-base group-hover:text-[#5266eb] transition-colors">
                          {item.title}
                        </h4>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-lead bg-[#272735] px-2 py-0.5 rounded">
                          {item.metric}
                        </span>
                      </div>
                      <p className="font-sans text-xs md:text-sm text-silver mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action */}
              <div>
                <button
                  id="about-cta"
                  onClick={onPlanJourney}
                  className="bg-graphite hover:bg-[#5266eb] border border-lead/50 hover:border-[#5266eb] text-starlight hover:text-white px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
                >
                  Start Your Journey With Me →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
