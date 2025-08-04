'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Github, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
    const [currentProjectIndex, setCurrentProjectIndex] = useState(initialProjectIndex)
    const [expandedSection, setExpandedSection] = useState<string | null>('Features') // Default to open
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768) // Use md breakpoint for layout change
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (isOpen) {
            setCurrentProjectIndex(initialProjectIndex);
        }
    }, [initialProjectIndex, isOpen]);

    const handleNext = () => {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
        setExpandedSection('Features')
    }

    const handlePrev = () => {
        setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
        setExpandedSection('Features')
    }

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section)
    }

    const project = projects[currentProjectIndex]

    if (!project) return null;

    // --- Reusable components for mobile and desktop ---
    const AccordionSection = ({ title, items }: { title: string; items: string[] }) => (
        <div className="border-b border-slate-700/50 last:border-b-0">
            <button
                className="w-full py-4 flex justify-between items-center text-left"
                onClick={() => toggleSection(title)}
            >
                <span className="text-teal-400 font-semibold text-base">{title}</span>
                <ChevronDown
                    className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
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
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <ul className="list-disc list-inside pb-4 pl-2 space-y-2 text-slate-300">
                            {items.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

    const ProjectList = ({ items }: { items: string[] }) => (
        <ul className="list-disc list-inside space-y-2 text-slate-300">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    )

    const ProjectTags = ({ items }: { items: string[] }) => (
        <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
                <span key={index} className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                    {item}
                </span>
            ))}
        </div>
    )

    const contentTabs = (
        <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-2 bg-slate-800/50 p-1 rounded-lg">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="technologies">Tech</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="learnings">Learnings</TabsTrigger>
                <TabsTrigger value="improvements">Future</TabsTrigger>
            </TabsList>
            <div className="mt-4 p-4 bg-black/20 rounded-lg min-h-[250px]">
                <TabsContent value="features"><ProjectList items={project.features} /></TabsContent>
                <TabsContent value="technologies"><ProjectTags items={project.tools} /></TabsContent>
                <TabsContent value="challenges"><ProjectList items={project.challenges} /></TabsContent>
                <TabsContent value="learnings"><ProjectList items={project.learnings} /></TabsContent>
                <TabsContent value="improvements"><ProjectList items={project.futureImprovements} /></TabsContent>
            </div>
        </Tabs>
    );

    const contentAccordion = (
         <div className="space-y-2">
            <AccordionSection title="Features" items={project.features} />
            <AccordionSection title="Technologies" items={project.tools} />
            <AccordionSection title="Challenges" items={project.challenges} />
            <AccordionSection title="Learnings" items={project.learnings} />
            <AccordionSection title="Future Improvements" items={project.futureImprovements} />
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
            <DialogContent className="max-w-[95vw] md:max-w-6xl h-[90vh] p-0 bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 text-white rounded-2xl flex flex-col md:flex-row">
                {/* --- LEFT COLUMN (Image & Core Info) --- */}
                <div className="w-full md:w-1/3 flex flex-col h-full">
                    <div className="relative h-48 md:h-56 w-full flex-shrink-0">
                        <Image src={project.image} alt={project.title} fill className="object-cover md:rounded-l-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
                         <DialogHeader className="absolute bottom-0 left-0 p-6">
                            <DialogTitle className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">{project.title}</DialogTitle>
                        </DialogHeader>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <p className="text-slate-400 mb-6 text-sm">{project.description}</p>
                        <div className="mt-auto space-y-4">
                             <div className="flex gap-4">
                                 <Button asChild variant="outline" className="w-full border-teal-400/50 text-teal-400 hover:bg-teal-400 hover:text-slate-900"><Link href={project.sourceCode} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-2" />Source</Link></Button>
                                 <Button asChild variant="outline" className="w-full border-teal-400/50 text-teal-400 hover:bg-teal-400 hover:text-slate-900"><Link href={project.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 mr-2" />Demo</Link></Button>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <Button onClick={handlePrev} variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10"><ChevronLeft className="w-5 h-5" /> Prev</Button>
                                <span className="text-slate-400 text-sm font-mono">{currentProjectIndex + 1} / {projects.length}</span>
                                <Button onClick={handleNext} variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">Next <ChevronRight className="w-5 h-5" /></Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN (Tabs & Accordion) --- */}
                <div className="w-full md:w-2/3 flex-grow overflow-y-auto p-6 border-t md:border-t-0 md:border-l border-slate-700/50">
                    {isMobile ? contentAccordion : contentTabs}
                </div>

                 <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full z-10">
                    <X className="w-6 h-6" />
                </Button>
            </DialogContent>
        </Dialog>
    )
}
