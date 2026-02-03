import React from 'react';
import { LayoutDashboard, BookOpen, Users, Mail, Settings, ShieldCheck, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Menerima props isOpen, toggle, dan onLogout
const Sidebar = ({ isOpen, toggle, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Courses', icon: <BookOpen size={20} />, path: '/courses' },
    { name: 'Free Samples', icon: <ShieldCheck size={20} />, path: '/samples' },
    { name: 'Users', icon: <Users size={20} />, path: '/users' },
    { name: 'Messages', icon: <Mail size={20} />, path: '/messages' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div 
      className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-brand-900 text-white fixed left-0 top-0 flex flex-col shadow-2xl z-50 transition-all duration-300 ease-in-out`}
    >
      {/* Header Sidebar & Toggle Button */}
      <div className="p-6 border-b border-brand-800 bg-brand-950 flex items-center justify-between relative">
        {/* Logo Text (Hanya muncul jika Open) */}
        <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <h1 className="text-2xl font-bold tracking-wider text-brand-100 whitespace-nowrap">Soft Bedrock</h1>
            <p className="text-xs text-brand-400 mt-1 uppercase tracking-widest whitespace-nowrap">Italian Learning</p>
        </div>
        
        {/* Logo Icon (Muncul jika Closed) */}
        <div className={`absolute left-0 w-full flex justify-center transition-opacity duration-300 ${isOpen ? 'opacity-0 hidden' : 'opacity-100'}`}>
            <div className="font-bold text-xl bg-brand-500 w-10 h-10 rounded-lg flex items-center justify-center">SB</div>
        </div>

        {/* Toggle Button (Arrow) */}
        <button 
            onClick={toggle}
            className="absolute -right-3 top-8 bg-brand-500 text-white p-1 rounded-full border-2 border-brand-900 hover:bg-brand-400 transition shadow-lg z-50"
        >
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
      
      {/* Navigasi */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-brand-600 text-white shadow-lg' 
                  : 'text-brand-200 hover:bg-brand-800 hover:text-white'}`}
            >
              <div className={`${isActive ? 'text-white' : 'text-brand-400 group-hover:text-white'} min-w-[24px]`}>
                {item.icon}
              </div>
              
              {/* Text Label (Hidden if collapsed) */}
              <span className={`font-medium text-sm whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 hidden'}`}>
                  {item.name}
              </span>

              {/* Tooltip saat Collapsed (Optional UX Boost) */}
              {!isOpen && (
                <div className="absolute left-14 bg-brand-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-md">
                    {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* Footer Sidebar (User Profile & Logout) */}
      <div className="p-4 border-t border-brand-800 bg-brand-950">
        <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center font-bold text-white shadow-md cursor-pointer hover:bg-brand-400 transition">
              A
            </div>
            
            {/* User Info (Hidden if collapsed) */}
            <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'}`}>
              <p className="text-sm font-semibold text-white whitespace-nowrap">Admin</p>
              <p className="text-xs text-brand-400 whitespace-nowrap">Online</p>
            </div>
          </div>

          {/* Logout Button */}
          {isOpen && (
              <button 
                onClick={onLogout} // Panggil fungsi logout di sini
                className="text-brand-400 hover:text-red-400 transition p-2 rounded-lg hover:bg-brand-900"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;