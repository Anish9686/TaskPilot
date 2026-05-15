import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './features/auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Dashboard from './features/dashboard/Dashboard';
import Projects from './features/projects/Projects';
import Tasks from './features/tasks/Tasks';
import Settings from './features/settings/Settings';
import HelpCenter from './features/help/HelpCenter';
import TeamHub from './features/team/TeamHub';
import Analytics from './features/analytics/Analytics';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/team" element={<TeamHub />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
