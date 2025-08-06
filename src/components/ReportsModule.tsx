import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Download, FileText, Filter } from 'lucide-react@0.487.0';
import { asesores, products, pointTransactions, redemptionTransactions, pointRules } from '../data/mockData';

export const ReportsModule: React.FC = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedAsesor, setSelectedAsesor] = useState('all-asesores');
  const [selectedCategory, setSelectedCategory] = useState('all-categories');

  // Generate summary statistics
  const totalPointsAwarded = pointTransactions.reduce((sum, t) => sum + t.pointsAwarded, 0);
  const totalPointsRedeemed = redemptionTransactions.reduce((sum, r) => sum + r.pointsUsed, 0);
  const activeAsesores = asesores.length;
  const totalTransactions = pointTransactions.length + redemptionTransactions.length;

  // Filter functions
  const filterByDate = (date: string) => {
    if (!dateFrom && !dateTo) return true;
    const itemDate = new Date(date);
    const from = dateFrom ? new Date(dateFrom) : new Date('2000-01-01');
    const to = dateTo ? new Date(dateTo) : new Date('2030-12-31');
    return itemDate >= from && itemDate <= to;
  };

  const filteredPointTransactions = pointTransactions.filter(t => 
    filterByDate(t.date) && 
    (selectedAsesor === 'all-asesores' || t.asesorId === selectedAsesor)
  );

  const filteredRedemptions = redemptionTransactions.filter(r => 
    filterByDate(r.date) && 
    (selectedAsesor === 'all-asesores' || r.asesorId === selectedAsesor)
  );

  const handleExport = (reportType: string) => {
    // Mock export functionality
    alert(`Exportando reporte: ${reportType}\nFecha desde: ${dateFrom || 'No especificada'}\nFecha hasta: ${dateTo || 'No especificada'}`);
  };

  // Generate asesor performance report
  const asesorPerformanceReport = asesores.map(asesor => {
    const asesorTransactions = pointTransactions.filter(t => t.asesorId === asesor.id);
    const asesorRedemptions = redemptionTransactions.filter(r => r.asesorId === asesor.id);
    const totalEarned = asesorTransactions.reduce((sum, t) => sum + t.pointsAwarded, 0);
    const totalSpent = asesorRedemptions.reduce((sum, r) => sum + r.pointsUsed, 0);
    
    return {
      ...asesor,
      totalEarned,
      totalSpent,
      transactionCount: asesorTransactions.length,
      redemptionCount: asesorRedemptions.length
    };
  });

  // Generate product popularity report
  const productPopularityReport = products.map(product => {
    const productRedemptions = redemptionTransactions.filter(r => r.productId === product.id);
    const redemptionCount = productRedemptions.length;
    const totalPointsUsed = productRedemptions.reduce((sum, r) => sum + r.pointsUsed, 0);
    
    return {
      ...product,
      redemptionCount,
      totalPointsUsed
    };
  }).sort((a, b) => b.redemptionCount - a.redemptionCount);

  // Generate rules usage report
  const rulesUsageReport = pointRules.map(rule => {
    const ruleUsage = pointTransactions.filter(t => t.ruleId === rule.id);
    const usageCount = ruleUsage.length;
    const totalPointsAwarded = ruleUsage.reduce((sum, t) => sum + t.pointsAwarded, 0);
    
    return {
      ...rule,
      usageCount,
      totalPointsAwarded
    };
  }).sort((a, b) => b.usageCount - a.usageCount);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reportes</h2>
          <p className="text-gray-600">Genera y exporta reportes detallados del programa</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtros de Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date-from">Fecha Desde</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date-to">Fecha Hasta</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="asesor-filter">Asesor</Label>
              <Select value={selectedAsesor} onValueChange={setSelectedAsesor}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los asesores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-asesores">Todos los asesores</SelectItem>
                  {asesores.map((asesor) => (
                    <SelectItem key={asesor.id} value={asesor.id}>
                      {asesor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category-filter">Categoría</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">Todas las categorías</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                  <SelectItem value="experiencias">Experiencias</SelectItem>
                  <SelectItem value="hogar">Hogar</SelectItem>
                  <SelectItem value="viajes">Viajes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{totalPointsAwarded.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Puntos Otorgados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{totalPointsRedeemed.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Puntos Canjeados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{activeAsesores}</p>
              <p className="text-sm text-gray-600">Asesores Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{totalTransactions}</p>
              <p className="text-sm text-gray-600">Total Transacciones</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="asesores" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="asesores">Asesores</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="reglas">Reglas</TabsTrigger>
          <TabsTrigger value="transacciones">Transacciones</TabsTrigger>
        </TabsList>

        <TabsContent value="asesores">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reporte de Rendimiento por Asesor</CardTitle>
              <Button onClick={() => handleExport('Rendimiento de Asesores')}>
                <Download className="w-4 h-4 mr-2" />
                Exportar Excel
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asesor</TableHead>
                    <TableHead>Propiedades Vendidas</TableHead>
                    <TableHead>Puntos Ganados</TableHead>
                    <TableHead>Puntos Canjeados</TableHead>
                    <TableHead>Puntos Disponibles</TableHead>
                    <TableHead>Transacciones</TableHead>
                    <TableHead>Canjes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asesorPerformanceReport.map((asesor) => (
                    <TableRow key={asesor.id}>
                      <TableCell className="font-medium">{asesor.name}</TableCell>
                      <TableCell>{asesor.propertiesSold}</TableCell>
                      <TableCell>{asesor.totalEarned.toLocaleString()}</TableCell>
                      <TableCell>{asesor.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>{asesor.pointsAvailable.toLocaleString()}</TableCell>
                      <TableCell>{asesor.transactionCount}</TableCell>
                      <TableCell>{asesor.redemptionCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productos">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reporte de Popularidad de Productos</CardTitle>
              <Button onClick={() => handleExport('Productos Canjeados')}>
                <Download className="w-4 h-4 mr-2" />
                Exportar Excel
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio (Puntos)</TableHead>
                    <TableHead>Veces Canjeado</TableHead>
                    <TableHead>Total Puntos Usados</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPopularityReport.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>{product.pointsRequired.toLocaleString()}</TableCell>
                      <TableCell>{product.redemptionCount}</TableCell>
                      <TableCell>{product.totalPointsUsed.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={product.isActive ? 'default' : 'secondary'}>
                          {product.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reglas">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reporte de Uso de Reglas</CardTitle>
              <Button onClick={() => handleExport('Reglas Utilizadas')}>
                <Download className="w-4 h-4 mr-2" />
                Exportar Excel
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Regla</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Puntos por Uso</TableHead>
                    <TableHead>Veces Utilizada</TableHead>
                    <TableHead>Total Puntos Otorgados</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rulesUsageReport.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">
                        <span className="mr-2">{rule.icon}</span>
                        {rule.name}
                      </TableCell>
                      <TableCell className="max-w-xs text-sm text-gray-600">
                        {rule.description}
                      </TableCell>
                      <TableCell>{rule.pointsAwarded}</TableCell>
                      <TableCell>{rule.usageCount}</TableCell>
                      <TableCell>{rule.totalPointsAwarded.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                          {rule.isActive ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transacciones">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reporte de Transacciones</CardTitle>
              <Button onClick={() => handleExport('Historial de Transacciones')}>
                <Download className="w-4 h-4 mr-2" />
                Exportar Excel
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Points Transactions */}
                <div>
                  <h4 className="font-medium mb-3">Puntos Otorgados</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Asesor</TableHead>
                        <TableHead>Actividad</TableHead>
                        <TableHead>Puntos</TableHead>
                        <TableHead>Comentario</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPointTransactions.slice(0, 10).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell>{transaction.asesorName}</TableCell>
                          <TableCell>{transaction.ruleName}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              +{transaction.pointsAwarded}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {transaction.comment || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Redemption Transactions */}
                <div>
                  <h4 className="font-medium mb-3">Canjes Realizados</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Asesor</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Puntos</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRedemptions.slice(0, 10).map((redemption) => (
                        <TableRow key={redemption.id}>
                          <TableCell>{new Date(redemption.date).toLocaleDateString()}</TableCell>
                          <TableCell>{redemption.asesorName}</TableCell>
                          <TableCell>{redemption.productTitle}</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800">
                              -{redemption.pointsUsed}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                redemption.status === 'delivered' ? 'default' :
                                redemption.status === 'pending' ? 'secondary' : 'destructive'
                              }
                            >
                              {redemption.status === 'delivered' ? 'Entregado' :
                               redemption.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};