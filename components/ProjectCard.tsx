"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Eye } from 'lucide-react'
import ProjectDialog from './project-dialog'
import Link from 'next/link'

interface ProjectCardProps {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    githubLink: string
    liveLink: string
    tools: string[]
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
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="relative h-48">
                    <Image
                        src={image}
                        alt="Description"
                        fill
                        className="object-cover" // Use CSS for object fit
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-teal-400 mb-2">{title}</h3>
                    <p className="text-gray-300 mb-4 flex-grow">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                    <Button
                            variant="outline"
                            size="sm"
                            className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-gray-900"
                            asChild
                        >
                            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
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
                            <Link href={liveLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                            </Link>
                        </Button>

                    </div>
                    <Button
                        variant="default"
                        size="sm"
                        className="mt-4 bg-teal-500 hover:bg-teal-600 text-white"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View More
                    </Button>
                </div>
            </motion.div>
            <ProjectDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                projects={allProjects}
                initialProjectIndex={allProjects.findIndex(p => p.id === id)}
            />
        </>
    )
}