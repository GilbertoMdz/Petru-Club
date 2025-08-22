export interface QuizAnswers {
  petType: string;
  breed: string;
  size: string;
  weight: string;
  activityLevel: string;
  foodPreferences: string;
  sensitivities: string;
}

export interface QuizStep {
  id: keyof QuizAnswers;
  title: string;
  subtitle?: string;
  options: Array<{
    id: string;
    label: string;
    icon: any;
    description?: string;
  }>;
  multiSelect?: boolean;
}