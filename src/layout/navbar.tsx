'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ShoppingCart, Search } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useCart } from '@/modules/cart/hooks/use-cart'
import { SearchOverlay } from '@/modules/search/components/search-overlay'
import { FEATURE_FLAGS } from '@/shared/lib/feature-flags'
import type { ArticlePreview } from '@/modules/articles/domain/types'

interface NavbarProps {
  readonly articles?: ArticlePreview[]
}

function useLocaleSwitchUrl() {
  const locale = useLocale()
  const pathname = usePathname()

  if (locale === 'es') {
    return `/en${pathname}`
  }
  // Strip the /en prefix
  return pathname.replace(/^\/en/, '') || '/'
}

export function Navbar({ articles = [] }: NavbarProps) {
  const t = useTranslations('nav')
  const tLocale = useTranslations('locale')
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { openCart, itemCount } = useCart()
  const localeSwitchUrl = useLocaleSwitchUrl()

  type NavLink = { readonly label: string; readonly href: string; readonly featureFlag?: keyof typeof FEATURE_FLAGS }

  const NAV_LINKS: readonly NavLink[] = [
    { label: t('articles'), href: '/' },
    { label: t('store'), href: '/tienda', featureFlag: 'STORE_ENABLED' },
    { label: t('manifesto'), href: '/manifiesto' },
    { label: t('access'), href: '/auth' },
  ]

  const visibleLinks = NAV_LINKS.filter(
    (link) => !link.featureFlag || FEATURE_FLAGS[link.featureFlag],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 border-b-2 border-ink
          ${scrolled ? 'bg-surface/95 backdrop-blur-sm' : 'bg-surface'}`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link
            href="/"
            className="font-sans font-black text-2xl tracking-tighter text-ink hover:text-brand transition-colors"
          >
            LATENTE.
          </Link>

          <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold uppercase tracking-widest">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-brand transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-3 hover:text-brand transition-colors"
              aria-label={t('search')}
            >
              <Search size={20} />
            </button>

            {FEATURE_FLAGS.STORE_ENABLED && (
              <button
                onClick={openCart}
                className="relative p-3 hover:text-brand transition-colors"
                aria-label={t('cart')}
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => router.push(localeSwitchUrl)}
              className="font-mono text-xs font-bold uppercase tracking-widest border border-ink px-3 py-2 hover:bg-ink hover:text-surface transition-colors"
              aria-label={tLocale('switchLabel')}
            >
              {tLocale('switchTo')}
            </button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-3 hover:text-brand transition-colors"
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t-2 border-ink bg-surface">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-ink hover:text-surface transition-colors border-b border-divider"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <SearchOverlay articles={articles} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
