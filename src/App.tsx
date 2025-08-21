import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AsesoresModule } from './components/AsesoresModule';
import { ProductsModule } from './components/ProductsModule';
import { PointRulesModule } from './components/PointRulesModule';
import { SalesModule } from './components/SalesModule';
import { ReportsModule } from './components/ReportsModule';
import './styles/globals.css'

const AppContent: React.FC = () => {
  const { admin, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedAsesor, setSelectedAsesor] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return <LoginScreen />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'asesores':
        return (
          <AsesoresModule 
            selectedAsesor={selectedAsesor}
            onSelectAsesor={setSelectedAsesor}
          />
        );
      case 'productos':
        return <ProductsModule />;
      case 'reglas':
        return <PointRulesModule />;
      case 'ventas':
        return <SalesModule />;
      case 'reportes':
        return <ReportsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={(page) => {
        setCurrentPage(page);
        if (page !== 'asesores') {
          setSelectedAsesor(null);
        }
      }}
    >
      {renderCurrentPage()}
    </Layout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}