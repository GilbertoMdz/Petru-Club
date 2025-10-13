// src/components/PetSlide.tsx
import React, { useMemo } from 'react';
import { MapPin, Heart, Calendar, Scale, User } from 'lucide-react';
import type { Pet } from '../components/PetsScreen'; // reutilizamos tu tipo

// --- utilidades para “derivar” datos desde tu Pet actual ---
const parseWeightKg = (weight?: string) => {
  if (!weight) return null;
  // intenta extraer número: "8.5 kg" -> 8.5
  const n = Number(String(weight).replace(/[^\d.,-]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
};

const estimateAgeMonths = (age?: string) => {
  if (!age) return null;
  // soporta "2 años", "18 meses", "1.5 años"
  const lower = age.toLowerCase();
  const yearsMatch = lower.match(/([\d.,]+)/);
  if (!yearsMatch) return null;
  const num = Number(yearsMatch[1].replace(',', '.'));
  if (!Number.isFinite(num)) return null;
  if (lower.includes('mes')) return Math.round(num); // ya viene en meses
  // por defecto interpreta en años
  return Math.round(num * 12);
};

const toAgeLabel = (age?: string) => {
  const months = estimateAgeMonths(age) ?? null;
  if (months === null) return '—';
  const years = Math.floor(months / 12);
  if (years <= 0) return '0 years';
  return `${years} ${years === 1 ? 'year' : 'years'}`;
};

const speciesFallbackImage = (species: Pet['species']) => {
  // usa tus assets si los tienes; si no, una ruta pública por defecto
  switch (species) {
    case 'cat': return '/pets/cat.png';
    case 'dog': return '/pets/dog.png';
    default:    return '/pets/dog.png';
  }
};

type PetSlideProps = {
  pet: Pet;
  index: number;
  refCallback?: (el: HTMLDivElement | null) => void;
  onOpen?: (id: string) => void;
  onLike?: (id: string) => void;
};

const PetSlide: React.FC<PetSlideProps> = ({ pet, index, refCallback, onOpen, onLike }) => {
  const weightKg = useMemo(() => parseWeightKg(pet.weight), [pet.weight]);
  const ageLabel = useMemo(() => toAgeLabel(pet.age), [pet.age]);
  const weightLabel = `${weightKg ?? '—'}${weightKg ? 'kg' : ''}`;
  const heroSrc = pet.avatarUrl || speciesFallbackImage(pet.species);

  return (
    <div
      ref={refCallback}
      data-index={index}
      className="relative h-[100svh] w-full shrink-0 snap-start"
    >
      {/* HERO */}
      <div className="absolute left-0 right-0 top-0 h-[60%]">
        <img src={heroSrc} alt={pet.name} className="h-full w-full object-cover" />

      </div>

      {/* CARD DETALLE */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] rounded-t-[2.5rem] bg-white p-6 pt-8 pb-24 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{pet.name}</h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="size-4 text-slate-400" />
              <span>Oaxaca, MX</span>
              <span className="text-slate-400">•</span>
              <span>2 km</span>
            </div>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500"
            onClick={() => onLike?.(pet.id)}
            aria-label="Fav"
          >
            <Heart className="size-5" fill="currentColor" />
          </button>
        </div>

        {/* Chips estadísticas (derivadas de tu modelo actual) */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <StatChip icon={<User className="size-4" />} label="Specie" value={pet.species} className="bg-green-100/60 text-green-800" />
          <StatChip icon={<Calendar className="size-4" />} label="Age" value={ageLabel} className="bg-purple-100/60 text-purple-800" />
          <StatChip icon={<Scale className="size-4" />} label="Weight" value={weightLabel} className="bg-orange-100/60 text-orange-800" />
        </div>

        {/* Resumen simple */}
        <div className="mt-6 space-y-3 text-sm">
          <Row label="Raza" value={pet.breed || 'Sin raza'} />
          <Row label="Plan" value={pet.plan?.label ?? '—'} />
          <Row label="Entrega" value={pet.plan?.nextDelivery ? `Llega ${pet.plan.nextDelivery}` : '—'} />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onOpen?.(pet.id)}
            className="rounded-full bg-black px-5 py-3 text-white font-semibold hover:bg-gray-900"
          >
            Ver detalles
          </button>
          {/* Puedes mapear aquí Editar / Eliminar si quieres */}
        </div>
      </div>
    </div>
  );
};

export default PetSlide;

// === UI helpers ===
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function StatChip({
  icon,
  label,
  value,
  className = '',
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl p-3 text-center border border-slate-200/60 ${className}`}>
      <div className="flex items-center justify-center gap-1 text-xs opacity-80">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}
