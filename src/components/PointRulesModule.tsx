import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { pointRules } from '../data/mockData';
import type { PointRule } from '../types';

export const PointRulesModule: React.FC = () => {
  const [rulesList, setRulesList] = useState<PointRule[]>(pointRules);
  const [selectedRule, setSelectedRule] = useState<PointRule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<PointRule>>({
    name: '',
    description: '',
    icon: '',
    pointsAwarded: 0,
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRule) {
      // Edit existing rule
      setRulesList(rulesList.map(r => 
        r.id === selectedRule.id 
          ? { ...selectedRule, ...formData } as PointRule
          : r
      ));
    } else {
      // Add new rule
      const newRule: PointRule = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        icon: formData.icon || '⭐',
        pointsAwarded: formData.pointsAwarded || 0,
        isActive: formData.isActive || true
      };
      setRulesList([...rulesList, newRule]);
    }

    resetForm();
  };

  const handleEdit = (rule: PointRule) => {
    setSelectedRule(rule);
    setFormData(rule);
    setIsDialogOpen(true);
  };

  const handleDelete = (ruleId: string) => {
    setRulesList(rulesList.filter(r => r.id !== ruleId));
  };

  const toggleRuleStatus = (ruleId: string) => {
    setRulesList(rulesList.map(r => 
      r.id === ruleId ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const resetForm = () => {
    setSelectedRule(null);
    setFormData({
      name: '',
      description: '',
      icon: '',
      pointsAwarded: 0,
      isActive: true
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reglas de Puntos</h2>
          <p className="text-gray-600">Configura las actividades que otorgan puntos a los asesores</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Regla
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedRule ? 'Editar Regla' : 'Nueva Regla'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Logro</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ej. Venta Cerrada"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe cuándo se otorgan estos puntos"
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon">Icono/Emoji</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🏠"
                  maxLength={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="points">Puntos Otorgados</Label>
                <Input
                  id="points"
                  type="number"
                  value={formData.pointsAwarded}
                  onChange={(e) => setFormData({ ...formData, pointsAwarded: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="active">Regla activa</Label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {selectedRule ? 'Actualizar' : 'Crear'} Regla
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Reglas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icono</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Puntos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rulesList.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <span className="text-2xl">{rule.icon}</span>
                  </TableCell>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-gray-600 truncate">{rule.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">
                      {rule.pointsAwarded} pts
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => toggleRuleStatus(rule.id)}
                      />
                      <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                        {rule.isActive ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(rule)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(rule.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rulesList.map((rule) => {
              // Mock usage count - in real app this would come from transactions
              const usageCount = Math.floor(Math.random() * 50) + 1;
              const totalPoints = usageCount * rule.pointsAwarded;
              
              return (
                <div key={rule.id} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">{rule.icon}</span>
                    <h4 className="font-medium">{rule.name}</h4>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Usada: {usageCount} veces</p>
                    <p>Total puntos otorgados: {totalPoints.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};