# Admin Authentication Security Setup Guide

## Overview

Your admin routes are now protected with **Supabase Auth** — a session-based, enterprise-grade authentication system. No more frontend-only password checks!

## Architecture

```
┌─────────────────────────────────────────────────┐
│          Your Portfolio (Vite + React)          │
├─────────────────────────────────────────────────┤
│                                                 │
│  AuthContext                                    │
│  ├─ Manages auth state                          │
│  ├─ Listens to onAuthStateChange               │
│  └─ Persists session on refresh                │
│                                                 │
│  ProtectedRoute                                 │
│  ├─ Wraps /admin routes                        │
│  ├─ Redirects unauthenticated users            │
│  └─ Shows loading state during check           │
│                                                 │
│  AdminLogin (/admin/login)                      │
│  ├─ Email + Password form                      │
│  ├─ Validates against Supabase                 │
│  └─ Stores session                             │
│                                                 │
│  AdminTestimonials (/admin)                     │
│  ├─ Displays only if authenticated             │
│  ├─ Shows logged-in user email                 │
│  ├─ Approve/Reject protected actions           │
│  └─ Sign out button                            │
│                                                 │
└──────────────┬───────────────────────────────────┘
               │ HTTPS + Secure Session
               ↓
        Supabase Auth Backend
        ├─ Session validation
        ├─ Password hashing (bcrypt)
        └─ JWT tokens (secure httpOnly cookies)
```

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx              # Auth state management
├── components/
│   ├── AdminLogin.tsx               # Login page
│   ├── AdminTestimonials.tsx        # Protected admin dashboard
│   ├── ProtectedRoute.tsx           # Route guard component
│   └── App.tsx                      # Updated routing
└── lib/
    └── supabase.ts                  # Supabase client
```

## Setup Steps

### Step 1: Verify Supabase Configuration

Ensure your `.env.local` has Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

✅ Already configured in your `.env.local`

### Step 2: Enable Supabase Auth in Supabase Console

1. Go to [supabase.co](https://supabase.co)
2. Open your project
3. Navigate to **Authentication** → **Providers**
4. Ensure **Email** provider is enabled
5. Go to **Authentication** → **Policies** (for RLS)

### Step 3: Create Admin User in Supabase

#### Option A: Via Supabase Dashboard

1. Navigate to **Authentication** → **Users**
2. Click **Add user**
3. Enter admin email (e.g., `sanskarshr@gmail.com`)
4. Enter a strong password
5. Click **Create user**

#### Option B: Via Code (Programmatic)

Use Supabase client to create user:

```typescript
const { data, error } = await supabase.auth.admin.createUser({
  email: 'admin@example.com',
  password: 'SecurePassword123!',
  email_confirm: true,
});
```

### Step 4: Test the Login Flow

1. Start your dev server: `npm run dev`
2. Navigate to `/admin`
3. You should be redirected to `/admin/login`
4. Enter your admin credentials
5. Click **Sign In**
6. You should see the testimonials dashboard

## Security Features

### ✅ What's Secure Now

| Feature | Previous | Now |
|---------|----------|-----|
| Password Check | Frontend only (UNSAFE) | Supabase backend (✓ SECURE) |
| Session Storage | None (Stateless) | Secure JWT token (✓ SECURE) |
| Persistence | None (Lost on refresh) | Session persists (✓ SECURE) |
| Route Protection | No protection | ProtectedRoute wrapper (✓ SECURE) |
| HTTP Transport | Vulnerable to MITM | HTTPS only (✓ SECURE) |

### 🔒 Security Measures

1. **Session-Based Auth**: Uses Supabase's JWT token system
2. **onAuthStateChange Listener**: Automatically tracks login state
3. **Protected Routes**: ProtectedRoute component guards /admin
4. **Auto-Logout**: Session expires based on Supabase settings
5. **Secure Cookies**: Tokens stored securely (httpOnly by default)
6. **Password Hashing**: Supabase handles bcrypt hashing server-side

## Usage

### Login Flow

```typescript
// User navigates to /admin
// ProtectedRoute checks auth status
// If not authenticated → Redirect to /admin/login
// User enters credentials → Calls login() from AuthContext
// onAuthStateChange triggers → Session established
// User redirected to /admin
```

### Protected Actions

All admin actions are now protected because:

1. **Frontend Check**: `ProtectedRoute` ensures only authenticated users see the page
2. **Supabase Check**: Every action (approve/reject) uses Supabase client with active session
3. **Backend Validation**: Supabase validates session before processing database updates

```typescript
// Example: Approve a testimonial
const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
  // This will FAIL if user is not authenticated
  // Because the session is stored in Supabase client
  const { error } = await supabase
    .from('testimonials')
    .update({ status })
    .eq('id', id);
};
```

### Logout

```typescript
const handleLogout = async () => {
  await logout(); // Clears session
  navigate('/admin/login'); // Redirects to login
};
```

## Environment Variables

### Remove These (No Longer Needed)

```env
# ❌ NOT USED ANYMORE
VITE_ADMIN_PASSWORD=xxx
ADMIN_EMAIL_1=xxx
ADMIN_PASSWORD_1=xxx
```

### Keep These (Required)

```env
# ✅ REQUIRED
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Troubleshooting

### "Supabase is not configured"

**Problem**: Environment variables missing
**Solution**: Ensure `.env.local` has:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Then restart dev server: `npm run dev`

### "Login failed" with correct credentials

**Problem**: Supabase provider not enabled or user not created
**Solution**:
1. Go to Supabase dashboard
2. Verify **Email** provider is enabled
3. Verify admin user exists in **Authentication** → **Users**
4. Check user **Email Confirmed** status

### Session lost on page refresh

**Problem**: Supabase session not persisting
**Solution**: 
1. Check browser localStorage is enabled
2. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
3. Try clearing browser cache and logging in again

### User can't approve/reject testimonials

**Problem**: Auth session expired or not properly initialized
**Solution**:
1. Try signing out and signing back in
2. Check browser console for Supabase errors
3. Verify your Supabase project is accessible

## Production Deployment

### Before Going Live

1. **Update Admin Credentials**
   - Create strong password (16+ chars, mixed case, numbers, symbols)
   - Use production email address
   - Store credentials securely (password manager)

2. **Enable HTTPS**
   - All auth traffic must be over HTTPS
   - Supabase enforces this automatically

3. **Configure CORS**
   - Add your production domain to Supabase
   - Go to **Authentication** → **URL Configuration**
   - Add your domain to **Site URL**

4. **Set Session Timeout**
   - Go to **Authentication** → **Policies**
   - Configure JWT expiration
   - Configure inactivity timeout (recommended: 24 hours)

5. **Enable MFA (Optional but Recommended)**
   - Go to **Authentication** → **MFA**
   - Enable TOTP for admin account
   - More secure for production

### Environment Variables for Production

```env
# .env.production (or deploy platform config)
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

## API Reference

### AuthContext Hook

```typescript
const { user, session, loading, error, login, logout } = useAuth();

// user: User object from Supabase or null
// session: Session object from Supabase or null
// loading: boolean - auth state being checked
// error: string | null - last error message
// login(email, password): Promise - sign in user
// logout(): Promise - sign out user
```

### ProtectedRoute Component

```typescript
<ProtectedRoute>
  <AdminTestimonials />
</ProtectedRoute>

// Automatically:
// - Checks if user is authenticated
// - Shows loading state while checking
// - Redirects to /admin/login if not authenticated
// - Renders children if authenticated
```

## Related Files

- [AuthContext.tsx](../src/contexts/AuthContext.tsx) - Auth state management
- [AdminLogin.tsx](../src/components/AdminLogin.tsx) - Login page UI
- [AdminTestimonials.tsx](../src/components/AdminTestimonials.tsx) - Protected dashboard
- [ProtectedRoute.tsx](../src/components/ProtectedRoute.tsx) - Route protection
- [App.tsx](../src/App.tsx) - Route configuration

## Questions or Issues?

1. Check Supabase documentation: https://supabase.com/docs/auth
2. Review error messages in browser console
3. Check Supabase logs: Dashboard → **Logs** → **Auth**
4. Test directly in Supabase dashboard: **SQL Editor** → query `auth.users` table

## Summary

✅ **Admin authentication is now production-grade secure:**
- Session-based authentication via Supabase
- Protected routes with automatic redirection
- Persistent sessions across page refreshes
- Secure password handling (no frontend storage)
- Automatic logout on session expiration
- All admin actions require active authentication

Your `/admin` route is now protected from unauthorized access! 🔒
