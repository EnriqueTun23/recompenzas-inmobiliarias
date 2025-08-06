import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Plus, Award, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react@0.487.0';
import { asesores, products, pointRules, pointTransactions, redemptionTransactions } from '../data/mockData';
import { PointTransaction, RedemptionTransaction } from '../types';

export const SalesModule: React.FC = () => {
  const [transactions, setTransactions] = useState<PointTransaction[]>(pointTransactions);
  const [redemptions, setRedemptions] = useState<RedemptionTransaction[]>(redemptionTransactions);
  const [isPointDialogOpen, setIsPointDialogOpen] = useState(false);
  const [isRedemptionDialogOpen, setIsRedemptionDialogOpen] = useState(false);

  const [pointFormData, setPointFormData] = useState({
    asesorId: '',
    ruleId: '',
    date: new Date().toISOString().split('T')[0],
    comment: ''
  });

  const [redemptionFormData, setRedemptionFormData] = useState({
    asesorId: '',
    productId: ''
  });

  const [redemptionError, setRedemptionError] = useState('');

  const handlePointsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const asesor = asesores.find(a => a.id === pointFormData.asesorId);
    const rule = pointRules.find(r => r.id === pointFormData.ruleId);
    
    if (!asesor || !rule) return;

    const newTransaction: PointTransaction = {
      id: Date.now().toString(),
      asesorId: pointFormData.asesorId,
      asesorName: asesor.name,
      ruleId: pointFormData.ruleId,
      ruleName: rule.name,
      pointsAwarded: rule.pointsAwarded,
      date: pointFormData.date,
      comment: pointFormData.comment
    };

    setTransactions([newTransaction, ...transactions]);
    
    // Reset form
    setPointFormData({
      asesorId: '',
      ruleId: '',
      date: new Date().toISOString().split('T')[0],
      comment: ''
    });
    setIsPointDialogOpen(false);
  };

  const handleRedemptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRedemptionError('');
    
    const asesor = asesores.find(a => a.id === redemptionFormData.asesorId);
    const product = products.find(p => p.id === redemptionFormData.productId);
    
    if (!asesor || !product) return;

    // Check if asesor has enough points
    if (asesor.pointsAvailable < product.pointsRequired) {
      setRedemptionError(`El asesor no tiene suficientes puntos. Disponibles: ${asesor.pointsAvailable}, Requeridos: ${product.pointsRequired}`);
      return;
    }

    const newRedemption: RedemptionTransaction = {
      id: Date.now().toString(),
      asesorId: redemptionFormData.asesorId,
      asesorName: asesor.name,
      productId: redemptionFormData.productId,
      productTitle: product.title,
      pointsUsed: product.pointsRequired,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setRedemptions([newRedemption, ...redemptions]);
    
    // Reset form
    setRedemptionFormData({
      asesorId: '',
      productId: ''
    });
    setIsRedemptionDialogOpen(false);
  };

  const updateRedemptionStatus = (redemptionId: string, status: 'pending' | 'delivered' | 'cancelled') => {
    setRedemptions(redemptions.map(r => 
      r.id === redemptionId ? { ...r, status } : r
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ventas y Puntos</h2>
          <p className="text-gray-600">Gestiona el otorgamiento de puntos y canjes de productos</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Dialog open={isPointDialogOpen} onOpenChange={setIsPointDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Award className="w-4 h-4 mr-2" />
                Otorgar Puntos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Otorgar Puntos por Actividad</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePointsSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="asesor">Asesor</Label>
                  <Select 
                    value={pointFormData.asesorId} 
                    onValueChange={(value) => setPointFormData({ ...pointFormData, asesorId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar asesor" />
                    </SelectTrigger>
                    <SelectContent>
                      {asesores.map((asesor) => (
                        <SelectItem key={asesor.id} value={asesor.id}>
                          {asesor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rule">Regla/Actividad</Label>
                  <Select 
                    value={pointFormData.ruleId} 
                    onValueChange={(value) => setPointFormData({ ...pointFormData, ruleId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar actividad" />
                    </SelectTrigger>
                    <SelectContent>
                      {pointRules.filter(r => r.isActive).map((rule) => (
                        <SelectItem key={rule.id} value={rule.id}>
                          {rule.icon} {rule.name} (+{rule.pointsAwarded} pts)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Fecha de la Actividad</Label>
                  <Input
                    id="date"
                    type="date"
                    value={pointFormData.date}
                    onChange={(e) => setPointFormData({ ...pointFormData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="comment">Comentario (Opcional)</Label>
                  <Textarea
                    id="comment"
                    value={pointFormData.comment}
                    onChange={(e) => setPointFormData({ ...pointFormData, comment: e.target.value })}
                    placeholder="Detalles adicionales sobre la actividad..."
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Otorgar Puntos
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsPointDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isRedemptionDialogOpen} onOpenChange={setIsRedemptionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Registrar Canje
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Registrar Canje Manual</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleRedemptionSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="asesor-redemption">Asesor</Label>
                  <Select 
                    value={redemptionFormData.asesorId} 
                    onValueChange={(value) => {
                      setRedemptionFormData({ ...redemptionFormData, asesorId: value });
                      setRedemptionError('');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar asesor" />
                    </SelectTrigger>
                    <SelectContent>
                      {asesores.map((asesor) => (
                        <SelectItem key={asesor.id} value={asesor.id}>
                          {asesor.name} ({asesor.pointsAvailable} pts disponibles)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="product-redemption">Producto</Label>
                  <Select 
                    value={redemptionFormData.productId} 
                    onValueChange={(value) => {
                      setRedemptionFormData({ ...redemptionFormData, productId: value });
                      setRedemptionError('');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.filter(p => p.isActive).map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.title} ({product.pointsRequired} pts)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {redemptionError && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-700">
                      {redemptionError}
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Registrar Canje
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsRedemptionDialogOpen(false);
                      setRedemptionError('');
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="points" className="space-y-4">
        <TabsList>
          <TabsTrigger value="points">Historial de Puntos</TabsTrigger>
          <TabsTrigger value="redemptions">Historial de Canjes</TabsTrigger>
        </TabsList>

        <TabsContent value="points">
          <Card>
            <CardHeader>
              <CardTitle>Transacciones de Puntos</CardTitle>
            </CardHeader>
            <CardContent>
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
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{transaction.asesorName}</TableCell>
                      <TableCell>{transaction.ruleName}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          +{transaction.pointsAwarded} pts
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {transaction.comment || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redemptions">
          <Card>
            <CardHeader>
              <CardTitle>Transacciones de Canjes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Asesor</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Puntos Usados</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptions.map((redemption) => (
                    <TableRow key={redemption.id}>
                      <TableCell>{new Date(redemption.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{redemption.asesorName}</TableCell>
                      <TableCell>{redemption.productTitle}</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">
                          -{redemption.pointsUsed} pts
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
                      <TableCell>
                        {redemption.status === 'pending' && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={() => updateRedemptionStatus(redemption.id, 'delivered')}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRedemptionStatus(redemption.id, 'cancelled')}
                            >
                              ✕
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};