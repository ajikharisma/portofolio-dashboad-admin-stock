import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProductTable from './components/ProductTable';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';

function App() {
  // TODO 2: State halaman aktif (default ke 'dashboard')
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Judul halaman dinamis untuk header
  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'products':
        return 'Kelola Produk';
      case 'categories':
        return 'Kategori Produk';
      default:
        return activePage;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex relative">
      {/* Backdrop Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="ml-0 md:ml-64 flex-1 p-4 md:p-8 min-h-screen">
        <header className="mb-6 flex items-center gap-3 pb-4 border-b border-slate-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div>
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
              Portal Admin
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight capitalize">
              {getPageTitle()}
            </h1>
          </div>
        </header>

        {/* TODO 3: Render Kondisional Halaman */}
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'products' && <ProductTable />}
        {activePage === 'categories' && <Categories />}
      </main>
    </div>
  );
}

export default App;