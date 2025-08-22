// src/components/CouponsScreen.tsx
import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  BadgePercent,
  Calendar,
  Copy,
  Check,
  ChevronRight,
  Gift,
  ShoppingBag,
} from "lucide-react";

export type Coupon = {
  id: string;
  code: string;            // "PETRU10"
  title: string;           // "10% en tu primera compra"
  description?: string;    // "Válido en alimentación y snacks"
  type?: "percent" | "amount" | "gift";
  value?: number;          // 10 => 10% o $10
  minSpend?: number;       // gasto mínimo
  expiresAt?: string;      // "2025-09-15"
  tags?: string[];         // ["Snacks", "Suscripción"]
  saved?: boolean;         // guardado por el usuario
  expired?: boolean;
};

interface CouponsScreenProps {
  coupons?: Coupon[];           // si no llegan, se usa un mock visual
  onBack?: () => void;
  onApply?: (code: string) => void;
  onSave?: (id: string) => void;
  onOpenDetails?: (id: string) => void;
}

const pesos = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

const mockCoupons: Coupon[] = [
  {
    id: "cp-1",
    code: "PETRU10",
    title: "10% en tu primera compra",
    description: "Válido en alimento y snacks.",
    type: "percent",
    value: 10,
    minSpend: 299,
    expiresAt: "2025-09-30",
    tags: ["Snacks", "Alimento"],
  },
  {
    id: "cp-2",
    code: "ENVIOGRATIS",
    title: "Envío gratis desde $599",
    description: "Aplica en carrito con subtotal mínimo.",
    type: "amount",
    value: 89, // valor de envío aprox (visual)
    expiresAt: "2025-12-31",
    tags: ["Carrito"],
    saved: true,
  },
  {
    id: "cp-3",
    code: "SUSCRIP15",
    title: "15% en tu suscripción",
    description: "Descuento recurrente el primer mes.",
    type: "percent",
    value: 15,
    minSpend: 399,
    expiresAt: "2025-10-10",
    tags: ["Suscripción"],
  },
  {
    id: "cp-4",
    code: "REGALO",
    title: "Regalo sorpresa en compras +$999",
    description: "Hasta agotar existencias.",
    type: "gift",
    minSpend: 999,
    expiresAt: "2025-08-31",
    tags: ["Promos"],
    expired: false,
  },
];

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
      active
        ? "bg-black text-white border-black"
        : "bg-white text-black border-black/10 hover:bg-black/5"
    }`}
  >
    {children}
  </button>
);

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[11px] font-semibold bg-yellow-400/70 text-black px-2 py-0.5 rounded-full">
    {children}
  </span>
);

const CouponCard: React.FC<{
  c: Coupon;
  onApply?: (code: string) => void;
  onSave?: (id: string) => void;
  onOpen?: (id: string) => void;
}> = ({ c, onApply, onSave, onOpen }) => {
  const [copied, setCopied] = useState(false);
  const expired = !!c.expired;

  const icon =
    c.type === "gift" ? (
      <Gift className="w-5 h-5" />
    ) : c.type === "amount" ? (
      <ShoppingBag className="w-5 h-5" />
    ) : (
      <BadgePercent className="w-5 h-5" />
    );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(c.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* no-op visual */
    }
  };

  return (
    <article className="rounded-3xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-black leading-tight">
                {c.title}
              </h3>
              {c.description && (
                <p className="text-sm text-gray-600">{c.description}</p>
              )}
            </div>

            <button
              onClick={() => onOpen?.(c.id)}
              className="rounded-full border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50"
            >
              Detalles
            </button>
          </div>

          {/* Labels / tags */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {c.tags?.map((t) => <Tag key={t}>{t}</Tag>)}
            {c.minSpend && (
              <span className="text-[11px] text-black/70 font-medium">
                Mín. {pesos(c.minSpend)}
              </span>
            )}
            {c.value != null && c.type !== "gift" && (
              <span className="text-[11px] text-black/70 font-semibold">
                {c.type === "percent" ? `${c.value}%` : `-${pesos(c.value)}`}
              </span>
            )}
          </div>

          {/* Código + acciones */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <code className="px-3 py-1.5 rounded-xl bg-black/5 border border-black/10 font-semibold">
                {c.code}
              </code>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm border border-gray-200 hover:bg-gray-50 transition"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>

            <div className="sm:ml-auto flex items-center gap-2">
              <button
                onClick={() => onApply?.(c.code)}
                disabled={expired}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  expired
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                Aplicar
              </button>
              <button
                onClick={() => onSave?.(c.id)}
                disabled={expired}
                className={`rounded-full px-4 py-2 text-sm border transition ${
                  c.saved
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {c.saved ? "Guardado" : "Guardar"}
              </button>
            </div>
          </div>

          {/* Expira */}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {expired ? "Expirado" : "Vence"} {c.expiresAt ? `• ${c.expiresAt}` : ""}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </article>
  );
};

const CouponsScreen: React.FC<CouponsScreenProps> = ({
  coupons = mockCoupons,
  onBack,
  onApply,
  onSave,
  onOpenDetails,
}) => {
  const [tab, setTab] = useState<"available" | "saved" | "expired">("available");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const base =
      tab === "available"
        ? coupons.filter((c) => !c.expired)
        : tab === "saved"
        ? coupons.filter((c) => c.saved && !c.expired)
        : coupons.filter((c) => c.expired);

    const term = q.trim().toLowerCase();
    if (!term) return base;
    return base.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term) ||
        c.tags?.some((t) => t.toLowerCase().includes(term))
    );
  }, [coupons, tab, q]);

  const counts = {
    available: coupons.filter((c) => !c.expired).length,
    saved: coupons.filter((c) => c.saved && !c.expired).length,
    expired: coupons.filter((c) => c.expired).length,
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
            Cupones
          </div>
          <span className="w-[88px]" />
        </div>

        {/* Title */}
        <div className="px-5 mt-10">
          <h1 className="text-2xl font-extrabold text-black">Cupones</h1>
          <p className="text-sm text-black/70">
            Ahorra en tus compras con códigos y promos.
          </p>
        </div>
      </div>

      {/* Search + Tabs */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-2xl border border-black/10 px-3 py-2 bg-white">
            <Search className="w-4 h-4 text-black/70" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar: código, título, tag…"
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <TabButton active={tab === "available"} onClick={() => setTab("available")}>
            Disponibles ({counts.available})
          </TabButton>
          <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
            Guardados ({counts.saved})
          </TabButton>
          <TabButton active={tab === "expired"} onClick={() => setTab("expired")}>
            Expirados ({counts.expired})
          </TabButton>
        </div>
      </div>

      {/* List */}
      <div className="px-5 pb-6">
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-white border border-gray-100 shadow-[0_12px_28px_rgba(0,0,0,0.12)] p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-yellow-400 text-black grid place-items-center text-2xl">
              🎟️
            </div>
            <h2 className="mt-3 text-lg font-bold text-black">
              No hay cupones {tab === "expired" ? "expirados" : "disponibles"} que coincidan
            </h2>
            <p className="text-gray-600">Intenta quitar filtros o buscar otro término.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((c) => (
              <CouponCard
                key={c.id}
                c={c}
                onApply={onApply}
                onSave={onSave}
                onOpen={onOpenDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* espacio extra (el Navigator ya agrega pb para el Footer) */}
      <div className="h-4" />
    </section>
  );
};

export default CouponsScreen;
