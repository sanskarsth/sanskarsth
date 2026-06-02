import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <section className="min-h-screen py-24 md:py-32 px-6 md:px-12 bg-deep-space relative border-t border-lead/10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-4 border-lead/20 border-t-[#5266eb] animate-spin" />
          </div>
          <p className="mt-4 font-mono text-sm text-silver">Loading admin access...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
