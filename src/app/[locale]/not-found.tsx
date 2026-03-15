import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-brand mb-4">
          404
        </p>
        <h1 className="font-sans font-black text-[12rem] leading-none uppercase tracking-tighter text-ink mb-2">
          404
        </h1>
        <p className="font-mono text-sm uppercase tracking-widest text-muted mb-8">
          {t("error.title")}
        </p>
        <Link
          href="/"
          className="font-mono text-sm font-bold uppercase tracking-widest underline hover:text-brand transition-colors"
        >
          {t("error.back")}
        </Link>
      </div>
    </div>
  );
}
