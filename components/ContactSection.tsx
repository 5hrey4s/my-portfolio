import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        ><h2 className="text-4xl font-bold text-teal-400 mb-8">Let&apos;s Connect</h2>
        <p className="text-lg text-gray-300 mb-8">
          I&apos;m currently looking for new opportunities. My inbox is always open. Whether you have a question or just want to say hi.
        </p>
        
          <div className="space-y-4">
            <div className="flex items-center justify-center text-gray-300">
              <Mail className="w-6 h-6 mr-4 text-teal-400" />
              <a href="mailto:shreyassalyan917@gmail.com" className="hover:text-teal-400 transition-colors">
                shreyassalyan917@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center text-gray-300">
              <Phone className="w-6 h-6 mr-4 text-teal-400" />
              <a href="tel:+918951229310" className="hover:text-teal-400 transition-colors">
                +91 8951229310
              </a>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="https://github.com/5hrey4s/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors">
              <Github className="w-8 h-8" />
            </a>
            <a href="https://www.linkedin.com/in/shreyas-salyan-526a9a265/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}