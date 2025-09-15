'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface ProcessStep {
  id: number
  title: string
  description: string
  icon: string
  details: string[]
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Design & Consultation",
    description: "We work with you to create the perfect design that meets your vision and requirements.",
    icon: "✏️",
    details: [
      "Initial consultation and requirements gathering",
      "Custom design creation or modification",
      "Digital mockup and approval process",
      "Material and thread selection"
    ]
  },
  {
    id: 2,
    title: "Digitization",
    description: "Your design is converted into a digital embroidery file with precise stitch patterns.",
    icon: "💻",
    details: [
      "Professional digitization software",
      "Stitch type and density optimization",
      "Color mapping and thread selection",
      "Quality control and testing"
    ]
  },
  {
    id: 3,
    title: "Production Setup",
    description: "Our skilled technicians prepare the embroidery machines and materials for production.",
    icon: "⚙️",
    details: [
      "Machine calibration and setup",
      "Thread loading and tension adjustment",
      "Fabric preparation and hooping",
      "Test run and quality verification"
    ]
  },
  {
    id: 4,
    title: "Embroidery Process",
    description: "High-precision embroidery machines bring your design to life with exceptional quality.",
    icon: "🧵",
    details: [
      "Automated embroidery execution",
      "Real-time quality monitoring",
      "Multi-color thread changes",
      "Precision stitch placement"
    ]
  },
  {
    id: 5,
    title: "Finishing & Quality Control",
    description: "Each piece undergoes thorough inspection and professional finishing touches.",
    icon: "✨",
    details: [
      "Thread trimming and cleanup",
      "Quality inspection checklist",
      "Steam pressing and finishing",
      "Final packaging preparation"
    ]
  },
  {
    id: 6,
    title: "Delivery",
    description: "Your completed embroidery is carefully packaged and delivered to your specifications.",
    icon: "📦",
    details: [
      "Professional packaging",
      "Quality documentation",
      "Delivery coordination",
      "Customer satisfaction follow-up"
    ]
  }
]

export function OurProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    }
  }

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom section-padding relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-primary-600">Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial concept to final delivery, we follow a meticulous process to ensure 
            every embroidery project meets the highest standards of quality and craftsmanship.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="relative mb-16"
          initial="hidden"
          animate={controls}
        >
          <div className="h-1 bg-gray-200 rounded-full mx-auto max-w-4xl">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full origin-left"
              variants={progressVariants}
            />
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={stepVariants}
              className="group cursor-pointer"
              onHoverStart={() => setActiveStep(step.id)}
              onHoverEnd={() => setActiveStep(null)}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`
                relative p-8 rounded-2xl border-2 transition-all duration-300
                ${activeStep === step.id 
                  ? 'border-primary-500 bg-white shadow-2xl shadow-primary-500/20' 
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-xl'
                }
              `}>
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {step.id}
                </div>

                {/* Icon */}
                <motion.div 
                  className="text-4xl mb-4 flex justify-center"
                  variants={iconVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details - Show on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeStep === step.id ? 1 : 0,
                      height: activeStep === step.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-100">
                      <ul className="text-sm text-gray-500 space-y-2 text-left">
                        {step.details.map((detail, idx) => (
                          <motion.li 
                            key={idx}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: activeStep === step.id ? 1 : 0,
                              x: activeStep === step.id ? 0 : -10
                            }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="text-primary-500 mr-2 mt-1">•</span>
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`
                  absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
                  ${activeStep === step.id 
                    ? 'bg-gradient-to-br from-primary-50/50 to-primary-100/30 opacity-100' 
                    : 'opacity-0'
                  }
                `} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 1.2 }
            }
          }}
        >
          <motion.button
            className="btn-primary text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project Today
            <motion.span 
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}