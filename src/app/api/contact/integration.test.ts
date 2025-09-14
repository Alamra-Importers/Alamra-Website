/**
 * Integration test for email sending functionality
 * This test requires actual email credentials to be set in environment variables
 * Run with: npm run test -- integration.test.ts
 * 
 * To run this test:
 * 1. Set up a test Gmail account with app password
 * 2. Set GMAIL_USER and GMAIL_APP_PASSWORD environment variables
 * 3. Run: GMAIL_USER=your-test@gmail.com GMAIL_APP_PASSWORD=your-app-password npm test integration.test.ts
 */

import { NextRequest } from 'next/server'
import { POST } from './route'

// Helper function to create mock request
const createMockRequest = (body: any) => {
  return {
    json: jest.fn().mockResolvedValue(body)
  } as unknown as NextRequest
}

describe('/api/contact - Integration Tests', () => {
  // Skip integration tests if no real email credentials are provided
  const skipIntegration = !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || 
                         process.env.GMAIL_USER === 'test@gmail.com'

  beforeAll(() => {
    if (skipIntegration) {
      console.log('⚠️  Skipping integration tests - no real email credentials provided')
      console.log('To run integration tests, set GMAIL_USER and GMAIL_APP_PASSWORD environment variables')
    }
  })

  it.skipIf(skipIntegration)('should actually send email with real SMTP connection', async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: `Test message sent at ${new Date().toISOString()}`
    }

    const request = createMockRequest(testData)
    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData.message).toBe('Email sent successfully')
    
    console.log('✅ Integration test passed - Email sent successfully!')
    console.log(`📧 Check your inbox at ${process.env.GMAIL_USER} for the test email`)
  }, 30000) // 30 second timeout for email sending

  it.skipIf(skipIntegration)('should handle SMTP authentication failure', async () => {
    // Temporarily override with invalid credentials
    const originalPassword = process.env.GMAIL_APP_PASSWORD
    process.env.GMAIL_APP_PASSWORD = 'invalid-password'

    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This should fail'
    }

    const request = createMockRequest(testData)
    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('Failed to send email')

    // Restore original password
    process.env.GMAIL_APP_PASSWORD = originalPassword
  }, 15000)
})

// Manual test function that can be called directly
export async function manualEmailTest() {
  console.log('🧪 Running manual email test...')
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables')
    return false
  }

  try {
    const testData = {
      name: 'Manual Test User',
      email: 'manual-test@example.com',
      message: `Manual test email sent at ${new Date().toISOString()}\n\nThis is a test of the Alamra Embroidery contact form.`
    }

    const request = createMockRequest(testData)
    const response = await POST(request)
    const responseData = await response.json()

    if (response.status === 200) {
      console.log('✅ Manual email test PASSED!')
      console.log(`📧 Check your inbox at ${process.env.GMAIL_USER}`)
      return true
    } else {
      console.error('❌ Manual email test FAILED:', responseData)
      return false
    }
  } catch (error) {
    console.error('❌ Manual email test ERROR:', error)
    return false
  }
}