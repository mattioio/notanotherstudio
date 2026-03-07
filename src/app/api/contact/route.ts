import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { name, company, email, interests, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email send");
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Not Another Studio <hello@notanotherstudio.co.uk>",
    to: ["hello@notanotherstudio.co.uk"],
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` at ${company}` : ""}`,
    text: [
      `Name: ${name}`,
      company ? `Company: ${company}` : "",
      `Email: ${email}`,
      interests?.length ? `Interested in: ${interests.join(", ")}` : "",
      message ? `\nMessage:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
