"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useCart } from "@/modules/cart/hooks/use-cart";
import { SearchOverlay } from "@/modules/search/components/search-overlay";
import { CategoryBar } from "@/layout/category-bar";
import { FEATURE_FLAGS } from "@/shared/lib/feature-flags";

const NAV_LINKS = [
  { href: "/articulos", key: "articles", match: "/articulos" },
  { href: "/senales", key: "signals", match: "/senales" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, itemCount } = useCart();
  const pathname = usePathname();
  const locale = useLocale();
  const isEnglish = locale === "en";
  const t = useTranslations("nav");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isArticlesPath = pathname.includes("/articulos");

  return (
    <>
      <nav
        className={`sticky top-0 z-30 transition-all duration-300
          ${scrolled ? "bg-surface/95 backdrop-blur-sm" : "bg-surface"}`}
      >
        {/* Main header row */}
        <div className="flex items-center px-6 md:px-10 py-4 border-b-2 border-ink">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-brand border-2 border-ink group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-sans font-black text-3xl md:text-4xl tracking-tighter uppercase leading-none text-ink">
              LATENTE<span className="text-brand">.</span>
            </span>
          </Link>

          {/* Desktop section nav */}
          <nav className="hidden md:flex items-center gap-6 ml-8" aria-label="Secciones">
            {NAV_LINKS.map(({ href, key, match }) => {
              const isActive = pathname.includes(match);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-mono text-sm font-bold uppercase tracking-widest transition-colors
                    ${isActive ? "text-brand underline underline-offset-4 decoration-2" : "text-ink hover:text-brand"}`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Language switcher */}
            <div className="hidden md:flex items-center border-2 border-ink overflow-hidden">
              <Link
                href={pathname}
                locale="es"
                className={`px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-widest transition-colors
                  ${!isEnglish ? "bg-ink text-surface" : "text-ink hover:text-brand"}`}
              >
                ES
              </Link>
              <Link
                href={pathname}
                locale="en"
                className={`px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-widest transition-colors border-l-2 border-ink
                  ${isEnglish ? "bg-ink text-surface" : "text-ink hover:text-brand"}`}
              >
                EN
              </Link>
            </div>

            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-brand transition-colors"
              aria-label={t("search")}
            >
              <Search size={18} />
            </button>

            {FEATURE_FLAGS.STORE_ENABLED && (
              <button
                onClick={openCart}
                className="relative border-2 border-ink bg-ink text-surface w-10 h-10 flex items-center justify-center hover:bg-brand hover:border-brand transition-colors"
                aria-label={t("cart")}
              >
                <ShoppingCart size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-brand text-surface text-sm w-6 h-6 flex items-center justify-center rounded-full border-2 border-ink font-mono font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
            )}

            {/* Burger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 hover:text-brand transition-colors"
              aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b-2 border-ink bg-surface">
            {NAV_LINKS.map(({ href, key, match }) => {
              const isActive = pathname.includes(match);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest border-b border-divider last:border-b-0 transition-colors
                    ${isActive ? "text-brand bg-surface-dim" : "text-ink hover:text-brand"}`}
                >
                  {t(key)}
                </Link>
              );
            })}
            {/* Language switcher — mobile */}
            <div className="flex items-center gap-3 px-6 py-4">
              <Link
                href={pathname}
                locale="es"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest border-2 border-ink transition-colors
                  ${!isEnglish ? "bg-ink text-surface" : "text-ink hover:text-brand"}`}
              >
                ES
              </Link>
              <Link
                href={pathname}
                locale="en"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest border-2 border-ink transition-colors
                  ${isEnglish ? "bg-ink text-surface" : "text-ink hover:text-brand"}`}
              >
                EN
              </Link>
            </div>
          </div>
        )}

        {/* Category bar — articles section only */}
        {isArticlesPath && <CategoryBar />}
      </nav>

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
