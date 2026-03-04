import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ArticlePreview } from "../domain/types";
import { ArticleService } from "../domain/article.service";
import { formatDate } from "@/shared/lib/format-date";
import { urlFor } from "@/sanity/image";
import { CategoryBadge } from "@/shared/ui/category-badge";
import { buttonVariants } from "@/shared/ui/button";
import { strings } from "@/shared/lib/strings";

interface ArticleHeroProps {
  readonly article: ArticlePreview;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  const resolved = ArticleService.resolvePreviewLocale(article);

  const coverSrc = resolved.coverImage
    ? urlFor(resolved.coverImage).width(1600).height(900).url()
    : null;

  return (
    <section className="border-b-2 border-ink grid grid-cols-1 lg:grid-cols-12 relative bg-surface">
      <div className="lg:col-span-7 min-w-0 p-6 md:p-8 lg:p-10 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-ink">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {resolved.categories.map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
            {resolved.publishedAt && (
              <span className="font-mono text-sm font-bold text-ink uppercase tracking-widest">
                {strings.article.updatedAt} {formatDate(resolved.publishedAt)}
              </span>
            )}
          </div>
          <Link href={`/articulos/${resolved.slug}`}>
            <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tighter text-ink mb-5 uppercase hover:text-brand transition-colors">
              {resolved.title}
            </h2>
          </Link>
          <p className="font-serif text-lg md:text-xl text-muted leading-snug max-w-2xl border-l-4 border-brand pl-6 mb-8">
            {resolved.excerpt}
          </p>
        </div>
        <Link
          href={`/articulos/${resolved.slug}`}
          className={`${buttonVariants({ variant: "brutal" })} group w-full md:w-max justify-between gap-8`}
          aria-hidden="true"
          tabIndex={-1}
        >
          <span>{strings.article.readArticle}</span>
          <ArrowRight
            size={24}
            className="group-hover:translate-x-2 transition-transform"
          />
        </Link>
      </div>

      <Link
        href={`/articulos/${resolved.slug}`}
        className="lg:col-span-5 flex flex-col relative group cursor-pointer bg-ink"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="grow relative min-h-[40vh] md:min-h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity z-10" />
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={resolved.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 contrast-[1.1] group-hover:contrast-100 brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
              priority
            />
          ) : (
            <div className="w-full h-full bg-border" />
          )}
        </div>
        <div className="border-t-2 border-border bg-surface p-4 sm:p-6 flex flex-wrap justify-between items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink">
          <span>
            {strings.article.by} {resolved.author}
          </span>
          <span>
            {resolved.readTimeMinutes} {strings.article.readTime}
          </span>
        </div>
      </Link>
    </section>
  );
}
