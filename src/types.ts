export type AccentColorKey = 'dulivi' | 'emerald' | 'amber' | 'violet' | 'rose';

export interface FormData {
  name: string;
  email: string;
  password?: string;
  phone: string;
  cpf: string;
  accentColor: AccentColorKey;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success';
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  features: string[];
  popular?: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}
