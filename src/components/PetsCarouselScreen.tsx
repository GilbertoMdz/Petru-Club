// src/screens/PetsCarouselScreen.tsx
import React, { useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import PetSlide from '../components/PetSlide';
import type { Pet } from '../components/PetsScreen'; // reaprovechamos el tipo

interface Props {
  pets: Pet[];
  onBack?: () => void;
  onAddPet?: () => void;
  onOpenPet?: (id: string) => void;
}

const PetsCarouselScreen: React.FC<Props> = ({ pets, onBack, onAddPet, onOpenPet }) => {
  const hasPets = Array.isArray(pets) && pets.length > 0;

  // Carrusel a pantalla completa
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-centrar el primer slide al montar (opcional)
  useEffect(() => {
    if (!hasPets) return;
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
  }, [hasPets]);

  return (
    <Motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[100svh] relative bg-[#FFF6E5] bg-[url('/paws-bg.svg')] bg-repeat"
      style={{
        padding: 'calc(env(safe-area-inset-top,0px)) 0 calc(env(safe-area-inset-bottom,0px))',
      }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-black/10 text-black/80 bg-white/70 backdrop-blur-sm hover:bg-white transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <button
          onClick={onAddPet}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-black/10 text-black bg-white/80 backdrop-blur-sm hover:bg-white transition text-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      {!hasPets ? (
        <div className="min-h-[100svh] flex flex-col justify-center px-5">
          <h2 className="text-xl font-bold text-slate-800">No tienes mascota registrada</h2>
          <p className="mt-2 text-sm text-slate-600">
            Registra tu mascota para llevar control de vacunas, medicación y peso.
          </p>
          <button
            onClick={onAddPet}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 font-semibold text-white hover:bg-gray-900"
          >
            <Plus className="w-4 h-4" />
            Registrar mascota
          </button>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="flex h-[100svh] w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {pets.map((p, i) => (
            <PetSlide
              key={p.id}
              pet={p}
              index={i}
              refCallback={(el) => (slideRefs.current[i] = el)}
              onOpen={onOpenPet}
            />
          ))}
        </div>
      )}
    </Motion.section>
  );
};

export default PetsCarouselScreen;
