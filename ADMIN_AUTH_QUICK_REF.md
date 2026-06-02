# Admin Auth Quick Reference

## 🚀 Quick Start (5 mins)

### 1. Enable Email Auth
Supabase → Authentication → Providers → Email (enable)

### 2. Create Admin User
Supabase → Authentication → Users → Add user
- Email: `sanskarshr@gmail.com`
- Password: Strong password
- Auto confirm: ✓

### 3. Test It
```bash
npm run dev
# Visit http://localhost:3000/admin
# You should see login form
# Enter credentials from step 2
# Click Sign In
```

---

## 📂 New Files

| File | Purpose |
|------|---------|
| `src/contexts/AuthContext.tsx` | Global auth state & hooks |
| `src/components/AdminLogin.tsx` | Login page UI |
| `src/components/ProtectedRoute.tsx` | Route protection wrapper |
| `SECURITY_SETUP.md` | Detailed setup guide |
| `ADMIN_AUTH_CHECKLIST.md` | Implementation checklist |
| `ADMIN_AUTH_SUMMARY.md` | Complete summary |

---

## 🔄 Auth Flow

```
/admin
  ↓
ProtectedRoute checks user
  ↓
User? → YES → Show Dashboard
User? → NO → Redirect /admin/login
  ↓
Login Form
  ↓
Enter email + password
  ↓
Send to Supabase
  ↓
Valid? → YES → Create session, redirect /admin
Valid? → NO → Show error
```

---

## 🧩 Using Auth in Components

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, session, loading, error, login, logout } = useAuth();

  // Check if user is logged in
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
}
```

---

## 🛡️ Protecting Routes

```typescript
import { ProtectedRoute } from '../components/ProtectedRoute';

<Routes>
  {/* Public route */}
  <Route path="/" element={<Home />} />

  {/* Protected route */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminTestimonials />
      </ProtectedRoute>
    }
  />

  {/* Login route */}
  <Route path="/admin/login" element={<AdminLogin />} />
</Routes>
```

---

## 🔑 Environment Variables

### Keep These (Required)
```env
VITE_SUPABASE_URL=https://uwwbvlzefhcrrpwafaqc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Remove These (No Longer Used)
```env
# ❌ DELETE THESE
VITE_ADMIN_PASSWORD=xxx
ADMIN_EMAIL_1=xxx
ADMIN_PASSWORD_1=xxx
```

---

## 📋 Testing Checklist

- [ ] Can visit `/admin` and see login page
- [ ] Can enter credentials and log in
- [ ] Redirected to admin dashboard
- [ ] User email displayed
- [ ] Session persists on page refresh
- [ ] Can approve/reject testimonials
- [ ] Sign Out button works
- [ ] After logout, /admin redirects to /admin/login

---

## 🐛 Common Issues

| Issue | Fix |
|-------|-----|
| "Supabase not configured" | Check .env.local has VITE_SUPABASE_URL |
| "Login failed" | Verify user exists in Supabase → Users |
| Session lost on refresh | Clear cache, enable localStorage |
| Can't approve testimonials | Try logging out and back in |

---

## 💾 Session Storage

Supabase automatically handles session storage:
- ✅ Tokens in secure httpOnly cookies
- ✅ Cannot be accessed by JavaScript
- ✅ Automatically sent with requests
- ✅ Persists across page refreshes
- ✅ Expires after timeout

---

## 🔐 What's Secure Now

✅ Password validation on Supabase backend
✅ Session-based authentication
✅ HTTPS-only transmission
✅ Secure token storage
✅ Automatic session expiration
✅ Protected routes with ProtectedRoute
✅ All admin actions require active session

---

## 📖 Full Documentation

- [SECURITY_SETUP.md](./SECURITY_SETUP.md) - Complete setup guide
- [ADMIN_AUTH_CHECKLIST.md](./ADMIN_AUTH_CHECKLIST.md) - Checklist & testing
- [ADMIN_AUTH_SUMMARY.md](./ADMIN_AUTH_SUMMARY.md) - Full technical summary

---

## 🎯 Key Files

### AuthContext (Global State)
```
src/contexts/AuthContext.tsx (116 lines)
- Manages user, session, loading, error
- Provides useAuth() hook
- Listens to onAuthStateChange
```

### Login Page
```
src/components/AdminLogin.tsx (176 lines)
- Email + Password form
- Beautiful UI
- Error/Success messages
- Redirects on success
```

### Route Protection
```
src/components/ProtectedRoute.tsx (32 lines)
- Wraps protected components
- Redirects if not authenticated
- Shows loading state
```

### Protected Dashboard
```
src/components/AdminTestimonials.tsx (306 lines)
- Uses Supabase session
- Shows logged-in user
- Approve/Reject protected by session
- Sign Out button
```

---

## 🚀 Production Deployment

Before going live:

1. ✅ Create admin user in production Supabase
2. ✅ Use strong password (16+ chars)
3. ✅ Enable HTTPS (automatic with Supabase)
4. ✅ Update CORS in Supabase settings
5. ✅ Test login/logout flow
6. ✅ (Optional) Enable MFA

---

## 📞 Quick Help

**Q: How do I create an admin user?**
A: Supabase → Authentication → Users → Add user

**Q: Where's the admin password stored?**
A: No password stored! Uses Supabase Auth backend.

**Q: Will users stay logged in?**
A: Yes! Session persists across refreshes automatically.

**Q: Can I add more admins?**
A: Yes! Create more users in Supabase → Users

**Q: How do I log out?**
A: Click "Sign Out" button on admin dashboard

**Q: What if I forget the admin password?**
A: Use Supabase dashboard → Users → Reset password

---

## That's It! 🎉

Your admin routes are now **secure and production-ready**. 

Start by creating an admin user in Supabase, then test the login flow!

Questions? See [SECURITY_SETUP.md](./SECURITY_SETUP.md) 🔒
