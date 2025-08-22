// src/components/PetsScreen.tsx
import React from "react";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  PawPrint,
  ShieldCheck,
  Package,
} from "lucide-react";

export type Pet = {
  id: string;
  name: string;
  species: "dog" | "cat" | "other";
  breed?: string;
  age?: string;      // ej. "2 años"
  weight?: string;   // ej. "8.5 kg"
  avatarUrl?: string;
  plan?: {
    label: string;        // ej. "Plan Premium"
    nextDelivery?: string; // ej. "12 Sep"
  };
};

interface PetsScreenProps {
  pets: Pet[];
  onBack?: () => void;
  onAddPet?: () => void;
  onOpenPet?: (id: string) => void;
  onEditPet?: (id: string) => void;
  onDeletePet?: (id: string) => void;
  onManagePlan?: (id: string) => void;
}

const PetsScreen: React.FC<PetsScreenProps> = ({
  pets,
  onBack,
  onAddPet,
  onOpenPet,
  onEditPet,
  onDeletePet,
  onManagePlan,
}) => {
  const isEmpty = pets.length === 0;

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

        {/* Header actions */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-black/10 text-black/80 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>

          <button
            onClick={onAddPet}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-black/10 text-black bg-white/70 backdrop-blur-sm hover:bg-white transition text-sm"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        {/* Title */}
        <div className="px-5 mt-10">
          <h1 className="text-2xl font-extrabold text-black">Mis mascotas</h1>
          <p className="text-sm text-black/70">
            Administra perfiles, planes y entregas.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-6">
        {isEmpty ? (
          // Empty state
          <div className="rounded-3xl bg-white border border-gray-100 shadow-[0_12px_28px_rgba(0,0,0,0.12)] p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow">
              <PawPrint className="w-8 h-8" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-black">
              Aún no tienes mascotas
            </h2>
            <p className="text-gray-600">
              Crea un perfil para recibir recomendaciones personalizadas.
            </p>
            <button
              onClick={onAddPet}
              className="mt-5 inline-flex items-center gap-2 bg-black text-white rounded-full px-5 py-3 font-semibold hover:bg-gray-900 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar mascota
            </button>
          </div>
        ) : (
          // Grid de tarjetas
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pets.map((p) => (
              <article
                key={p.id}
                className="rounded-3xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition p-4"
              >
                <button
                  onClick={() => onOpenPet?.(p.id)}
                  className="w-full flex items-center gap-4 text-left"
                >
                  {/* Avatar */}
                  {p.avatarUrl ? (
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-black/5"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center">
                      <PawPrint className="w-7 h-7" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-extrabold text-black">{p.name}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {p.breed || "—"} • {p.age || "edad n/d"}
                      {p.weight ? ` • ${p.weight}` : ""}
                    </p>

                    {/* Plan badge */}
                    {p.plan && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center text-[11px] font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                          {p.plan.label}
                        </span>
                        {p.plan.nextDelivery && (
                          <span className="inline-flex items-center text-[11px] font-semibold bg-yellow-400/70 text-black px-2 py-0.5 rounded-full">
                            <Package className="w-3.5 h-3.5 mr-1" />
                            Llega {p.plan.nextDelivery}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>

                {/* Actions */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => onManagePlan?.(p.id)}
                    className="rounded-full px-3 py-2 text-sm font-semibold bg-black text-white hover:bg-gray-900 transition"
                  >
                    Gestionar plan
                  </button>
                  <button
                    onClick={() => onEditPet?.(p.id)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm border border-gray-200 hover:bg-gray-50 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => onDeletePet?.(p.id)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm border border-gray-200 text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* FAB agregar (opcional, por si quieres además del botón del header) */}
      {!isEmpty && (
        <button
          onClick={onAddPet}
          className="fixed right-5 bottom-[84px] z-40 rounded-full w-14 h-14 bg-black text-white shadow-xl hover:bg-gray-900 transition"
          aria-label="Agregar mascota"
          style={{ bottom: "calc(84px + env(safe-area-inset-bottom,0px))" }}
        >
          <Plus className="w-6 h-6 mx-auto" />
        </button>
      )}
    </section>
  );
};

export default PetsScreen;
