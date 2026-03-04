import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { VenturePreview, VentureStatus } from "../domain/types";
import { VERTICAL_LABELS, STATUS_LABELS } from "../domain/constants";
import { urlFor } from "@/sanity/image";

interface VentureCardProps {
  readonly venture: VenturePreview;
}

const STATUS_STYLES: Record<VentureStatus, string> = {
  STEALTH: "bg-surface text-dim border border-border",
  BUILDING: "bg-brand text-surface border border-brand",
  LAUNCHED: "bg-ink text-surface border border-ink",
  ACQUIRED: "bg-surface text-ink border border-ink",
};

export function VentureCard({ venture }: VentureCardProps) {
  const logoSrc = venture.logo
    ? urlFor(venture.logo).width(120).height(120).url()
    : null;

  return (
    <Link
      href={`/labs/${venture.slug}`}
      className="group flex flex-col border-2 border-border shadow-brutal-sm bg-surface p-6 md:p-8 hover:shadow-brutal hover:border-ink transition-all duration-200"
    >
      {/* Logo + status */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-16 h-16 border-2 border-ink bg-surface flex items-center justify-center overflow-hidden flex-shrink-0">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={venture.name}
              width={60}
              height={60}
              className="object-contain grayscale"
            />
          ) : (
            <span className="font-mono font-black text-2xl text-ink">
              {venture.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <span
          className={`font-mono text-xs font-bold px-2 py-1 uppercase tracking-widest ${STATUS_STYLES[venture.status]}`}
        >
          {STATUS_LABELS[venture.status]}
        </span>
      </div>

      {/* Name + tagline */}
      <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-ink mb-2 group-hover:text-brand transition-colors">
        {venture.name}
      </h3>
      <p className="font-serif text-muted text-base leading-snug mb-6 grow">
        {venture.tagline}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-ink font-mono text-xs font-bold uppercase tracking-widest">
        <span className="text-ink">{VERTICAL_LABELS[venture.vertical]}</span>

        <div className="flex items-center gap-2 text-brand">
          {venture.url && (
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          )}
          {venture.foundedYear && (
            <span className="text-muted">{venture.foundedYear}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
