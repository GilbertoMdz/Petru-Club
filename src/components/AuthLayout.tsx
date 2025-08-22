import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, onBack, children }) => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400">
      {/* decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 left-16 w-24 h-24 bg-black rounded-full animate-pulse" />
        <div className="absolute bottom-24 right-24 w-20 h-20 bg-white rounded-full animate-ping" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="rounded-3xl bg-white/75 backdrop-blur-md border border-black/10 shadow-2xl p-8">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-6 inline-flex items-center text-black/70 hover:text-black transition"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </button>
          )}

          <h1 className="text-3xl font-bold text-black">{title}</h1>
          {subtitle && <p className="text-black/70 mt-2">{subtitle}</p>}

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
