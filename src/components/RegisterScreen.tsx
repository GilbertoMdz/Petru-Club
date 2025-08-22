import React, { useMemo, useState } from "react";
import {ArrowLeft,ArrowRight,User,Mail,Phone,Calendar,Lock,Eye,EyeOff,} from "lucide-react";

interface RegisterProps {
    onSuccess: (user: { name: string; email: string }) => void;
    onBack: () => void;
}

const GoogleIcon = () => (
    <svg viewBox="0 0 533.5 544.3" className="w-5 h-5" aria-hidden="true">
        <path fill="#4285f4" d="M533.5 278.4c0-18.5-1.6-37.1-5-55H272.1v104.2h147c-6.3 34.1-25.2 63-53.7 82.4v68h86.7c50.8-46.8 81.4-115.7 81.4-199.6z" />
        <path fill="#34a853" d="M272.1 544.3c72.5 0 133.5-23.9 177.9-65.1l-86.7-68c-24.1 16.2-55 25.8-91.2 25.8-70 0-129.3-47.2-150.6-110.6H32.5v69.6c44 87.4 134.7 148.3 239.6 148.3z" />
        <path fill="#fbbc05" d="M121.5 326.4c-10.5-31.5-10.5-65.8 0-97.3v-69.6H32.5c-42.7 84.7-42.7 183.4 0 268.1l89-101.2z" />
        <path fill="#ea4335" d="M272.1 105.8c39.5-.6 77.6 14.3 106.6 41.9l79.6-79.6C410.3 23.2 344.1-.1 272.1 0 167.2 0 76.5 60.9 32.5 148.3l89 69.6C142.8 153 202.1 105.8 272.1 105.8z" />
    </svg>
);

const RegisterScreen: React.FC<RegisterProps> = ({ onSuccess, onBack }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [dob, setDob] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Validaciones
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const telOk = tel.replace(/\D/g, "").length >= 10;
    const passOk = pass.length >= 6;
    const confirmOk = confirm === pass && confirm.length > 0;
    const nameOk = name.trim().length >= 2;
    const dobOk = !!dob;

    const canSubmit = useMemo(
        () => nameOk && emailOk && telOk && dobOk && passOk && confirmOk,
        [nameOk, emailOk, telOk, dobOk, passOk, confirmOk]
    );

    // Utilidad de estilos: “ghost” (vidrioso) → blanco cuando está válido
    const fieldClass = (hasValue: boolean, isValid: boolean) => {
        if (!hasValue) {
            return "bg-white/70 border-black/10"; // estado inicial
        }
        if (isValid) {
            return "bg-white border-black/20"; // lleno y válido => blanco
        }
        return "bg-white/70 border-red-300"; // lleno pero inválido
    };

    const submit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!canSubmit) return;
        // Solo navegación en maquetado:
        onSuccess({ name, email });
    };

    return (
        <section
            className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400"
            style={{
                padding:
                    "calc(env(safe-area-inset-top,0px) + 16px) 0 calc(env(safe-area-inset-bottom,0px) + 24px)",
            }}
        >
            {/* decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -left-16 w-80 h-80 rounded-full bg-black/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-white/25 blur-3xl" />
            </div>

            {/* layout */}
            <div className="relative z-10 w-full max-w-md flex flex-col">
                {/* header */}
                <div className="px-6">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-black/10 text-black/70 hover:bg-black/5 transition text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                    </button>
                </div>

                {/* contenido */}
                <main className="flex-1 overflow-y-auto px-6 pb-16">
                    <div className="text-center mt-4">
                        <h1 className="text-4xl font-extrabold text-black leading-tight">Crear cuenta</h1>
                        <p className="mt-2 text-black/80">
                            Completa tus datos para personalizar tu experiencia.
                        </p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-5 text-left">
                        {/* Nombre */}
                        <div className="relative">
                            <User
                                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${!name ? "text-black/80" : nameOk ? "text-black" : "text-red-500"
                                    }`}
                            />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nombre completo"
                                aria-invalid={!!name && !nameOk}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border backdrop-blur-md text-black placeholder-black/50 focus:outline-none focus:ring-2 transition shadow-lg ${fieldClass(
                                    !!name,
                                    nameOk
                                )} ${name && !nameOk ? "focus:ring-red-300" : "focus:ring-yellow-300/70"}`}
                                autoComplete="name"
                            />
                        </div>

                        {/* Correo */}
                        <div className="relative">
                            <Mail
                                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${!email ? "text-black/80" : emailOk ? "text-black" : "text-red-500"
                                    }`}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo electrónico"
                                aria-invalid={!!email && !emailOk}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border backdrop-blur-md text-black placeholder-black/50 focus:outline-none focus:ring-2 transition shadow-lg ${fieldClass(
                                    !!email,
                                    emailOk
                                )} ${email && !emailOk ? "focus:ring-red-300" : "focus:ring-yellow-300/70"}`}
                                autoComplete="email"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="relative">
                            <Phone
                                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${!tel ? "text-black/80" : telOk ? "text-black" : "text-red-500"
                                    }`}
                            />
                            <input
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                placeholder="Teléfono"
                                aria-invalid={!!tel && !telOk}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border backdrop-blur-md text-black placeholder-black/50 focus:outline-none focus:ring-2 transition shadow-lg ${fieldClass(
                                    !!tel,
                                    telOk
                                )} ${tel && !telOk ? "focus:ring-red-300" : "focus:ring-yellow-300/70"}`}
                                autoComplete="tel"
                            />
                        </div>

                        {/* Fecha de nacimiento */}
                        <div className="relative">
                            <Calendar
                                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${!dob ? "text-black/80" : dobOk ? "text-black" : "text-red-500"
                                    }`}
                            />
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                aria-invalid={!!dob && !dobOk}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border backdrop-blur-md text-black focus:outline-none focus:ring-2 transition shadow-lg ${fieldClass(
                                    !!dob,
                                    dobOk
                                )} ${dob && !dobOk ? "focus:ring-red-300" : "focus:ring-yellow-300/70"}`}
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="relative">
                            <Lock
                                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${!pass ? "text-black/80" : passOk ? "text-black" : "text-red-500"
                                    }`}
                            />
                            <input
                                type={showPass ? "text" : "password"}
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="Contraseña (mínimo 6 caracteres)"
                                aria-invalid={!!pass && !passOk}
                                className={`w-full pl-12 pr-12 py-4 rounded-2xl border backdrop-blur-md text-black placeholder-black/50 focus:outline-none focus:ring-2 transition shadow-lg ${fieldClass(
                                    !!pass,
                                    passOk
                                )} ${pass && !passOk ? "focus:ring-red-300" : "focus:ring-yellow-300/70"}`}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-black/5"
                            >
                                {showPass ? <EyeOff className="h-5 w-5 text-black/70" /> : <Eye className="h-5 w-5 text-black/70" />}
                            </button>
                        </div>

                        {/* Confirmar contraseña */}
                        <div className="relative">
                            <Lock
                                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${!confirm ? "text-black/80" : confirmOk ? "text-black" : "text-red-500"
                                    }`}
                            />
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Confirmar contraseña"
                                aria-invalid={!!confirm && !confirmOk}
                                className={`w-full pl-12 pr-12 py-4 rounded-2xl border backdrop-blur-md text-black placeholder-black/50 focus:outline-none focus:ring-2 transition shadow-lg ${fieldClass(
                                    !!confirm,
                                    confirmOk
                                )} ${confirm && !confirmOk ? "focus:ring-red-300" : "focus:ring-yellow-300/70"}`}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-black/5"
                            >
                                {showConfirm ? (
                                    <EyeOff className="h-5 w-5 text-black/70" />
                                ) : (
                                    <Eye className="h-5 w-5 text-black/70" />
                                )}
                            </button>
                        </div>

                        {/* Divider + Social */}
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-black/20" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-yellow-500/60 backdrop-blur px-3 text-xs text-black rounded">
                                    o regístrate con
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-2">
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
                </main>

                {/* CTA */}
                <footer
                    className="sticky bottom-0 left-0 right-0 px-6 pt-2 pb-3 bg-transparent"
                    style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 12px)" }}
                >
                    <button
                        onClick={() => submit()}
                        disabled={!canSubmit}
                        className="w-full bg-black text-white px-6 py-3.5 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.02] shadow-xl disabled:opacity-50"
                    >
                        Crear cuenta
                        <ArrowRight className="inline-block ml-2 h-5 w-5 align-middle" />
                    </button>
                </footer>
            </div>
        </section>
    );
};

export default RegisterScreen;
