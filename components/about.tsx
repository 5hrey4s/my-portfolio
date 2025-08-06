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
import { Download } from "lucide-react";

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
    content: `I'm passionate about building dynamic, scalable web applications with a focus on user-centric design. My expertise lies in the MERN stack, particularly with Next.js and TypeScript, where I enjoy bridging the gap between engaging frontend interfaces and robust backend logic. I am committed to writing clean, maintainable code and am always eager to learn and adapt to the latest technologies.`,
  },
  Skills: {
    title: "Technical Proficiencies",
    content: [
      "TypeScript", "JavaScript", "Python", "Next.js", "React.js", "Node.js", "Tailwind CSS", "HTML5/CSS3", "PostgreSQL", "MySQL", "Git/GitHub", "RESTful APIs", "TDD", "AWS", "Figma", "CI/CD",
    ],
  },
  Experience: {
    title: "Professional Journey",
    content: [
      {
        role: "Trainee Software Engineer",
        company: "Winman Software, Mangalore",
        period: "Feb 2025 - Jul 2025",
        responsibilities: [
          "Contribute to internal enterprise applications to support company operations and workflows.",
          "Handle backend logic using SQL Server Management Studio (SSMS) with custom formula syntax.",
          "Collaborate with internal teams to understand requirements and implement effective backend solutions.",
        ],
      },
      {
        role: "Full Stack Development Intern",
        company: "CodeCraft Technologies",
        period: "Feb 2024 - Sep 2024",
        responsibilities: [
          "Developed and maintained full-stack web applications using React.js, Node.js, and PostgreSQL.",
          "Built responsive UI components and integrated RESTful APIs for dynamic user interactions.",
          "Participated in UI/UX design using Figma and tested application features with Postman and Storybook.",
        ],
      },
    ],
  },
  Education: {
    title: "Academic & Professional Development",
    content: [
      {
        degree: "B.E. in Artificial Intelligence & Machine Learning",
        institution: "Alvas Institute of Engineering and Technology",
        period: "2020 - 2024",
        details: "CGPA: 7.25",
      },
      {
        title: "Pre-University Course (PUC), Karnataka",
        institution: "Sri B.G.S, Balehonnur",
        period: "2018 - 2020",
        details: "Percentage: 87.8%",
      },
      {
        title: "Certifications",
        items: [
          "JavaScript Algorithms and Data Structures - Free Code Camp",
          "Responsive Web Design - Free Code Camp",
          "Internship Certificate, Full Stack Development - CodeCraft Technologies",
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
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-2/3 w-full bg-[radial-gradient(circle_500px_at_50%_200px,#31979520,transparent)]"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-teal-300 mb-8 md:mb-12 text-center">
            About Me
          </h2>

          <div className="md:hidden">
            <Accordion type="single" collapsible className="w-full" defaultValue="Overview">
              {categories.map((category) => (
                <AccordionItem key={category} value={category} className="border-b-2 border-teal-500/20">
                  <AccordionTrigger className="text-lg text-teal-300 hover:text-teal-200 transition-colors">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    {renderContent(category)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="hidden md:block">
            <div className="flex justify-center mb-6 border-b-2 border-slate-700">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`relative px-4 py-3 text-md font-medium transition-colors duration-300 ${
                    activeTab === category
                      ? "text-teal-300"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {category}
                  {activeTab === category && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400"
                      layoutId="underline"
                      // *** NEW: Smoother spring animation ***
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/50 rounded-lg p-6 shadow-lg min-h-[300px]"
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

// *** NEW: Animation variants for staggered lists ***
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};


function renderContent(category: string) {
  const data = tabContent[category];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Shreyas_resume.pdf';
    link.download = 'Shreyas_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  switch (category) {
    case "Overview":
      return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-gray-300">
          <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-semibold text-teal-300 mb-4">
            {data.title}
          </motion.h3>
          <motion.p variants={itemVariants} className="leading-relaxed">{`${data.content}`}</motion.p>
          <motion.div variants={itemVariants}>
            <Button onClick={handleDownload} className="mt-6 bg-teal-500 hover:bg-teal-600 text-black font-bold transition-transform hover:scale-105">
              Download CV <Download className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      );
    case "Skills":
      return (
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-teal-300 mb-4">
            {data.title}
          </h3>
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-wrap gap-2">
            {(data.content as string[]).map((skill) => (
              <motion.span
                key={skill}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -2 }} // *** NEW: Hover effect ***
                className="bg-teal-900/50 text-teal-300 px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      );
    case "Experience":
      return (
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-teal-300 mb-4">
            {data.title}
          </h3>
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
            {(data.content as Job[]).map((job) => (
              <motion.div variants={itemVariants} key={job.company}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-lg font-semibold text-gray-200">{job.role}</h4>
                  <p className="text-sm text-gray-400">{job.period}</p>
                </div>
                <p className="text-teal-400 mb-2">{job.company}</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 pl-2">
                  {job.responsibilities.map((resp) => (
                    <li key={resp}>{resp}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      );
    case "Education":
      return (
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-teal-300 mb-4">
            {data.title}
          </h3>
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
            {(data.content as Education[]).map((edu, index) => (
              <motion.div variants={itemVariants} key={index}>
                <h4 className="text-lg font-semibold text-gray-200">{edu.degree || edu.title}</h4>
                {edu.institution && <p className="text-teal-400">{edu.institution} | {edu.period}</p>}
                {edu.details && <p className="text-gray-300 mt-1">{edu.details}</p>}
                {edu.items && (
                  <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1 pl-2">
                    {edu.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      );
    default:
      return null;
  }
}