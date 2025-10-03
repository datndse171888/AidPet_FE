import React from 'react';
import { Header } from './header/Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="bg-gray-50 flex flex-col w-full h-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};