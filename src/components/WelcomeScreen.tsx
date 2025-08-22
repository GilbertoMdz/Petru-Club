import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex p-6 bg-black rounded-3xl mb-6 shadow-2xl">
            <Sparkles size={48} className="text-yellow-400" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extralight text-black mb-6 tracking-wide leading-tight">
          Encuentra el
          <span className="block text-yellow-400 font-light">alimento perfecto</span>
          para tu mascota
        </h1>
        
        <p className="text-xl text-gray-600 font-light mb-12 max-w-lg mx-auto leading-relaxed">
          Nuestro asistente digital analizará las necesidades específicas de tu compañero 
          para recomendarte la nutrición ideal
        </p>
        
        <button
          onClick={onStart}
          className="group inline-flex items-center px-12 py-5 bg-yellow-400 text-black text-xl font-medium rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-yellow-300"
        >
          Comenzar análisis
          <ArrowRight 
            size={24} 
            className="ml-3 group-hover:translate-x-1 transition-transform duration-300" 
            strokeWidth={2}
          />
        </button>
        
        <div className="mt-12 flex justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            2-3 minutos
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            100% personalizado
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            Recomendaciones premium
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;