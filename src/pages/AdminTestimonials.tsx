import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, CheckCircle, XCircle, LogOut, ShieldAlert } from 'lucide-react';
import { formatDateTime } from '../utils/formatters';

const isSupabaseConfigured = Boolean(supabase);

interface TestimonialRecord {
  id: string;
  name: string;
  email?: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}


export default function AdminTestimonials() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setTestimonials(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    loadData();

    const channel = supabase
      .channel('admin-testimonials')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'testimonials',
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      setError('Failed to logout');
      setIsLoggingOut(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured.');
      return;
    }

    setLoading(true);
    setError('');
    const { error } = await supabase
      .from('testimonials')
      .update({ status })
      .eq('id', id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(`Testimonial ${status === 'approved' ? 'approved' : 'rejected'} successfully.`);
      await loadData();
      setTimeout(() => setSuccess(''), 2500);
    }

    setLoading(false);
  };

  const filteredTestimonials = testimonials.filter((testimonial) => testimonial.status === statusFilter);
  const counts = {
    pending: testimonials.filter((testimonial) => testimonial.status === 'pending').length,
    approved: testimonials.filter((testimonial) => testimonial.status === 'approved').length,
    rejected: testimonials.filter((testimonial) => testimonial.status === 'rejected').length,
  };

  if (!isSupabaseConfigured) {
    return (
      <section className="min-h-screen py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10">
        <div className="max-w-4xl mx-auto rounded-3xl border border-lead/20 bg-midnight-slate/80 p-10 shadow-2xl text-center">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#5266eb] mb-4">Admin Preview Disabled</p>
          <h1 className="font-display text-4xl text-starlight mb-4">Supabase is not configured</h1>
          <p className="font-sans text-sm text-silver leading-relaxed mb-6">
            The admin testimonial dashboard requires Supabase environment variables to be configured.
            Add <code className="bg-white/5 px-2 py-1 rounded text-[11px]">VITE_SUPABASE_URL</code> and <code className="bg-white/5 px-2 py-1 rounded text-[11px]">VITE_SUPABASE_ANON_KEY</code>, then restart the dev server.
          </p>
          <a href="/" className="inline-flex items-center justify-center rounded-full bg-[#5266eb] px-6 py-3 text-xs uppercase tracking-[0.25em] text-starlight transition-all duration-300 hover:bg-[#5266eb]/90">
            Back to Portfolio
          </a>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5266eb] block mb-3">
              ADMINISTRATOR CONTROL
            </span>
            <h1 className="font-display font-medium text-4xl md:text-5xl text-starlight tracking-tight leading-tight">
              Testimonials Dashboard
            </h1>
            <p className="font-sans text-silver text-sm md:text-base font-light leading-relaxed max-w-2xl mt-3">
              Manage all visitor testimonials directly from the frontend. Approve, reject, and watch approved entries appear instantly on the public site.
            </p>
            {user && (
              <p className="font-sans text-xs text-lead/60 mt-3 font-mono">
                Logged in as: {user.email}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#5266eb] hover:text-starlight transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Site
            </a>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] px-4 py-2 rounded-full bg-red-500/10 text-red-300 hover:bg-red-500/15 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-midnight-slate border border-lead/20 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#5266eb] mb-2">Status overview</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-2 rounded-2xl bg-[#5266eb]/10 text-[#5266eb] text-[11px] font-mono">Pending: {counts.pending}</span>
                  <span className="px-3 py-2 rounded-2xl bg-emerald-500/10 text-emerald-300 text-[11px] font-mono">Approved: {counts.approved}</span>
                  <span className="px-3 py-2 rounded-2xl bg-red-500/10 text-red-300 text-[11px] font-mono">Rejected: {counts.rejected}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {(['pending', 'approved', 'rejected'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-mono transition-all duration-300 ${
                      statusFilter === filter
                        ? 'bg-[#5266eb] text-starlight'
                        : 'bg-graphite border border-lead/20 text-silver hover:bg-[#5266eb]/20'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse rounded-3xl bg-graphite/80 h-48" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {error && (
                <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-red-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-emerald-200">
                  {success}
                </div>
              )}

              {!filteredTestimonials.length ? (
                <div className="rounded-3xl border border-dashed border-lead/20 bg-graphite/70 p-10 text-center text-silver">
                  <ShieldAlert className="mx-auto mb-4 w-10 h-10 text-[#5266eb]/70" />
                  <p className="text-sm">No {statusFilter} testimonials available right now.</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {filteredTestimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="bg-midnight-slate/95 border border-lead/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <p className="font-display text-lg text-starlight leading-tight mb-2">{testimonial.name}</p>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5266eb]/80">{formatDateTime(testimonial.created_at)}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full border border-lead/20 bg-[#5266eb]/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#5266eb] font-mono">
                          {testimonial.status}
                        </span>
                      </div>

                      <p className="font-sans text-sm text-silver leading-relaxed mb-4">{testimonial.message}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-lead">
                        <span>{testimonial.email ?? 'No email provided'}</span>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {testimonial.status !== 'approved' && (
                          <button
                            onClick={() => updateStatus(testimonial.id, 'approved')}
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-emerald-500/15"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approve
                          </button>
                        )}
                        {testimonial.status !== 'rejected' && (
                          <button
                            onClick={() => updateStatus(testimonial.id, 'rejected')}
                            className="inline-flex items-center gap-2 rounded-full bg-red-500/10 text-red-300 px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-red-500/15"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
