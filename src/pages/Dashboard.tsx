
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ISDDashboard from '@/components/dashboards/ISDDashboard';
import ManagerDashboard from '@/components/dashboards/ManagerDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'ISD':
        return <ISDDashboard />;
      case 'Manager':
        return <ManagerDashboard />;
      case 'Admin':
        return <AdminDashboard />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return renderDashboard();
};

export default Dashboard;
