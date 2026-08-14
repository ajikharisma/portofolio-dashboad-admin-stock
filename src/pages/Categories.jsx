import React from 'react';
import useFetch from '../hooks/useFetch';

function Categories() {
    const { data, loading, error } = useFetch('https://dummyjson.com/products/categories');

    if (loading) {
        return (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium text-xs sm:text-sm">Memuat daftar kategori...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-rose-50 border border-rose-200 p-4 sm:p-6 rounded-2xl text-rose-700 space-y-1">
                <h3 className="font-bold text-sm sm:text-base">Gagal Memuat Kategori</h3>
                <p className="text-xs sm:text-sm">{error}</p>
            </div>
        );
    }

    const categories = Array.isArray(data) ? data : [];

    return (
        <div>
            <div className="mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-bold text-slate-800">Semua Kategori</h2>
                <p className="text-xs text-slate-500">
                    Tersedia <span className="font-semibold text-slate-700">{categories.length}</span> kategori barang aktif.
                </p>
            </div>

            {/* Grid Responsif: 2 cols di mobile, 3 di tablet, 4-5 di desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {categories.map((cat, idx) => {
                    const categoryName = typeof cat === 'object' ? cat.name || cat.slug : cat;

                    return (
                        <div
                            key={idx}
                            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-blue-500/50 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
                        >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base sm:text-lg mb-3 group-hover:scale-105 transition-transform">
                                🏷️
                            </div>
                            <div>
                                <h3 className="font-bold text-xs sm:text-sm text-slate-800 capitalize leading-snug truncate group-hover:text-blue-600 transition-colors" title={categoryName}>
                                    {categoryName}
                                </h3>
                                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5 inline-block">
                                    Katalog Aktif
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Categories;