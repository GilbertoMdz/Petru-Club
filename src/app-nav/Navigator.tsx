// src/app-nav/Navigator.tsx
import React, { useState } from "react";
import { useNav } from "./NavContext";
import type { QuizAnswers } from "../types";
import { quizSteps } from "../data/questions";
import SubscriptionPage from "../components/SubscriptionPage";
import ProductGrid from "../components/ProductGrid"; // ⬅️ importa tu grid

import Hero from "../components/Hero";
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/RegisterScreen";
import Home from "../components/Home";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import ResultsScreen from "../components/ResultsScreen";
import FooterNav from "../components/FooterNav";
// Pantallas visuales
import ProfileScreen from "../components/ProfileScreen";
import PetsScreen, { type Pet } from "../components/PetsScreen";
import CartScreen from "../components/CartScreen";
import CouponsScreen from "../components/CouponsScreen";
// Wizard para alta de mascota
import AddPetWizard from "../components/AddPetWizard";

export default function Navigator() {
  const { screen, go, back } = useNav();

  // -------- Estado de Mascotas (fuente de verdad para PetsScreen) --------
  const [pets, setPets] = useState<Pet[]>([]);

  // -------- Estado del quiz --------
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    petType: "",
    breed: "",
    size: "",
    weight: "",
    activityLevel: "",
    foodPreferences: "",
    sensitivities: "",
  });

  const total = quizSteps.length;
  const isLast = currentStep === total - 1;
  const q = quizSteps[currentStep];

  // Helper: render con footer y padding seguro
  const withFooter = (
    node: React.ReactNode,
    active: "home" | "coupons" | "cart" | "pets" | "profile"
  ) => (
    <>
      <div className="pb-[calc(72px+env(safe-area-inset-bottom,0px))]">
        {node}
      </div>
      <FooterNav
        active={active}
        onGoToHome={() => go("home")}
        onGoToCoupons={() => go("coupons")}
        onGoToCart={() => go("cart")}
        onGoToPets={() => go("pets")}
        onGoToProfile={() => go("profile")}
      />
    </>
  );

  // -------- Rutas sin footer (onboarding / auth / quiz / results / petAdd) --------
  if (screen === "hero")
    return <Hero onLogin={() => go("login")} onRegister={() => go("register")} />;
  
  if (screen === "subscriptions") {
  return withFooter(<SubscriptionPage />, "home"); 
  // puedes usar "home" como tab activo o el que prefieras
}

  if (screen === "login")
    return <LoginScreen onSuccess={() => go("home")} onBack={() => back()} />;

  if (screen === "register")
    return <RegisterScreen onSuccess={() => go("home")} onBack={() => back()} />;

  if (screen === "petAdd") {
    return (
      <AddPetWizard
        onCancel={() => go("pets")}
        onComplete={(pet: Pet) => {
          setPets(prev => [...prev, pet]);
          go("pets");
        }}
      />
    );
  }

  if (screen === "results")
    return (
      <ResultsScreen
        answers={answers}
        onRestart={() => {
          setAnswers({
            petType: "",
            breed: "",
            size: "",
            weight: "",
            activityLevel: "",
            foodPreferences: "",
            sensitivities: "",
          });
          go("home");
        }}
      />
    );

  // -------- Rutas principales con footer --------
  if (screen === "home") {
    return withFooter(
      <Home
        onGoToQuiz={() => {
          setCurrentStep(0);
          go("quiz");
        }}
        onGoToExplore={() => go("products")}
        onGoToSubscribe={() => go("subscriptions")}
        onGoToOrders={() => go("cart")}
        onOpenOffer={(id) => console.log("open offer", id)}
        
      />,
      "home"
    );
  }
if (screen === "products") {
  return withFooter(<ProductGrid />, "home"); // usa "home" para no resaltar la pestaña de cupones
}
  if (screen === "coupons") {
    return withFooter(
      <CouponsScreen
        onBack={() => go("home")}
        onApply={(code) => console.log("Aplicar cupón", code)}
        onSave={(id) => console.log("Guardar cupón", id)}
        onOpenDetails={(id) => console.log("Detalles cupón", id)}
      />,
      "coupons"
    );
  }

  if (screen === "cart") {
    return withFooter(
      <CartScreen
        onBack={() => go("home")}
        onCheckout={() => console.log("checkout")}
        onRemove={(id) => console.log("remove", id)}
        onApplyCoupon={(code) => console.log("apply coupon", code)}
      />,
      "cart"
    );
  }

  if (screen === "pets") {
    return withFooter(
      <PetsScreen
        pets={pets}
        onBack={() => go("home")}
        onAddPet={() => go("petAdd")}
        onOpenPet={(id) => console.log("Abrir mascota", id)}
        onEditPet={(id) => console.log("Editar mascota", id)}
        onDeletePet={(id) =>
          setPets(prev => prev.filter(p => p.id !== id))
        }
        onManagePlan={(id) => console.log("Gestionar plan", id)}
      />,
      "pets"
    );
  }

  if (screen === "profile") {
    return withFooter(
      <ProfileScreen
        onBack={() => go("home")}
        onEditProfile={() => console.log("editar perfil")}
        onLogout={() => console.log("logout")}
        onManagePets={() => go("pets")}
        onOrders={() => go("cart")}
        onCoupons={() => go("coupons")}
        onFavorites={() => console.log("favoritos")}
        onAddresses={() => console.log("direcciones")}
        onPayments={() => console.log("pagos")}
        onNotifications={() => console.log("notificaciones")}
        onPrivacy={() => console.log("privacidad")}
        onLanguage={() => console.log("idioma")}
        onGeneralSettings={() => console.log("configuración")}
      />,
      "profile"
    );
  }

  // -------- Quiz (avance automático) --------
  const handleSelect = (value: string) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    setTimeout(() => {
      if (isLast) {
        go("results");
      } else {
        setCurrentStep((s) => s + 1);
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header con progreso */}
      <div className="sticky top-0 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <button onClick={() => (currentStep ? setCurrentStep((s) => s - 1) : back())}>
            Anterior
          </button>
          <span>
            {currentStep + 1} / {total}
          </span>
          <span style={{ width: 72 }} />
        </div>
        <ProgressBar currentStep={currentStep + 1} totalSteps={total} />
      </div>

      {/* Pregunta actual */}
      <div className="py-12">
        <QuestionCard
          title={q.title}
          subtitle={q.subtitle}
          options={q.options}
          selectedOption={answers[q.id]}
          onSelect={handleSelect}
          multiSelect={q.multiSelect}
        />
      </div>
    </div>
  );
}
