import { Lock } from "lucide-react";

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold px-2 py-1 border border-brand text-brand uppercase tracking-widest">
      <Lock size={10} />
      CLASIFICADO
    </span>
  );
}
