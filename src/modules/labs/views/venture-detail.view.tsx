import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getVentureQuery } from "../application/queries/get-venture.query";
import { VERTICAL_LABELS, STATUS_LABELS } from "../domain/constants";
import type { VentureStatus } from "../domain/types";
import { urlFor } from "@/sanity/image";

interface VentureDetailViewProps {
  readonly slug: string;
}

const STATUS_STYLES: Record<VentureStatus, string> = {
  STEALTH: "bg-surface text-dim border-2 border-border",
  BUILDING: "bg-brand text-surface border-2 border-brand",
  LAUNCHED: "bg-ink text-surface border-2 border-ink",
  ACQUIRED: "bg-surface text-ink border-2 border-ink",
};

export async function VentureDetailView({ slug }: VentureDetailViewProps) {
  const venture = await getVentureQuery(slug);

  if (!venture) {
    notFound();
  }

  const logoSrc = venture.logo
    ? urlFor(venture.logo).width(200).height(200).url()
    : null;

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-ink text-surface border-b-2 border-ink px-6 md:px-10 py-12 md:py-16">
        <Link
          href="/labs"
          className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-dim hover:text-brand transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Labs
        </Link>

        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Logo */}
          <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-border bg-surface flex items-center justify-center overflow-hidden flex-shrink-0">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={venture.name}
                width={120}
                height={120}
                className="object-contain"
              />
            ) : (
              <span className="font-mono font-black text-4xl text-ink">
                {venture.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold tracking-widest text-brand uppercase">
                {VERTICAL_LABELS[venture.vertical]}
              </span>
              <span
                className={`font-mono text-xs font-bold px-2 py-1 uppercase tracking-widest ${STATUS_STYLES[venture.status]}`}
              >
                {STATUS_LABELS[venture.status]}
              </span>
              {venture.foundedYear && (
                <span className="font-mono text-sm font-bold text-dim uppercase tracking-widest">
                  Est. {venture.foundedYear}
                </span>
              )}
            </div>

            <h1 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter uppercase mb-4">
              {venture.name}
            </h1>

            {venture.tagline && (
              <p className="font-serif text-xl text-dim max-w-2xl">
                {venture.tagline}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 md:px-10 py-12 md:py-16 max-w-3xl">
        {venture.description && (
          <div className="font-serif text-xl text-ink leading-[1.8] space-y-6 mb-12">
            {venture.description.split("\n").filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {venture.url && (
          <a
            href={venture.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand border-2 border-ink text-surface font-mono font-bold uppercase tracking-widest px-6 py-4 shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Visitar {venture.name}
            <ArrowUpRight size={18} />
          </a>
        )}
      </div>
    </div>
  );
}
