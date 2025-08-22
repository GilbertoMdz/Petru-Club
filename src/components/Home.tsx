// src/components/Home.tsx
import React from "react";
import { PawPrint, Compass, CreditCard, ChevronRight, Sparkles } from "lucide-react";
import CarouselWide from "./CarouselWide";
import type { CarouselWideItem } from "./CarouselWide";

type NavFn = () => void;

interface HomeProps {
  onGoToQuiz: NavFn;
  onGoToExplore: NavFn;
  onGoToSubscribe: NavFn;
  onGoToOrders?: NavFn;
  onOpenOffer?: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({
  onGoToQuiz,
  onGoToExplore,
  onGoToSubscribe,
  onOpenOffer,
}) => {
  const offers: CarouselWideItem[] = [
    {
      id: "ofr-1",
      title: "Croquetas Premium",
      subtitle: "Nutrición completa para razas pequeñas",
      image:
        "https://images.pexels.com/photos/7210729/pexels-photo-7210729.jpeg?auto=compress&cs=tinysrgb&w=1200",
      badge: "⭐ Más vendido",
      cta: "Comprar ahora",
      onClick: onGoToQuiz,
    },
    {
      id: "ofr-2",
      title: "Snacks Naturales",
      subtitle: "Premios 100% orgánicos",
      image:
        "https://images.pexels.com/photos/5749791/pexels-photo-5749791.jpeg?auto=compress&cs=tinysrgb&w=1200",
      badge: "-20%",
      cta: "Ver ahora",
      onClick: onGoToExplore,
    },
    {
      id: "ofr-3",
      title: "Juguete Interactivo",
      subtitle: "Diversión y estimulación diaria",
      image:
        "https://images.pexels.com/photos/5731865/pexels-photo-5731865.jpeg?auto=compress&cs=tinysrgb&w=1200",
      badge: "Nuevo",
      cta: "ahora",
      onClick: onGoToSubscribe,
    },
    {
      id: "ofr-4",
      title: "Suscripción Mensual",
      subtitle: "Comida + snacks directo a tu casa",
      image:
        "https://images.pexels.com/photos/7210654/pexels-photo-7210654.jpeg?auto=compress&cs=tinysrgb&w=1200",
      badge: "⭐ Favorito",
      cta: "ahora",
      onClick: onGoToSubscribe,
    },
  ];

  // Variantes visuales por card (fondos, icono, badge)
  const cards = [
    {
      id: "card-quiz",
      icon: <PawPrint className="w-6 h-6" />,
      title: "Plan de nutrición",
      desc: "Haz el quiz y obtén recomendaciones",
      onPress: onGoToQuiz,
      badge: "Recomendado",
      // gradiente cálido
      bg: "from-yellow-50 to-white",
      // aro/contorno
      ring: "ring-1 ring-yellow-200",
      // ícono chip
      chip: "bg-yellow-400 text-black",
      // mini imagen decorativa opcional
      art: "https://images.pexels.com/photos/7210729/pexels-photo-7210729.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "card-explore",
      icon: <Compass className="w-6 h-6" />,
      title: "Explorar productos",
      desc: "Alimento, snacks y más",
      onPress: onGoToExplore,
      badge: "Tienda",
      bg: "from-gray-50 to-white",
      ring: "ring-1 ring-gray-200",
      chip: "bg-black text-white",
      art: "https://images.pexels.com/photos/5731865/pexels-photo-5731865.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "card-sub",
      icon: <CreditCard className="w-6 h-6" />,
      title: "Suscripción",
      desc: "Recibe a tiempo y ahorra",
      onPress: onGoToSubscribe,
      badge: "Ahorra 15%",
      bg: "from-yellow-100 to-white",
      ring: "ring-1 ring-yellow-300",
      chip: "bg-yellow-500 text-black",
      art: "https://images.pexels.com/photos/7210654/pexels-photo-7210654.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  return (
    <section
      className="min-h-screen bg-white flex flex-col"
      style={{
        padding: "calc(env(safe-area-inset-top,0px)) 0 calc(env(safe-area-inset-bottom,0px))",
      }}
    >
      {/* Espacio superior pequeño */}
      <div className="pt-2" />

      {/* Carrusel full-bleed con altura controlada */}
      <div className="-mx-5 mb-4">
        <div className="px-5">
          <CarouselWide items={offers} onOpenSlide={onOpenOffer} />
        </div>
      </div>

      {/* Cards mejoradas */}
      <main className="flex-1 px-5 pb-8 space-y-4">
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => c.onPress && c.onPress()}
            className={`
              group w-full text-left rounded-3xl bg-gradient-to-br ${c.bg}
              shadow-[0_8px_24px_rgba(0,0,0,0.06)]
              transition-all duration-300
              active:scale-[0.99]
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)]
              relative overflow-hidden
            `}
            style={{ minHeight: 112 }}
          >
            {/* Annealing border/ring sutil */}
            <div className={`absolute inset-0 rounded-3xl pointer-events-none ${c.ring}`} />

            {/* Patrón de huellitas muy tenue */}
            <svg
              className="absolute -right-8 -top-8 w-44 h-44 opacity-[0.06] text-black"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <g fill="currentColor">
                <circle cx="20" cy="25" r="6" />
                <circle cx="35" cy="15" r="4" />
                <circle cx="45" cy="25" r="4" />
                <circle cx="35" cy="32" r="4" />
                <circle cx="55" cy="40" r="6" />
                <circle cx="70" cy="30" r="4" />
                <circle cx="80" cy="40" r="4" />
                <circle cx="70" cy="47" r="4" />
              </g>
            </svg>

            {/* Decor: mini imagen desenfocada al borde derecho */}
            {c.art && (
              <img
                src={c.art}
                alt=""
                className="absolute right-2 top-1/2 -translate-y-1/2 w-28 h-20 rounded-2xl object-cover opacity-80 blur-[1px] hidden sm:block"
              />
            )}

            {/* Contenido */}
            <div className="p-5 pr-24 sm:pr-40 flex items-center gap-4">
              <div
                className={`
                  shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl ${c.chip}
                  shadow
                  group-hover:scale-105 transition-transform
                `}
              >
                {c.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-black tracking-tight">
                    {c.title}
                  </h4>
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {c.badge}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mt-1">
                  {c.desc}
                </p>
              </div>

              {/* CTA chevron */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="rounded-full border border-black/10 bg-white/70 backdrop-blur-sm p-2 text-gray-600 group-hover:text-black group-hover:border-black/20 transition">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </main>
    </section>
  );
};

export default Home;
