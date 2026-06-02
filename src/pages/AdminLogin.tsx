import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const isSupabaseConfigured = Boolean(supabase);

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Admin login is unavailable.');
      return;
    }

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      setSuccess('Login successful! Redirecting to admin dashboard...');
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <section className="min-h-screen py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10">
        <div className="max-w-4xl mx-auto rounded-3xl border border-lead/20 bg-midnight-slate/80 p-10 shadow-2xl text-center">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#5266eb] mb-4">Admin Login Disabled</p>
          <h1 className="font-display text-4xl text-starlight mb-4">Supabase is not configured</h1>
          <p className="font-sans text-sm text-silver leading-relaxed mb-6">
            Admin authentication requires Supabase environment variables to be configured.
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
      className="min-h-screen py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10 flex items-center justify-center"
    >
      <div className="w-full max-w-md">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#5266eb] hover:text-starlight transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Site
        </a>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-midnight-slate/95 border border-lead/20 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl"
        >
          <div className="space-y-2 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#5266eb]/10 rounded-lg">
                <Lock className="w-5 h-5 text-[#5266eb]" />
              </div>
              <h1 className="font-display text-2xl md:text-3xl text-starlight">Admin Access</h1>
            </div>
            <p className="font-sans text-sm text-silver leading-relaxed">
              Sign in with your Supabase admin account to manage testimonials and site content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-lead flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                disabled={authLoading}
                className="w-full bg-graphite border border-lead/20 text-starlight text-sm rounded-2xl px-4 py-3 outline-none focus:border-[#5266eb] disabled:opacity-50 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-lead flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={authLoading}
                className="w-full bg-graphite border border-lead/20 text-starlight text-sm rounded-2xl px-4 py-3 outline-none focus:border-[#5266eb] disabled:opacity-50 transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-2xl bg-red-500/10 border border-red-500/20 p-3"
              >
                <p className="text-red-300 text-xs font-mono">{error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-3"
              >
                <p className="text-emerald-300 text-xs font-mono">{success}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.25em] px-6 py-3 rounded-full bg-[#5266eb] text-starlight transition-all duration-300 hover:bg-[#5266eb]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? (
                <>
                  <div className="h-3 w-3 rounded-full border-2 border-starlight/20 border-t-starlight animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 pt-6 border-t border-lead/10">
            <p className="text-[10px] font-mono uppercase tracking-wider text-lead/60 mb-3">Info</p>
            <ul className="space-y-2 text-[11px] text-silver/80 leading-relaxed">
              <li>• Use your Supabase admin email and password</li>
              <li>• Session persists across page refreshes</li>
              <li>• Your session will remain active until you sign out</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
