import { useState } from "react";
import { useNav } from "./NavContext";
import type { QuizAnswers } from "../types";
import { quizSteps } from "../data/questions";

import Hero from "../components/Hero";
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/RegisterScreen";
import Home from "../components/Home";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import ResultsScreen from "../components/ResultsScreen";

export default function Navigator() {
  const { screen, go, back } = useNav();

  // Estado del quiz
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    petType: "", breed: "", size: "", weight: "",
    activityLevel: "", foodPreferences: "", sensitivities: ""
  });

  const total = quizSteps.length;
  const isLast = currentStep === total - 1;
  const q = quizSteps[currentStep];

  const startQuiz = () => { setCurrentStep(0); go("quiz"); };

  // Rutas principales
  if (screen === "hero")
    return <Hero onLogin={() => go("login")} onRegister={() => go("register")} />;

  if (screen === "login")
    return <LoginScreen onSuccess={() => go("home")} onBack={() => back()} />;

  if (screen === "register")
    return <RegisterScreen onSuccess={() => go("home")} onBack={() => back()} />;

  if (screen === "home")
    return <Home onStartQuiz={startQuiz} />;

  if (screen === "results")
    return (
      <ResultsScreen
        answers={answers}
        onRestart={() => {
          setAnswers({
            petType:"", breed:"", size:"", weight:"",
            activityLevel:"", foodPreferences:"", sensitivities:""
          });
          go("home");
        }}
      />
    );

  // ---- Quiz (avance automático en TODAS las preguntas) ----
  const handleSelect = (value: string) => {
    setAnswers(a => ({ ...a, [q.id]: value }));

    // Le damos un micro delay para que se note la selección
    setTimeout(() => {
      if (isLast) {
        go("results");
      } else {
        setCurrentStep(s => s + 1);
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header con progreso (sin botón Siguiente) */}
      <div className="sticky top-0 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <button onClick={() => (currentStep ? setCurrentStep(s => s - 1) : back())}>
            Anterior
          </button>
          <span>{currentStep + 1} / {total}</span>
          {/* espacio a la derecha para balancear */}
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
