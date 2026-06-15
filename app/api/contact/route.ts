import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email/contact";
import { createServiceRoleClient } from "@/lib/supabase/server";

type ContactPayload = {
  name?: string;
  email?: string;
  budget?: string;
  brief?: string;
  website?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const budget = body.budget?.trim() ?? "";
  const brief = body.brief?.trim() ?? "";
  const website = body.website?.trim() ?? "";

  if (website) {
    return NextResponse.json({ message: "Request received." }, { status: 200 });
  }

  if (!name || !email || !brief) {
    return NextResponse.json(
      { message: "Name, email, and project brief are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (brief.length < 20) {
    return NextResponse.json(
      { message: "Project brief is too short. Please share a bit more context." },
      { status: 400 }
    );
  }

  if (brief.length > 2000) {
    return NextResponse.json(
      { message: "Project brief is too long. Keep it under 2000 characters." },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  if (!supabase) {
    console.error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
    return NextResponse.json(
      { message: "Contact form is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("contact_inquiries").insert({
    name,
    email,
    budget: budget || null,
    brief,
  });

  if (error) {
    console.error("Failed to save contact inquiry", error);
    return NextResponse.json(
      { message: "Unable to submit inquiry right now. Please try again." },
      { status: 500 }
    );
  }

  const emailResult = await sendContactNotification({ name, email, budget, brief });

  if (!emailResult.sent) {
    console.warn("Contact inquiry saved but email notification was not sent.", emailResult);
  }

  return NextResponse.json(
    {
      message: "Inquiry sent successfully. Triodev will reach out within 24 hours.",
    },
    { status: 200 }
  );
}
