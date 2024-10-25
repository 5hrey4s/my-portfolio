"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Linkedin, Mail, Github } from 'lucide-react'
import AboutSection from './about'
import ProjectCard from './ProjectCard'
import ContactSection from './ContactSection'

const projects = [
  {
    id: 1,
    title: "Library Management App",
    description: "A scalable library management system utilizing modern technologies and best practices.",
    image: "/pexels-joshsorenson-990432.jpg",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vitest"],
    link: "https://library-management-app-six.vercel.app/",
    sourceCode: "https://github.com/5hrey4s/Library-management-app",
    features: [
      "Role-based access control for administrators",
      "Google and credentials-based authentication with NextAuth",
      "Search, pagination, sorting, and role-based access",
      "Test-driven development with Vitest"
    ],
    challenges: [
      "Implementing robust authentication and role-based access control",
      "Ensuring scalability of database with Vercel PostgreSQL",
      "Deploying for global accessibility with Vercel"
    ],
    learnings: [
      "Advanced authentication with NextAuth",
      "Test-driven development using Vitest",
      "Optimizing database for scalability with Vercel PostgreSQL"
    ],
    futureImprovements: [
      "Add support for additional library features such as e-books",
      "Enhance admin dashboard with more controls",
      "Improve user interface for a more intuitive experience"
    ]
  },
  {
    id: 2,
    title: "Splitter App",
    description: "A responsive React-based web application designed for bill splitting.",
    image: "/pexels-ishahidsultan-6595970.jpg",
    tools: ["React", "Tailwind CSS", "Figma", "Storybook"],
    link: "https://splitter-app.vercel.app/",
    sourceCode: "https://github.com/5hrey4s/bill-splitter-app",
    features: [
      "Calculate and display total bill per person",
      "Responsive UI for different screen sizes",
      "Tested UI components with Storybook"
    ],
    challenges: [
      "Designing a user-friendly interface with Figma",
      "Implementing responsive design with Tailwind CSS",
      "Ensuring accurate calculations for bill splitting"
    ],
    learnings: [
      "UI/UX design using Figma",
      "Component testing with Storybook",
      "Responsive design with Tailwind CSS"
    ],
    futureImprovements: [
      "Add more customizable options for bill splitting",
      "Integrate with payment gateways for seamless transactions",
      "Allow users to save and track bill histories"
    ]
  }
];

export default function PortfolioPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const homeRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const navItems = useMemo(() => [
    { name: 'Home', ref: homeRef },
    { name: 'About', ref: aboutRef },
    { name: 'Projects', ref: projectsRef },
    { name: 'Contact', ref: contactRef }
  ], [homeRef, aboutRef, projectsRef, contactRef])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      const currentSection = navItems.find(item => {
        if (item.ref.current) {
          const rect = item.ref.current.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.name.toLowerCase())
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const yOffset = -80 // Adjust this value based on your header height
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="fixed inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/jeremy-bishop-G9i_plbfDgk-unsplash.jpg"
            alt="Background"
            fill
            quality={100}
            className="opacity-50 object-cover" // Use 'object-cover' for CSS object-fit
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90 backdrop-blur-xl"></div>
      </div>


      <div className="relative z-10">
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-teal-400 hover:text-teal-300 transition-colors duration-200">
                  SS
                </Link>

              </motion.div>

              <nav className="hidden md:flex space-x-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.ref)}
                      className={`text-gray-300 hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-200 ${activeSection === item.name.toLowerCase() ? 'bg-teal-500/20 text-teal-400' : ''}`}
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                className="hidden md:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Hire Me
                </Button>
              </motion.div>
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  className="text-white hover:bg-teal-500/20 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.ref)}
                      className="text-white hover:text-teal-400 px-3 py-2 text-2xl font-medium tracking-wide transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                >
                  <Button
                    className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                    onClick={() => {
                      scrollToSection(contactRef)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Hire Me
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10">
          <section ref={homeRef} id="home" className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-4 text-teal-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Hi, I&apos;m Shreyas Salyan
              </motion.h1>
              <motion.h2
                className="text-2xl md:text-3xl mb-8 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Full-Stack Developer
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-12 text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Creating seamless digital experiences
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Hire Me
                </Button>
              </motion.div>
            </div>
          </section>

          <section ref={aboutRef} id="about" className="py-20">
            <AboutSection />
          </section>

          <section ref={projectsRef} id="projects" className="px-4 sm:px-6 lg:px-8 py-24">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-4">Featured Projects</h2>
                <p className="text-xl text-gray-300">Explore some of my recent work</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    image={project.image}
                    tags={project.tools}
                    githubLink={project.sourceCode}
                    liveLink={project.link}
                    allProjects={projects}
                    description={project.description}
                    id={project.id}
                    title={project.title}
                    tools={project.tools}
                  />
                ))}
              </div>
            </div>
          </section>

          <section ref={contactRef} id="contact">
            <ContactSection />
          </section>
        </main>

        <footer className="relative z-10 bg-gray-900/80 backdrop-blur-sm py-6 px-4 sm:px-6 lg:px-8 text-white">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Shreyas Salyan. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/5hrey4s/" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/shreyas-salyan-526a9a265/" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:shreyassalyan917@gmail.com" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}