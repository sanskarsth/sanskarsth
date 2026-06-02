# PRODUCTION DEPLOYMENT GUIDE

## Pre-Deployment Checklist

### ✅ Security Fixes Applied
- [x] Hardcoded credentials removed from frontend code
- [x] Input sanitization with DOMPurify implemented
- [x] Rate limiting added to form submissions
- [x] CSP security headers configured in HTML
- [x] Source maps disabled in production build
- [x] API keys moved to environment variables
- [x] .env files added to .gitignore

### ✅ Environment Setup
1. Create `.env.production` with production values:
```bash
GEMINI_API_KEY=your_production_key
APP_URL=https://sanskarshrestha.com
ADMIN_EMAIL_1=your_production_email
ADMIN_PASSWORD_1=your_strong_production_password
JWT_SECRET=your_strong_jwt_secret
SESSION_SECRET=your_strong_session_secret
NODE_ENV=production
```

2. **NEVER commit `.env.production` to Git!**

### ✅ Build for Production
```bash
# Set production environment
export NODE_ENV=production

# Install dependencies (production only)
npm ci --production

# Build optimized production bundle
npm run build

# Verify source maps are removed
find dist -name "*.map" -delete

# Check bundle size
ls -lh dist/
```

### ✅ Security Verification Before Deployment

**Check 1: Verify no credentials in bundle**
```bash
grep -r "sanskar\|bige.stha" dist/ 2>/dev/null
# Should return nothing!
```

**Check 2: Verify CSP headers in HTML**
```bash
grep "Content-Security-Policy" dist/index.html
# Should show security policy
```

**Check 3: Verify environment variables are in .env.production only**
```bash
cat .env.production
# Review for sensitive data
```

---

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod --env-file=.env.production

# Configure in Vercel Dashboard:
# 1. Go to Project Settings → Environment Variables
# 2. Add all variables from .env.production
# 3. Set NODE_ENV=production
# 4. Deploy!
```

**vercel.json configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Set environment variables:
# 1. Go to Site settings → Build & Deploy → Environment
# 2. Add variables from .env.production
# 3. Trigger redeploy
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-no-referrer"
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'"
```

### Option 3: Self-Hosted (Docker)

```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g http-server
EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000", "--cors"]
```

```bash
# Build Docker image
docker build -t sanskar-portfolio .

# Run with environment variables
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  -e NODE_ENV=production \
  sanskar-portfolio
```

---

## Post-Deployment Verification

### ✅ Verify HTTPS is enforced
```bash
curl -I https://sanskarshrestha.com
# Should see: Strict-Transport-Security header
```

### ✅ Check security headers
```bash
curl -I https://sanskarshrestha.com | grep -E "X-Frame-Options|X-Content-Type-Options|CSP"
```

### ✅ Test CSP is working
Open DevTools Console and try: `eval("alert('test')")`
Should be blocked by CSP!

### ✅ Verify app loads correctly
```bash
curl https://sanskarshrestha.com | head -50
# Should see HTML with CSP header
```

### ✅ Test testimonials form
- Fill in testimonial form
- Submit should work without issues
- Should see rate limiting after 3 submissions

### ✅ Test admin portal
- Try with wrong credentials → should fail
- Try with correct credentials → should work
- Check that credentials are NOT exposed in DevTools

---

## Security Monitoring

### Enable Error Tracking (Sentry)
```bash
npm install @sentry/react

# In src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Monitor for Common Attacks
- Check logs for XSS attempts
- Monitor authentication failures
- Alert on rate limit triggers
- Track unusual access patterns

---

## Rollback Procedure (if needed)

```bash
# Redeploy previous version
git log --oneline | head -5
git checkout <previous-commit>
npm run build
# Deploy again
```

---

## Maintenance Checklist

### Monthly
- [ ] Review security logs
- [ ] Update dependencies: `npm audit fix`
- [ ] Check for vulnerabilities: `npm audit`
- [ ] Review authentication attempts

### Quarterly
- [ ] Security penetration testing
- [ ] Update privacy policy if needed
- [ ] Review and rotate secrets

### Annually
- [ ] Complete security audit
- [ ] Update SSL certificate
- [ ] Review incident response plan

---

## Environment Variables for Production

**Required:**
```
GEMINI_API_KEY - Your Gemini API key
APP_URL - https://sanskarshrestha.com
ADMIN_EMAIL_1 - Admin email for portal access
ADMIN_PASSWORD_1 - Strong admin password (12+ chars)
JWT_SECRET - Strong random string for JWT signing
SESSION_SECRET - Strong random string for sessions
NODE_ENV - production
```

**Optional:**
```
SENTRY_DSN - Error tracking (https://sentry.io)
LOG_LEVEL - debug|info|warn|error
```

---

## Troubleshooting

**Q: CSP blocking my resources**
A: Update CSP policy in index.html to allow specific domains

**Q: Rate limiting too aggressive**
A: Adjust limits in src/components/Testimonials.tsx (RateLimiter class)

**Q: Credentials visible in DevTools**
A: Check that .env.local is NOT committed, rebuild with `npm run build`

**Q: HTTPS not working**
A: Use Let's Encrypt on self-hosted, or use Vercel/Netlify for automatic HTTPS

**Q: Form submissions failing**
A: Check that DOMPurify is sanitizing correctly, verify rate limiting allows requests

---

## Support

For detailed security information, see:
- SECURITY_REMEDIATION_GUIDE.md - Implementation details
- DEPLOYMENT_CHECKLIST.md - Complete deployment guide
- COMPREHENSIVE_AUDIT_SUMMARY.md - Full audit report

Happy deploying! 🚀
