"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/modules/cart/hooks/use-cart";
import { formatPrice } from "@/shared/lib/format-price";

export function OrderSummary() {
  const { items, total } = useCart();
  const t = useTranslations("checkout");

  return (
    <div className="bg-ink text-surface p-8 border-2 border-ink">
      <h3 className="font-sans font-black text-xl uppercase tracking-tight mb-6 border-b-2 border-border pb-4">
        {t("orderSummary")}
      </h3>
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between font-mono text-sm"
          >
            <span className="text-dim">
              {item.name} × {item.qty}
            </span>
            <span className="font-bold">
              {formatPrice(item.price * item.qty)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-4 border-t-2 border-border">
        <span className="font-mono text-sm uppercase tracking-widest text-meta">
          {t("total")}
        </span>
        <span className="font-sans font-black text-2xl text-brand">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
