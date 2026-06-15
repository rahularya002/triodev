import { Resend } from "resend";

type ContactEmailPayload = {
  name: string;
  email: string;
  budget: string;
  brief: string;
};

export async function sendContactNotification({
  name,
  email,
  budget,
  brief,
}: ContactEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    return { sent: false, reason: "missing_config" as const };
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Triodev <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [notifyEmail],
    replyTo: email,
    subject: `New Triodev inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Budget: ${budget || "Not provided"}`,
      "",
      "Project brief:",
      brief,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend email failed", error);
    return { sent: false, reason: "send_failed" as const };
  }

  return { sent: true as const };
}
