import React from 'react';
import { motion } from 'motion/react';
import { Mail, PhoneCall, Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5266eb] block mb-3">
            DIRECT LIAISON
          </span>
          <h2 className="font-display font-medium text-4xl md:text-6xl text-starlight tracking-tight leading-[1.1] mb-6">
            Get in touch directly.
          </h2>
          <p className="font-sans text-silver text-sm md:text-base font-light leading-relaxed">
            I personally design and refine every single detail from scratch. Skip the corporate intermediaries and reach out to me directly on my private channels.
          </p>
        </div>

        {/* Centered Symmetric Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Panel: Direct Philosophy Quote Box */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-midnight-slate to-[#1a1a25] border border-lead/15 rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <span className="absolute top-2 right-4 text-8xl font-serif text-[#5266eb]/10 select-none">“</span>
            
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#5266eb] block mb-6">
                MY PHILOSOPHY
              </span>
              <p className="font-sans text-sm md:text-base text-silver italic leading-relaxed font-light mb-8">
                “True adventure is a slow, respectful dialogue between you and the great peaks. I believe every itinerary should respect your personal space, safety limits, and physical timeline. No corporate templates, no rush.”
              </p>
            </div>

            <div className="flex items-center space-x-3 border-t border-lead/10 pt-6">
              <div className="w-8 h-px bg-lead/30" />
              <span className="font-display text-xs text-starlight uppercase tracking-widest font-semibold">
                Sanskar Shrestha
              </span>
            </div>
          </motion.div>

          {/* Right Panel: Clean Direct Access Protocols */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-midnight-slate border border-lead/20 rounded-2xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#5266eb] block mb-6">
                SECURE CONDUITS
              </span>
              <h3 className="font-display font-medium text-starlight text-xl mb-8 tracking-tight">
                My Direct Protocols
              </h3>
              
              <div className="space-y-6">
                
                {/* Email Direct link */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-graphite rounded-full border border-lead/20 text-[#5266eb] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-lead">
                      PERSONAL EMAIL
                    </span>
                    <a
                      id="direct-email-anchor"
                      href="mailto:sanskarshr@gmail.com"
                      className="block font-sans text-sm md:text-base font-medium text-starlight hover:text-[#5266eb] mt-0.5 transition-colors break-all"
                    >
                      sanskarshr@gmail.com
                    </a>
                  </div>
                </div>

                {/* Direct Whatsapp and Viber */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-graphite rounded-full border border-lead/20 text-[#5266eb] flex-shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-lead">
                      VIBER • WHATSAPP • CELLULAR
                    </span>
                    <a
                      id="direct-phone-anchor"
                      href="https://wa.me/9779803121612"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-sans text-sm md:text-base font-medium text-starlight hover:text-[#5266eb] mt-0.5 transition-colors"
                    >
                      +977 98031 21612
                    </a>
                    
                    {/* Action links */}
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-silver/60 mt-1.5">
                      <a 
                        href="https://wa.me/9779803121612" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#5266eb] hover:underline"
                      >
                        WhatsApp
                      </a>
                      <span>•</span>
                      <a 
                        href="viber://chat?number=%2B9779803121612" 
                        className="hover:text-[#5266eb] hover:underline"
                      >
                        Viber Direct
                      </a>
                      <span>•</span>
                      <a 
                        href="tel:+9779803121612" 
                        className="hover:text-[#5266eb] hover:underline"
                      >
                        Cellular Call
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Networks footer alignment */}
            <div className="pt-8 border-t border-lead/10 mt-8 flex items-center justify-between">
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-lead">
                  SOCIAL ARCHIVES
                </span>
                <span className="text-[10px] font-sans text-silver/50 font-light block mt-0.5">
                  Follow my daily Himalayan visual feeds
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <a
                  id="direct-fb-anchor"
                  href="https://www.facebook.com/sanskarmessi.shrestha?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-graphite/60 hover:bg-[#5266eb] text-silver hover:text-white border border-lead/20 hover:border-[#5266eb] rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  id="direct-insta-anchor"
                  href="https://www.instagram.com/sanskarshrestha__?igsh=cjIxMTBzYWNhcjU="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-graphite/60 hover:bg-[#5266eb] text-silver hover:text-white border border-lead/20 hover:border-[#5266eb] rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  id="direct-linkedin-anchor"
                  href="https://www.linkedin.com/in/sanskar-shrestha-075918293/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-graphite/60 hover:bg-[#5266eb] text-silver hover:text-white border border-lead/20 hover:border-[#5266eb] rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
