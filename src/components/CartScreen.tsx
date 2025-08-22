// src/components/CartScreen.tsx
import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  BadgePercent,
  Truck,
  ShieldCheck,
} from "lucide-react";

type CartItem = {
  id: string;
  title: string;
  variant?: string;       // ej. "Pollo 2kg"
  price: number;          // por unidad
  qty: number;
  image?: string;
  badge?: string;         // ej. "-20%" o "Nuevo"
};

interface CartScreenProps {
  items?: CartItem[];             // opcional: si no llega, usamos mock visual
  onBack?: () => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  onApplyCoupon?: (code: string) => void;
}

const pesos = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onBack,
  onRemove,
  onCheckout,
  onApplyCoupon,
}) => {
  // Mock visual por defecto
  const [local, setLocal] = useState<CartItem[]>(
    items ?? [
      {
        id: "c-1",
        title: "Croquetas Premium",
        variant: "Razas pequeñas • 2 kg",
        price: 389,
        qty: 1,
        image:
          "https://images.pexels.com/photos/7210729/pexels-photo-7210729.jpeg?auto=compress&cs=tinysrgb&w=600",
        badge: "⭐ Más vendido",
      },
      {
        id: "c-2",
        title: "Snacks Naturales",
        variant: "Pechuga deshidratada 150g",
        price: 129,
        qty: 2,
        image:
          "https://images.pexels.com/photos/5749791/pexels-photo-5749791.jpeg?auto=compress&cs=tinysrgb&w=600",
        badge: "-20%",
      },
    ]
  );
  // Si cambian props.items desde fuera, reflejarlas (visual)
  useEffect(() => {
    if (items) setLocal(items);
  }, [items]);

  const [coupon, setCoupon] = useState("");

  const subtotal = useMemo(
    () => local.reduce((acc, it) => acc + it.price * it.qty, 0),
    [local]
  );
  const shipping = subtotal >= 599 ? 0 : 89; // visual
  const discount = coupon.trim().toUpperCase() === "PETRU10" ? subtotal * 0.1 : 0; // visual
  const total = Math.max(0, subtotal - discount + shipping);

  const isEmpty = local.length === 0;

  const inc = (id: string) =>
    setLocal((arr) =>
      arr.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );
  const dec = (id: string) =>
    setLocal((arr) =>
      arr.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );
  const remove = (id: string) => {
    setLocal((arr) => arr.filter((it) => it.id !== id));
    onRemove?.(id);
  };

  return (
    <section
      className="min-h-screen relative bg-white"
      style={{
        padding:
          "calc(env(safe-area-inset-top,0px)) 0 calc(env(safe-area-inset-bottom,0px))",
      }}
    >
      {/* Cover gradient + bubbles */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400" />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-6 left-6 w-16 h-16 bg-black rounded-full animate-pulse" />
          <div className="absolute top-10 right-10 w-12 h-12 bg-white rounded-full animate-bounce" />
          <div className="absolute bottom-2 left-1/3 w-10 h-10 bg-black rounded-full animate-ping" />
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-black/10 text-black/80 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <div className="rounded-full px-3 py-1.5 bg-white/60 backdrop-blur-sm text-sm font-semibold border border-black/10">
            {isEmpty ? "Carrito" : `${local.length} producto(s)`}
          </div>
          <span className="w-[88px]" />
        </div>

        {/* Title */}
        <div className="px-5 mt-10">
          <h1 className="text-2xl font-extrabold text-black">Carrito</h1>
          <p className="text-sm text-black/70">Revisa tus productos antes de pagar.</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-6 space-y-5">
        {/* Avisos */}
        <div className="rounded-2xl border border-yellow-300/60 bg-yellow-100/70 text-black p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Lleva tu Qr a la tienda y compra al instante</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Truck className="w-4 h-4" />
            <span>Envío gratis desde {pesos(599)}</span>
          </div>
        </div>

        {isEmpty ? (
          // Empty state
          <div className="rounded-3xl bg-white border border-gray-100 shadow-[0_12px_28px_rgba(0,0,0,0.12)] p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow">
              🛍️
            </div>
            <h2 className="mt-4 text-xl font-bold text-black">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600">
              Agrega productos para verlos aquí y proceder al pago.
            </p>
            <button
              onClick={onBack}
              className="mt-5 inline-flex items-center gap-2 bg-black text-white rounded-full px-5 py-3 font-semibold hover:bg-gray-900 transition"
            >
              Explorar productos
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-4">
              {local.map((it) => (
                <article
                  key={it.id}
                  className="rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex gap-4">
                    {/* Imagen */}
                    <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-black/5 bg-gray-50">
                      {it.image ? (
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-3xl">🐶</div>
                      )}
                      {it.badge && (
                        <span className="absolute top-2 left-2 text-[10px] font-semibold bg-black/80 text-white px-2 py-0.5 rounded-full">
                          {it.badge}
                        </span>
                      )}
                    </div>

                    {/* Info + controles */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-extrabold text-black leading-tight">
                            {it.title}
                          </h3>
                          {it.variant && (
                            <p className="text-sm text-gray-600">{it.variant}</p>
                          )}
                        </div>

                        <button
                          onClick={() => remove(it.id)}
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm border border-gray-200 text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Quitar
                        </button>
                      </div>

                      {/* Qty & price */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
                          <button
                            onClick={() => dec(it.id)}
                            className="w-7 h-7 rounded-full hover:bg-gray-100 grid place-items-center"
                            aria-label="Disminuir"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="min-w-[2ch] text-center font-semibold">
                            {it.qty}
                          </span>
                          <button
                            onClick={() => inc(it.id)}
                            className="w-7 h-7 rounded-full hover:bg-gray-100 grid place-items-center"
                            aria-label="Aumentar"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {pesos(it.price)} c/u
                          </p>
                          <p className="text-base font-bold text-black">
                            {pesos(it.price * it.qty)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Cupón */}
            <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Código de descuento"
                    className="flex-1 rounded-2xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-300/70"
                  />
                  <button
                    onClick={() => onApplyCoupon?.(coupon)}
                    className="rounded-2xl px-4 py-2 font-semibold border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
              {discount > 0 && (
                <p className="mt-2 text-sm text-green-700 font-medium">
                  Cupón aplicado: -{pesos(discount)}
                </p>
              )}
            </div>

            {/* Resumen */}
            <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{pesos(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Gratis" : pesos(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Descuento</span>
                    <span className="font-semibold">-{pesos(discount)}</span>
                  </div>
                )}
                <div className="h-px bg-gray-100 my-2" />
                <div className="flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-extrabold">{pesos(total)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="mt-4 w-full bg-black text-white px-6 py-3.5 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.01] shadow-xl"
              >
                Generar Qr
              </button>
              <p className="mt-2 text-xs text-gray-500 text-center">
              </p>
            </div>
          </>
        )}
      </div>

      {/* espacio extra (Navigator ya agrega pb para el Footer) */}
      <div className="h-4" />
    </section>
  );
};

export default CartScreen;
