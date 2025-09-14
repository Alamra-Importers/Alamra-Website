#!/usr/bin/env node

/**
 * Quick email test runner
 * Usage: node test-email.js
 * 
 * This script will test the email functionality with your actual Gmail credentials
 */

const { manualEmailTest } = require('./src/app/api/contact/integration.test.ts')

async function runEmailTest() {
  console.log('🚀 Starting email functionality test...\n')
  
  // Check environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('📋 Environment variables needed:')
    console.log('   GMAIL_USER=your-email@gmail.com')
    console.log('   GMAIL_APP_PASSWORD=your-app-password')
    console.log('\n💡 To set them temporarily:')
    console.log('   GMAIL_USER=your-email@gmail.com GMAIL_APP_PASSWORD=your-app-password node test-email.js')
    console.log('\n🔗 How to get Gmail App Password:')
    console.log('   1. Go to Google Account settings')
    console.log('   2. Security > 2-Step Verification')
    console.log('   3. App passwords > Generate new password')
    process.exit(1)
  }

  console.log(`📧 Testing email with: ${process.env.GMAIL_USER}`)
  console.log('⏳ Sending test email...\n')

  try {
    const success = await manualEmailTest()
    
    if (success) {
      console.log('\n🎉 Email test completed successfully!')
      console.log('✅ Your contact form is working correctly')
    } else {
      console.log('\n❌ Email test failed')
      console.log('🔧 Check your Gmail credentials and app password')
    }
  } catch (error) {
    console.error('\n💥 Error running email test:', error.message)
  }
}

runEmailTest()