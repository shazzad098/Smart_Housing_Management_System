import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BillPayments from './components/BillPayments';
import Visitors from './components/Visitors';
import Complaints from './components/Complaints';
import CommunityChat from './components/CommunityChat';
import MyFlat from './components/MyFlat';
import Settings from './components/Settings';
import SecurityGate from './components/SecurityGate';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bills" element={<BillPayments />} />
          <Route path="visitors" element={<Visitors />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="chat" element={<CommunityChat />} />
          <Route path="security" element={<SecurityGate />} />
          <Route path="my-flat" element={<MyFlat />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;