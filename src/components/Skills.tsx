import React from 'react';
import { motion } from 'motion/react';
import { Plane, Hotel, FileText, Users, Briefcase, Star } from 'lucide-react';
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
      title: 'International Flight Ticketing',
      icon: 'Plane',
      description: 'I book domestic and international flights across all major airlines, finding the best routes, connections, and prices for any destination worldwide.',
      tags: ['Domestic & International', 'Best Route Planning', 'Group Bookings', 'Last-Minute Reservations']
    },
    {
      title: 'Hotel & Accommodation Booking',
      icon: 'Hotel',
      description: 'I secure the best hotels, guesthouses, and serviced apartments — from budget stays to luxury properties — for tourists, business travelers, and relocating workers.',
      tags: ['Budget to Luxury', 'Corporate Rates', 'Long-Term Stays', 'Worldwide Coverage']
    },
    {
      title: 'Visa Assistance & Documentation',
      icon: 'FileText',
      description: 'I guide travelers and job seekers through visa requirements, help prepare applications, and ensure documents meet embassy standards for smooth approval.',
      tags: ['Tourist Visas', 'Business Visas', 'Employment Visas', 'Student Visas']
    },
    {
      title: 'Overseas Manpower Recruitment',
      icon: 'Users',
      description: 'I connect Nepali job seekers with employers in the Middle East, Malaysia, Europe, and beyond — handling the full recruitment and placement process.',
      tags: ['Middle East', 'Malaysia', 'Europe', 'Licensed Agency']
    },
    {
      title: 'Complete Travel & Relocation',
      icon: 'Briefcase',
      description: 'From flights, hotels, and visas to job placement and pre-departure support — I handle every detail so you don\'t have to worry about a thing.',
      tags: ['End-to-End Service', 'Pre-Departure Orientation', '24/7 Support', 'Stress-Free Relocation']
    },
    {
      title: 'Corporate & Group Travel',
      icon: 'Star',
      description: 'I coordinate seamless travel logistics for corporate clients, tour groups, and families — including hotel blocks, group flights, and visa processing for everyone.',
      tags: ['Corporate Accounts', 'Group Discounts', 'Family Travel', 'Event Coordination']
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
            MY PROFESSIONAL SERVICES
          </span>
          <h2 className="font-display font-medium text-4xl md:text-5xl text-starlight tracking-tight mb-5 leading-tight">
            My Area of Expertise
          </h2>
          <p className="font-sans text-silver text-sm md:text-base font-light leading-relaxed">
            I provide complete travel, visa, and recruitment solutions — from flight ticketing and hotel booking to overseas manpower placement — all under one roof at Harvest Moon Group.
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
                  {skill.icon === 'Plane' && <Plane className="w-5 h-5" />}
                  {skill.icon === 'Hotel' && <Hotel className="w-5 h-5" />}
                  {skill.icon === 'FileText' && <FileText className="w-5 h-5" />}
                  {skill.icon === 'Users' && <Users className="w-5 h-5" />}
                  {skill.icon === 'Briefcase' && <Briefcase className="w-5 h-5" />}
                  {skill.icon === 'Star' && <Star className="w-5 h-5" />}
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
