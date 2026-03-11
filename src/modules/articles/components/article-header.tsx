import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Article } from "../domain/types";
import { CategoryBadge } from "@/shared/ui/category-badge";
import { PremiumBadge } from "@/shared/ui/premium-badge";
import { buttonVariants } from "@/shared/ui/button";

interface ArticleHeaderProps {
  readonly article: Article;
  readonly locale?: string;
}

export async function ArticleHeader({ article, locale }: ArticleHeaderProps) {
  const t = await getTranslations("article");

  return (
    <header className="bg-ink text-surface pt-8 md:pt-12 pb-14 md:pb-20 border-b-2 border-ink">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <Link
          href="/articulos"
          className={`${buttonVariants({ variant: "primary", size: "md" })} w-max mb-10 md:mb-14 inline-flex`}
        >
          <ArrowLeft size={16} /> {t("back")}
        </Link>

        <div className="flex flex-wrap gap-4 mb-8">
          {article.categories.map((cat) => (
            <CategoryBadge key={cat} category={cat} locale={locale} />
          ))}
          {article.premium && <PremiumBadge />}
        </div>

        <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-display-sm lg:text-display-md uppercase leading-[0.9] tracking-tighter mb-10 text-surface break-words">
          {article.title}
        </h1>

        <p className="font-serif text-xl md:text-2xl text-dim max-w-3xl leading-snug border-l-4 border-brand pl-6">
          {article.excerpt}
        </p>
      </div>
    </header>
  );
}
