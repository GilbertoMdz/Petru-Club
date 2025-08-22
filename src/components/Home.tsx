// src/components/Home.tsx
import React from "react";
import { PawPrint, Compass, CreditCard, ShoppingBag, ChevronRight } from "lucide-react";
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
  onGoToOrders,
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

  const cards = [
    {
      id: "card-quiz",
      icon: <PawPrint className="w-6 h-6" />,
      title: "Plan de nutrición",
      desc: "Haz el quiz y obtén recomendaciones",
      onPress: onGoToQuiz,
    },
    {
      id: "card-explore",
      icon: <Compass className="w-6 h-6" />,
      title: "Explorar productos",
      desc: "Alimento, snacks y más",
      onPress: onGoToExplore,
    },
    {
      id: "card-sub",
      icon: <CreditCard className="w-6 h-6" />,
      title: "Suscripción",
      desc: "Recibe a tiempo y ahorra",
      onPress: onGoToSubscribe,
    },
    {
      id: "card-orders",
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Mis pedidos",
      desc: "Seguimiento y historial",
      onPress: onGoToOrders,
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

      {/* Cards */}
      <main className="flex-1 px-5 pb-8 space-y-4">
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => c.onPress && c.onPress()}
            className="
              group w-full text-left rounded-3xl border border-gray-100 bg-white
              shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]
              transition-all
            "
            style={{ minHeight: 96 }}
          >
            <div className="p-5 flex items-center gap-4">
              <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-yellow-400 text-black shadow">
                {c.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-black">{c.title}</h4>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition" />
                </div>
                <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </main>
    </section>
  );
};

export default Home;
