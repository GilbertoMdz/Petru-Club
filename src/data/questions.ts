import { 
  Dog, 
  Cat, 
  Ruler, 
  Weight, 
  Zap, 
  Leaf, 
  AlertCircle,
  Heart,
  Fish,
  Wheat,
  ShieldCheck
} from 'lucide-react';
import type { QuizStep } from '../types';

export const quizSteps: QuizStep[] = [
  {
    id: 'petType',
    title: '¿Qué tipo de mascota tienes?',
    subtitle: 'Selecciona el tipo de compañero que necesita alimentación',
    options: [
      { 
        id: 'dog', 
        label: 'Perro', 
        icon: Dog,
        description: 'Alimentación canina especializada'
      },
      { 
        id: 'cat', 
        label: 'Gato', 
        icon: Cat,
        description: 'Nutrición felina específica'
      }
    ]
  },
  {
    id: 'breed',
    title: '¿Cuál es la raza de tu mascota?',
    subtitle: 'Diferentes razas tienen necesidades nutricionales específicas',
    options: [
      { id: 'small-breed', label: 'Raza pequeña', icon: Heart, description: 'Chihuahua, Yorkshire, Maltés' },
      { id: 'medium-breed', label: 'Raza mediana', icon: Heart, description: 'Beagle, Cocker, Border Collie' },
      { id: 'large-breed', label: 'Raza grande', icon: Heart, description: 'Labrador, Golden, Pastor Alemán' },
      { id: 'mixed-breed', label: 'Raza mixta', icon: Heart, description: 'Mestizo o sin raza definida' }
    ]
  },
  {
    id: 'size',
    title: '¿Qué tamaño tiene tu mascota?',
    subtitle: 'El tamaño influye en la cantidad y tipo de nutrientes necesarios',
    options: [
      { id: 'toy', label: 'Muy pequeño', icon: Ruler, description: 'Menos de 3 kg' },
      { id: 'small', label: 'Pequeño', icon: Ruler, description: '3-10 kg' },
      { id: 'medium', label: 'Mediano', icon: Ruler, description: '10-25 kg' },
      { id: 'large', label: 'Grande', icon: Ruler, description: '25-45 kg' },
      { id: 'giant', label: 'Gigante', icon: Ruler, description: 'Más de 45 kg' }
    ]
  },
  {
    id: 'weight',
    title: '¿Cuál es la condición corporal actual?',
    subtitle: 'Esto nos ayuda a recomendar la fórmula más adecuada',
    options: [
      { id: 'underweight', label: 'Bajo peso', icon: Weight, description: 'Necesita ganar peso saludablemente' },
      { id: 'ideal', label: 'Peso ideal', icon: Weight, description: 'Mantener peso actual' },
      { id: 'overweight', label: 'Sobrepeso', icon: Weight, description: 'Necesita control de peso' }
    ]
  },
  {
    id: 'activityLevel',
    title: '¿Cuál es el nivel de actividad?',
    subtitle: 'Las mascotas más activas necesitan más calorías y nutrientes específicos',
    options: [
      { id: 'low', label: 'Baja actividad', icon: Zap, description: 'Principalmente en casa, caminatas cortas' },
      { id: 'moderate', label: 'Actividad moderada', icon: Zap, description: 'Ejercicio regular, juegos ocasionales' },
      { id: 'high', label: 'Alta actividad', icon: Zap, description: 'Muy activo, deportes, entrenamientos' }
    ]
  },
  {
    id: 'foodPreferences',
    title: '¿Qué tipo de alimentación prefieres?',
    subtitle: 'Selecciona el estilo de alimentación que mejor se adapte a tus valores',
    options: [
      { id: 'grain-free', label: 'Sin granos', icon: Wheat, description: 'Libre de cereales y granos' },
      { id: 'natural', label: 'Natural', icon: Leaf, description: 'Ingredientes naturales y orgánicos' },
      { id: 'high-protein', label: 'Alto en proteína', icon: Fish, description: 'Rica en proteínas animales' },
      { id: 'holistic', label: 'Holística', icon: ShieldCheck, description: 'Nutrición completa y balanceada' }
    ]
  },
  {
    id: 'sensitivities',
    title: '¿Tu mascota tiene alguna sensibilidad?',
    subtitle: 'Identifica ingredientes que debemos evitar en las recomendaciones',
    multiSelect: true,
    options: [
      { id: 'none', label: 'Sin sensibilidades', icon: ShieldCheck, description: 'No tiene problemas conocidos' },
      { id: 'chicken', label: 'Pollo', icon: AlertCircle, description: 'Sensible al pollo' },
      { id: 'beef', label: 'Carne de res', icon: AlertCircle, description: 'Sensible a la carne de res' },
      { id: 'dairy', label: 'Lácteos', icon: AlertCircle, description: 'Intolerancia a lácteos' },
      { id: 'grains', label: 'Granos', icon: AlertCircle, description: 'Sensible a cereales' },
      { id: 'fish', label: 'Pescado', icon: AlertCircle, description: 'Sensible al pescado' }
    ]
  }
];