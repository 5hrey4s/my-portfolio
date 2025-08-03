"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "./textarea"
import { useToast } from "@/components/ui/use-toast"

interface HireMeModalProps {
    isOpen: boolean
    onClose: () => void
}

const HireMeModal: React.FC<HireMeModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    })
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                toast({
                    title: "Message sent successfully!",
                    description: "Thank you for reaching out. I'll get back to you soon.",
                    duration: 5000,
                })
                setFormData({ name: "", email: "", company: "", message: "" })
                onClose()
            } else {
                toast({
                    title: "Failed to send message",
                    description: "Please try again later.",
                    variant: "destructive",
                    duration: 5000,
                })
            }
        } catch (error) {
            console.error("Error:", error)
            toast({
                title: "An error occurred",
                description: "Please try again later.",
                variant: "destructive",
                duration: 5000,
            })
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* The primary change is adding classes for dark mode styling */}
            <DialogContent className="sm:max-w-[425px] bg-slate-900 text-slate-50 border-slate-700">
                <DialogHeader>
                    {/* Add classes for dark text color */}
                    <DialogTitle className="text-white">Hire Me</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Fill out this form to get in touch. I&apos;ll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        {/* Add classes for dark text color */}
                        <Label htmlFor="name" className="text-slate-400">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            // Add classes for dark input styling
                            className="mt-1 bg-slate-800 text-white border-slate-700 focus-visible:ring-offset-slate-900"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-slate-400">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 bg-slate-800 text-white border-slate-700 focus-visible:ring-offset-slate-900"
                        />
                    </div>
                    <div>
                        <Label htmlFor="company" className="text-slate-400">Company (Optional)</Label>
                        <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="mt-1 bg-slate-800 text-white border-slate-700 focus-visible:ring-offset-slate-900"
                        />
                    </div>
                    <div>
                        <Label htmlFor="message" className="text-slate-400">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="mt-1 bg-slate-800 text-white border-slate-700 focus-visible:ring-offset-slate-900"
                            rows={4}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        {/* Style the buttons to match your theme. The `variant` prop might already handle this, but you can add more classes for fine-tuning. */}
                        <Button type="button" variant="outline" onClick={onClose} className="bg-teal-500 hover:bg-teal-600 text-white font-bold border-slate-700  ">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold border-slate-700">Send Message</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default HireMeModal