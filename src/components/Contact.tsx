'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormStatus {
  submitted: boolean
  submitting: boolean
  info: { error: boolean; msg: string | null }
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [status, setStatus] = useState<FormStatus>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
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
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.status === 200) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Thank you for your message! We\'ll get back to you soon.' }
        })
        setFormData({ name: '', email: '', message: '' })
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

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@alamra.com',
      href: 'mailto:hello@alamra.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Toronto, Ontario',
      href: '#'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-ivory">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-6">
            Let's Create Something{' '}
            <span className="text-gold">Extraordinary</span>
          </h2>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch with us to discuss 
            your custom embroidery project and discover how we can exceed your expectations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-playfair text-2xl font-semibold text-navy mb-6">
                Get in Touch
              </h3>
              <p className="text-navy/70 mb-8 leading-relaxed">
                Whether you need a single custom piece or a large order, we're here to help. 
                Our team of experts will work closely with you to ensure every detail meets 
                your exact specifications.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-navy/5 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-navy group-hover:text-gold transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-sm text-navy/60 font-medium">{item.label}</div>
                    <div className="text-navy font-semibold">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-navy/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-navy/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-navy/20 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project, including quantity, timeline, and any specific requirements..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status.submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact