"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  description: string
  image: string
  tools: string[]
  link: string
  sourceCode: string
  features: string[]
  challenges: string[]
  learnings: string[]
  futureImprovements: string[]
}

interface ProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  initialProjectIndex: number
}

export default function ResponsiveProjectDialog({ isOpen, onClose, projects, initialProjectIndex }: ProjectDialogProps) {
  const [currentProject, setCurrentProject] = useState(initialProjectIndex)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleNext = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
    setExpandedSection(null)
  }

  const handlePrev = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    setExpandedSection(null)
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const project = projects[currentProject]

  const AccordionSection = ({ title, items }: { title: string; items: string[] }) => (
    <div className="border-b border-gray-700">
      <button
        className="w-full py-4 px-2 flex justify-between items-center text-left"
        onClick={() => toggleSection(title)}
      >
        <span className="text-teal-400 font-medium">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-teal-400 transition-transform ${
            expandedSection === title ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {expandedSection === title && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside py-2 px-4 text-sm text-gray-300">
              {items.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const ProjectList = ({ items }: { items: string[] }) => (
    <ul className="list-disc list-inside space-y-2 text-sm">
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="text-gray-300"
        >
          {item}
        </motion.li>
      ))}
    </ul>
  )

  const ProjectTags = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full text-xs"
        >
          {item}
        </motion.span>
      ))}
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[900px] h-[90vh] p-0 bg-gray-900 text-white">
        <div className="h-full flex flex-col">
          <DialogHeader className="p-4 sm:p-6 flex-shrink-0 border-b border-gray-800">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-400">{project.title}</DialogTitle>
            <p className="text-sm sm:text-base text-gray-300 mt-2">{project.description}</p>
          </DialogHeader>
          <div className="flex-grow overflow-auto p-4 sm:p-6">
            {isMobile ? (
              <>
                <AccordionSection title="Features" items={project.features} />
                <AccordionSection title="Technologies" items={project.tools} />
                <AccordionSection title="Challenges" items={project.challenges} />
                <AccordionSection title="Learnings" items={project.learnings} />
                <AccordionSection title="Future Improvements" items={project.futureImprovements} />
              </>
            ) : (
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-4 sm:mb-6 gap-1 sm:gap-2">
                  <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
                  <TabsTrigger value="technologies" className="text-xs sm:text-sm">Tech</TabsTrigger>
                  <TabsTrigger value="challenges" className="text-xs sm:text-sm">Challenges</TabsTrigger>
                  <TabsTrigger value="learnings" className="text-xs sm:text-sm">Learnings</TabsTrigger>
                  <TabsTrigger value="improvements" className="text-xs sm:text-sm">Future</TabsTrigger>
                </TabsList>
                <TabsContent value="features">
                  <ProjectList items={project.features} />
                </TabsContent>
                <TabsContent value="technologies">
                  <ProjectTags items={project.tools} />
                </TabsContent>
                <TabsContent value="challenges">
                  <ProjectList items={project.challenges} />
                </TabsContent>
                <TabsContent value="learnings">
                  <ProjectList items={project.learnings} />
                </TabsContent>
                <TabsContent value="improvements">
                  <ProjectList items={project.futureImprovements} />
                </TabsContent>
              </Tabs>
            )}
          </div>
          <div className="flex flex-col p-4 sm:p-6 border-t border-gray-800 space-y-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            <Button
                            variant="outline"
                            size="sm"
                            className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-gray-900"
                            asChild
                        >
                            <Link href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                GitHub
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-gray-900"
                            asChild
                        >
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                            </Link>
                        </Button>
            </div>
            <div className="flex items-center justify-between w-full">
              <Button
                onClick={handlePrev}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800 text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Prev
              </Button>
              <span className="text-gray-400 text-xs sm:text-sm">
                {currentProject + 1} / {projects.length}
              </span>
              <Button
                onClick={handleNext}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800 text-sm"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}