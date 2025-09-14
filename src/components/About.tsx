'use client'

import { motion } from 'framer-motion'
import { Award, Users, Clock, Star } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Award, label: 'Years of Excellence', value: '25+' },
    { icon: Users, label: 'Satisfied Clients', value: '500+' },
    { icon: Clock, label: 'Projects Completed', value: '1000+' },
    { icon: Star, label: 'Quality Rating', value: '5.0' },
  ]

  const features = [
    {
      title: 'Premium Materials',
      description: 'We source only the finest threads, fabrics, and metals to ensure exceptional quality and longevity.',
    },
    {
      title: 'Master Craftsmanship',
      description: 'Our skilled artisans combine traditional techniques with modern precision for unparalleled results.',
    },
    {
      title: 'Custom Design',
      description: 'Every piece is tailored to your specifications, reflecting your unique identity and requirements.',
    },
  ]

  return (
    <section id="about" className="py-20 bg-navy text-ivory relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Crafting Excellence Since{' '}
              <span className="text-gold">1998</span>
            </h2>
            
            <p className="text-lg text-ivory/90 mb-8 leading-relaxed">
              At Alamra, we believe that true craftsmanship lies in the perfect marriage of 
              traditional techniques and modern innovation. For over two decades, we have been 
              creating exquisite embroidered pieces that tell stories, honor traditions, and 
              celebrate achievements.
            </p>
            
            <p className="text-ivory/80 mb-8 leading-relaxed">
              From intricate bullion work to precision badges, each piece that leaves our 
              workshop represents our unwavering commitment to quality, attention to detail, 
              and the artistry that has been passed down through generations of skilled craftspeople.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-2 h-2 bg-gold rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gold mb-2">{feature.title}</h3>
                    <p className="text-ivory/80 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-ivory/5 rounded-lg border border-gold/20 hover:border-gold/40 transition-colors duration-300"
              >
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <div className="font-playfair text-3xl font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-ivory/80 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom decorative border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
        />
      </div>
    </section>
  )
}

export default About