import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Plus, Edit, Trash2, Copy } from 'lucide-react@0.487.0';
import { products } from '../data/mockData';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const ProductsModule: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    image: '',
    pointsRequired: 0,
    isActive: true,
    expiryDate: '',
    category: ''
  });

  const filteredProducts = productList.filter(product => {
    if (filter === 'active') return product.isActive;
    if (filter === 'inactive') return !product.isActive;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProduct) {
      // Edit existing product
      setProductList(productList.map(p => 
        p.id === selectedProduct.id 
          ? { ...selectedProduct, ...formData } as Product
          : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        pointsRequired: formData.pointsRequired || 0,
        isActive: formData.isActive || true,
        expiryDate: formData.expiryDate || '',
        category: formData.category || ''
      };
      setProductList([...productList, newProduct]);
    }

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDuplicate = (product: Product) => {
    const duplicatedProduct: Product = {
      ...product,
      id: Date.now().toString(),
      title: `${product.title} (Copia)`
    };
    setProductList([...productList, duplicatedProduct]);
  };

  const handleDelete = (productId: string) => {
    setProductList(productList.filter(p => p.id !== productId));
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      pointsRequired: 0,
      isActive: true,
      expiryDate: '',
      category: ''
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Productos Canjeables</h2>
          <p className="text-gray-600">Gestiona el catálogo de productos disponibles para canje</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">URL de Imagen</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="points">Puntos Requeridos</Label>
                <Input
                  id="points"
                  type="number"
                  value={formData.pointsRequired}
                  onChange={(e) => setFormData({ ...formData, pointsRequired: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnología">Tecnología</SelectItem>
                    <SelectItem value="Experiencias">Experiencias</SelectItem>
                    <SelectItem value="Hogar">Hogar</SelectItem>
                    <SelectItem value="Viajes">Viajes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expiry">Fecha de Vigencia</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="active">Producto activo</Label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {selectedProduct ? 'Actualizar' : 'Crear'} Producto
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              Todos ({productList.length})
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              onClick={() => setFilter('active')}
            >
              Activos ({productList.filter(p => p.isActive).length})
            </Button>
            <Button
              variant={filter === 'inactive' ? 'default' : 'outline'}
              onClick={() => setFilter('inactive')}
            >
              Inactivos ({productList.filter(p => !p.isActive).length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <Badge variant={product.isActive ? 'default' : 'secondary'}>
                  {product.isActive ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-blue-600 font-semibold">
                  {product.pointsRequired.toLocaleString()} puntos
                </span>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Vigente hasta: {new Date(product.expiryDate).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(product)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDuplicate(product)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};