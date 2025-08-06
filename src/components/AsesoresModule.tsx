import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts@2.15.2';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, ArrowLeft, TrendingUp } from 'lucide-react@0.487.0';
import { asesores, pointTransactions, redemptionTransactions, propertySales } from '../data/mockData';
import { Asesor } from '../types';

interface AsesoresModuleProps {
  selectedAsesor: string | null;
  onSelectAsesor: (asesorId: string | null) => void;
}

const AsesoresModule: React.FC<AsesoresModuleProps> = ({ selectedAsesor, onSelectAsesor }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAsesores = asesores.filter(asesor =>
    asesor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asesor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedAsesor) {
    const asesor = asesores.find(a => a.id === selectedAsesor);
    if (!asesor) return null;

    // Get advisor's transactions
    const advisorTransactions = pointTransactions.filter(t => t.advisorId === asesor.id);
    const advisorRedemptions = redemptionTransactions.filter(r => r.advisorId === asesor.id);
    const advisorSales = propertySales.filter(s => s.advisorId === asesor.id);

    // Chart data for advisor's performance over time
    const performanceData = [
      { month: 'Ene', points: 850, sales: 2 },
      { month: 'Feb', points: 1200, sales: 3 },
      { month: 'Mar', points: 980, sales: 2 },
      { month: 'Abr', points: 1500, sales: 4 },
      { month: 'May', points: 1300, sales: 3 },
      { month: 'Jun', points: 1800, sales: 5 },
    ];

    const chartConfig = {
      points: {
        label: "Puntos",
        color: "hsl(var(--chart-1))",
      },
      sales: {
        label: "Ventas",
        color: "hsl(var(--chart-2))",
      },
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => onSelectAsesor(null)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1>Perfil de Asesor</h1>
            <p className="text-muted-foreground">
              Información detallada y rendimiento del asesor
            </p>
          </div>
        </div>

        {/* Advisor Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                  {asesor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <CardTitle>{asesor.name}</CardTitle>
                  <p className="text-muted-foreground">{asesor.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Teléfono: {asesor.phone} | Región: {asesor.region}
                  </p>
                </div>
              </div>
              <Badge variant={asesor.status === 'active' ? 'default' : 'secondary'}>
                {asesor.status === 'active' ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{asesor.totalPoints}</div>
                <p className="text-sm text-muted-foreground">Puntos Totales</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{asesor.propertiesSold}</div>
                <p className="text-sm text-muted-foreground">Propiedades Vendidas</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{advisorRedemptions.length}</div>
                <p className="text-sm text-muted-foreground">Canjes Realizados</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  ${advisorSales.reduce((total, sale) => total + sale.value, 0).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Ventas Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Rendimiento Mensual
              </CardTitle>
              <CardDescription>
                Evolución de puntos y ventas en los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="points" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transacciones Recientes</CardTitle>
              <CardDescription>
                Últimas actividades de puntos y canjes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {advisorTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      +{transaction.points} pts
                    </Badge>
                  </div>
                ))}
                {advisorRedemptions.slice(0, 3).map((redemption) => (
                  <div key={redemption.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Canje: {redemption.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(redemption.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-red-600">
                      -{redemption.pointsUsed} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales History */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Ventas</CardTitle>
            <CardDescription>
              Registro completo de propiedades vendidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Propiedad</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Puntos</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advisorSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                    <TableCell>{sale.propertyAddress}</TableCell>
                    <TableCell>{sale.propertyType}</TableCell>
                    <TableCell>${sale.value.toLocaleString()}</TableCell>
                    <TableCell>{sale.pointsEarned}</TableCell>
                    <TableCell>
                      <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'}>
                        {sale.status === 'completed' ? 'Completada' : 'Pendiente'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestión de Asesores</h1>
          <p className="text-muted-foreground">
            Administra los asesores inmobiliarios y su rendimiento
          </p>
        </div>
        <Button>Agregar Asesor</Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar asesores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Advisors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAsesores.map((asesor) => (
          <Card key={asesor.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectAsesor(asesor.id)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    {asesor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{asesor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{asesor.region}</p>
                  </div>
                </div>
                <Badge variant={asesor.status === 'active' ? 'default' : 'secondary'}>
                  {asesor.status === 'active' ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Puntos:</span>
                  <span className="font-semibold">{asesor.totalPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Propiedades:</span>
                  <span className="font-semibold">{asesor.propertiesSold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm truncate">{asesor.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAsesores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron asesores que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export { AsesoresModule };