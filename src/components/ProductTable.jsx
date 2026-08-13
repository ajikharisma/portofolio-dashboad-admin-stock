import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useMutateProduct from "../hooks/useMutateProduct";
import { div } from "framer-motion/client";

function ProductTable({ onEdit }) {
    // TODO 1: Fetch data produk (limit=100)
    const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=100');

    // TODO 2: Ambil fungsi deleteProduct dari hook mutasi
    const { deleteProduct } = useMutateProduct();

    // TODO 7: State lokal untuk meng-copy dan mengelola data produk secara independen
    const [localProducts, setLocalProducts] = useState([]);

    useEffect(() => {
        if (data?.products) {
            setLocalProducts(data.products);
        }
    }, [data]);

    // TODO 3: State untuk sorting
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // TODO 4: Fungsi handler sorting
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    // TODO 5 & TODO 7: Bikin array terurut berdasarkan localProducts
    const sortedProducts = localProducts.length > 0
        ? [...localProducts].sort((a, b) => {
            if (!sortColumn) return 0;

            const valA = a[sortColumn];
            const valB = b[sortColumn];

            if (valA === undefined || valB === undefined) return 0;

            let comparison = 0;
            if (typeof valA === 'number' && typeof valB === 'number') {
                comparison = valA - valB;
            } else {
                comparison = String(valA).localeCompare(String(valB));
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        })
        : [];

    // TODO 6: Fungsi hapus produk (server+local sync)
    const handleDelete = async (id) => {
        if (!window.confirm('Yakin mau hapus produk ini?')) return;

        try {
            // Hapus dari state lokal untuk feedback UI instan
            setLocalProducts((prev) => prev.filter((product) => product.id !== id));

            // Panggil API DELETE
            await deleteProduct(id);
        } catch (err) {
            console.error('Gagal menghapus produk:', err);
            alert('Terjadi kesalahan saat menghapus produk dari server.');
        }
    };

    // State loading
    if (loading) {
        return (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparant rounded-full animate-spin" />
                <p className="text-slate-500 font-medium text-sm">Memuat katalog produk...</p>
            </div>
        );
    }

    // State error
    if (error) {
        return (
            <div className="bg-rose-500 border border-rose-200 p-6 rounded-2xl text-rose-700 space-y-1">
                <h3 className="font-bold text-base">Gagal Memuat Data</h3>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    // TODO 8: Render Tabel Produk
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header Info */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-slate-800 text-base">Daftar Produk</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Menampilkan total <span className="font-semibold text-slate-700">{localProducts.length}</span> produk
                    </p>
                </div>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider select-none">
                            <th className="py-3.5 px-4 font-semibold w-16">Foto</th>

                            {/* Column Sortable: Title */}
                            <th
                                onClick={() => handleSort('title')}
                                className="py-3.5 px-4 font-semibold cursor-pointer hover:text-slate-900 transition-colors"
                            >
                                <div className="flex items-center gap-1.5">
                                    <span>Nama Produk</span>
                                    {sortColumn === 'title' && (
                                        <span className="text-blue-600 font-bold">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>

                            {/* Column Sortable: Price */}
                            <th
                                onClick={() => handleSort('price')}
                                className="py-3.5 px-4 font-semibold cursor-pointer hover:text-slate-900 transition-colors"
                            >
                                <div className="flex items-center gap-1.5">
                                    <span>Harga</span>
                                    {sortColumn === 'price' && (
                                        <span className="text-blue-600 font-bold">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>

                            {/* Column Sortable: Stock */}
                            <th
                                onClick={() => handleSort('stock')}
                                className="py-3.5 px-4 font-semibold cursor-pointer hover:text-slate-900 transition-colors"
                            >
                                <div className="flex items-center gap-1.5">
                                    <span>Stok</span>
                                    {sortColumn === 'stock' && (
                                        <span className="text-blue-600 font-bold">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>

                            <th className="py-3.5 px-4 font-semibold">Kategori</th>
                            <th className="py-3.5 px-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {sortedProducts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-slate-400">
                                    Tidak ada produk tersedia.
                                </td>
                            </tr>
                        ) : (
                            sortedProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                                    {/* Thumbnail */}
                                    <td className="py-3 px-4">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-10 h-10 object-cover rounded-lg border border-slate-200 bg-slate-50"
                                        />
                                    </td>

                                    {/* Title */}
                                    <td className="py-3 px-4 font-medium text-slate-900">
                                        <div className="max-w-[220px] truncate" title={product.title}>
                                            {product.title}
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="py-3 px-4 font-semibold text-slate-900">
                                        ${product.price}
                                    </td>

                                    {/* Stock Badge */}
                                    <td className="py-3 px-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 20
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : product.stock > 0
                                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}
                                        >
                                            {product.stock} unit
                                        </span>
                                    </td>

                                    {/* Category */}
                                    <td className="py-3 px-4">
                                        <span className="capitalize px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200 font-medium">
                                            {product.category}
                                        </span>
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="py-3 px-4 text-right space-x-1">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTable;
