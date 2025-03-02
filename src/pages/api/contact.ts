import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prototype } from 'events';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Create a transporter with your Gmail credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465, 
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Use an app password, not your regular password
    },
  });

  try {

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'info@alamraimporters.com', // Where you want to receive messages
      replyTo: email, // So you can reply directly to the sender
      subject: `New Contact Form Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}