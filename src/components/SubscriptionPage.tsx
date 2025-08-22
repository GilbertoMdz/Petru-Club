import React, { useMemo, useState } from "react";
import { CreditCard, ShoppingBag, Calendar, Trash2, Filter, Gem } from "lucide-react";

// ——————————————————————————————————————————————
// Tipos
// ——————————————————————————————————————————————
interface Purchase {
  id: string;
  date: string;
  item: string;
  vendor: string;
  amount: number;
  notes?: string;
}

// ——————————————————————————————————————————————
// Utilidades
// ——————————————————————————————————————————————
const brand = { yellow: "#FACC15", black: "#0A0A0A", white: "#FFFFFF" };

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 2,
});

const mxDate = (d: string) =>
  new Date(d).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });

// Placeholder de tarjeta
const CardPlaceholder: React.FC = () => (
  <svg
    viewBox="0 0 480 280"
    role="img"
    aria-label="Imagen genérica de tarjeta de crédito"
    className="w-full h-auto rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
  >
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#111" />
        <stop offset="100%" stopColor="#333" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="480" height="280" rx="22" fill="url(#g)" />
    <circle cx="380" cy="70" r="12" fill={brand.yellow} />
    <rect x="30" y="40" width="140" height="24" rx="6" fill="#222" />
    <rect x="30" y="80" width="300" height="10" rx="5" fill="#555" />
    <rect x="30" y="100" width="220" height="10" rx="5" fill="#555" />
    <rect x="30" y="160" width="360" height="18" rx="7" fill="#e5e5e5" />
    <rect x="30" y="190" width="280" height="18" rx="7" fill="#e5e5e5" />
    <rect x="30" y="230" width="110" height="10" rx="5" fill="#777" />
    <rect x="160" y="230" width="80" height="10" rx="5" fill="#777" />
    <rect x="260" y="230" width="60" height="10" rx="5" fill="#777" />
  </svg>
);

// ——————————————————————————————————————————————
// Página minimal
// ——————————————————————————————————————————————
const SubscriptionPage: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: "p-1", date: "2025-08-05", item: "Croquetas 12kg", vendor: "Petco", amount: 1150, notes: "Acana" },
    { id: "p-2", date: "2025-08-14", item: "Consulta veterinaria", vendor: "Vet Feliz", amount: 450 },
    { id: "p-3", date: "2025-07-28", item: "Juguete mordedera", vendor: "Amazon", amount: 199 },
    { id: "p-4", date: "2025-07-05", item: "Antipulgas", vendor: "Vet Feliz", amount: 320, notes: "30 días" },
  ]);

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return purchases;
    return purchases.filter(p =>
      [p.item, p.vendor, p.notes].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [purchases, query]);

  const removePurchase = (id: string) => setPurchases(prev => prev.filter(p => p.id !== id));

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Suscripción activa */}
        <section className="rounded-3xl border border-gray-100 bg-gradient-to-r from-yellow-100 to-yellow-50 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-yellow-400 text-black flex items-center justify-center">
              <Gem className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-700">Suscripción activa</p>
              <h3 className="font-semibold">Plan Diamante</h3>
            </div>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-black text-white">Premium</span>
        </section>

        {/* Tarjeta */}
        <section className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Método de pago</p>
              <h3 className="text-lg font-semibold mt-1">Tarjeta terminación 1234</h3>
            </div>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-yellow-400 bg-yellow-400 text-black hover:brightness-95">
              <CreditCard className="w-4 h-4" /> Cambiar/Agregar
            </button>
          </div>
          <div className="mt-5">
            <CardPlaceholder />
          </div>
          <p className="mt-4 text-xs text-gray-600">* Integra Stripe/Mercado Pago para pagos reales.</p>
        </section>

        {/* Compras anteriores */}
        <section className="rounded-3xl border border-gray-100 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Compras anteriores
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <input
                  className="outline-none text-sm placeholder:text-gray-500"
                  placeholder="Buscar por artículo/tienda/notas…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <ul className="mt-4 divide-y divide-gray-100">
            {filtered.length === 0 && (
              <li className="py-8 text-sm text-gray-600 text-center">
                Sin resultados. Prueba “croquetas”, “vet”, “Amazon”, etc.
              </li>
            )}
            {filtered.map(p => (
              <li key={p.id} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{p.item}</p>
                    <p className="text-xs text-gray-600">
                      {p.vendor} • <Calendar className="inline w-3.5 h-3.5 mr-1" />
                      {mxDate(p.date)} {p.notes ? `• ${p.notes}` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-semibold">{mxn.format(p.amount)}</div>
                    <button
                      onClick={() => removePurchase(p.id)}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default SubscriptionPage;
