/**
 * Contact Form API Route - Unit Tests
 * 
 * This file contains comprehensive unit tests for the contact form API endpoint.
 * Tests use mocked email services to verify business logic without sending real emails.
 * 
 * @file src/app/api/contact/route.test.ts
 * @description Unit tests for contact form email functionality
 * @author Alamra Embroidery Development Team
 * @version 1.0.0
 * 
 * Test Coverage:
 * ✅ Successful email sending with valid data
 * ✅ Validation errors (missing fields, invalid email)
 * ✅ Security (HTML sanitization, XSS prevention)
 * ✅ Error handling (SMTP failures)
 * ✅ Email content formatting
 * ✅ Transporter configuration
 * 
 * Usage:
 * - Run: npm test
 * - Watch mode: npm run test:watch
 * - Coverage: npm run test:coverage
 */

import { NextRequest } from 'next/server'
import { POST } from './route'
import nodemailer from 'nodemailer'

// Mock nodemailer to prevent actual email sending during tests
// This allows us to test the logic without requiring real email credentials
jest.mock('nodemailer')
const mockNodemailer = nodemailer as jest.Mocked<typeof nodemailer>

// Mock environment variables for consistent testing
// Store original environment to restore after tests
const originalEnv = process.env

beforeEach(() => {
  // Set up test environment variables before each test
  process.env = {
    ...originalEnv,
    GMAIL_USER: 'test@gmail.com',
    GMAIL_APP_PASSWORD: 'test-password'
  }
})

afterEach(() => {
  // Clean up after each test
  process.env = originalEnv  // Restore original environment
  jest.clearAllMocks()       // Clear all mock function calls
})

/**
 * Helper function to create mock NextRequest objects
 * Simulates the request object that Next.js passes to API routes
 * 
 * @param body - The request body data to mock
 * @returns Mocked NextRequest object
 */
const createMockRequest = (body: any) => {
  return {
    json: jest.fn().mockResolvedValue(body)
  } as unknown as NextRequest
}

describe('/api/contact', () => {
  // Mock email sending functionality
  const mockSendMail = jest.fn()
  const mockTransporter = {
    sendMail: mockSendMail
  }

  beforeEach(() => {
    // Set up mocks before each test
    mockNodemailer.createTransport.mockReturnValue(mockTransporter as any)
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' })
  })

  describe('POST', () => {
    /**
     * Test Case: Successful Email Sending
     * 
     * Purpose: Verify that valid form data results in successful email sending
     * Scenario: Customer submits complete, valid contact form
     * Expected: 200 status, success message, email sent with correct content
     */
    it('should send email successfully with valid data', async () => {
      // Arrange: Set up valid test data (typical customer inquiry)
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I need custom embroidery work.'
      }

      // Act: Send request to API endpoint
      const request = createMockRequest(validData)
      const response = await POST(request)
      const responseData = await response.json()

      // Assert: Verify successful response
      expect(response.status).toBe(200)
      expect(responseData.message).toBe('Email sent successfully')
      expect(mockSendMail).toHaveBeenCalledTimes(1)

      // Verify email content is correctly formatted
      const emailCall = mockSendMail.mock.calls[0][0]
      expect(emailCall.from).toBe('test@gmail.com')        // Sender email
      expect(emailCall.to).toBe('test@gmail.com')          // Recipient email (business receives inquiries)
      expect(emailCall.subject).toContain('John Doe')      // Subject includes customer name
      expect(emailCall.html).toContain('john@example.com') // Email body includes customer email
      expect(emailCall.html).toContain('Hello, I need custom embroidery work.') // Message content preserved
    })

    /**
     * Test Case: Missing Name Validation
     * 
     * Purpose: Ensure API rejects requests without customer name
     * Scenario: Form submitted with email and message but no name
     * Expected: 400 status, validation error, no email sent
     */
    it('should return 400 for missing name', async () => {
      // Arrange: Data missing required 'name' field
      const invalidData = {
        email: 'john@example.com',
        message: 'Hello'
        // name is intentionally missing
      }

      // Act: Send invalid request
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      // Assert: Verify validation error
      expect(response.status).toBe(400)
      expect(responseData.error).toBe('All fields are required')
      expect(mockSendMail).not.toHaveBeenCalled() // No email should be sent
    })

    /**
     * Test Case: Missing Email Validation
     * 
     * Purpose: Ensure API rejects requests without customer email
     * Scenario: Form submitted with name and message but no email
     * Expected: 400 status, validation error, no email sent
     */
    it('should return 400 for missing email', async () => {
      // Arrange: Data missing required 'email' field
      const invalidData = {
        name: 'John Doe',
        message: 'Hello'
        // email is intentionally missing
      }

      // Act: Send invalid request
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      // Assert: Verify validation error
      expect(response.status).toBe(400)
      expect(responseData.error).toBe('All fields are required')
      expect(mockSendMail).not.toHaveBeenCalled() // No email should be sent
    })

    /**
     * Test Case: Missing Message Validation
     * 
     * Purpose: Ensure API rejects requests without customer message
     * Scenario: Form submitted with name and email but no message
     * Expected: 400 status, validation error, no email sent
     */
    it('should return 400 for missing message', async () => {
      // Arrange: Data missing required 'message' field
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com'
        // message is intentionally missing
      }

      // Act: Send invalid request
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      // Assert: Verify validation error
      expect(response.status).toBe(400)
      expect(responseData.error).toBe('All fields are required')
      expect(mockSendMail).not.toHaveBeenCalled() // No email should be sent
    })

    /**
     * Test Case: Invalid Email Format Validation
     * 
     * Purpose: Ensure API rejects malformed email addresses
     * Scenario: Form submitted with invalid email format
     * Expected: 400 status, email validation error, no email sent
     */
    it('should return 400 for invalid email format', async () => {
      // Arrange: Data with invalid email format (missing @ and domain)
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email', // Invalid: no @ symbol or domain
        message: 'Hello'
      }

      // Act: Send request with invalid email
      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      // Assert: Verify email validation error
      expect(response.status).toBe(400)
      expect(responseData.error).toBe('Invalid email address')
      expect(mockSendMail).not.toHaveBeenCalled() // No email should be sent
    })

    /**
     * Test Case: HTML Sanitization (XSS Prevention)
     * 
     * Purpose: Ensure malicious HTML/JavaScript is removed from user inputs
     * Scenario: Attacker tries to inject scripts via form fields
     * Expected: Scripts removed, email sent with sanitized content
     * 
     * Security Note: This prevents XSS attacks where malicious users
     * try to inject JavaScript that could execute in email clients
     */
    it('should sanitize HTML in inputs', async () => {
      // Arrange: Malicious data with XSS attempts
      const maliciousData = {
        name: 'John <script>alert("xss")</script> Doe',           // Script injection attempt
        email: 'john@example.com',
        message: 'Hello <img src="x" onerror="alert(1)">'        // Image with malicious onerror
      }

      // Act: Send request with malicious content
      const request = createMockRequest(maliciousData)
      const response = await POST(request)

      // Assert: Email should still be sent but with sanitized content
      expect(response.status).toBe(200)
      expect(mockSendMail).toHaveBeenCalledTimes(1)

      // Verify malicious content was removed
      const emailCall = mockSendMail.mock.calls[0][0]
      expect(emailCall.html).not.toContain('<script>')    // Script tags removed
      expect(emailCall.html).not.toContain('onerror')     // Event handlers removed
      expect(emailCall.html).toContain('John  Doe')       // Clean text preserved (script tag becomes space)
    })

    /**
     * Test Case: Email Sending Failure Handling
     * 
     * Purpose: Ensure API gracefully handles SMTP/email sending failures
     * Scenario: Valid form data but email service fails (network, auth, etc.)
     * Expected: 500 status, generic error message, no sensitive info exposed
     */
    it('should handle email sending failure', async () => {
      // Arrange: Mock email sending to fail
      mockSendMail.mockRejectedValue(new Error('SMTP connection failed'))

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      }

      // Act: Send valid request but email sending will fail
      const request = createMockRequest(validData)
      const response = await POST(request)
      const responseData = await response.json()

      // Assert: Verify error handling
      expect(response.status).toBe(500)
      expect(responseData.error).toBe('Failed to send email') // Generic error (no sensitive details)
    })

    /**
     * Test Case: Email Transporter Configuration
     * 
     * Purpose: Verify nodemailer is configured correctly with Gmail settings
     * Scenario: Any valid request should create transporter with correct config
     * Expected: Gmail service, correct auth credentials from environment
     */
    it('should create transporter with correct configuration', async () => {
      // Arrange: Valid test data
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      }

      // Act: Send request (this triggers transporter creation)
      const request = createMockRequest(validData)
      await POST(request)

      // Assert: Verify transporter was created with correct Gmail configuration
      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        service: 'gmail',                    // Use Gmail SMTP servers
        auth: {
          user: 'test@gmail.com',           // Gmail address from environment
          pass: 'test-password'             // App password from environment
        }
      })
    })

    /**
     * Test Case: Email HTML Formatting
     * 
     * Purpose: Verify email content is properly formatted with HTML styling
     * Scenario: Form submission with multi-line message
     * Expected: HTML email with proper formatting, line breaks converted
     */
    it('should format email HTML correctly', async () => {
      // Arrange: Data with multi-line message (common in real inquiries)
      const validData = {
        name: 'Jane Smith',
        email: 'jane@company.com',
        message: 'I need badges for my team.\nPlease contact me.' // Multi-line message
      }

      // Act: Send request
      const request = createMockRequest(validData)
      await POST(request)

      // Assert: Verify HTML email formatting
      const emailCall = mockSendMail.mock.calls[0][0]
      expect(emailCall.html).toContain('Jane Smith')                                    // Customer name displayed
      expect(emailCall.html).toContain('jane@company.com')                            // Customer email displayed
      expect(emailCall.html).toContain('I need badges for my team.<br>Please contact me.') // Line breaks converted to <br>
      expect(emailCall.html).toContain('New Contact Form Submission')                 // Email header
      expect(emailCall.html).toContain('Alamra Embroidery')                          // Business branding
    })
  })
})