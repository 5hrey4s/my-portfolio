"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
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
        sourceCode: "https://github.com/5hrey4s/splitter-app",
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


// export const projects = [
//     {
//         id: 1,
//         title: "Library Management System",
//         description: "A full-stack library management system using React.js, Next.js, and TypeScript.",
//         image: "/pexels-joshsorenson-990432.jpg",
//         tools: ["React.js", "Next.js", "TypeScript"],
//         link: "https://library-management-app-six.vercel.app/",
//         sourceCode: "https://github.com/5hrey4s/Library-management-app  "
//     },
//     {
//         id: 2,
//         title: "Bill Splitter App",
//         description: "A React-based application for splitting bills, enhancing frontend development skills.",
//         image: "/pexels-ishahidsultan-6595970.jpg",
//         tools: ["React", "Tailwind CSS", "Figma"],
//         link: "https://splitsmart.netlify.app/",
//         sourceCode: "https://github.com/5hrey4s/Bill-Splitter-App"
//     }
// ]

export default function HorizontalGallery() {
    const [currentProject, setCurrentProject] = useState(0)

    const handleNext = () => {
        setCurrentProject((prev) => (prev + 1) % projects.length)
    }

    const handlePrev = () => {
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    }

    return (
        <div className="relative h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
            <header className="absolute top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold">JD</a>
                    <nav className="hidden md:flex space-x-6">
                        {['Home', 'Projects', 'Contact'].map((item) => (
                            <a key={item} href="#" className="hover:text-gray-300 transition-colors">{item}</a>
                        ))}
                    </nav>
                </div>
            </header>

            <div className="h-screen flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {projects.map((project, index) => (
                        currentProject === index && (
                            <motion.div
                                key={project.id}
                                className="w-full max-w-4xl p-8 flex flex-col md:flex-row items-center gap-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-full md:w-1/2 aspect-video relative rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src={project.image}
                                        alt="Description"
                                        fill
                                        className="object-cover" // Use CSS for object fit
                                    />
                                </div>
                                <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                                    <h2 className="text-3xl font-bold">{project.title}</h2>
                                    <p className="text-gray-300">{project.description}</p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                        {project.tools.map((tool) => (
                                            <span key={tool} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                                        <Link href={project.link} passHref>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                View Project
                                            </Button>
                                        </Link>
                                        <Link href={project.sourceCode} passHref>
                                            <Button variant="outline" className='text-black'>
                                                <Code className="w-4 h-4 mr-2 text-black" />
                                                Source Code
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentProject(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentProject === index ? 'bg-blue-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>

            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-700/50 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Previous project"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-700/50 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Next project"
            >
                <ChevronRight className="h-6 w-6" />
            </button>
        </div>
    )
}