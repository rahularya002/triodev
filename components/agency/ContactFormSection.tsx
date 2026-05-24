"use client";

import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactFormSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      budget: String(formData.get("budget") ?? "").trim(),
      brief: String(formData.get("brief") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.brief) {
      setStatus("error");
      setMessage("Please fill in name, email, and project brief.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Unable to submit inquiry right now.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Thanks! We will get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again in a moment.");
    }
  };

  return (
    <section
      id="contact"
      className="section-item rounded-3xl border border-(--primary)/16 bg-(--surface) p-6 md:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Let us build your next webapp</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-(--muted)">
            Share your idea, timeline, and goals. We will send back a project approach
            with clear scope and phases.
          </p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-xs tracking-[0.14em] text-(--muted) uppercase">
              Name
              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="rounded-xl border border-(--primary)/20 bg-(--bg) px-4 py-3 text-sm tracking-normal text-(--fg) outline-none transition focus:border-(--primary)/45 focus-visible:ring-2 focus-visible:ring-(--primary)/35"
              />
            </label>
            <label className="grid gap-2 text-xs tracking-[0.14em] text-(--muted) uppercase">
              Email
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                className="rounded-xl border border-(--primary)/20 bg-(--bg) px-4 py-3 text-sm tracking-normal text-(--fg) outline-none transition focus:border-(--primary)/45 focus-visible:ring-2 focus-visible:ring-(--primary)/35"
              />
            </label>
          </div>
          <label className="grid gap-2 text-xs tracking-[0.14em] text-(--muted) uppercase">
            Budget
            <input
              name="budget"
              type="text"
              placeholder="e.g. $15k - $30k"
              className="rounded-xl border border-(--primary)/20 bg-(--bg) px-4 py-3 text-sm tracking-normal text-(--fg) outline-none transition focus:border-(--primary)/45 focus-visible:ring-2 focus-visible:ring-(--primary)/35"
            />
          </label>
          <label className="grid gap-2 text-xs tracking-[0.14em] text-(--muted) uppercase">
            Project Brief
            <textarea
              name="brief"
              placeholder="Tell us about your product, users, and timelines..."
              rows={5}
              required
              className="rounded-xl border border-(--primary)/20 bg-(--bg) px-4 py-3 text-sm tracking-normal text-(--fg) outline-none transition focus:border-(--primary)/45 focus-visible:ring-2 focus-visible:ring-(--primary)/35"
            />
          </label>
          <p
            aria-live="polite"
            role="status"
            className={[
              "min-h-5 text-sm",
              status === "success"
                ? "text-(--primary)"
                : status === "error"
                  ? "text-red-600 dark:text-red-400"
                  : "text-(--muted)",
            ].join(" ")}
          >
            {message}
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="hero-cta mt-1 w-fit rounded-full bg-(--primary) px-7 py-3 text-sm font-medium tracking-[0.14em] text-[#f6f4ed] uppercase transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
