# Admin Auth Code Reference

## 📝 Complete Code Examples

---

## AuthContext Hook Usage

### In Any Component
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, session, loading, error, login, logout } = useAuth();

  if (loading) return <div>Checking auth...</div>;

  if (!user) {
    return (
      <button onClick={() => login('email@example.com', 'password')}>
        Log In
      </button>
    );
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
}
```

---

## Protected Route Setup

### In App.tsx
```typescript
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminLogin from './components/AdminLogin';
import AdminTestimonials from './components/AdminTestimonials';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        {/* Auth routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminTestimonials />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
```

---

## Login Form Implementation

### AdminLogin.tsx
```typescript
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      // Error is set in AuthContext
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

---

## Protected Route Component

### ProtectedRoute.tsx
```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading admin access...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
```

---

## AuthContext Implementation

### contexts/AuthContext.tsx
```typescript
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Auth init error:', err);
        setError('Failed to initialize auth');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setError(null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not configured');

    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setSession(data.session);
      setUser(data.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!supabase) throw new Error('Supabase not configured');

    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setSession(null);
      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

---

## Protected Database Operations

### Example: Approve/Reject Testimonials
```typescript
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function AdminTestimonials() {
  const { user } = useAuth(); // Get authenticated user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // This operation automatically uses the authenticated session
  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setLoading(true);
    setError('');

    try {
      // Supabase automatically validates the session
      // If user is not authenticated, this will fail with 401
      const { error } = await supabase
        .from('testimonials')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      console.log(`Testimonial ${status}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Logged in as: {user?.email}</p>
      <button
        onClick={() => updateStatus('123', 'approved')}
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Approve'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

---

## Checking Auth State

### Component Examples

#### Check if user is logged in
```typescript
const { user, loading } = useAuth();

if (loading) return <div>Checking...</div>;
return user ? <p>Logged in</p> : <p>Not logged in</p>;
```

#### Show user info
```typescript
const { user, session } = useAuth();

return (
  <div>
    <p>Email: {user?.email}</p>
    <p>ID: {user?.id}</p>
    <p>Last sign in: {session?.user?.last_sign_in_at}</p>
  </div>
);
```

#### Conditional rendering
```typescript
const { user } = useAuth();

return (
  <div>
    {user ? (
      <button onClick={() => logout()}>Sign Out</button>
    ) : (
      <button onClick={() => navigate('/admin/login')}>Sign In</button>
    )}
  </div>
);
```

---

## Error Handling

### Complete Error Handling Pattern
```typescript
const { login, error } = useAuth();

const handleLogin = async (email: string, password: string) => {
  try {
    await login(email, password);
    // Success - user is logged in
    navigate('/admin');
  } catch (err) {
    // Error is available in useAuth().error
    if (err instanceof Error) {
      if (err.message.includes('Invalid login credentials')) {
        showError('Wrong email or password');
      } else if (err.message.includes('Email not confirmed')) {
        showError('Please confirm your email');
      } else {
        showError(err.message);
      }
    }
  }
};
```

---

## Session Management

### Check Session Status
```typescript
import { useAuth } from '../contexts/AuthContext';

function SessionStatus() {
  const { session, user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!session) {
    return <p>No active session</p>;
  }

  return (
    <div>
      <p>Session active</p>
      <p>User: {user?.email}</p>
      <p>Expires: {session.expires_at}</p>
    </div>
  );
}
```

### Auto Logout on Session Expiration
```typescript
useEffect(() => {
  if (session?.expires_at) {
    const expiresAt = session.expires_at * 1000; // Convert to ms
    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;

    const timeout = setTimeout(() => {
      logout();
      navigate('/admin/login');
    }, timeUntilExpiry);

    return () => clearTimeout(timeout);
  }
}, [session]);
```

---

## Real-time Updates with Session

### Listen to Database Changes (Only for Authenticated Users)
```typescript
useEffect(() => {
  if (!user) return; // Only subscribe if authenticated

  const channel = supabase
    .channel('testimonials-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'testimonials' },
      (payload) => {
        console.log('Change received:', payload);
        // Handle change
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user]); // Re-subscribe when user changes
```

---

## Deployment Example (Next.js/Vercel)

### Environment Variables for Production
```
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### Pre-deployment Checklist
```
✓ Created admin user in production Supabase
✓ Strong password set (16+ chars)
✓ Email verified
✓ CORS configured in Supabase
✓ Session timeout configured
✓ Tested login/logout in production
✓ HTTPS enforced
```

---

## Common Patterns

### Pattern 1: Require Auth for Page
```typescript
function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
}
```

### Pattern 2: Redirect If Logged In
```typescript
function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user]);

  return <AdminLogin />;
}
```

### Pattern 3: Show Different UI Based on Auth
```typescript
function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <div>
          <span>{user.email}</span>
          <button onClick={() => logout()}>Sign Out</button>
        </div>
      ) : (
        <Link to="/admin/login">Sign In</Link>
      )}
    </header>
  );
}
```

---

## Testing Auth

### Unit Test Example
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminLogin from './AdminLogin';
import { AuthProvider } from '../contexts/AuthContext';

describe('AdminLogin', () => {
  it('logs in user with valid credentials', async () => {
    render(
      <AuthProvider>
        <AdminLogin />
      </AuthProvider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Redirecting to admin...')).toBeInTheDocument();
    });
  });
});
```

---

## That's It!

These code examples cover:
✅ Using AuthContext in components
✅ Protecting routes
✅ Login/logout flows
✅ Protected database operations
✅ Error handling
✅ Session management
✅ Real-time updates
✅ Common patterns
✅ Testing

Refer back to this file for quick code snippets! 📚
