import React, { useMemo, useState, useEffect, useRef } from "react";
import {
    ArrowLeft,
    Camera,
    Dog,
    Cat,
    Fish,
    Bird,
    Turtle,
    MousePointer2,
    ChevronRight,
    Check,
    Info,
} from "lucide-react";
import type { Pet } from "./PetsScreen"; // usa el tipo que ya tienes

type SpeciesKey = Pet["species"] | "fish" | "bird" | "reptile" | "mammal";

interface AddPetWizardProps {
    onCancel?: () => void;
    onComplete?: (pet: Pet) => void;
}

type SizeKey = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<SizeKey, { label: string }> = {
    xs: { label: "Muy pequeño" },
    sm: { label: "Pequeño" },
    md: { label: "Mediano" },
    lg: { label: "Grande" },
    xl: { label: "Muy grande" },
};

const speciesOptions: Array<{
    key: SpeciesKey;
    label: string;
    icon: React.ReactNode;
}> = [
        { key: "dog", label: "Perro", icon: <Dog className="w-8 h-8" /> },
        { key: "cat", label: "Gato", icon: <Cat className="w-8 h-8" /> },
        { key: "fish", label: "Pez", icon: <Fish className="w-8 h-8" /> },
        { key: "bird", label: "Ave", icon: <Bird className="w-8 h-8" /> },
        { key: "reptile", label: "Reptil", icon: <Turtle className="w-8 h-8" /> },
        { key: "mammal", label: "Mamífero", icon: <MousePointer2 className="w-8 h-8" /> },
    ];

const pawMarks = [0, 1, 2, 3, 4];

const bubbleBg = (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-10 -left-12 w-32 h-32 bg-black rounded-full animate-pulse" />
        <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full animate-bounce" />
        <div className="absolute bottom-6 left-1/3 w-14 h-14 bg-black rounded-full animate-ping" />
    </div>
);

/* -------------------- Catálogos de razas -------------------- */
const DOG_BREEDS = [
    "Mestizo pequeño",
    "Mestizo mediano",
    "Mestizo grande",
    "Labrador Retriever",
    "Golden Retriever",
    "Poodle",
    "Chihuahua",
    "French Bulldog",
    "Beagle",
    "Pastor Alemán",
];

const CAT_BREEDS = [
    "Mestizo",
    "Criollo",
    "Siames",
    "Persa",
    "Maine Coon",
    "Bengalí",
    "British Shorthair",
    "Sphynx",
];

function getBreedOptionsForSpecies(species: SpeciesKey | ""): string[] {
    if (species === "dog") return DOG_BREEDS;
    if (species === "cat") return CAT_BREEDS;
    return ["Mestizo", "Otro"];
}
/* ------------------------------------------------------------ */

const SectionShell: React.FC<{
    title: string;
    subtitle?: string;
    onBack?: () => void;
    children: React.ReactNode;
}> = ({ title, subtitle, onBack, children }) => {
    return (
        <div
            className="min-h-screen relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400"
            style={{
                padding:
                    "calc(env(safe-area-inset-top,0px) + 12px) 0 calc(env(safe-area-inset-bottom,0px) + 84px)",
            }}
        >
            {/* decor */}
            {bubbleBg}

            {/* header */}
            <div className="px-5 pt-2 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-black/10 text-black/80 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver
                </button>
            </div>

            {/* title */}
            <div className="px-5 mt-4 mb-3">
                <h1 className="text-2xl font-extrabold text-black">{title}</h1>
                {subtitle && <p className="text-sm text-black/80 mt-1">{subtitle}</p>}
            </div>

            {/* content */}
            <div className="px-5">{children}</div>
        </div>
    );
};

const FooterCTA: React.FC<{
    canContinue: boolean;
    onContinue: () => void;
    onBack?: () => void;
    continueLabel?: string;
}> = ({ canContinue, onContinue, onBack, continueLabel = "Continuar" }) => (
    <div
        className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-black/10 to-transparent"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px))" }}
    >
        <div className="px-5 pb-3 pt-2">
            <div className="flex gap-3">
                <button
                    onClick={onBack}
                    className="flex-1 rounded-full px-4 py-3 border border-black/20 bg-white/60 backdrop-blur-sm text-black font-semibold hover:bg-white transition"
                >
                    Volver
                </button>
                <button
                    disabled={!canContinue}
                    onClick={onContinue}
                    className="flex-1 rounded-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-50 transition"
                >
                    {continueLabel}
                </button>
            </div>
        </div>
    </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = "",
}) => (
    <div
        className={
            "rounded-3xl bg-white/80 backdrop-blur-md border border-black/10 shadow-[0_12px_28px_rgba(0,0,0,0.12)] p-5 " +
            className
        }
    >
        {children}
    </div>
);

const StepDots: React.FC<{ step: number; total: number }> = ({ step, total }) => (
    <div className="flex justify-center gap-2 mt-4 mb-2">
        {Array.from({ length: total }).map((_, i) => (
            <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-black" : "w-2 bg-black/30"
                    }`}
            />
        ))}
    </div>
);

/* -------------------- ComboBox (buscable) -------------------- */
/* ------------ ComboBox (buscable, menú en PORTAL) ------------ */
import { createPortal } from "react-dom";

type ComboBoxProps = {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: string[];
    placeholder?: string;
    allowCustom?: boolean;
};

const ComboBox: React.FC<ComboBoxProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = "Escribe para buscar…",
    allowCustom = true,
}) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [menuRect, setMenuRect] = useState<{ left: number; top: number; width: number } | null>(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options;
        return options.filter((o) => o.toLowerCase().includes(q));
    }, [options, query]);

    // calcula posición en viewport y altura segura
    const recalcPosition = () => {
        const el = wrapperRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setMenuRect({
            left: Math.round(Math.max(8, Math.min(r.left, window.innerWidth - 8 - r.width))), // dentro del viewport
            top: Math.round(r.bottom + 6),
            width: Math.round(r.width),
        });
    };

    useEffect(() => {
        if (!open) return;
        recalcPosition();
        const onResizeScroll = () => recalcPosition();
        window.addEventListener("resize", onResizeScroll);
        window.addEventListener("scroll", onResizeScroll, true);
        // opcional: bloquear scroll de fondo mientras está abierto
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("resize", onResizeScroll);
            window.removeEventListener("scroll", onResizeScroll, true);
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    // cerrar al click fuera
    useEffect(() => {
        if (!open) return;
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    const select = (val: string) => {
        onChange(val);
        setOpen(false);
        setQuery("");
    };

    // menú como portal
    const menu =
        open && menuRect
            ? createPortal(
                <>
                    {/* backdrop para taps fuera (móvil) */}
                    <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} aria-hidden />
                    <div
                        className="z-[9999] rounded-2xl border border-black/10 bg-white shadow-2xl overflow-hidden"
                        style={{
                            position: "fixed",
                            left: menuRect.left,
                            top: menuRect.top,
                            width: menuRect.width,
                            maxHeight: Math.min(420, window.innerHeight - menuRect.top - 16),
                        }}
                    >
                        <div className="p-2 border-b border-black/10 bg-white">
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Escribe para buscar…"
                                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                            />
                        </div>

                        <ul className="max-h-[60vh] overflow-auto">
                            {filtered.length === 0 && (
                                <li className="px-3 py-3 text-sm text-gray-500">Sin coincidencias</li>
                            )}
                            {filtered.map((opt) => (
                                <li key={opt}>
                                    <button
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault();      // evita que el input pierda el foco antes de seleccionar
                                            select(opt);             // guarda y cierra el menú
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm hover:bg-black/5 ${opt === value ? "bg-yellow-50" : ""
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                </li>

                            ))}
                        </ul>

                        {allowCustom && value && !options.includes(value) && (
                            <div className="border-t border-black/10 bg-white">
                                <div className="px-4 py-2 text-[11px] uppercase tracking-wide text-gray-500">
                                    Personalizado
                                </div>
                                <button
                                    type="button"
                                    onClick={() => select(value)}
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-black/5"
                                >
                                    Usar “{value}”
                                </button>
                            </div>
                        )}
                    </div>
                </>,
                document.body
            )
            : null;

    return (
        <div className="w-full" ref={wrapperRef}>
            <label className="block text-sm font-medium text-black mb-2">{label}</label>

            <div className="relative">
                <input
                    value={allowCustom ? value : (value || "")}
                    onChange={(e) => allowCustom && onChange(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    className="w-full rounded-2xl border border-black/10 bg-white/80 backdrop-blur-md px-4 py-3 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                />
                <button
                    type="button"
                    onClick={() => setOpen((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-black/5"
                    aria-label="Abrir lista"
                >
                    <ChevronRight className={`w-5 h-5 transition ${open ? "rotate-90" : ""}`} />
                </button>
            </div>

            {menu}
        </div>
    );
};


/* ------------------------------------------------------------- */

/** Wizard principal */
const AddPetWizard: React.FC<AddPetWizardProps> = ({ onCancel, onComplete }) => {
    const [step, setStep] = useState(0); // 0..3
    const totalSteps = 4;

    // state del formulario
    const [species, setSpecies] = useState<SpeciesKey | "">("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState(""); // YYYY-MM-DD
    const [breed, setBreed] = useState("");
    const [size, setSize] = useState<SizeKey>("md");
    const [avatarUrl, setAvatarUrl] = useState("");

    // validaciones por paso
    const canContinue = useMemo(() => {
        if (step === 0) return !!species;
        if (step === 1) return name.trim().length >= 2 && !!dob;
        if (step === 2) return !!breed && !!size;
        if (step === 3) return true; // foto opcional
        return false;
    }, [step, species, name, dob, breed, size]);

    const next = () => setStep((s) => Math.min(totalSteps - 1, s + 1));
    const prev = () => {
        if (step === 0) onCancel?.();
        else setStep((s) => Math.max(0, s - 1));
    };

    const submit = () => {
        const mappedSpecies: Pet["species"] =
            species === "dog" || species === "cat" ? species : "other";

        const newPet: Pet = {
            id: `pet-${Date.now()}`,
            name: name.trim(),
            species: mappedSpecies,
            breed: breed.trim(),
            age: calcAgeLabel(dob),
            weight: undefined,
            avatarUrl: avatarUrl || undefined,
        };
        onComplete?.(newPet);
    };

    return (
        <>
            {step === 0 && (
                <SectionShell
                    title="Cuéntanos de tu mascota"
                    subtitle="¿Qué tipo de mascota tienes?"
                    onBack={onCancel}
                >
                    <Card>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {speciesOptions.map((opt) => {
                                const active = species === opt.key;
                                return (
                                    <button
                                        key={opt.key}
                                        onClick={() => setSpecies(opt.key)}
                                        className={`rounded-2xl p-4 text-center border transition shadow-sm ${active
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-black border-black/10 hover:bg-black/5"
                                            }`}
                                    >
                                        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-400/80 text-black shadow mb-2">
                                            {opt.icon}
                                        </div>
                                        <div className="font-semibold">{opt.label}</div>
                                    </button>
                                );
                            })}
                        </div>
                        <StepDots step={step} total={totalSteps} />
                    </Card>

                    <FooterCTA canContinue={canContinue} onContinue={next} onBack={prev} />
                </SectionShell>
            )}

            {step === 1 && (
                <SectionShell
                    title="Cuéntanos de tu mascota"
                    subtitle="Nombre y fecha de nacimiento"
                    onBack={prev}
                >
                    <div className="space-y-5">
                        <Card>
                            <label className="block text-sm font-medium text-black mb-2">Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ej. Coco"
                                className="w-full rounded-2xl border border-black/10 bg-white/80 backdrop-blur-md px-4 py-3 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                            />
                        </Card>

                        <Card>
                            <label className="block text-sm font-medium text-black mb-2">
                                Fecha de nacimiento
                            </label>
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full rounded-2xl border border-black/10 bg-white/80 backdrop-blur-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                            />
                        </Card>

                        <StepDots step={step} total={totalSteps} />
                    </div>

                    <FooterCTA canContinue={canContinue} onContinue={next} onBack={prev} />
                </SectionShell>
            )}

            {step === 2 && (
                <SectionShell
                    title="Cuéntanos de tu mascota"
                    subtitle="Raza y tamaño"
                    onBack={prev}
                >
                    <div className="space-y-5">
                        {/* Raza con ComboBox */}
                        <Card>
                            <ComboBox
                                label="Raza"
                                value={breed}
                                onChange={setBreed}
                                options={getBreedOptionsForSpecies(species)}
                                placeholder="Ej. Mestizo mediano"
                                allowCustom={true}
                            />
                        </Card>

                        {/* Tamaño con slider + huellitas */}
                        <Card>
                            <label className="block text-sm font-medium text-black mb-1">Tamaño</label>

                            <div className="flex justify-between items-end mb-2 px-1">
                                {pawMarks.map((i) => (
                                    <div
                                        key={i}
                                        className={`w-6 h-6 rounded-full flex items-center justify-center ${i === valueFromSize(size) ? "opacity-100" : "opacity-40"
                                            }`}
                                    >
                                        🐾
                                    </div>
                                ))}
                            </div>

                            <input
                                type="range"
                                min={0}
                                max={4}
                                step={1}
                                value={valueFromSize(size)}
                                onChange={(e) =>
                                    setSize(sizeFromValue(parseInt(e.target.value, 10) as 0 | 1 | 2 | 3 | 4))
                                }
                                className="w-full accent-black"
                            />

                            <div className="text-center mt-2 font-semibold">
                                {sizeMap[size].label}
                            </div>

                            <div className="mt-2 flex items-start gap-2 text-sm text-black/80">
                                <Info className="w-4 h-4 mt-0.5" />
                                <button
                                    type="button"
                                    onClick={() =>
                                        alert("Tip: calcula el tamaño según peso/altura de tu mascota.")
                                    }
                                    className="underline underline-offset-4"
                                >
                                    ¿Cómo saber el tamaño de mi mascota?
                                </button>
                            </div>
                        </Card>

                        <StepDots step={step} total={totalSteps} />
                    </div>

                    <FooterCTA canContinue={canContinue} onContinue={next} onBack={prev} />
                </SectionShell>
            )}

            {step === 3 && (
                <SectionShell
                    title="Cuéntanos de tu mascota"
                    subtitle="Agrega una foto (opcional)"
                    onBack={prev}
                >
                    <div className="space-y-5">
                        <Card>
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-2xl bg-yellow-400/80 text-black flex items-center justify-center shadow border border-black/10">
                                    {avatarUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={avatarUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                    ) : (
                                        <Camera className="w-7 h-7" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-black mb-1">
                                        URL de la imagen
                                    </label>
                                    <input
                                        type="url"
                                        value={avatarUrl}
                                        onChange={(e) => setAvatarUrl(e.target.value)}
                                        placeholder="https://ejemplo.com/mi-mascota.jpg"
                                        className="w-full rounded-2xl border border-black/10 bg-white/80 backdrop-blur-md px-4 py-3 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-black" />
                                <p className="text-sm text-black/80">
                                    Podrás editar esta información más tarde desde <b>Mascotas</b>.
                                </p>
                            </div>
                        </Card>

                        <StepDots step={step} total={totalSteps} />
                    </div>

                    <FooterCTA
                        canContinue={true}
                        onContinue={submit}
                        onBack={prev}
                        continueLabel="Guardar"
                    />
                </SectionShell>
            )}
        </>
    );
};

// Helpers de tamaño
function valueFromSize(s: SizeKey): 0 | 1 | 2 | 3 | 4 {
    return (["xs", "sm", "md", "lg", "xl"] as SizeKey[]).indexOf(s) as 0 | 1 | 2 | 3 | 4;
}
function sizeFromValue(v: 0 | 1 | 2 | 3 | 4): SizeKey {
    return (["xs", "sm", "md", "lg", "xl"] as SizeKey[])[v];
}

// Helper para mostrar edad bonita desde YYYY-MM-DD
function calcAgeLabel(isoDate: string): string | undefined {
    if (!isoDate) return undefined;
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return undefined;
    const now = new Date();
    let years = now.getFullYear() - d.getFullYear();
    let months = now.getMonth() - d.getMonth();
    if (months < 0) {
        years -= 1;
        months += 12;
    }
    if (years <= 0 && months <= 0) return "recién nacido";
    if (years <= 0) return `${months} mes${months === 1 ? "" : "es"}`;
    if (months === 0) return `${years} año${years === 1 ? "" : "s"}`;
    return `${years} año${years === 1 ? "" : "s"} ${months} mes${months === 1 ? "" : "es"}`;
}

export default AddPetWizard;
