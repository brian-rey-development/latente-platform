"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function GlobalError({ reset }: ErrorProps) {
  const t = useTranslations("error");

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-brand mb-4">
          Error
        </p>
        <h1 className="font-sans font-black text-5xl uppercase tracking-tighter mb-6">
          {t("title")}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={reset}
            className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-ink px-6 py-3 hover:bg-ink hover:text-surface transition-colors"
          >
            {t('retry')}
          </button>
          <Link
            href="/"
            className="font-mono text-sm underline hover:text-brand transition-colors"
          >
            {t("back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
