import React from 'react';

function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
    const menuItems = [
        { key: 'dashboard', label: 'Dashboard', icon: '📊' },
        { key: 'products', label: 'Daftar Produk', icon: '📦' },
        { key: 'categories', label: 'Kategori', icon: '📁' },  // Ganti 🏷️ ke 📁
        { key: 'orders', label: 'Pesanan', icon: '🛍️' },     // Ganti 🛒 ke 🛍️
        { key: 'settings', label: 'Pengaturan', icon: '🔧' },  // Ganti ⚙️ ke 🔧
    ];

    const handleSelect = (key) => {
        onNavigate(key);
        onClose(); // Tutup sidebar otomatis di mobile setelah memilih menu
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
        >
            {/* Bagian Atas: Logo & Menu */}
            <div className="w-full">
                {/* Header / Logo + Tombol Close (Mobile) */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                            A
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-sm leading-tight">AdminStock</span>
                            <span className="text-[11px] text-slate-400">Inventory Portal</span>
                        </div>
                    </div>

                    {/* Tombol Silang (Close) khusus Mobile */}
                    <button
                        onClick={onClose}
                        className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label="Tutup Menu"
                    >
                        ✕
                    </button>
                </div>

                {/* Menu Navigasi */}
                <nav className="p-4 space-y-1">
                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Menu Utama
                    </p>

                    {menuItems.map((item) => {
                        const isActive = activePage === item.key;
                        return (
                            <button
                                key={item.key}
                                onClick={() => handleSelect(item.key)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                                    }`}
                            >
                                <span className="text-base leading-none">{item.icon}</span>
                                <span className="flex-1 text-left">{item.label}</span>
                                {isActive && (
                                    <span className="w-2 h-2 rounded-full bg-white" />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bagian Bawah: Profil User */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-slate-800/50">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        AD
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-white truncate">Administrator</span>
                        <span className="text-[11px] text-slate-400 truncate">admin@stock.com</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;