import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BillPayments from './components/BillPayments';
import Visitors from './components/Visitors';
import Complaints from './components/Complaints';
import CommunityChat from './components/CommunityChat';
import MyFlat from './components/MyFlat';
import Settings from './components/Settings';
import SecurityGate from './components/SecurityGate';
import Login from './components/Login';
import { User } from './types';

// Protected Route Component
const ProtectedRoute = ({ user, children }: { user: User | null, children: React.ReactElement }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    
    // Redirect based on role
    if (loggedInUser.role === 'security') {
      navigate('/security');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
      
      <Route path="/" element={
        <ProtectedRoute user={user}>
          <Layout user={user!} onLogout={handleLogout} />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to={user?.role === 'security' ? '/security' : '/dashboard'} replace />} />
        <Route path="dashboard" element={<Dashboard user={user!} />} />
        <Route path="bills" element={<BillPayments user={user!} />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="complaints" element={<Complaints user={user!} />} />
        <Route path="chat" element={<CommunityChat />} />
        <Route path="security" element={<SecurityGate />} />
        <Route path="my-flat" element={<MyFlat />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;