import type { Asesor, PointRule, PointTransaction, Product, PropertySale, RedemptionTransaction } from "../types";


export const asesores: Asesor[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@inmobiliaria.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    propertiesSold: 15,
    pointsAccumulated: 7500,
    pointsRedeemed: 2000,
    pointsAvailable: 5500,
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@inmobiliaria.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    propertiesSold: 22,
    pointsAccumulated: 11000,
    pointsRedeemed: 3500,
    pointsAvailable: 7500,
    joinDate: '2022-11-20'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana.martinez@inmobiliaria.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    propertiesSold: 18,
    pointsAccumulated: 9000,
    pointsRedeemed: 1500,
    pointsAvailable: 7500,
    joinDate: '2023-03-10'
  },
  {
    id: '4',
    name: 'Pedro Sánchez',
    email: 'pedro.sanchez@inmobiliaria.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    propertiesSold: 12,
    pointsAccumulated: 6000,
    pointsRedeemed: 1000,
    pointsAvailable: 5000,
    joinDate: '2023-05-22'
  },
  {
    id: '5',
    name: 'Laura Torres',
    email: 'laura.torres@inmobiliaria.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    propertiesSold: 25,
    pointsAccumulated: 12500,
    pointsRedeemed: 4000,
    pointsAvailable: 8500,
    joinDate: '2022-08-30'
  }
];

export const products: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro',
    description: 'Último modelo de iPhone con tecnología avanzada',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop',
    pointsRequired: 5000,
    isActive: true,
    expiryDate: '2024-12-31',
    category: 'Tecnología'
  },
  {
    id: '2',
    title: 'MacBook Air M3',
    description: 'Laptop profesional para productividad máxima',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop',
    pointsRequired: 8000,
    isActive: true,
    expiryDate: '2024-12-31',
    category: 'Tecnología'
  },
  {
    id: '3',
    title: 'Voucher Spa Day',
    description: 'Día completo de relajación en spa de lujo',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=300&fit=crop',
    pointsRequired: 1500,
    isActive: true,
    expiryDate: '2024-12-31',
    category: 'Experiencias'
  },
  {
    id: '4',
    title: 'Cena para dos',
    description: 'Cena romántica en restaurante 5 estrellas',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop',
    pointsRequired: 2000,
    isActive: true,
    expiryDate: '2024-12-31',
    category: 'Experiencias'
  },
  {
    id: '5',
    title: 'AirPods Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
    pointsRequired: 1200,
    isActive: true,
    expiryDate: '2024-12-31',
    category: 'Tecnología'
  }
];

export const pointRules: PointRule[] = [
  {
    id: '1',
    name: 'Venta Cerrada',
    description: 'Por cada propiedad vendida exitosamente',
    icon: '🏠',
    pointsAwarded: 500,
    isActive: true
  },
  {
    id: '2',
    name: 'Cita Realizada',
    description: 'Por cada cita con cliente potencial',
    icon: '📅',
    pointsAwarded: 50,
    isActive: true
  },
  {
    id: '3',
    name: 'Lead Calificado',
    description: 'Por generar un lead calificado',
    icon: '🎯',
    pointsAwarded: 100,
    isActive: true
  },
  {
    id: '4',
    name: 'Referido Exitoso',
    description: 'Por referir un cliente que compre',
    icon: '🤝',
    pointsAwarded: 200,
    isActive: true
  },
  {
    id: '5',
    name: 'Meta Mensual',
    description: 'Por cumplir meta mensual de ventas',
    icon: '🏆',
    pointsAwarded: 1000,
    isActive: true
  }
];

export const pointTransactions: PointTransaction[] = [
  {
    id: '1',
    asesorId: '1',
    asesorName: 'María González',
    ruleId: '1',
    ruleName: 'Venta Cerrada',
    pointsAwarded: 500,
    date: '2024-01-15',
    comment: 'Venta de casa en Zona Rosa'
  },
  {
    id: '2',
    asesorId: '2',
    asesorName: 'Carlos Rodríguez',
    ruleId: '1',
    ruleName: 'Venta Cerrada',
    pointsAwarded: 500,
    date: '2024-01-14',
    comment: 'Departamento en Santa Fe'
  },
  {
    id: '3',
    asesorId: '1',
    asesorName: 'María González',
    ruleId: '2',
    ruleName: 'Cita Realizada',
    pointsAwarded: 50,
    date: '2024-01-13'
  }
];

export const redemptionTransactions: RedemptionTransaction[] = [
  {
    id: '1',
    asesorId: '1',
    asesorName: 'María González',
    productId: '3',
    productTitle: 'Voucher Spa Day',
    pointsUsed: 1500,
    date: '2024-01-10',
    status: 'delivered'
  },
  {
    id: '2',
    asesorId: '2',
    asesorName: 'Carlos Rodríguez',
    productId: '5',
    productTitle: 'AirPods Pro',
    pointsUsed: 1200,
    date: '2024-01-08',
    status: 'pending'
  }
];

export const propertySales: PropertySale[] = [
  {
    id: '1',
    asesorId: '1',
    address: 'Av. Reforma 123, Ciudad de México',
    saleDate: '2024-01-15',
    saleAmount: 2500000,
    pointsEarned: 500
  },
  {
    id: '2',
    asesorId: '2',
    address: 'Santa Fe Business Park, Torre A',
    saleDate: '2024-01-14',
    saleAmount: 3200000,
    pointsEarned: 500
  }
];