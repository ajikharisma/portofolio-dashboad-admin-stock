import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useMutateProduct from '../hooks/useMutateProduct';
import ProductModal from './ProductModal';
import StatsCard from './StatsCard';
import Pagination from './Pagination';

function ProductTable() {
    const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=100');
    const { addProduct, updateProduct, deleteProduct, loading: isMutating } = useMutateProduct();

    const [localProducts, setLocalProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (data?.products) {
            setLocalProducts(data.products);
        }
    }, [data]);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingProduct) {
                const updated = await updateProduct(editingProduct.id, formData);
                const mergedUpdated = { ...editingProduct, ...updated };
                setLocalProducts((prev) =>
                    prev.map((p) => (p.id === editingProduct.id ? mergedUpdated : p))
                );
            } else {
                const newProduct = await addProduct(formData);
                const fullNewProduct = {
                    ...newProduct,
                    thumbnail: newProduct.thumbnail || 'https://placehold.co/150',
                    id: newProduct.id || Date.now(),
                };
                setLocalProducts((prev) => [fullNewProduct, ...prev]);
            }
            setShowModal(false);
        } catch (err) {
            console.error('Gagal menyimpan:', err);
            alert('Terjadi kesalahan saat menyimpan.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin mau hapus produk ini?')) return;
        setLocalProducts((prev) => prev.filter((p) => p.id !== id));
        try {
            if (typeof id === 'number' && id <= 200) {
                await deleteProduct(id);
            }
        } catch (err) {
            console.warn('API delete status:', err.message);
        }
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };

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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium text-xs sm:text-sm">Memuat data produk...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-rose-50 border border-rose-200 p-4 sm:p-6 rounded-2xl text-rose-700 space-y-1">
                <h3 className="font-bold text-sm sm:text-base">Gagal Memuat Data</h3>
                <p className="text-xs sm:text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* 1. Stats Bar */}
            <StatsCard products={localProducts} />

            {/* 2. Container Data Produk */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                {/* Table Action Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base">Katalog Produk</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Menampilkan <span className="font-semibold text-slate-700">{paginatedProducts.length}</span> dari{' '}
                            <span className="font-semibold text-slate-700">{sortedProducts.length}</span> item
                        </p>
                    </div>

                    <button
                        onClick={handleAddNew}
                        className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="text-base leading-none">+</span>
                        <span>Tambah Produk</span>
                    </button>
                </div>

                {/* TAMPILAN MOBILE: Card List (Tampil hanya di layar < 640px) */}
                <div className="block sm:hidden divide-y divide-slate-100">
                    {paginatedProducts.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs">Tidak ada produk tersedia.</div>
                    ) : (
                        paginatedProducts.map((product) => (
                            <div key={product.id} className="p-4 flex gap-3 items-center justify-between">
                                <div className="flex items-center gap-3 min-w-0">
                                    <img
                                        src={product.thumbnail || 'https://placehold.co/150'}
                                        alt={product.title}
                                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-xs text-slate-900 truncate" title={product.title}>
                                            {product.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-bold text-blue-600">${product.price}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 capitalize">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 shrink-0">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 bg-blue-50 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="px-2.5 py-1 text-[11px] font-semibold text-rose-600 bg-rose-50 rounded-lg"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* TAMPILAN DESKTOP / TABLET: Table View (Tampil di layar >= 640px) */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider select-none">
                                <th className="py-3.5 px-4 font-semibold w-16">Foto</th>
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
                            {paginatedProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-slate-400">
                                        Tidak ada produk tersedia.
                                    </td>
                                </tr>
                            ) : (
                                paginatedProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-4">
                                            <img
                                                src={product.thumbnail || 'https://placehold.co/150'}
                                                alt={product.title}
                                                className="w-10 h-10 object-cover rounded-lg border border-slate-200 bg-slate-50"
                                            />
                                        </td>
                                        <td className="py-3 px-4 font-medium text-slate-900">
                                            <div className="max-w-[200px] lg:max-w-[280px] truncate" title={product.title}>
                                                {product.title}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-slate-900">
                                            ${product.price}
                                        </td>
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
                                        <td className="py-3 px-4">
                                            <span className="capitalize px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200 font-medium">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right space-x-1">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
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

                {/* 3. Pagination Bar */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={sortedProducts.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Modal Form Tambah/Edit */}
            {showModal && (
                <ProductModal
                    product={editingProduct}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    loading={isMutating}
                />
            )}
        </div>
    );
}

export default ProductTable;