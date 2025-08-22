import { LogIn, UserPlus, Dog } from "lucide-react";

interface HeroProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLogin, onRegister }) => {
  return (
    <section
      id="inicio"
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400"
      // respeta la zona segura inferior (iOS) + extra 24px
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-black rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full animate-bounce" />
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-black rounded-full animate-ping" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-black/10 backdrop-blur-sm text-black font-semibold mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
            Bienvenido a Petru Club
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-black mb-2 leading-tight">
            Todo lo que tu{" "}
            <span className="block text-white drop-shadow-lg">mascota necesita</span>
          </h1>

          <p className="text-xl md:text-2xl text-black/80 mb-6 max-w-3xl mx-auto leading-relaxed">
            Inicia sesión o crea tu cuenta para guardar tus recomendaciones.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={onLogin}
              className="group bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-2xl"
            >
              <LogIn className="w-5 h-5" />
              Iniciar sesión
            </button>

            <button
              onClick={onRegister}
              className="group bg-white/20 backdrop-blur-sm text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 border border-black/20"
            >
              <UserPlus className="w-5 h-5" />
              Registrarse
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator centrado, animado y fuera del safe area */}
      <div
        className="absolute inset-x-0 flex justify-center pointer-events-none"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <Dog className="w-10 h-10 text-black animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
