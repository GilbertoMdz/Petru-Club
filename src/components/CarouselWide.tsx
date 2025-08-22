import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

export interface CarouselWideItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  badge?: string;
  cta?: string;
  onClick?: () => void;
}

interface CarouselWideProps {
  items: CarouselWideItem[];
  onOpenSlide?: (id: string) => void;
  autoAdvanceMs?: number; // default 4500
}

const CarouselWide: React.FC<CarouselWideProps> = ({
  items,
  onOpenSlide,
  autoAdvanceMs = 4500,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [idx, setIdx] = useState(0); // índice "real" (0..n-1)

  // Lista extendida: [último, ...items, primero] para loop infinito
  const ext = useMemo(() => {
    if (items.length <= 1) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items]);

  // Posiciona al primer slide real (virtual index = 1)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || items.length === 0) return;
    // Esperar al siguiente frame para que tenga ancho correcto
    requestAnimationFrame(() => {
      if (!el) return;
      const target = items.length > 1 ? el.clientWidth : 0;
      el.scrollTo({ left: target, behavior: "auto" });
    });
    setIdx(0);
  }, [items.length]);

  // Auto avance por scroll (funciona con los clones)
  useEffect(() => {
    if (items.length <= 1) return;
    const el = scrollerRef.current;
    if (!el) return;
    const t = setInterval(() => {
      el.scrollTo({ left: el.scrollLeft + el.clientWidth, behavior: "smooth" });
    }, autoAdvanceMs);
    return () => clearInterval(t);
  }, [items.length, autoAdvanceMs]);

  // Maneja loop: cuando caes en clones, salta sin animación al real.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth;
      if (w === 0) return;
      const vIdx = Math.round(el.scrollLeft / w); // índice virtual (0..n+1)
      const n = items.length;

      if (n > 1) {
        if (vIdx === 0) {
          // Estamos en el clon del último -> saltar al último real (virtual n)
          el.scrollTo({ left: n * w, behavior: "auto" });
          setIdx(n - 1);
          return;
        }
        if (vIdx === n + 1) {
          // Estamos en el clon del primero -> saltar al primero real (virtual 1)
          el.scrollTo({ left: 1 * w, behavior: "auto" });
          setIdx(0);
          return;
        }
        // índice real = vIdx - 1
        const real = vIdx - 1;
        if (real !== idx) setIdx(real);
      } else {
        setIdx(0);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length, idx]);

  const scrollTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    // map real i -> virtual (i+1)
    el.scrollTo({ left: (i + 1) * el.clientWidth, behavior: "smooth" });
    setIdx(i);
  };

  return (
    <div className="w-full">
      <div
        ref={scrollerRef}
        className="
          w-full overflow-x-auto snap-x snap-mandatory scroll-smooth
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="flex">
          {ext.map((o, k) => (
            <article key={`${o.id}-${k}`} className="snap-start shrink-0 w-full px-5">
              <div
                className="
                  relative w-full overflow-hidden rounded-3xl
                  border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                  h-48 md:h-5
                "
              >
                {/* imagen */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${o.image})` }}
                  onClick={() => onOpenSlide?.(o.id)}
                />
                {/* overlay para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-transparent" />

                {/* contenido compacto */}
                <div className="relative z-10 h-full px-5 py-4 flex items-center justify-between">
                  <div className="text-white">
                    {o.badge && (
                      <span className="inline-flex items-center text-[10px] font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                        {o.badge}
                      </span>
                    )}
                    <h3 className="mt-1 text-xl md:text-2xl font-extrabold leading-tight drop-shadow">
                      {o.title}
                    </h3>
                    {o.subtitle && (
                      <p className="text-white/90 text-sm">{o.subtitle}</p>
                    )}
                  </div>

                  {o.cta && (
                    <button
                      onClick={o.onClick ?? (() => onOpenSlide?.(o.id))}
                      className="inline-flex items-center bg-black text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-900 transition"
                    >
                      {o.cta}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>

                {/* acento */}
                <div className="pointer-events-none absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-yellow-400/70 blur-xl" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* dots (n reales) */}
      <div className="flex justify-center gap-2 mt-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-6 bg-black" : "w-2 bg-gray-300"
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselWide;
