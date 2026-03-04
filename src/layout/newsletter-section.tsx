"use client";

import { useState } from "react";
import { strings } from "@/shared/lib/strings";
import { useAnalytics } from "@/modules/analytics/hooks/use-analytics";
import { ANALYTICS_EVENTS } from "@/modules/analytics/domain/constants";

type FormStatus = "idle" | "loading" | "success" | "error";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const { track } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        track(ANALYTICS_EVENTS.NEWSLETTER_SUBSCRIBED);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-brand text-surface border-t-4 border-ink px-6 md:px-12 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-sans font-black text-4xl md:text-6xl uppercase leading-[0.95] tracking-tighter mb-6">
          {strings.newsletter.heading1}
          <br />
          {strings.newsletter.heading2}
        </h2>
        <p className="font-mono text-sm uppercase tracking-widest mb-8 text-surface/90">
          {strings.newsletter.subtitle}
        </p>

        {status === "success" ? (
          <p className="font-mono font-bold uppercase tracking-widest text-lg">
            {strings.newsletter.success}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {strings.newsletter.placeholder}
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={strings.newsletter.placeholder}
              className="grow border-2 border-surface bg-transparent p-4 font-mono text-sm text-surface placeholder:text-surface/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              className="w-full sm:w-auto bg-surface text-brand font-sans font-black uppercase px-6 py-4 text-sm border-2 border-surface hover:bg-ink hover:text-surface hover:border-ink transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : strings.newsletter.submit}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="font-mono text-sm mt-3 text-surface/80 uppercase tracking-widest">
            {strings.newsletter.error}
          </p>
        )}
      </div>
    </section>
  );
}
