import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-black rounded-full h-3 mb-8 overflow-hidden shadow-inner">
      <div 
        className="bg-yellow-400 h-full rounded-full transition-all duration-700 ease-out shadow-lg"
        style={{ width: `${progress}%` }}
      >
        <div className="h-full w-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProgressBar;