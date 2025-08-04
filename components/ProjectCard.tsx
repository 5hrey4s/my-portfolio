'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Eye } from 'lucide-react'
import Link from 'next/link'
import ResponsiveProjectDialog from './project-dialog'

// The props interface remains the same for easy integration
interface ProjectCardProps {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    githubLink: string
    liveLink: string
    allProjects: {
        id: number;
        title: string;
        description: string;
        image: string;
        tools: string[];
        link: string;
        sourceCode: string;
        features: string[];
        challenges: string[];
        learnings: string[];
        futureImprovements: string[];
    }[]
}

export default function ProjectCard({ id, title, description, image, tags, githubLink, liveLink, allProjects }: ProjectCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <motion.div
                className="group relative bg-slate-900/50 rounded-xl overflow-hidden h-full flex flex-col shadow-lg border border-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="relative h-52 w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* --- Interactive Overlay on Hover --- */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-teal-500 hover:bg-teal-600 text-white w-32"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            View More
                        </Button>
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                className="text-slate-200 border-slate-200/50 hover:bg-slate-200 hover:text-slate-900 rounded-full"
                                asChild
                            >
                                <Link href={githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <Github className="w-5 h-5" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="text-slate-200 border-slate-200/50 hover:bg-slate-200 hover:text-slate-900 rounded-full"
                                asChild
                            >
                                <Link href={liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                    <ExternalLink className="w-5 h-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm mb-4 flex-grow">{description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
            <ResponsiveProjectDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                projects={allProjects}
                initialProjectIndex={allProjects.findIndex(p => p.id === id)}
            />
        </>
    )
}
