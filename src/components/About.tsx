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
      title: 'My Custom Itinerary Design',
      description: 'I manually hand-shape every day of your itinerary around your physical capabilities, time scale, and aesthetic rhythm.',
      metric: '100% Curated'
    },
    {
      title: 'Elite Adventure Engineering',
      description: 'I coordinate high-altitude tracks with my trusted, certified Sherpas, premium medical kits, and direct sat-com links.',
      metric: 'My Elite Team'
    },
    {
      title: 'Curated Luxury Resourcing',
      description: 'I lock in rare boutique rooms, direct custom helicopter travel, and VIP reception protocols at brand leaders like Aman.',
      metric: 'Insider Access'
    },
    {
      title: 'True Intercultural Exchange',
      description: 'I arrange private monastery blessings, ancient library walks, and fireside talks with historians and village elders.',
      metric: 'Native Roots'
    },
    {
      title: 'My Private Group Logistics',
      description: 'I engineer seamless multi-track movements so that family groups or executive boards can travel seamlessly together.',
      metric: 'Flawless Flow'
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
                  alt="Sanskar Shrestha - Your Expedition Advisor & Curator"
                  className="w-full h-[420px] md:h-[480px] min-h-[320px] object-cover object-top filter grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-deep-space via-deep-space/80 to-transparent">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#5266eb] mb-1">
                    Sanskar Shrestha
                  </div>
                  <div className="font-sans font-medium text-starlight text-sm">
                    Expedition Advisor & Curator
                  </div>
                </div>
              </motion.div>

              {/* Minimalist overlay details box */}
              <div className="absolute -bottom-6 -right-6 bg-midnight-slate border border-lead p-5 rounded-lg max-w-[200px] hidden sm:block">
                <span className="block font-display text-2xl font-bold text-starlight mb-0.5">Nepal Expert</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-silver">
                  Born & Based in Nepal
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Editorial Information */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5266eb] block mb-3">
                THE ADVISOR
              </span>
              
              <h2 className="font-display font-medium text-3xl md:text-5xl text-starlight tracking-tight leading-tight mb-4">
                Meet Sanskar Shrestha
              </h2>
              
              <p className="font-sans text-silver text-base md:text-lg leading-relaxed font-light mb-6 font-serif italic text-starlight">
                “As an independent travel advisor and expedition curator, I believe that exploring the peaks of the giant mountains has to be a slow, safe, and deeply personal dialogue. Growing up in Nepal, I learned early on that the magic is never found in high-volume, commercialized agency packages. Instead, it lives in unique, meticulously planned retreats, elite safety logistics, and direct cultural access.”
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
                  Reach Out Directly
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
