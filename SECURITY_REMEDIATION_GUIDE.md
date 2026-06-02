# SECURITY REMEDIATION IMPLEMENTATION GUIDE

## Overview
This guide provides step-by-step instructions to remediate all critical and high-risk vulnerabilities identified in the security audit.

---

## CRITICAL FIXES (Must implement first)

### CRITICAL-1: Remove Hardcoded Credentials

**Status:** ⚠️ REQUIRES BACKEND SETUP
**Priority:** HIGHEST

#### What's Wrong:
Credentials hardcoded in frontend: `'sanskar'`, `'sanskar_secure_2026'`, `'bige.stha@gmail.com'`, `'sanskarshr@gmail.com'`

#### How to Fix:

**Step 1: Create Backend Authentication Service**

```typescript
// backend/routes/auth.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Hardcode securely (in production: use database + environment variables)
const ADMIN_USERS = [
  {
    email: process.env.ADMIN_EMAIL_1 || 'admin@example.com',
    passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD_1 || 'change-me', 10),
  },
];

// Verify login endpoint
router.post('/verify', loginLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const user = ADMIN_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      // Log failed attempt (security event)
      console.log(`[SECURITY] Failed login attempt for: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token with short expiry
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '15m' } // 15 minute expiry
    );

    // Set secure cookie
    res.cookie('authToken', token, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS only
      sameSite: 'strict', // CSRF protection
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({ token, expiresIn: 900 });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
```

**Step 2: Update Environment Variables**

```bash
# .env (NEVER commit this file)
ADMIN_EMAIL_1="bige.stha@gmail.com"
ADMIN_PASSWORD_1="change-to-strong-password"
JWT_SECRET="your-jwt-secret-key"
SESSION_SECRET="your-session-secret-key"
```

**Step 3: Update .gitignore**

```bash
# .gitignore
.env
.env.local
.env.*.local
dist/
node_modules/
*.log
```

**Step 4: Update Frontend**

Use the `TestimonialsSecure.tsx` component which:
- Removes hardcoded credentials
- Calls backend API for authentication
- Uses session tokens instead
- Implements rate limiting
- Logs security events

---

### CRITICAL-2: Unencrypted Data in localStorage

**Status:** NEEDS FIX
**Priority:** CRITICAL

#### What's Wrong:
Sensitive user data stored unencrypted in localStorage:
```javascript
localStorage.setItem('sansk_pending_testimonials', JSON.stringify(data))
```

#### How to Fix:

**Option A: Move to SessionStorage (Frontend)**
```typescript
// Use sessionStorage instead (cleared on browser close)
sessionStorage.setItem('session_token', token); // expires on close
```

**Option B: Move to Backend Database (Recommended)**
```typescript
// Store in encrypted database, retrieve via API
const fetchTestimonials = async () => {
  const response = await fetch('/api/testimonials', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('session_token')}`,
    },
  });
  return response.json();
};
```

**Option C: Use Encryption Library (If must use localStorage)**
```typescript
import crypto from 'crypto-js';

const encryptData = (data: any, key: string) => {
  return crypto.AES.encrypt(JSON.stringify(data), key).toString();
};

const decryptData = (encrypted: string, key: string) => {
  const bytes = crypto.AES.decrypt(encrypted, key);
  return JSON.parse(bytes.toString(crypto.enc.Utf8));
};

// Usage
const encrypted = encryptData(testimonials, process.env.REACT_APP_ENCRYPTION_KEY);
localStorage.setItem('testimonials', encrypted);
```

---

### CRITICAL-3: Missing CSP Headers

**Status:** NEEDS CONFIG
**Priority:** CRITICAL

#### How to Fix:

**For Express Backend:**
```typescript
import helmet from 'helmet';

app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", 'data:', 'https:'],
    connectSrc: ["'self'"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
}));
```

**For index.html:**
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  script-src 'self';
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self';
  object-src 'none';
  frame-src 'none';
  upgrade-insecure-requests;
">
```

---

### CRITICAL-4: No HTTPS/HSTS

**Status:** REQUIRES DEPLOYMENT CONFIG
**Priority:** CRITICAL

#### How to Fix:

**Add HSTS Header:**
```typescript
app.use(helmet.hsts({
  maxAge: 31536000, // 1 year in seconds
  includeSubDomains: true,
  preload: true,
}));
```

**Deploy with HTTPS:**
- Use Let's Encrypt (free SSL certificates)
- Configure on Vercel, Netlify, or cloud provider
- Redirect all HTTP to HTTPS

```typescript
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

---

### CRITICAL-5: Input Validation & XSS

**Status:** PARTIALLY FIXED
**Priority:** CRITICAL

#### How to Fix:

**Install DOMPurify:**
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

**Update Testimonials Component:**
```typescript
import DOMPurify from 'dompurify';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
};

// On form submission
const newFeedback = {
  author: sanitizeInput(author),
  role: sanitizeInput(role),
  location: sanitizeInput(location),
  tripTaken: sanitizeInput(tripTaken),
  text: sanitizeInput(text),
};
```

**Backend Validation:**
```typescript
import validator from 'validator';

const validateInput = (input: string): boolean => {
  return (
    validator.isLength(input, { min: 1, max: 2000 }) &&
    !input.includes('<script') &&
    !input.includes('javascript:')
  );
};
```

---

### CRITICAL-6: Rate Limiting

**Status:** NEEDS IMPLEMENTATION
**Priority:** CRITICAL

#### How to Fix:

**Install express-rate-limit:**
```bash
npm install express-rate-limit
```

**Implement Rate Limiting:**
```typescript
import rateLimit from 'express-rate-limit';

const testimonialLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour
  message: 'Too many submissions. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/testimonials', testimonialLimiter, (req, res) => {
  // Handle submission
});
```

---

### CRITICAL-7: Exposed API Keys

**Status:** NEEDS FIX
**Priority:** CRITICAL

#### How to Fix:

**Update .env.example (NO actual values):**
```
# .env.example - DO NOT add real values!
GEMINI_API_KEY=your_api_key_here
APP_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_here
```

**Create .env.local (NEVER commit):**
```
GEMINI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxx
APP_URL=https://sanskarshrestha.com
JWT_SECRET=your-actual-secret-key
```

**Update .gitignore:**
```
.env
.env.local
.env.*.local
```

**Verify not committed:**
```bash
git status
# Should NOT show .env files
```

---

### CRITICAL-8: Client-Side Authentication Only

**Status:** ARCHITECTURE ISSUE
**Priority:** CRITICAL

#### What's Wrong:
All authentication happens in frontend JavaScript, easily bypassed.

#### How to Fix:

**Create Backend API Structure:**
```
backend/
├── routes/
│   ├── auth.ts          # Authentication endpoints
│   ├── testimonials.ts  # Testimonial CRUD operations
│   └── admin.ts         # Admin-only endpoints
├── middleware/
│   ├── auth.ts          # JWT verification
│   ├── rateLimit.ts     # Rate limiting
│   └── validation.ts    # Input validation
├── controllers/
│   ├── authController.ts
│   └── testimonialController.ts
└── config/
    ├── database.ts      # Database setup
    └── security.ts      # Security config
```

**Example Protected Route:**
```typescript
import { verifyToken } from '../middleware/auth';

app.get('/api/testimonials', verifyToken, (req, res) => {
  // req.user is set by middleware
  // Only authenticated users can access
});
```

---

## HIGH-PRIORITY FIXES

### HIGH-1: Generate Legal Documents

```bash
# Create legal pages directory
mkdir -p src/pages/legal

# Generate files using privacy policy generator:
# - Privacy Policy
# - Terms of Service
# - Cookie Policy
# - GDPR Compliance
# - CCPA Rights
```

Recommended tools:
- Iubenda.com (Professional privacy policies)
- Termly.io (Legal document generation)
- PrivacyPolicies.com (Free templates)

---

### HIGH-3: Add Security Headers

```typescript
// backend/middleware/securityHeaders.ts
export const securityHeaders = (req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-no-referrer');
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // CORS
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  
  next();
};
```

---

### HIGH-7: Strengthen Password Policy

**Implement Backend Password Requirements:**
```typescript
const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 12) errors.push('Minimum 12 characters');
  if (!/[A-Z]/.test(password)) errors.push('Must include uppercase letters');
  if (!/[a-z]/.test(password)) errors.push('Must include lowercase letters');
  if (!/[0-9]/.test(password)) errors.push('Must include numbers');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Must include special characters');
  
  return {
    valid: errors.length === 0,
    errors,
  };
};
```

---

## PACKAGE DEPENDENCIES TO ADD/UPDATE

```bash
# Security packages
npm install dompurify
npm install express-rate-limit
npm install helmet
npm install jsonwebtoken
npm install bcrypt
npm install validator

# Type definitions
npm install --save-dev @types/dompurify
npm install --save-dev @types/express-rate-limit

# Dev dependencies
npm install --save-dev npm-audit-fix
```

---

## TESTING SECURITY FIXES

### 1. Test CSRF Protection
```bash
curl -X POST http://localhost:3000/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{"author":"test"}'
# Should fail without CSRF token
```

### 2. Test Rate Limiting
```bash
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/auth/verify \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test"}'
done
# Should rate limit after 5 attempts
```

### 3. Test CSP
```bash
# Open DevTools Console
# Try: eval("alert('XSS')")
# Should be blocked by CSP
```

---

## DEPLOYMENT CHECKLIST

- [ ] Environment variables configured in production
- [ ] HTTPS certificate installed
- [ ] CSP headers configured
- [ ] Rate limiting deployed
- [ ] Database encryption enabled
- [ ] Logging configured
- [ ] Error monitoring setup (Sentry, etc.)
- [ ] Backups configured
- [ ] SSL certificate auto-renewal
- [ ] WAF (Web Application Firewall) configured
- [ ] DDoS protection enabled
- [ ] Security headers verified
- [ ] CORS properly configured
- [ ] Source maps removed from production build
- [ ] Secrets not in git history
- [ ] Dependencies audited
- [ ] Security tests passing
- [ ] Penetration test scheduled

---

## ONGOING SECURITY MAINTENANCE

### Monthly:
- Run `npm audit`
- Review security logs
- Check for dependency updates

### Quarterly:
- Security penetration testing
- Code review for vulnerabilities
- Update security policies

### Annually:
- Full security audit
- Update disaster recovery plan
- Review and update security policies

---

## REFERENCES

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- CSP Guide: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- JWT Best Practices: https://tools.ietf.org/html/rfc8725
- GDPR Compliance: https://gdpr-info.eu/
- CCPA Rights: https://oag.ca.gov/privacy/ccpa

