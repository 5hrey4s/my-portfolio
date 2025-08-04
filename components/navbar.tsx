'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Effect to handle scroll detection for styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = ['Home', 'About', 'Projects', 'Contact'];

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                            SS
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-6">
                            {navLinks.map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-slate-300 hover:text-teal-400 transition-colors duration-200 text-sm font-medium"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                        <Button
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105"
                            asChild
                        >
                            <Link href="#contact">Hire Me</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            className="text-slate-300 hover:text-teal-400"
                        >
                            <Menu className="h-7 w-7" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                        className="absolute top-6 right-6 text-slate-400 hover:text-white"
                    >
                        <X className="h-8 w-8" />
                    </Button>

                    <nav className="flex flex-col items-center space-y-8">
                        {navLinks.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link
                                    href={`#${item.toLowerCase()}`}
                                    className="text-3xl font-semibold text-slate-200 hover:text-teal-400 transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="mt-12"
                     >
                        <Button
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg"
                            asChild
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Link href="#contact">Hire Me</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </header>
    )
}
