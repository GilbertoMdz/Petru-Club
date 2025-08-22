import React from 'react';
import type { LucideIcon } from "lucide-react";


interface Option {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
}

interface QuestionCardProps {
  title: string;
  subtitle?: string;
  options: Option[];
  selectedOption: string;
  onSelect: (optionId: string) => void;
  multiSelect?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  title, 
  subtitle, 
  options, 
  selectedOption, 
  onSelect,
  multiSelect = false 
}) => {
  const isSelected = (optionId: string) => {
    if (multiSelect) {
      return selectedOption.split(',').includes(optionId);
    }
    return selectedOption === optionId;
  };

  const handleSelect = (optionId: string) => {
    if (multiSelect) {
      const currentSelections = selectedOption.split(',').filter(id => id);
      if (currentSelections.includes(optionId)) {
        const newSelections = currentSelections.filter(id => id !== optionId);
        onSelect(newSelections.join(','));
      } else {
        onSelect([...currentSelections, optionId].join(','));
      }
    } else {
      onSelect(optionId);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-wide">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-600 font-light max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {options.map((option) => {
          const Icon = option.icon;
          const selected = isSelected(option.id);
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                relative p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 ease-out
                border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1
                ${selected 
                  ? 'border-yellow-400 bg-yellow-50 shadow-yellow-100' 
                  : 'border-gray-100 bg-white hover:border-yellow-200 hover:shadow-yellow-50'
                }
              `}
            >
              <div className="text-center">
                <div className={`
                  inline-flex p-4 rounded-full mb-4 transition-all duration-300
                  ${selected ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-600'}
                `}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-medium text-black mb-2 tracking-wide">
                  {option.label}
                </h3>
                
                {option.description && (
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {option.description}
                  </p>
                )}
              </div>

              {selected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;