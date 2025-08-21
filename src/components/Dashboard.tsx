import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, Users, Package, Award, Download, Gift, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { asesores, products, pointTransactions, redemptionTransactions } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Calculate comprehensive stats
  const totalAsesores = asesores.length;
  const totalProducts = products.length;
  
  // Calculate total points awarded from all transactions
  const totalPointsAwarded = pointTransactions.reduce((total, transaction) => total + transaction.pointsAwarded, 0);
  
  // Calculate total points redeemed from redemption transactions
  const totalPointsRedeemed = redemptionTransactions.reduce((total, transaction) => total + transaction.pointsUsed, 0);
  
  // Calculate total available points across all advisors
  const totalPointsAvailable = asesores.reduce((total, asesor) => total + asesor.pointsAvailable, 0);
  
  const totalRedemptions = redemptionTransactions.length;

  // Chart data for sales per month
  const salesData = [
    { month: 'Ene', ventas: 12, puntos: 2400 },
    { month: 'Feb', ventas: 19, puntos: 3800 },
    { month: 'Mar', ventas: 15, puntos: 3000 },
    { month: 'Abr', ventas: 25, puntos: 5000 },
    { month: 'May', ventas: 22, puntos: 4400 },
    { month: 'Jun', ventas: 30, puntos: 6000 },
  ];

  // Chart data for advisor performance
  const advisorData = asesores.slice(0, 5).map(asesor => ({
    name: asesor.name.split(' ')[0],
    points: asesor.pointsAvailable,
    sales: asesor.propertiesSold
  }));

  // Pie chart data for redemptions by category
  const redemptionData = [
    { name: 'Electrónicos', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Experiencias', value: 28, color: 'hsl(var(--chart-2))' },
    { name: 'Hogar', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Otros', value: 17, color: 'hsl(var(--chart-4))' }
  ];

  const chartConfig = {
    ventas: {
      label: "Ventas",
      color: "hsl(var(--chart-1))",
    },
    puntos: {
      label: "Puntos",
      color: "hsl(var(--chart-2))",
    },
    points: {
      label: "Puntos",
      color: "hsl(var(--chart-1))",
    },
    sales: {
      label: "Ventas",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Panel de Control</h1>
          <p className="text-muted-foreground">
            Resumen general del sistema de recompensas
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>

      {/* Stats Cards - Updated with point totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Asesores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAsesores}</div>
            <p className="text-xs text-muted-foreground">
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Puntos Otorgados Total</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPointsAwarded.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Todos los puntos otorgados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Puntos Canjeados Total</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPointsRedeemed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalRedemptions} canjes realizados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Puntos Disponibles Total</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPointsAvailable.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Listos para canjear
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Productos Disponibles</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              +3 nuevos esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Eficiencia de Canjes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPointsAwarded > 0 ? Math.round((totalPointsRedeemed / totalPointsAwarded) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Puntos canjeados vs otorgados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales and Points Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ventas y Puntos por Mes</CardTitle>
            <CardDescription>
              Evolución de ventas y puntos otorgados en los últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="ventas" fill="hsl(var(--chart-1))" />
                <Bar dataKey="puntos" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Advisors Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Asesores</CardTitle>
            <CardDescription>
              Puntos disponibles por los mejores asesores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={advisorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="points" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Redemptions by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Canjes por Categoría</CardTitle>
            <CardDescription>
              Distribución de canjes realizados por categoría de producto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={redemptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {redemptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas transacciones y eventos del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Ana García canjeó iPhone 15 Pro</p>
                  <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Carlos López registró nueva venta</p>
                  <p className="text-xs text-muted-foreground">Hace 12 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Nuevo producto agregado al catálogo</p>
                  <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">María Rodríguez alcanzó 10,000 puntos</p>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { Dashboard };