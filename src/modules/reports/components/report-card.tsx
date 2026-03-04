import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import { Lock } from "lucide-react";
import type { ReportPreview } from "../domain/types";
import { ReportService } from "../domain/report.service";
import { formatDate } from "@/shared/lib/format-date";
import { urlFor } from "@/sanity/image";

interface ReportCardProps {
  readonly report: ReportPreview;
  readonly index: number;
}

export function ReportCard({ report, index }: ReportCardProps) {
  const resolved = ReportService.resolvePreviewLocale(report);

  const coverSrc = resolved.coverImage
    ? urlFor(resolved.coverImage).width(900).height(600).url()
    : null;

  const isEven = index % 2 === 0;

  return (
    <Link
      href={`/reportes/${resolved.slug}`}
      className={`group flex flex-col border-b-2 border-ink hover:bg-ink hover:text-surface transition-colors duration-300
        ${isEven ? "md:border-r-2" : ""}`}
    >
      {/* Cover */}
      <div className="aspect-[4/3] overflow-hidden border-b-2 border-ink relative bg-ink">
        <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-0 group-hover:opacity-80 transition-opacity z-10" />
        {resolved.premium && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold px-2 py-1 border border-brand text-brand uppercase tracking-widest bg-surface">
              <Lock size={10} />
              CLASIFICADO
            </span>
          </div>
        )}
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={resolved.title}
            fill
            className="object-cover grayscale contrast-[1.2] brightness-90 group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-ink-subtle flex items-center justify-center">
            <FileText size={48} className="text-border" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-8 flex flex-col grow">
        <span className="font-mono text-sm font-bold tracking-widest text-brand uppercase mb-4 block">
          {resolved.topic}
        </span>
        <h3 className="font-sans font-black text-2xl leading-[1.1] mb-4 uppercase group-hover:text-surface">
          {resolved.title}
        </h3>
        <p className="font-serif text-muted group-hover:text-dim text-base leading-snug mb-8 grow">
          {resolved.excerpt}
        </p>
        <div className="flex justify-between items-center pt-4 border-t-2 border-ink group-hover:border-border font-mono text-sm font-bold uppercase tracking-widest">
          <div className="flex items-center gap-4 group-hover:text-surface">
            {resolved.publishedAt && (
              <span>{formatDate(resolved.publishedAt)}</span>
            )}
            {resolved.pageCount && (
              <span className="text-brand group-hover:text-surface">
                {resolved.pageCount} PÁG
              </span>
            )}
          </div>
          <ArrowUpRight
            size={20}
            className="text-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
