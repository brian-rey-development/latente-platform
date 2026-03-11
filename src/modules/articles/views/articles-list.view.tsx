import Link from "next/link";
import { listArticlesQuery } from "../application/queries/list-articles.query";
import { ArticleService } from "../domain/article.service";
import { ArticleHero } from "../components/article-hero";
import { ArticleGrid } from "../components/article-grid";
import { EmptyArticles } from "../components/empty-articles";
import { MarqueeTicker } from "@/shared/ui/marquee-ticker";
import { strings } from "@/shared/lib/strings";
import { SignalsFeedView } from "@/modules/signals/views/signals-feed.view";
import type { ArticleCategory } from "../domain/types";

interface ArticlesListViewProps {
  readonly category?: ArticleCategory;
}

export async function ArticlesListView({ category }: ArticlesListViewProps) {
  const articles = await listArticlesQuery();

  const filtered = category
    ? ArticleService.filterByCategory(articles, category)
    : articles;

  if (filtered.length === 0) {
    if (category) {
      return (
        <div className="px-6 md:px-10 py-24">
          <div className="max-w-xl">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-brand mb-4">
              {category}
            </p>
            <p className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight text-muted mb-10">
              {strings.articles.emptyCategory}
            </p>
            <Link
              href="/"
              className="font-mono text-sm font-bold uppercase tracking-widest text-muted underline underline-offset-4 hover:text-brand transition-colors"
            >
              {strings.articles.emptyCategoryBack}
            </Link>
          </div>
        </div>
      );
    }

    return <EmptyArticles />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ArticleHero article={filtered[0]} />
        </div>
        <div className="lg:col-span-4 lg:border-l-2 border-ink border-b-2">
          <SignalsFeedView />
        </div>
      </div>
      <MarqueeTicker articles={articles} />
      <ArticleGrid articles={filtered.slice(1)} />
    </div>
  );
}
