import React, { useState, useEffect } from 'react';

function ProductModal({ product, onClose, onSave, loading }) {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        stock: '',
        category: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                price: product.price || '',
                stock: product.stock || '',
                category: product.category || '',
            });
        } else {
            setFormData({
                title: '',
                price: '',
                stock: '',
                category: '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-base sm:text-lg text-slate-800">
                        {product ? 'Edit Produk' : 'Tambah Produk Baru'}
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                    <div>
                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Nama Produk
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Contoh: Wireless Headphones"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Harga ($)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder="99.99"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Stok
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                placeholder="50"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Kategori
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            placeholder="Contoh: beauty, electronics"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5 sm:gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductModal;