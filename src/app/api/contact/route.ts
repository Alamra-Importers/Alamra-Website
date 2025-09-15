/**
 * Contact Form API Route
 * 
 * This API endpoint handles contact form submissions from the Alamra Embroidery website.
 * It validates the input, sanitizes it for security, and sends an email notification.
 * 
 * @route POST /api/contact
 * @description Processes contact form submissions and sends email notifications
 * @author Alamra Embroidery Development Team
 * @version 1.0.0
 * 
 * Environment Variables Required:
 * - GMAIL_USER: Gmail address for sending emails
 * - GMAIL_APP_PASSWORD: Gmail app password (not regular password)
 * 
 * Request Body:
 * - name: string (required) - Customer's full name
 * - email: string (required) - Customer's email address
 * - message: string (required) - Customer's message/inquiry
 * 
 * Response:
 * - 200: Email sent successfully
 * - 400: Validation error (missing fields, invalid email)
 * - 500: Server error (email sending failed)
 */

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import sanitizeHtml from 'sanitize-html'

/**
 * Handles POST requests to the contact form endpoint
 * 
 * Flow:
 * 1. Extract and validate form data
 * 2. Sanitize inputs to prevent XSS attacks
 * 3. Validate email format
 * 4. Configure Gmail SMTP transporter
 * 5. Send formatted email
 * 6. Return success/error response
 */
export async function POST(request: NextRequest) {
  try {
    // Extract form data from request body
    const { name, email, message } = await request.json()

    // STEP 1: Validate required fields
    // Ensure all required form fields are present and not empty
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // STEP 2: Sanitize inputs to prevent XSS attacks
    // Remove any potentially malicious HTML/JavaScript from user inputs
    const sanitizedName = sanitizeHtml(name)
    const sanitizedEmail = sanitizeHtml(email)
    const sanitizedMessage = sanitizeHtml(message)

    // STEP 3: Validate email format
    // Use regex to ensure email follows standard format (user@domain.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // STEP 4: Configure Gmail SMTP transporter
    // Create nodemailer transporter using Gmail service
    // Requires Gmail account with 2FA enabled and app password generated
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail's SMTP servers
      auth: {
        user: process.env.GMAIL_USER,        // Gmail address (e.g., business@gmail.com)
        pass: process.env.GMAIL_APP_PASSWORD, // 16-character app password (not regular password)
      },
    })

    // STEP 5: Configure email content and formatting
    // Create professional HTML email with customer inquiry details
    const mailOptions = {
      from: process.env.GMAIL_USER,    // Sender (your business email)
      to: process.env.GMAIL_USER,      // Recipient (same email - you receive the inquiries)
      subject: `New Contact Form Submission from ${sanitizedName}`, // Dynamic subject with customer name
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <!-- Email Header -->
          <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <!-- Customer Information Section -->
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Message:</strong></p>
            
            <!-- Message Content with Styling -->
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b;">
              ${sanitizedMessage.replace(/\n/g, '<br>')} <!-- Convert line breaks to HTML -->
            </div>
          </div>
          
          <!-- Footer -->
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from the Alamra Embroidery contact form.
          </p>
        </div>
      `,
    }

    // STEP 6: Send the email
    // This is the actual email sending operation - may take 1-3 seconds
    await transporter.sendMail(mailOptions)

    // STEP 7: Return success response
    // Email sent successfully - notify the frontend
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
    
  } catch (error) {
    // STEP 8: Handle any errors that occur during the process
    // Log the error for debugging (check server logs)
    console.error('Error sending email:', error)
    
    // Return generic error message to client (don't expose internal details)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

/**
 * Common Error Scenarios:
 * 
 * 1. Missing Environment Variables:
 *    - GMAIL_USER or GMAIL_APP_PASSWORD not set
 *    - Solution: Check .env.local file
 * 
 * 2. Gmail Authentication Failed:
 *    - Using regular password instead of app password
 *    - 2FA not enabled on Gmail account
 *    - Solution: Generate new app password
 * 
 * 3. Network/SMTP Issues:
 *    - Gmail servers temporarily unavailable
 *    - Firewall blocking SMTP port (587/465)
 *    - Solution: Retry or check network settings
 * 
 * 4. Rate Limiting:
 *    - Too many emails sent in short time
 *    - Gmail daily sending limits exceeded
 *    - Solution: Implement rate limiting or use business email service
 */