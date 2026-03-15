import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { listArticlesQuery } from "../application/queries/list-articles.query";
import { ArticleService } from "../domain/article.service";
import { ArticleGrid } from "../components/article-grid";
import { EmptyArticles } from "../components/empty-articles";
import { translateCategory } from "../domain/constants";
import type { ArticleCategory } from "../domain/types";

interface ArticlesArchiveViewProps {
  readonly category?: ArticleCategory;
  readonly locale?: string;
}

export async function ArticlesArchiveView({ category, locale }: ArticlesArchiveViewProps) {
  const [articles, tArticles, tCategories] = await Promise.all([
    listArticlesQuery(),
    getTranslations("articles"),
    getTranslations("categories"),
  ]);

  const filtered = category
    ? ArticleService.filterByCategory(articles, category)
    : articles;

  const heading = category ? translateCategory(category, locale) : tCategories("all");

  if (filtered.length === 0) {
    if (category) {
      return (
        <div>
          <div className="px-6 md:px-10 py-5 border-b-2 border-ink">
            <Link
              href="/articulos"
              className="font-mono text-xs font-bold uppercase tracking-widest text-muted hover:text-brand transition-colors"
            >
              {tArticles("emptyCategoryBack")}
            </Link>
          </div>
          <div className="px-6 md:px-10 pt-16 pb-32">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand mb-6">
              {heading}
            </p>
            <p className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tight text-ink leading-[1.05]">
              {tArticles("emptyCategory")}
            </p>
          </div>
        </div>
      );
    }

    return <EmptyArticles />;
  }

  return (
    <div>
      <div className="px-6 md:px-10 py-8 border-b-2 border-ink flex items-baseline justify-between">
        <h1 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight">
          {heading}
        </h1>
        <span className="font-mono text-sm font-bold uppercase tracking-widest text-muted">
          {filtered.length}
        </span>
      </div>
      <ArticleGrid articles={filtered} locale={locale} />
    </div>
  );
}
