import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { AdminHeader } from '../header/AdminHeader';

export const AdminLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex bg-gray-50 w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
        {/* Top Header */}
        <div className="fixed top-0 right-0 left-0 z-20" style={{
          marginLeft: sidebarCollapsed ? '4rem' : '16rem'
        }}>
          <AdminHeader />
        </div>
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};