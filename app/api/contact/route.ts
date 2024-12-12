import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Get request body
    const { name, email, company, message } = await request.json();

    // Basic validation
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can replace this with any email service
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER, // Make sure this is without NEXT_PUBLIC_
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // Make sure this is without NEXT_PUBLIC_
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.NEXT_PUBLIC_EMAIL_USER, // Your email to receive messages
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`,
    };

    // Send email
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: `${error}`, }, { status: 500 });
  }
}
