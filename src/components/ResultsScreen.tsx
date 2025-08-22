import React from 'react';
import { Star, ShoppingCart, Award, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  rating: number;
  price: string;
  features: string[];
  match: number;
}

interface ResultsScreenProps {
  answers: Record<any, any>;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ onRestart }) => {
  // Mock products based on answers
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Nutrition Adult',
      brand: 'NutriPet Pro',
      image: 'https://images.pexels.com/photos/4432260/pexels-photo-4432260.jpeg',
      rating: 4.9,
      price: '$42.99',
      features: ['Sin granos', 'Proteína real', 'Omega 3 & 6'],
      match: 96
    },
    {
      id: '2',
      name: 'Natural Balance Formula',
      brand: 'PurePet',
      image: 'https://images.pexels.com/photos/4432260/pexels-photo-4432260.jpeg',
      rating: 4.7,
      price: '$38.50',
      features: ['Ingredientes naturales', 'Fácil digestión', 'Vitaminas esenciales'],
      match: 92
    },
    {
      id: '3',
      name: 'Active Life Complete',
      brand: 'VitalPet',
      image: 'https://images.pexels.com/photos/4432260/pexels-photo-4432260.jpeg',
      rating: 4.8,
      price: '$45.25',
      features: ['Alto en proteína', 'Para mascotas activas', 'Antioxidantes'],
      match: 89
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-yellow-400 rounded-2xl mb-6">
            <Award size={32} className="text-black" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-wide">
            Recomendaciones
            <span className="block text-yellow-400">personalizadas</span>
          </h1>
          
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Basándose en las características de tu mascota, hemos seleccionado 
            los mejores alimentos que se adaptan a sus necesidades específicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2"
            >
              {index === 0 && (
                <div className="bg-yellow-400 text-black text-center py-2 font-medium text-sm tracking-wide">
                  MEJOR COINCIDENCIA
                </div>
              )}
              
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                  {product.match}% match
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-black mb-1 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 font-light">{product.brand}</p>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                </div>
                
                <div className="mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-light mr-2 mb-2"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-light text-black">
                    {product.price}
                  </span>
                  <button className="flex items-center px-6 py-3 bg-yellow-400 text-black font-medium rounded-xl hover:bg-yellow-300 transition-colors duration-300 group/button">
                    <ShoppingCart size={18} className="mr-2 group-hover/button:scale-110 transition-transform" />
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center px-8 py-4 border-2 border-black text-black font-medium rounded-2xl hover:bg-black hover:text-white transition-all duration-300"
          >
            <Heart size={20} className="mr-2" strokeWidth={1.5} />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;