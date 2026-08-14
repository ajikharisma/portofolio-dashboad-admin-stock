import React from 'react';

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-100 bg-slate-50/50">
            <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Hal <span className="font-bold text-slate-800">{currentPage}</span> / <span className="font-bold text-slate-800">{totalPages}</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                >
                    ← <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                {/* Angka halaman (tersembunyi di HP kecil agar tidak sempit) */}
                <div className="hidden sm:flex items-center gap-1">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => onPageChange(number)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all ${number === currentPage
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                    : 'text-slate-600 hover:bg-slate-200/60'
                                }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                >
                    <span className="hidden sm:inline">Selanjutnya</span> →
                </button>
            </div>
        </div>
    );
}

export default Pagination;