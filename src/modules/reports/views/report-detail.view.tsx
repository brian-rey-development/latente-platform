import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Clock } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getTranslations } from "next-intl/server";
import { getReportQuery } from "../application/queries/get-report.query";
import { ReportService } from "../domain/report.service";
import { portableTextComponents } from "@/modules/articles/components/content-block";
import { urlFor } from "@/sanity/image";
import { formatDate } from "@/shared/lib/format-date";
import { FEATURE_FLAGS } from "@/shared/lib/feature-flags";

interface ReportDetailViewProps {
  readonly slug: string;
}

export async function ReportDetailView({ slug }: ReportDetailViewProps) {
  const [rawReport, tNav, tArticle, tReports, tPremium, tPaywall] = await Promise.all([
    getReportQuery(slug),
    getTranslations('nav'),
    getTranslations('article'),
    getTranslations('reports'),
    getTranslations('premium'),
    getTranslations('paywall'),
  ]);

  if (!rawReport) {
    notFound();
  }

  const report = ReportService.resolveLocale(rawReport);

  const coverSrc = report.coverImage
    ? urlFor(report.coverImage).width(1600).height(900).url()
    : null;

  const isPaywalled = report.premium && FEATURE_FLAGS.PREMIUM_ENABLED;

  return (
    <article className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <div className="px-6 md:px-10 py-8 border-b-2 border-ink">
        <Link
          href="/reportes"
          className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink hover:text-brand transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {tNav('reports')}
        </Link>

        <p className="font-mono text-sm font-bold tracking-widest text-brand uppercase mb-4">
          {report.topic}
        </p>

        <h1 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter uppercase text-ink mb-6 max-w-4xl">
          {report.title}
        </h1>

        {report.excerpt && (
          <p className="font-serif text-xl text-border leading-snug max-w-2xl border-l-4 border-brand pl-6 mb-8">
            {report.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-6 font-mono text-sm font-bold uppercase tracking-widest text-muted border-t-2 border-ink pt-6">
          {report.author && <span>{tArticle('by')} {report.author}</span>}
          {report.publishedAt && <span>{formatDate(report.publishedAt)}</span>}
          {report.readTimeMinutes && (
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {report.readTimeMinutes} MIN
            </span>
          )}
          {report.pageCount && (
            <span className="flex items-center gap-1.5">
              <FileText size={12} />
              {report.pageCount} {tReports('pages')}
            </span>
          )}
          {report.premium && (
            <span className="text-brand border border-brand px-2 py-0.5">
              {tPremium('label')}
            </span>
          )}
        </div>
      </div>

      {/* Cover image */}
      {coverSrc && (
        <div className="w-full h-[40vh] md:h-[60vh] bg-ink border-b-2 border-ink relative">
          <Image
            src={coverSrc}
            alt={report.title}
            fill
            className="object-cover grayscale contrast-[1.2] opacity-80"
            priority
          />
        </div>
      )}

      {/* Content */}
      {isPaywalled ? (
        <div className="px-6 md:px-10 py-16 max-w-2xl">
          <div className="border-2 border-brand p-8 md:p-12">
            <p className="font-mono text-sm font-bold tracking-widest text-brand uppercase mb-4">
              {tPaywall('title')}
            </p>
            <p className="font-sans font-black text-2xl uppercase text-ink mb-6">
              {tReports('paywallMessage')}
            </p>
            <Link
              href="/auth"
              className="inline-block bg-brand border-2 border-ink text-surface font-mono font-bold uppercase tracking-widest px-6 py-3 shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              {tPaywall('cta')}
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full p-6 md:p-12 lg:px-24 lg:py-16 bg-surface">
          <div className="max-w-2xl font-serif text-xl text-ink leading-[1.8] space-y-8">
            <PortableText value={report.content} components={portableTextComponents} />
          </div>
          <div className="max-w-3xl mt-24 pt-10 border-t-4 border-ink flex justify-between items-center font-mono font-bold uppercase tracking-widest text-ink">
            <span>{tReports('endOf')}</span>
            <span className="text-brand text-xl animate-pulse">{"///"}</span>
          </div>
        </div>
      )}
    </article>
  );
}
