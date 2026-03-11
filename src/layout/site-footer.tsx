import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FEATURE_FLAGS } from "@/shared/lib/feature-flags";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-surface border-t-2 border-border">
      <div className="px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="font-sans font-black text-3xl tracking-tighter mb-4">
            LATENTE.
          </p>
          <p className="font-mono text-sm text-dim uppercase tracking-widest leading-relaxed max-w-xs">
            {t("tagline")}
          </p>
        </div>

        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-meta mb-4">
            {t("sections")}
          </p>
          <nav className="space-y-2 font-mono text-sm">
            <Link href="/" className="block hover:text-brand transition-colors">
              {t("articles")}
            </Link>
            {FEATURE_FLAGS.STORE_ENABLED && (
              <Link
                href="/tienda"
                className="block hover:text-brand transition-colors"
              >
                {t("store")}
              </Link>
            )}
            {FEATURE_FLAGS.AUTH_ENABLED && (
              <Link
                href="/auth"
                className="block hover:text-brand transition-colors"
              >
                {t("access")}
              </Link>
            )}
          </nav>
        </div>
      </div>

      <div className="border-t border-ink-subtle px-6 md:px-12 py-4 flex justify-between items-center">
        <p className="font-mono text-sm text-dim uppercase tracking-widest">
          {t("rights", { year: currentYear })}
        </p>
        <span className="text-brand font-mono text-sm font-bold tracking-widest">
          {"///"}
        </span>
      </div>
    </footer>
  );
}
