import { NextRequest } from 'next/server'
import { POST } from './route'
import nodemailer from 'nodemailer'

// Mock nodemailer
jest.mock('nodemailer')
const mockNodemailer = nodemailer as jest.Mocked<typeof nodemailer>

// Mock environment variables
const originalEnv = process.env
beforeEach(() => {
  process.env = {
    ...originalEnv,
    GMAIL_USER: 'test@gmail.com',
    GMAIL_APP_PASSWORD: 'test-password'
  }
})

afterEach(() => {
  process.env = originalEnv
  jest.clearAllMocks()
})

// Helper function to create mock request
const createMockRequest = (body: any) => {
  return {
    json: jest.fn().mockResolvedValue(body)
  } as unknown as NextRequest
}

describe('/api/contact', () => {
  const mockSendMail = jest.fn()
  const mockTransporter = {
    sendMail: mockSendMail
  }

  beforeEach(() => {
    mockNodemailer.createTransport.mockReturnValue(mockTransporter as any)
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' })
  })

  describe('POST', () => {
    it('should send email successfully with valid data', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I need custom embroidery work.'
      }

      const request = createMockRequest(validData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData.message).toBe('Email sent successfully')
      expect(mockSendMail).toHaveBeenCalledTimes(1)
      
      // Verify email content
      const emailCall = mockSendMail.mock.calls[0][0]
      expect(emailCall.from).toBe('test@gmail.com')
      expect(emailCall.to).toBe('test@gmail.com')
      expect(emailCall.subject).toContain('John Doe')
      expect(emailCall.html).toContain('john@example.com')
      expect(emailCall.html).toContain('Hello, I need custom embroidery work.')
    })

    it('should return 400 for missing name', async () => {
      const invalidData = {
        email: 'john@example.com',
        message: 'Hello'
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.error).toBe('All fields are required')
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('should return 400 for missing email', async () => {
      const invalidData = {
        name: 'John Doe',
        message: 'Hello'
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.error).toBe('All fields are required')
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('should return 400 for missing message', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com'
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.error).toBe('All fields are required')
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('should return 400 for invalid email format', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Hello'
      }

      const request = createMockRequest(invalidData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.error).toBe('Invalid email address')
      expect(mockSendMail).not.toHaveBeenCalled()
    })

    it('should sanitize HTML in inputs', async () => {
      const maliciousData = {
        name: 'John <script>alert("xss")</script> Doe',
        email: 'john@example.com',
        message: 'Hello <img src="x" onerror="alert(1)">'
      }

      const request = createMockRequest(maliciousData)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSendMail).toHaveBeenCalledTimes(1)
      
      const emailCall = mockSendMail.mock.calls[0][0]
      expect(emailCall.html).not.toContain('<script>')
      expect(emailCall.html).not.toContain('onerror')
      expect(emailCall.html).toContain('John  Doe') // Script tag removed
    })

    it('should handle email sending failure', async () => {
      mockSendMail.mockRejectedValue(new Error('SMTP connection failed'))

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      }

      const request = createMockRequest(validData)
      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData.error).toBe('Failed to send email')
    })

    it('should create transporter with correct configuration', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      }

      const request = createMockRequest(validData)
      await POST(request)

      expect(mockNodemailer.createTransport).toHaveBeenCalledWith({
        service: 'gmail',
        auth: {
          user: 'test@gmail.com',
          pass: 'test-password'
        }
      })
    })

    it('should format email HTML correctly', async () => {
      const validData = {
        name: 'Jane Smith',
        email: 'jane@company.com',
        message: 'I need badges for my team.\nPlease contact me.'
      }

      const request = createMockRequest(validData)
      await POST(request)

      const emailCall = mockSendMail.mock.calls[0][0]
      expect(emailCall.html).toContain('Jane Smith')
      expect(emailCall.html).toContain('jane@company.com')
      expect(emailCall.html).toContain('I need badges for my team.<br>Please contact me.')
      expect(emailCall.html).toContain('New Contact Form Submission')
      expect(emailCall.html).toContain('Alamra Embroidery')
    })
  })
})