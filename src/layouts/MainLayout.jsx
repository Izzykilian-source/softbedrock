import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Menerima prop 'onLogout' dari App.jsx
const MainLayout = ({ onLogout }) => {
  const location = useLocation();
  
  // STATE BARU: Mengontrol sidebar terbuka/tutup
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Oper state dan function ke Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        onLogout={onLogout}
      />

      {/* Konten Utama menyesuaikan margin berdasarkan sidebar */}
      <main 
        className={`flex-1 p-8 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'ml-64' : 'ml-20'}`} 
      >
        <div className="max-w-7xl mx-auto">
           <motion.div
             key={location.pathname} 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
           >
              <Outlet />
           </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;