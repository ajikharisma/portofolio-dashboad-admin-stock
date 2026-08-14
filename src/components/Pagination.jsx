import React from 'react';

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    // TODO 1: Hitung total halaman
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Jika produk kosong atau cuma 1 halaman, sembunyikan pagination
    if (totalPages <= 1) return null;

    // TODO 2: Bikin array nomor halaman
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        // TODO 3: Render tombol pagination
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <div className="text-xs text-slate-500 font-medium">
                Halaman <span className="font-bold text-slate-800">{currentPage}</span> dari{' '}
                <span className="font-bold text-slate-800">{totalPages}</span>
            </div>

            <div className="flex items-center gap-1.5">
                {/* Tombol Sebelumnya */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                    ← Sebelumnya
                </button>

                {/* .map() Angka Halaman */}
                <div className="hidden sm:flex items-center gap-1">
                    {pageNumbers.map((number) => {
                        const isActive = number === currentPage;
                        return (
                            <button
                                key={number}
                                onClick={() => onPageChange(number)}
                                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                        : 'text-slate-600 hover:bg-slate-200/60'
                                    }`}
                            >
                                {number}
                            </button>
                        );
                    })}
                </div>

                {/* Tombol Selanjutnya */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                    Selanjutnya →
                </button>
            </div>
        </div>
    );
}

export default Pagination;