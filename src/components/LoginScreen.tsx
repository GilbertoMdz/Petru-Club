import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Mail, Lock } from "lucide-react";

interface LoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

const GoogleIcon = () => (
  <svg viewBox="0 0 533.5 544.3" className="w-5 h-5" aria-hidden="true">
    <path fill="#4285f4" d="M533.5 278.4c0-18.5-1.6-37.1-5-55H272.1v104.2h147c-6.3 34.1-25.2 63-53.7 82.4v68h86.7c50.8-46.8 81.4-115.7 81.4-199.6z"/>
    <path fill="#34a853" d="M272.1 544.3c72.5 0 133.5-23.9 177.9-65.1l-86.7-68c-24.1 16.2-55 25.8-91.2 25.8-70 0-129.3-47.2-150.6-110.6H32.5v69.6c44 87.4 134.7 148.3 239.6 148.3z"/>
    <path fill="#fbbc05" d="M121.5 326.4c-10.5-31.5-10.5-65.8 0-97.3v-69.6H32.5c-42.7 84.7-42.7 183.4 0 268.1l89-101.2z"/>
    <path fill="#ea4335" d="M272.1 105.8c39.5-.6 77.6 14.3 106.6 41.9l79.6-79.6C410.3 23.2 344.1-.1 272.1 0 167.2 0 76.5 60.9 32.5 148.3l89 69.6C142.8 153 202.1 105.8 272.1 105.8z"/>
  </svg>
);

const LoginScreen: React.FC<LoginProps> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const canSubmit = email.trim() && pass.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSuccess();
  };

  return (
    <section
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400"
      style={{
        padding: "calc(env(safe-area-inset-top,0px) + 16px) 0 calc(env(safe-area-inset-bottom,0px) + 24px)",
      }}
    >
      {/* Animated Background (igual que en Hero) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-black rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full animate-bounce" />
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-black rounded-full animate-ping" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full animate-pulse" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header: Volver */}
        <div className="flex items-center justify-start mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 
                       border border-black/10 text-black/70 hover:bg-black/5 
                       transition text-sm bg-white/40 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>

        {/* Título */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-black leading-tight">Inicia sesión</h1>
          <p className="mt-2 text-black/80">Accede para guardar tu perfil y recomendaciones.</p>
        </div>

        {/* Formulario */}
        <form onSubmit={submit} className="mt-8 space-y-5 text-left">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/80" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Correo electrónico"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-yellow-300/70 focus:border-black transition shadow-lg"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/80" />
            <input
              id="password"
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              placeholder="Contraseña"
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-yellow-300/70 focus:border-black transition shadow-lg"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-black/5"
            >
              {showPass ? <EyeOff className="h-5 w-5 text-black/70" /> : <Eye className="h-5 w-5 text-black/70" />}
            </button>
          </div>

          {/* Opciones */}
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-black/80">
              <input type="checkbox" className="rounded border-black/30 text-yellow-400 focus:ring-yellow-400" />
              Recuérdame
            </label>
            <button type="button" className="text-black font-medium hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-black text-white px-6 py-3.5 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.02] shadow-xl flex items-center justify-center group disabled:opacity-50"
          >
            Entrar
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-black/20" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-yellow-500/60 backdrop-blur px-3 text-xs text-black rounded">
                o continúa con
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white text-black font-semibold py-3 border border-black/10 hover:bg-white/90 transition shadow"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              className="rounded-full py-3 border border-black/10 bg-white text-black hover:bg-white/90 transition font-semibold shadow"
            >
              Apple
            </button>
          </div>
        </form>

        {/* Registro */}
        <p className="mt-6 text-sm text-black/80 text-center">
          ¿No tienes cuenta?{" "}
          <span className="font-semibold underline decoration-black underline-offset-4">
            Regístrate
          </span>
        </p>
      </div>
    </section>
  );
};

export default LoginScreen;
