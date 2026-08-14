import React from 'react';

function StatsCard({ products = [] }) {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const lowStockCount = products.filter((p) => p.stock < 10).length;
    const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {/* Total Produk */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total Produk
                </span>
                <div className="my-1.5 sm:my-2">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                        {totalProducts}
                    </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Item katalog aktif</span>
            </div>

            {/* Total Stok */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total Stok
                </span>
                <div className="my-1.5 sm:my-2">
                    <span className="text-xl sm:text-2xl font-black text-blue-600 leading-tight">
                        {totalStock.toLocaleString()}
                    </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Unit fisik tersedia</span>
            </div>

            {/* Stok Menipis */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-amber-600 uppercase tracking-wider">
                    Stok Menipis
                </span>
                <div className="my-1.5 sm:my-2">
                    <span className="text-xl sm:text-2xl font-black text-amber-500 leading-tight">
                        {lowStockCount}
                    </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-amber-600/80 font-medium">Stok &lt; 10 unit</span>
            </div>

            {/* Estimasi Nilai */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Estimasi Nilai
                </span>
                <div className="my-1.5 sm:my-2 truncate">
                    <span className="text-xl sm:text-2xl font-black text-emerald-600 leading-tight">
                        ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-emerald-600/80 font-medium">Nilai inventory total</span>
            </div>
        </div>
    );
}

export default StatsCard;