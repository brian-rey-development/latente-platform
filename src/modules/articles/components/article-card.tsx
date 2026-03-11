import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import type { ArticlePreview } from "../domain/types";
import { ArticleService } from "../domain/article.service";
import { translateCategory } from "../domain/constants";
import { formatDate } from "@/shared/lib/format-date";
import { urlFor } from "@/sanity/image";
import { PremiumBadge } from "@/shared/ui/premium-badge";

interface ArticleCardProps {
  readonly article: ArticlePreview;
  readonly index: number;
  readonly locale?: string;
}

export function ArticleCard({ article, index, locale }: ArticleCardProps) {
  const resolved = ArticleService.resolvePreviewLocale(article, locale);

  const coverSrc = resolved.coverImage
    ? urlFor(resolved.coverImage).width(800).height(600).url()
    : null;

  const isEven = index % 2 === 0;
  const isThirdInRow = (index + 1) % 3 === 0;

  return (
    <Link
      href={`/articulos/${resolved.slug}`}
      className={`group flex flex-col border-b-2 border-ink hover:bg-ink hover:text-surface transition-colors duration-300
        ${isEven ? "md:border-r-2" : ""} lg:border-r-2 ${isThirdInRow ? "lg:border-r-0" : ""}`}
    >
      <div className="aspect-[16/9] overflow-hidden border-b-2 border-ink relative bg-ink">
        <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-0 group-hover:opacity-80 transition-opacity z-10" />
        {resolved.premium && (
          <div className="absolute top-4 right-4 z-20">
            <PremiumBadge />
          </div>
        )}
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt=""
            fill
            className="object-cover grayscale contrast-[1.2] brightness-90 group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-ink-subtle" />
        )}
      </div>

      <div className="p-5 md:p-8 flex flex-col grow">
        <span className="font-mono text-sm font-bold tracking-widest text-brand uppercase mb-4 block">
          {resolved.categories.map((c) => translateCategory(c, locale)).join(" / ")}
        </span>
        <h3 className="font-sans font-black text-3xl leading-[1.1] mb-4 uppercase group-hover:text-surface">
          {resolved.title}
        </h3>
        <p className="font-serif text-muted group-hover:text-dim text-lg leading-snug mb-8 grow">
          {resolved.excerpt}
        </p>
        <div className="flex justify-between items-center pt-4 border-t-2 border-ink group-hover:border-border font-mono text-sm font-bold uppercase tracking-widest">
          <span className="group-hover:text-surface">
            {resolved.publishedAt ? formatDate(resolved.publishedAt) : ""}
          </span>
          <ArrowUpRight
            size={20}
            className="text-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
