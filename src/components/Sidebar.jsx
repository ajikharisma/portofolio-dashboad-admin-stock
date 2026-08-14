import React from 'react';

// SVG Icons
const IconDashboard = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
    </svg>
);

const IconProducts = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const IconCategories = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
);

function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
    // TODO: Menu disederhanakan hanya untuk halaman yang aktif
    const menuItems = [
        { key: 'dashboard', label: 'Dashboard', icon: IconDashboard },
        { key: 'products', label: 'Daftar Produk', icon: IconProducts },
        { key: 'categories', label: 'Kategori', icon: IconCategories },
    ];

    const handleSelect = (key) => {
        onNavigate(key);
        if (onClose) onClose();
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
        >
            <div className="w-full">
                {/* Header Logo */}
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

                    <button
                        onClick={onClose}
                        className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
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
                        const IconComponent = item.icon;

                        return (
                            <button
                                key={item.key}
                                onClick={() => handleSelect(item.key)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                                    }`}
                            >
                                <span className="shrink-0">
                                    <IconComponent />
                                </span>
                                <span className="flex-1 text-left">{item.label}</span>
                                {isActive && (
                                    <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Profil User */}
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