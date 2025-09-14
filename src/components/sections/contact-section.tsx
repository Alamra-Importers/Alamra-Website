'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface FormState {
  name: string
  email: string
  message: string
}

interface StatusState {
  submitted: boolean
  submitting: boolean
  info: { error: boolean; msg: string | null }
}

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  })
  
  const [status, setStatus] = useState<StatusState>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ submitted: false, submitting: true, info: { error: false, msg: null } })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })

      const data = await response.json()

      if (response.status === 200) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Message sent successfully!' }
        })
        setFormState({
          name: '',
          email: '',
          message: ''
        })
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: data.error || 'Something went wrong. Please try again.' }
        })
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Something went wrong. Please try again.' }
      })
    }
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className="mb-4 font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-gray-300 text-lg">
            Ready to bring your vision to life? Contact us for a custom quote 
            and let's create something extraordinary together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="textarea-field"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {status.info.msg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-center ${
                      status.info.error
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}
                  >
                    {status.info.msg}
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}