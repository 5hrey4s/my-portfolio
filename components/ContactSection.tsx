'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ContactSection() {
    const contactMethods = [
        {
            icon: <Mail className="w-8 h-8 text-teal-400" />,
            title: "Email",
            value: "shreyassalyan917@gmail.com",
            href: "mailto:shreyassalyan917@gmail.com"
        },
        {
            icon: <Phone className="w-8 h-8 text-teal-400" />,
            title: "Phone",
            value: "+91 8951229310",
            href: "tel:+918951229310"
        }
    ]

    const socialLinks = [
        {
            icon: <Github className="w-7 h-7" />,
            href: "https://github.com/5hrey4s/"
        },
        {
            icon: <Linkedin className="w-7 h-7" />,
            href: "https://www.linkedin.com/in/shreyas-salyan-526a9a265/"
        }
    ]

    return (
        <section id="contact" className="py-24 bg-slate-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center"
                >
                    {/* Left Column: Title and Socials */}
                    <div className="md:col-span-1 text-center md:text-left">
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 mb-4">
                            Let&apos;s Connect
                        </h2>
                        <p className="text-lg text-slate-400 mb-8">
                            Have a project in mind or just want to say hi? My inbox is always open.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-5">
                            {socialLinks.map((social, index) => (
                                <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-transform duration-300 hover:scale-110">
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Cards */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {contactMethods.map((method, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Link href={method.href} target="_blank" rel="noopener noreferrer" className="group block p-6 bg-slate-800/50 rounded-xl border border-slate-700/80 hover:border-teal-500/50 hover:bg-slate-800 transition-all duration-300 h-full">
                                    <div className="flex items-center gap-5">
                                        <div className="bg-slate-700/50 p-3 rounded-lg">
                                            {method.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-200">{method.title}</h3>
                                            <p className="text-slate-400 group-hover:text-teal-400 transition-colors duration-300">{method.value}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
