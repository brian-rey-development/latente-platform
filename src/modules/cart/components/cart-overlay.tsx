"use client";

import { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import { strings } from "@/shared/lib/strings";
import { useCart } from "../hooks/use-cart";
import { CartItem as CartItemRow } from "./cart-item";
import { CartSummary } from "./cart-summary";

export function CartOverlay() {
  const { items, isOpen, closeCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-ink/80 z-40"
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-surface text-ink z-50 flex flex-col border-l-4 border-ink">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-ink bg-ink text-surface">
          <div className="flex items-center gap-3">
            <ShoppingBag size={28} className="text-brand" />
            <span className="font-sans font-black text-3xl uppercase tracking-tighter">
              {strings.cart.title}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="hover:text-brand transition-colors cursor-pointer"
            aria-label={strings.cart.close}
          >
            <X size={32} />
          </button>
        </div>

        {/* Items */}
        <div className="grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-meta">
              <ShoppingBag size={64} className="text-divider" />
              <p className="font-mono text-sm uppercase tracking-widest text-center font-bold">
                {strings.cart.empty}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <CartItemRow key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t-4 border-ink bg-brand text-surface">
            <CartSummary />
          </div>
        )}
      </aside>
    </>
  );
}
