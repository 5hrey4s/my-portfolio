// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, company, message } = await request.json();
    console.log(process.env.NEXT_PUBLIC_EMAIL_USER)
    console.log(process.env.NEXT_PUBLIC_EMAIL_PASS) 
    console.log(process.env.NEXT_PUBLIC_EMAIL_USER, process.env.NEXT_PUBLIC_EMAIL_PASS)
  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email to receive messages
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
