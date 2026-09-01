import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  getProjectTypeLabel,
  getTimelineLabel,
  projectTypeOptions,
  timelineOptions,
  type ProjectType,
  type TimelineOption,
} from "@/data/contact";

interface ContactPayload {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  currentWebsite?: string;
  businessDescription: string;
  projectGoals: string;
  projectType: ProjectType;
  timeline: TimelineOption;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidProjectType(value: string): value is ProjectType {
  return projectTypeOptions.some((option) => option.value === value);
}

function isValidTimeline(value: string): value is TimelineOption {
  return timelineOptions.some((option) => option.value === value);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
      projectType,
      timeline,
    } = body;

    if (
      !name?.trim() ||
      !businessName?.trim() ||
      !email?.trim() ||
      !businessDescription?.trim() ||
      !projectGoals?.trim() ||
      !projectType ||
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

    if (!isValidProjectType(projectType)) {
      return NextResponse.json(
        { error: "Please select a project type." },
        { status: 400 }
      );
    }

    if (!isValidTimeline(timeline)) {
      return NextResponse.json(
        { error: "Please select a timeline." },
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

    const projectTypeLabel = getProjectTypeLabel(projectType);
    const timelineLabel = getTimelineLabel(timeline);
    const safeName = escapeHtml(name.trim());
    const safeBusiness = escapeHtml(businessName.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone?.trim() || "Not provided");
    const safeWebsite = currentWebsite?.trim()
      ? escapeHtml(currentWebsite.trim())
      : "Not provided";
    const safeDescription = escapeHtml(businessDescription.trim());
    const safeGoals = escapeHtml(projectGoals.trim());

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email.trim(),
      subject: `New project inquiry — ${businessName.trim()}`,
      text: [
        `New project inquiry from ${name.trim()}`,
        "",
        `Name: ${name.trim()}`,
        `Business: ${businessName.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone?.trim() || "Not provided"}`,
        `Current website: ${currentWebsite?.trim() || "Not provided"}`,
        `Project type: ${projectTypeLabel}`,
        `Timeline: ${timelineLabel}`,
        "",
        "What does your business do?",
        businessDescription.trim(),
        "",
        "What are they looking for?",
        projectGoals.trim(),
      ].join("\n"),
      html: `
        <h2>New project inquiry from ${safeName}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px 0;color:#666;">Name</td><td style="padding:8px 0;"><strong>${safeName}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Business</td><td style="padding:8px 0;"><strong>${safeBusiness}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${safePhone}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Current website</td><td style="padding:8px 0;">${safeWebsite}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Project type</td><td style="padding:8px 0;">${escapeHtml(projectTypeLabel)}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Timeline</td><td style="padding:8px 0;">${escapeHtml(timelineLabel)}</td></tr>
        </table>
        <h3>What does your business do?</h3>
        <p>${safeDescription.replace(/\n/g, "<br>")}</p>
        <h3>What are they looking for?</h3>
        <p>${safeGoals.replace(/\n/g, "<br>")}</p>
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
