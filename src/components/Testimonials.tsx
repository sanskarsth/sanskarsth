import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../data';
import { Star, Send, Mail, Sparkles, Loader2 } from 'lucide-react';
import { sanitizeText, formatDate } from '../utils/formatters';

interface TestimonialRecord {
  id: string;
  name: string;
  email?: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}


export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);

      if (!supabase) {
        setTestimonials(
          DEFAULT_TESTIMONIALS.slice(0, 4).map((item) => ({
            id: item.id,
            name: item.author,
            email: '',
            message: item.text,
            status: 'approved' as const,
            created_at: new Date().toISOString(),
          }))
        );
        setLoading(false);
        setSuccessMessage('Supabase is not configured. Showing preview testimonials only.');
        window.setTimeout(() => setSuccessMessage(''), 4000);
        return;
      }

      const { data, error } = await supabase
        .from('testimonials')
        .select('id,name,email,message,created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setTestimonials(data ?? []);
      }
      setLoading(false);
    };

    loadTestimonials();

    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel('public:testimonials')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'testimonials',
          filter: 'status=eq.approved',
        },
        (payload) => {
          const record = payload.new as TestimonialRecord;
          setTestimonials((current) => [record, ...current]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'testimonials',
          filter: 'status=eq.approved',
        },
        (payload) => {
          const record = payload.new as TestimonialRecord;
          setTestimonials((current) => {
            const index = current.findIndex((item) => item.id === record.id);
            if (index === -1) {
              return [record, ...current];
            }
            const updated = [...current];
            updated[index] = record;
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const handleChange = (field: 'name' | 'email' | 'message') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [field]: event.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formState.name.trim() || !formState.message.trim()) {
      setErrorMessage('Name and a message are required.');
      return;
    }

    if (!supabase) {
      setErrorMessage('Supabase is not configured. Testimonial submission is unavailable in preview.');
      setSubmitting(false);
      return;
    }

    setSubmitting(true);

    const payload = {
      name: sanitizeText(formState.name, 100),
      email: sanitizeText(formState.email, 254),
      message: sanitizeText(formState.message, 1200),
      status: 'pending',
    };

    const { data, error } = await supabase.from('testimonials').insert(payload);

    if (error) {
      setErrorMessage(error.message);
      setSubmitting(false);
      return;
    }

    // TODO: Re-enable email notification once the Supabase Edge Function is deployed.
    if (supabase.functions) {
      try {
        await supabase.functions.invoke('send-testimonial-notification', {
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            message: payload.message,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        // swallow email failures to avoid breaking testimonial submission.
      }
    }

    setFormState({ name: '', email: '', message: '' });
    setSuccessMessage('Thanks! Your testimonial is under review.');
    setSubmitting(false);
    window.setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5266eb] block mb-3">
              Testimonials & Feedback
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-starlight tracking-tight leading-tight">
              Hear from people who have trusted my expeditions.
            </h2>
            <p className="font-sans text-silver text-sm md:text-base leading-relaxed max-w-2xl mt-4">
              Real testimonials are fetched from Supabase in realtime. When a testimonial is approved, it appears instantly — no page reload required.
            </p>
          </div>

          <div className="text-silver text-sm max-w-xl">
            Read approved testimonials from past clients and share your feedback using the form on the right.
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-10">
          <div className="space-y-8">
            <div className="rounded-3xl border border-lead/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5266eb] mb-2">Latest Approved Testimonials</p>
                  <h3 className="font-display text-2xl text-starlight">Live team voices</h3>
                </div>
                <div className="rounded-full bg-[#5266eb]/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] font-mono text-[#5266eb] border border-[#5266eb]/20">
                  {loading ? 'Loading…' : `${testimonials.length} approved`}
                </div>
              </div>

              {loading ? (
                <div className="grid gap-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="rounded-3xl border border-lead/10 bg-graphite/70 p-6 animate-pulse h-48" />
                  ))}
                </div>
              ) : testimonials.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-lead/10 bg-graphite/70 p-10 text-center text-silver">
                  <Sparkles className="mx-auto mb-4 w-10 h-10 text-[#5266eb]/70" />
                  <p className="text-sm">No approved testimonials are available yet. New submissions will appear here once approved.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  <AnimatePresence mode="popLayout">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
                      >
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div>
                            <p className="font-display text-lg text-starlight mb-1">{testimonial.name}</p>
                            <p className="font-sans text-xs text-silver uppercase tracking-[0.22em]">{formatDate(testimonial.created_at)}</p>
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#5266eb]/20 bg-[#5266eb]/10 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-[#5266eb] font-mono">
                            <Mail className="w-3.5 h-3.5" />
                            {testimonial.email ?? 'Email hidden'}
                          </div>
                        </div>

                        <p className="font-sans text-sm text-silver leading-relaxed mt-6">{testimonial.message}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {errorMessage && (
                <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-lead/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#5266eb]/10 text-[#5266eb]">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5266eb] mb-2">Submit Your Review</p>
                  <h3 className="font-display text-2xl text-starlight">Share a testimonial</h3>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-lead">Full name</label>
                  <input
                    value={formState.name}
                    onChange={handleChange('name')}
                    className="w-full rounded-3xl border border-lead/20 bg-graphite/75 px-4 py-3 text-sm text-starlight outline-none focus:border-[#5266eb]"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-lead">Email (optional)</label>
                  <input
                    value={formState.email}
                    onChange={handleChange('email')}
                    className="w-full rounded-3xl border border-lead/20 bg-graphite/75 px-4 py-3 text-sm text-starlight outline-none focus:border-[#5266eb]"
                    placeholder="name@example.com"
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-lead">Message</label>
                  <textarea
                    value={formState.message}
                    onChange={handleChange('message')}
                    className="w-full min-h-[170px] rounded-3xl border border-lead/20 bg-graphite/75 px-4 py-4 text-sm text-starlight outline-none focus:border-[#5266eb] resize-none"
                    placeholder="Tell us how the logistics, safety, and service performed..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#5266eb] px-6 py-3 text-xs font-mono uppercase tracking-[0.3em] text-starlight transition-all duration-300 hover:bg-[#5266eb]/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Send Testimonial'
                  )}
                </button>
              </form>

              {successMessage && (
                <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mt-6 rounded-3xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
                  {errorMessage}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-lead/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
              <p className="font-sans text-sm text-silver leading-relaxed">
                Submitted testimonials are reviewed by the site administrator. Approved testimonials publish instantly on the public testimonials section without refresh.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
