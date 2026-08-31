import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { BudgetOption, TimelineOption } from "@/data/contact";

interface ContactPayload {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  currentWebsite?: string;
  businessDescription: string;
  projectGoals: string;
  budget: BudgetOption;
  timeline: TimelineOption;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const {
      name,
      businessName,
      email,
      phone,
      currentWebsite,
      businessDescription,
      projectGoals,
      budget,
      timeline,
    } = body;

    if (
      !name?.trim() ||
      !businessName?.trim() ||
      !email?.trim() ||
      !businessDescription?.trim() ||
      !projectGoals?.trim() ||
      !budget ||
      !timeline
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY || !toEmail || !fromEmail) {
      console.error("Missing Resend configuration");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New project inquiry — ${businessName}`,
      text: [
        `New project inquiry from ${name}`,
        "",
        `Name: ${name}`,
        `Business: ${businessName}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Current website: ${currentWebsite || "Not provided"}`,
        `Budget: ${budget}`,
        `Timeline: ${timeline}`,
        "",
        "What does your business do?",
        businessDescription,
        "",
        "What are they looking for?",
        projectGoals,
      ].join("\n"),
      html: `
        <h2>New project inquiry from ${name}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px 0;color:#666;">Name</td><td style="padding:8px 0;"><strong>${name}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Business</td><td style="padding:8px 0;"><strong>${businessName}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Current website</td><td style="padding:8px 0;">${currentWebsite ? `<a href="${currentWebsite}">${currentWebsite}</a>` : "Not provided"}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Budget</td><td style="padding:8px 0;">${budget}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Timeline</td><td style="padding:8px 0;">${timeline}</td></tr>
        </table>
        <h3>What does your business do?</h3>
        <p>${businessDescription.replace(/\n/g, "<br>")}</p>
        <h3>What are they looking for?</h3>
        <p>${projectGoals.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
