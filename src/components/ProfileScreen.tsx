// src/components/ProfileScreen.tsx
import React from "react";
import {
  ArrowLeft,
  Pencil,
  LogOut,
  PawPrint,
  MapPin,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  Bell,
  Globe,
  ChevronRight,
  BadgePercent,
  Gem,
  Settings,
} from "lucide-react";

interface ProfileScreenProps {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
    tier?: "Free" | "Plus" | "Premium";
  };
  onBack?: () => void;
  onEditProfile?: () => void;
  onLogout?: () => void;

  // accesos rápidos
  onManagePets?: () => void;
  onOrders?: () => void;
  onCoupons?: () => void;
  onSubscriptions?: () => void
  // ajustes
  onAddresses?: () => void;
  onPayments?: () => void;
  onNotifications?: () => void;
  onPrivacy?: () => void;
  onLanguage?: () => void;
  onGeneralSettings?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user = {
    name: "Alex Ramírez",
    email: "alex@example.com",
    tier: "Plus",
  },
  onBack,
  onEditProfile,
  onLogout,
  onManagePets,
  onOrders,
  onCoupons,
  onSubscriptions,

  onAddresses,
  onPayments,
  onNotifications,
  onPrivacy,
  onLanguage,
  onGeneralSettings,
}) => {
  const initials = user.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

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
            onClick={onEditProfile}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-black/10 text-black bg-white/70 backdrop-blur-sm hover:bg-white transition text-sm"
          >
            <Pencil className="w-4 h-4" />
            Editar
          </button>
        </div>

        {/* Avatar card */}
        <div className="px-5 -mt-10">
          <div className="rounded-3xl bg-white shadow-[0_12px_28px_rgba(0,0,0,0.12)] border border-gray-100 p-4 flex items-center gap-4">
            {/* Avatar */}
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border border-black/5"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-xl font-bold">
                {initials}
              </div>
            )}

            {/* Name / email */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-black leading-tight">
                  {user.name}
                </h2>
                {user.tier && (
                  <span className="inline-flex items-center text-[11px] font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                    {user.tier}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-black/70 bg-yellow-500/40 px-2 py-1 rounded-full backdrop-blur">
                <ShieldCheck className="w-3.5 h-3.5" />
                Perfil verificado
              </div>
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 border border-gray-200 hover:bg-gray-50 transition text-sm"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={onManagePets}
          className="group rounded-3xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow">
            <PawPrint className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-black">Mis mascotas</h3>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black" />
            </div>
            <p className="text-xs text-gray-600">Gestiona perfiles y planes</p>
          </div>
        </button>

        <button
          onClick={onOrders}
          className="group rounded-3xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-black">Pedidos</h3>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black" />
            </div>
            <p className="text-xs text-gray-600">Historial y seguimiento</p>
          </div>
        </button>

        <button
          onClick={onCoupons}
          className="group rounded-3xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow">
            <BadgePercent className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-black">Cupones</h3>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black" />
            </div>
            <p className="text-xs text-gray-600">Promos y recompensas</p>
          </div>
        </button>

        <button
          onClick={onSubscriptions}
          className="group rounded-3xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow">
            <Gem className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-black">Suscripciones</h3>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black" />
            </div>
            <p className="text-xs text-gray-600">Planes y pagos recurrentes</p>
          </div>
        </button>

      </div>

      {/* Info cards */}
      <div className="px-5 mt-6 space-y-4">
        {/* Dirección y pago */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onAddresses}
            className="rounded-3xl border border-gray-100 bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-black">Direcciones</h4>
                <p className="text-sm text-gray-600">Casa, oficina, etc.</p>
              </div>
            </div>
          </button>

          <button
            onClick={onPayments}
            className="rounded-3xl border border-gray-100 bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-black">Métodos de pago</h4>
                <p className="text-sm text-gray-600">Tarjetas y facturación</p>
              </div>
            </div>
          </button>
        </div>

        {/* Ajustes */}
        <div className="rounded-3xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <ul className="divide-y divide-gray-100">
            <li>
              <button
                onClick={onNotifications}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-3xl sm:rounded-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black">Notificaciones</p>
                    <p className="text-xs text-gray-600">
                      Promos, recordatorios y avisos
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </li>

            <li>
              <button
                onClick={onPrivacy}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black">Privacidad</p>
                    <p className="text-xs text-gray-600">
                      Permisos y seguridad
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </li>

            <li>
              <button
                onClick={onLanguage}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black">Idioma</p>
                    <p className="text-xs text-gray-600">Español (MX)</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </li>

            <li>
              <button
                onClick={onGeneralSettings}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-b-3xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black">Configuración</p>
                    <p className="text-xs text-gray-600">Preferencias generales</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Espacio final para respirar (el Navigator ya mete pb para el footer) */}
      <div className="h-6" />
    </section>
  );
};

export default ProfileScreen;
