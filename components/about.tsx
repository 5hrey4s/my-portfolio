"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";

// Define the shape of the tab content
interface TabContent {
  title: string;
  content: string | string[] | Job[] | Education[];
}

interface Job {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
}

interface Education {
  degree?: string;
  title?: string;
  institution?: string;
  period?: string;
  details?: string;
  items?: string[];
}

const categories = ["Overview", "Skills", "Experience", "Education"];
const tabContent: Record<string, TabContent> = {
  Overview: {
    title: "Aspiring Full-Stack Developer",
    content: `Passionate about web development with a focus on creating efficient, scalable, and user-friendly applications.
    Specializing in Next.js, React, and PostgreSQL, with strong knowledge in both front-end and back-end development.
    Committed to writing clean, maintainable code and eager to continuously learn new technologies and methodologies.`,
  },
  Skills: {
    title: "Technical Proficiencies",
    content: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "PostgreSQL",
      "Node.js",
      "Git",
      "Vitest",
      "TDD (Test-Driven Development)",
      "API Testing (Postman)",
      "RDBMS",
    ],
  },
  Experience: {
    title: "Professional Journey",
    content: [
      {
        role: "Software Development Intern",
        company: "CodeCraft Technologies",
        period: "Feb 2024 - Sep 2024",
        responsibilities: [
          "Collaborated with a team to build and enhance web applications, improving operational efficiency.",
          "Assisted in debugging and testing software, significantly improving overall code quality.",
          "Demonstrated effective problem-solving skills by resolving technical challenges during project development.",
        ],
      },
    ],
  },
  Education: {
    title: "Academic Background",
    content: [
      {
        degree: "Bachelor of Engineering in Artificial Intelligence and Machine Learning",
        institution: "Alvas Institute of Engineering and Technology",
        period: "2020 - 2024",
        details: "CGPA: 7.25",
      },
      {
        title: "Certifications",
        items: [
          "Internship Certificate - Full Stack Development Internship, CodeCraft Technologies (Sep 2024)",
        ],
      },
    ],
  },
};

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<string>("Overview");

  return (
    <section
      id="about"
      className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-6 md:mb-8 text-center">
            About Me
          </h2>

          {/* Mobile View */}
          <div className="md:hidden">
            <Accordion type="single" collapsible className="w-full">
              {categories.map((category) => (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="text-teal-400 hover:text-teal-300">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      {renderContent(category)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="flex mb-6 space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeTab === category ? "default" : "outline"}
                  onClick={() => setActiveTab(category)}
                  className={`flex-1 ${
                    activeTab === category ? "bg-teal-500 text-white" : "text-teal-400"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                {renderContent(activeTab)}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function renderContent(category: string) {
  const content = tabContent[category];

  switch (category) {
    case "Overview":
      return (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-teal-400 mb-4">
            {content.title}
          </h3>
          <p className="text-gray-300 mb-6">{`${content.content}`}</p>
          <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
            <a href="/Shreyas_resume (3) (1).pdf" download>
              Download CV <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </>
      );
    case "Skills":
      return (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-teal-400 mb-4">
            {content.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(content.content as string[]).map((skill, index) => (
              <span
                key={index}
                className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      );
    case "Experience":
      return (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-teal-400 mb-4">
            {content.title}
          </h3>
          {(content.content as Job[]).map((job, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h4 className="text-lg font-semibold text-teal-300">{job.role}</h4>
              <p className="text-gray-400">
                {job.company} | {job.period}
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      );
    case "Education":
      return (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-teal-400 mb-4">
            {content.title}
          </h3>
          {(content.content as Education[]).map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h4 className="text-lg font-semibold text-teal-300">
                {edu.degree || edu.title}
              </h4>
              {edu.institution && (
                <p className="text-gray-400">
                  {edu.institution} | {edu.period}
                </p>
              )}
              {edu.details && <p className="text-gray-300 mt-2">{edu.details}</p>}
              {edu.items && (
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  {edu.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      );
    default:
      return null;
  }
}
