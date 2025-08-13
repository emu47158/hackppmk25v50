import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OrganizationProvider, useOrganization } from './contexts/OrganizationContext';
import { AuthForm } from './components/auth/AuthForm';
import { OrganizationSelector } from './components/organization/OrganizationSelector';
import { OrganizationLayout } from './components/organization/OrganizationLayout';

const AppContent: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { currentOrganization, isLoading: orgLoading } = useOrganization();

  if (authLoading || orgLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  if (!currentOrganization) {
    return <OrganizationSelector />;
  }

  return <OrganizationLayout />;
};

function App() {
  return (
    <AuthProvider>
      <OrganizationProvider>
        <AppContent />
      </OrganizationProvider>
    </AuthProvider>
  );
}

export default App;
