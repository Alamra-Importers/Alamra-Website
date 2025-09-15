# 🧪 Quick Testing Guide

## TL;DR - Test Your Contact Form

```bash
# 1. Install dependencies
npm install

# 2. Test without email (unit tests)
npm test

# 3. Test with real email (replace with your Gmail)
GMAIL_USER=your-email@gmail.com GMAIL_APP_PASSWORD=your-app-password node test-email.js
```

## 📧 Gmail Setup (2 minutes)

1. **Enable 2FA**: [Google Account](https://myaccount.google.com/) → Security → 2-Step Verification
2. **Get App Password**: Security → App passwords → Mail → Generate
3. **Copy the 16-character password** (like: `abcd efgh ijkl mnop`)

## 🚀 Test Commands

| Command | Purpose | Requirements |
|---------|---------|--------------|
| `npm test` | Unit tests (mocked) | None |
| `npm run test:watch` | Auto-rerun tests | None |
| `npm run test:coverage` | Coverage report | None |
| `node test-email.js` | Real email test | Gmail credentials |
| `npm test integration.test.ts` | Integration tests | Gmail credentials |

## ✅ What Gets Tested

- ✅ **Form validation** (required fields, email format)
- ✅ **Security** (HTML sanitization, XSS protection)
- ✅ **Email delivery** (actual Gmail sending)
- ✅ **Error handling** (SMTP failures, auth errors)
- ✅ **Content formatting** (HTML email styling)

## 🔧 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Authentication failed" | Use App Password, not regular password |
| "Tests not found" | Run `npm install` first |
| "Module not found" | Check `package.json` dependencies |
| "No email received" | Check spam folder, verify Gmail credentials |

## 📁 Test Files

- `src/app/api/contact/route.test.ts` - Unit tests (mocked email)
- `src/app/api/contact/integration.test.ts` - Integration tests (real email)
- `test-email.js` - Quick manual test
- `jest.config.js` - Jest configuration
- `TESTING.md` - Full documentation

## 🎯 Expected Results

**Unit Tests:**
```
✓ should send email successfully with valid data
✓ should return 400 for missing name
✓ should return 400 for invalid email format
✓ should sanitize HTML in inputs
✓ should handle email sending failure

Tests: 8 passed, 8 total
```

**Email Test:**
```
✅ Manual email test PASSED!
📧 Check your inbox at your-email@gmail.com
```

---

**Need more details?** See [TESTING.md](./TESTING.md) for complete documentation.