import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProductTable from './components/ProductTable';

// Komponen SVG Icons untuk Layar Utama
const IconDashboardLarge = () => (
  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
  </svg>
);

const IconProductsLarge = () => (
  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const IconCategoriesLarge = () => (
  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const IconOrdersLarge = () => (
  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconSettingsLarge = () => (
  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

function App() {
  const [activePage, setActivePage] = useState('products'); // Default langsung ke 'products'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <IconDashboardLarge />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Overview Dashboard</h2>
                <p className="text-slate-500 text-sm">Ringkasan performa penjualan dan produk Anda.</p>
              </div>
            </div>
          </div>
        );
      case 'products':
        // Menampilkan Komponen Tabel Produk Lengkap (Stats + Table + Pagination + Modal)
        return <ProductTable />;
      case 'categories':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <IconCategoriesLarge />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Kategori Produk</h2>
                <p className="text-slate-500 text-sm">Atur dan kelompokkan kategori barang.</p>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <IconOrdersLarge />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Daftar Pesanan</h2>
                <p className="text-slate-500 text-sm">Pantau status transaksi pelanggan secara real-time.</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <IconSettingsLarge />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Pengaturan Sistem</h2>
                <p className="text-slate-500 text-sm">Konfigurasi akun dan sistem aplikasi.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
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

      {/* Sidebar Component */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Area */}
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
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 capitalize leading-tight">
              {activePage}
            </h1>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;