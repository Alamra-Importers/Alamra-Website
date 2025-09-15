# Testing Documentation - Alamra Embroidery

This document explains how to run and understand the test suite for the Alamra Embroidery website, particularly focusing on the contact form email functionality.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Test Types](#test-types)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Email Testing](#email-testing)
- [Test Files Overview](#test-files-overview)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests (no email credentials needed)
npm test

# 3. Test actual email sending (requires Gmail setup)
GMAIL_USER=your-email@gmail.com GMAIL_APP_PASSWORD=your-app-password node test-email.js
```

## 🧪 Test Types

### Unit Tests (Mocked)
- **File**: `src/app/api/contact/route.test.ts`
- **Purpose**: Test business logic without sending real emails
- **Coverage**: Validation, sanitization, error handling
- **Requirements**: None (uses mocked email service)

### Integration Tests (Real SMTP)
- **File**: `src/app/api/contact/integration.test.ts`
- **Purpose**: Test actual email delivery
- **Coverage**: Real SMTP connection, authentication
- **Requirements**: Valid Gmail credentials

### Manual Testing
- **File**: `test-email.js`
- **Purpose**: Quick manual verification
- **Coverage**: End-to-end email sending
- **Requirements**: Valid Gmail credentials

## ⚙️ Setup Instructions

### 1. Install Test Dependencies

```bash
npm install
```

This installs:
- `jest` - Testing framework
- `ts-jest` - TypeScript support for Jest
- `@types/jest` - TypeScript definitions
- `jest-environment-node` - Node.js test environment

### 2. Gmail Setup (For Email Testing)

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification**

#### Step 2: Generate App Password
1. In Security settings, find **App passwords**
2. Select **Mail** as the app
3. Copy the generated 16-character password

#### Step 3: Set Environment Variables

**Option A: Temporary (for single test run)**
```bash
GMAIL_USER=your-email@gmail.com GMAIL_APP_PASSWORD=your-16-char-password npm test
```

**Option B: Create .env.local file**
```bash
# Create .env.local file in project root
echo "GMAIL_USER=your-email@gmail.com" >> .env.local
echo "GMAIL_APP_PASSWORD=your-16-char-password" >> .env.local
```

**Option C: Export in terminal session**
```bash
export GMAIL_USER=your-email@gmail.com
export GMAIL_APP_PASSWORD=your-16-char-password
```

## 🏃‍♂️ Running Tests

### Basic Test Commands

```bash
# Run all unit tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test route.test.ts

# Run tests with verbose output
npm test -- --verbose
```

### Email Testing Commands

```bash
# Quick manual email test
node test-email.js

# Run integration tests (requires email credentials)
npm test integration.test.ts

# Run integration tests with environment variables
GMAIL_USER=test@gmail.com GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop npm test integration.test.ts
```

### Test Output Examples

**Successful Unit Test:**
```
✓ should send email successfully with valid data
✓ should return 400 for missing name
✓ should return 400 for invalid email format
✓ should sanitize HTML in inputs
✓ should handle email sending failure

Test Suites: 1 passed, 1 total
Tests: 8 passed, 8 total
```

**Successful Email Test:**
```
🚀 Starting email functionality test...
📧 Testing email with: your-email@gmail.com
⏳ Sending test email...
✅ Manual email test PASSED!
📧 Check your inbox at your-email@gmail.com
🎉 Email test completed successfully!
```

## 📧 Email Testing

### What Gets Tested

1. **Email Delivery**: Actual email sent to your Gmail
2. **Content Formatting**: HTML email with proper styling
3. **Data Sanitization**: XSS protection and input cleaning
4. **Error Handling**: SMTP failures and authentication errors

### Sample Test Email Content

When you run email tests, you'll receive an email like this:

```
Subject: New Contact Form Submission from Test User

Content:
┌─────────────────────────────────────┐
│ New Contact Form Submission         │
├─────────────────────────────────────┤
│ Name: Test User                     │
│ Email: test@example.com             │
│ Message:                            │
│ Test message sent at [timestamp]    │
│                                     │
│ This message was sent from the      │
│ Alamra Embroidery contact form.     │
└─────────────────────────────────────┘
```

### Verifying Email Functionality

1. **Run the test**: `node test-email.js`
2. **Check your inbox**: Look for the test email
3. **Verify content**: Ensure all form data appears correctly
4. **Check formatting**: HTML should be properly styled

## 📁 Test Files Overview

### `src/app/api/contact/route.test.ts`
**Unit tests with mocked email service**

```typescript
// Tests covered:
- ✅ Valid form submission
- ✅ Missing field validation (name, email, message)
- ✅ Invalid email format detection
- ✅ HTML sanitization (XSS protection)
- ✅ Email sending failure handling
- ✅ Transporter configuration
- ✅ Email content formatting
```

### `src/app/api/contact/integration.test.ts`
**Integration tests with real SMTP**

```typescript
// Tests covered:
- ✅ Actual email delivery
- ✅ SMTP authentication failure
- ✅ Real Gmail connection
- ✅ End-to-end functionality
```

### `test-email.js`
**Manual test runner**

```javascript
// Features:
- 🔧 Environment variable validation
- 📧 Real email sending test
- 📋 Setup instructions
- ✅ Success/failure reporting
```

### `jest.config.js`
**Jest configuration for Next.js**

```javascript
// Configuration includes:
- 📁 Test file patterns
- 🔧 TypeScript support
- 📊 Coverage reporting
- 🚫 Ignored directories
```

## 🔧 Troubleshooting

### Common Issues

#### 1. "Gmail authentication failed"
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Solutions:**
- ✅ Verify 2-factor authentication is enabled
- ✅ Use App Password, not regular password
- ✅ Check GMAIL_USER email is correct
- ✅ Ensure App Password has no spaces

#### 2. "Tests not found"
```
No tests found, exiting with code 1
```

**Solutions:**
- ✅ Run `npm install` to install Jest
- ✅ Check test files have `.test.ts` extension
- ✅ Verify Jest configuration in `jest.config.js`

#### 3. "Module not found"
```
Cannot find module 'nodemailer'
```

**Solutions:**
- ✅ Run `npm install` to install dependencies
- ✅ Check `package.json` includes nodemailer
- ✅ Restart your terminal/IDE

#### 4. "Environment variables not set"
```
Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables
```

**Solutions:**
- ✅ Create `.env.local` file with credentials
- ✅ Export variables in terminal session
- ✅ Pass variables inline with command

### Debug Mode

Run tests with debug information:

```bash
# Debug Jest
npm test -- --verbose --no-cache

# Debug email sending
DEBUG=nodemailer* node test-email.js

# Check environment variables
node -e "console.log(process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD)"
```

### Test Coverage

Generate detailed coverage report:

```bash
npm run test:coverage
```

This creates:
- `coverage/lcov-report/index.html` - Visual coverage report
- `coverage/lcov.info` - Coverage data for CI/CD
- Terminal output with coverage percentages

## 📊 Expected Coverage

| File | Statements | Branches | Functions | Lines |
|------|------------|----------|-----------|-------|
| route.ts | 100% | 100% | 100% | 100% |

## 🎯 Best Practices

1. **Run unit tests frequently** during development
2. **Run integration tests** before deploying
3. **Check coverage** to ensure all code paths are tested
4. **Use watch mode** during active development
5. **Keep credentials secure** - never commit them to git

## 📞 Support

If you encounter issues:

1. Check this documentation first
2. Verify your Gmail setup
3. Run tests with verbose output
4. Check the troubleshooting section
5. Ensure all dependencies are installed

---

**Happy Testing! 🧪✨**