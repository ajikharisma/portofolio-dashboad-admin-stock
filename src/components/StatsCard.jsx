import React from 'react';

function StatsCard({ products }) {
    // TODO 1: Kalkulasi angka statistik dari array localProducts lengkap
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const lowStockCount = products.filter((p) => p.stock < 10).length;
    const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);

    // TODO 2: Render 4 kartu ringkasan
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Total Jenis Produk */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Total Produk
                </span>
                <span className="text-2xl font-black text-slate-900 leading-none mt-1">
                    {totalProducts}
                </span>
                <span className="text-[11px] text-slate-600 mt-2">Item unik di katalog</span>
            </div>

            {/* Total Unit Stok */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Total Stok
                </span>
                <span className="text-2xl font-black text-blue-600 leading-none mt-1">
                    {totalStock.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-600 mt-2">Unit barang fisik</span>
            </div>

            {/* Stok Menipis (< 10) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    Stok Menipis
                </span>
                <span className="text-2xl font-black text-amber-600 leading-none mt-1">
                    {lowStockCount}
                </span>
                <span className="text-[11px] text-amber-700 font-medium mt-2">Stok di bawah 10 unit</span>
            </div>

            {/* Perkiraan Nilai Inventory */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    Estimasi Nilai
                </span>
                <span className="text-2xl font-black text-emerald-600 leading-none mt-1 truncate">
                    ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium mt-2">Total aset inventory</span>
            </div>
        </div>
    );
}

export default StatsCard;