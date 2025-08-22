import React from "react";

interface HomeProps {
  onStartQuiz: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartQuiz }) => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center
                 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400"
      style={{
        padding: "calc(env(safe-area-inset-top,0px)) 16px calc(env(safe-area-inset-bottom,0px))",
      }}
    >
      <h1 className="text-white drop-shadow-lg font-extrabold text-3xl">Bienvenido a Petru Club 🐾</h1>
      <p className="text-white/90 mt-3 max-w-sm">
        Aquí verás tu inicio. Por ahora es un placeholder.
      </p>

      <button
        onClick={onStartQuiz}
        className="mt-8 bg-black text-white px-6 py-3 rounded-full font-semibold
                   hover:bg-gray-900 transition-transform duration-300 hover:scale-[1.02]
                   shadow-xl"
      >
        Empezar cuestionario
      </button>
    </section>
  );
};

export default Home;
