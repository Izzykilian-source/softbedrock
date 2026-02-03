import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

// --- LAYOUTS ---
import MainLayout from './layouts/MainLayout';

// --- PAGES ---
import Login from './pages/Login';
import Overview from './pages/Overview';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import FreeSamples from './pages/FreeSamples';
import Messages from './pages/Messages';
import Users from './pages/Users';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 1. Notifikasi Login (Style Dark & Elegan)
  const handleLogin = (status) => {
    setIsAuthenticated(status);
    toast('Welcome back, Admin!', {
        icon: '👋',
        style: {
            borderRadius: '10px',
            background: '#1e293b', // Slate-800
            color: '#fff',
            padding: '12px 16px',
            fontSize: '14px',
        },
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success('You have been logged out.');
  };

  return (
    <BrowserRouter>
      {/* 2. Global Toast Configuration */}
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          // Default style untuk semua notifikasi
          style: {
            border: '1px solid #E2E8F0',
            padding: '16px',
            color: '#1E293B',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '400px',
          },
          // Style khusus Success
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#ECFDF5',
            },
            style: {
              borderLeft: '4px solid #10B981',
            },
          },
          // Style khusus Error
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FEF2F2',
            },
            style: {
              borderLeft: '4px solid #EF4444',
            },
          },
        }}
      />

      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />

        <Route 
          path="/" 
          element={isAuthenticated ? <MainLayout onLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          <Route index element={<Overview />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="samples" element={<FreeSamples />} />
          <Route path="users" element={<Users />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;