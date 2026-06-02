# DEPLOYMENT & PRODUCTION CHECKLIST

## Pre-Deployment Security Verification

### ✅ Critical Security Fixes (MUST BE COMPLETE)

- [ ] Hardcoded credentials removed from frontend
- [ ] Backend authentication API implemented
- [ ] Input sanitization (DOMPurify) installed and configured
- [ ] Rate limiting middleware deployed
- [ ] CSP headers configured
- [ ] HTTPS/TLS enforced with HSTS
- [ ] API keys secured in environment variables
- [ ] .env file properly gitignored
- [ ] Source maps disabled in production build
- [ ] Authentication moved to backend (no client-side validation only)
- [ ] Secure cookie configuration implemented
- [ ] CORS properly configured

### ✅ Data Protection (MUST BE COMPLETE)

- [ ] Data encryption at rest configured
- [ ] Data encryption in transit (TLS) enforced
- [ ] localStorage replaced with secure alternatives
- [ ] Database encryption enabled
- [ ] Data retention policies implemented
- [ ] Data backup automated
- [ ] Disaster recovery plan tested

### ✅ Privacy & Legal (MUST BE COMPLETE)

- [ ] Privacy Policy published and accessible
- [ ] Terms of Service published and accessible
- [ ] Cookie Policy created and implemented
- [ ] GDPR compliance verified
- [ ] CCPA compliance verified
- [ ] Privacy contact information visible
- [ ] Data deletion request process implemented
- [ ] Consent mechanisms in place

### ✅ Infrastructure Security (MUST BE COMPLETE)

- [ ] SSL/TLS certificate installed
- [ ] Firewall configured
- [ ] DDoS protection enabled
- [ ] Web Application Firewall (WAF) deployed
- [ ] Server hardening completed
- [ ] SSH keys secured
- [ ] Database access restricted
- [ ] API rate limiting configured
- [ ] Logging and monitoring enabled
- [ ] Security alerting configured

### ✅ Testing & Validation (MUST BE COMPLETE)

- [ ] Security penetration testing completed
- [ ] OWASP Top 10 vulnerabilities tested
- [ ] XSS vulnerability testing passed
- [ ] CSRF protection verified
- [ ] Authentication flow tested
- [ ] Rate limiting tested
- [ ] CSP policy validated
- [ ] SSL/TLS certificate validation passed
- [ ] Performance testing completed
- [ ] Load testing completed
- [ ] Browser compatibility testing completed
- [ ] Mobile responsiveness verified
- [ ] Accessibility testing (WCAG 2.2) completed

---

## Production Deployment Steps

### Step 1: Environment Setup

```bash
# Create production environment file
cp .env.example .env.production

# Edit with production values
nano .env.production

# Verify critical variables set
grep -E "JWT_SECRET|ADMIN_PASSWORD|DB_URL" .env.production
```

### Step 2: Build Optimization

```bash
# Install dependencies
npm install --production

# Build with security optimizations
npm run build

# Verify no source maps in dist/
find dist -name "*.map" -delete

# Check bundle size
npm run build -- --analyze
```

### Step 3: Database & Storage Setup

```bash
# Initialize production database
npm run db:init:production

# Verify database encryption
npm run db:verify-encryption

# Test database backups
npm run db:backup
npm run db:restore --dry-run

# Enable automated backups
npm run db:setup-backup-schedule
```

### Step 4: SSL/TLS Certificate

```bash
# Using Let's Encrypt (recommended)
# On Vercel/Netlify: Automatic
# On self-hosted:

certbot certonly \
  --webroot \
  -w /var/www/site \
  -d sanskarshrestha.com \
  -d www.sanskarshrestha.com
```

### Step 5: Security Headers Configuration

```bash
# Verify headers configured
curl -i https://sanskarshrestha.com | grep -E "X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security|Content-Security-Policy"
```

### Step 6: WAF & DDoS Protection

```bash
# Setup Cloudflare or similar service
# 1. Point domain to Cloudflare nameservers
# 2. Enable security features:
#    - DDoS protection
#    - Web Application Firewall
#    - Rate limiting rules
#    - Bot management
# 3. Setup SSL/TLS at full strict
```

### Step 7: Logging & Monitoring

```bash
# Setup error tracking (e.g., Sentry)
npm install @sentry/react

# Configure monitoring
SENTRY_DSN=https://xxxxx@sentry.io/project

# Verify logging working
npm run start:production
# Trigger test error and check Sentry
```

### Step 8: Verification & Testing

```bash
# Run security test suite
npm run test:security

# Test authentication flow
npm run test:auth:e2e

# Test rate limiting
npm run test:rate-limit

# Verify all security headers
npm run test:security-headers

# Load testing
npm run test:load

# Lighthouse audit
npm run audit:lighthouse
```

---

## Deployment Platforms Configuration

### Vercel Deployment

```bash
# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "JWT_SECRET": "@jwt_secret",
    "GEMINI_API_KEY": "@gemini_api_key"
  },
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
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-no-referrer"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

### Netlify Deployment

```bash
# netlify.toml
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
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'"
```

### Self-Hosted (Docker)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm ci --production

# Copy application
COPY dist ./dist
COPY public ./public

# Security: Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Expose port (use reverse proxy)
EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - app
    restart: unless-stopped
```

---

## Post-Deployment Verification

### Immediate (Day 1)

```bash
# Check application health
curl -i https://sanskarshrestha.com/
curl -i https://sanskarshrestha.com/api/health

# Verify HTTPS working
ssl-test-report() {
  echo "Checking SSL/TLS configuration..."
  echo | openssl s_client -servername sanskarshrestha.com -connect sanskarshrestha.com:443
}

# Check security headers
security-header-check() {
  curl -I https://sanskarshrestha.com | grep -E "Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|Content-Security-Policy"
}

# Verify authentication
test-auth() {
  curl -X POST https://sanskarshrestha.com/api/auth/verify \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test"}'
}

# Check logging
check-logs() {
  tail -f /var/log/app.log
}
```

### Weekly (Days 7+)

- [ ] Review security logs for anomalies
- [ ] Check application error logs
- [ ] Verify backups completed successfully
- [ ] Test disaster recovery procedures
- [ ] Monitor performance metrics
- [ ] Check for failed authentication attempts
- [ ] Verify rate limiting working

### Monthly

- [ ] Run `npm audit` and update dependencies
- [ ] Security vulnerability scan
- [ ] Performance review and optimization
- [ ] Backup restoration test
- [ ] Security headers validation
- [ ] Certificate expiry verification
- [ ] Review user access logs

### Quarterly

- [ ] Full security penetration test
- [ ] Code security review
- [ ] Update security policies
- [ ] Incident response drill
- [ ] Dependency vulnerability review

### Annually

- [ ] Complete security audit
- [ ] Penetration testing by third party
- [ ] Update disaster recovery plan
- [ ] Security training review

---

## Monitoring & Alerting

### Key Metrics to Monitor

1. **Uptime & Performance**
   - 99.9% uptime target
   - Response time < 2 seconds
   - Error rate < 0.1%

2. **Security Events**
   - Failed authentication attempts
   - Rate limit triggers
   - CSP violations
   - Suspicious IP addresses

3. **Resource Usage**
   - CPU utilization < 70%
   - Memory usage < 80%
   - Disk space available > 10%
   - Database connections healthy

### Alert Thresholds

| Event | Threshold | Action |
|-------|-----------|--------|
| 500 errors | 5+ in 5 min | Page on-call |
| Failed login | 10+ per hour | Investigate |
| Rate limit | 100+ violations/hour | Review rules |
| SSL cert expiry | 30 days | Renew cert |
| Disk space | < 5% available | Increase size |
| CPU usage | > 80% | Scale resources |

---

## Incident Response Plan

### 1. Security Breach Detection

```bash
# Immediate actions:
1. Isolate affected systems
2. Collect evidence (logs, memory)
3. Notify stakeholders
4. Activate incident response team
5. Begin investigation
```

### 2. Incident Documentation

```markdown
# Incident Report Template
- **Date:** YYYY-MM-DD HH:MM UTC
- **Type:** [Security Breach/Service Outage/Data Leak/etc]
- **Severity:** [Critical/High/Medium/Low]
- **Impact:** [Affected systems, users, data]
- **Root Cause:** [Technical analysis]
- **Timeline:** [Detailed timeline of events]
- **Response:** [Actions taken]
- **Resolution:** [How issue fixed]
- **Remediation:** [Long-term fixes]
- **Lessons Learned:** [Prevention strategies]
```

### 3. Communication Plan

- **Immediate** (0-1 hour): Alert stakeholders
- **15 minutes**: Public status page update
- **1 hour**: Detailed update with ETA
- **Ongoing**: Updates every 30 minutes
- **Resolution**: Post-incident report within 24 hours

---

## Rollback Procedure

If critical issues discovered in production:

```bash
# 1. Switch to previous version
npm run deploy:rollback:production

# 2. Verify health checks
curl https://sanskarshrestha.com/api/health

# 3. Check user-facing functionality
npm run test:smoke

# 4. Monitor error logs
tail -f /var/log/app.log

# 5. Post-incident review
npm run incident:report
```

---

## Success Criteria

Before marking deployment as complete:

✅ All 8 CRITICAL vulnerabilities remediated  
✅ All 12 HIGH vulnerabilities addressed  
✅ Security audit passed  
✅ Penetration test completed  
✅ SSL/TLS certificate valid  
✅ HTTPS enforced  
✅ CSP headers configured  
✅ Rate limiting operational  
✅ Monitoring & alerting active  
✅ Backup & recovery tested  
✅ Legal documents published  
✅ Privacy policy visible  
✅ Performance acceptable  
✅ Accessibility compliant  
✅ Load testing successful  

---

**APPROVAL FOR PRODUCTION DEPLOYMENT**

Once all items checked and verified:

```
Deployed By: _________________________
Date: _________________________
Version: _________________________
Security Reviewed By: _________________________
```

---
