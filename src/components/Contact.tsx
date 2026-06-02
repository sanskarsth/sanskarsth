import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, PhoneCall, Instagram, Facebook, Linkedin, Copy, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [copiedText, setCopiedText] = useState('');
  const email = 'sanskarshr@gmail.com';
  const phone = '+977 98031 21612';
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(navigator.userAgent);

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedText(`${label} copied`);
      window.setTimeout(() => setCopiedText(''), 2500);
    } catch {
      setCopiedText(`Unable to copy ${label.toLowerCase()}`);
      window.setTimeout(() => setCopiedText(''), 2500);
    }
  };

  const handleEmailClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`, '_blank');
    }
  };

  const handlePhoneClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isMobile) {
      window.location.href = `https://wa.me/${phone.replace(/[^\d+]/g, '')}`;
    } else {
      copyToClipboard(phone, 'Phone number');
    }
  };

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
                “Atithi Devo Bhava — अतिथिदेवो भव (The guest is equivalent to God). This ancient Sanskrit principle guides everything I do. Whether you're traveling for leisure, business, or seeking work abroad, I treat every client with the same respect, care, and dedication. No rushed service, no hidden fees, no corporate indifference. Just honest, personalized support from someone who believes you deserve nothing less than family-level treatment.”
              </p>
            </div>

            <div className="flex items-center space-x-3 border-t border-lead/10 pt-6">
              <div className="w-8 h-px bg-lead/30" />
              <span className="font-display text-xs text-starlight uppercase tracking-widest font-semibold">
                — Sanskar Shrestha, Harvest Moon Group
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
                  <div className="w-full">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-lead">
                      PERSONAL EMAIL
                    </span>
                    <div className="mt-0.5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleEmailClick}
                        className="font-sans text-sm md:text-base font-medium text-starlight hover:text-[#5266eb] transition-colors"
                      >
                        {email}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(email, 'Email')}
                        className="inline-flex items-center gap-2 rounded-full border border-lead/20 bg-graphite/80 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-silver hover:bg-[#5266eb]/10 hover:text-[#5266eb] transition-all duration-200"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* Direct Whatsapp and Viber */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-graphite rounded-full border border-lead/20 text-[#5266eb] flex-shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="w-full">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-lead">
                      VIBER • WHATSAPP • CELLULAR
                    </span>
                    <div className="mt-0.5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handlePhoneClick}
                        className="font-sans text-sm md:text-base font-medium text-starlight hover:text-[#5266eb] transition-colors"
                      >
                        {phone}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(phone, 'Phone number')}
                        className="inline-flex items-center gap-2 rounded-full border border-lead/20 bg-graphite/80 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-silver hover:bg-[#5266eb]/10 hover:text-[#5266eb] transition-all duration-200"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy Number
                      </button>
                    </div>

                    {/* Action links */}
                    <div className="flex items-center flex-wrap gap-3 text-[10px] font-mono text-silver/60 mt-1.5">
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
              {copiedText ? (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#5266eb]/10 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.28em] text-[#5266eb]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {copiedText}
                </div>
              ) : null}
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
