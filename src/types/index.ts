export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface Asesor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  propertiesSold: number;
  pointsAccumulated: number;
  pointsRedeemed: number;
  pointsAvailable: number;
  joinDate: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  pointsRequired: number;
  isActive: boolean;
  expiryDate: string;
  category: string;
}

export interface PointRule {
  id: string;
  name: string;
  description: string;
  icon: string;
  pointsAwarded: number;
  isActive: boolean;
}

export interface PointTransaction {
  id: string;
  asesorId: string;
  asesorName: string;
  ruleId: string;
  ruleName: string;
  pointsAwarded: number;
  date: string;
  comment?: string;
}

export interface RedemptionTransaction {
  id: string;
  asesorId: string;
  asesorName: string;
  productId: string;
  productTitle: string;
  pointsUsed: number;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
}

export interface PropertySale {
  id: string;
  asesorId: string;
  address: string;
  saleDate: string;
  saleAmount: number;
  pointsEarned: number;
}