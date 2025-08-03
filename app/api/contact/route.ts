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
      from: process.env.NEXT_PUBLIC_EMAIL_USER, // Your email will still be the sender
      to: process.env.NEXT_PUBLIC_EMAIL_USER, // Your email where the contact form is sent
      replyTo: email, // This is the user's email for the reply
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.5;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f9f9f9;
              }
              h2 {
                color: #0056b3;
                text-align: center;
              }
              .content {
                padding: 15px;
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
              }
              .field {
                margin-bottom: 10px;
              }
              .field span {
                font-weight: bold;
              }
              .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 0.9em;
                color: #777;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>New Contact Form Submission</h2>
              <div class="content">
                <div class="field">
                  <span>Name:</span> ${name}
                </div>
                <div class="field">
                  <span>Email:</span> ${email}
                </div>
                <div class="field">
                  <span>Company:</span> ${company}
                </div>
                <div class="field">
                  <span>Message:</span><br />${message}
                </div>
              </div>
              <div class="footer">
                <p>This email was generated automatically. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
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
