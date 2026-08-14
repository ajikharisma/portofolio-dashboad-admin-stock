import React, { useState, useEffect } from 'react';

function ProductModal({ product, onClose, onSave, loading }) {
    // TODO 1: State form awal
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        stock: '',
        category: '',
    });

    // TODO 2: useEffect saat props "product" berubah
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

    // TODO 3: Handle change generik
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            // Ubah ke angka jika input bertipe number
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        }));
    };

    // TODO 4: Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        // TODO 5: Overlay gelap fixed
        <div
            className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity'
            onClick={onClose}
        >
            {/* Modal card - Stop event propagation agar klik didalam tidak menutup modal */}
            <div
                className='bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
                    <h3 className='font-bold text-lg text-slate-800'>
                        {product ? 'Edit Produk' : 'Tambah Produk Baru'}
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className='text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors'
                    >
                        X
                    </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Input Title */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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

                    <div className="grid grid-cols-2 gap-4">
                        {/* Input Price */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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

                        {/* Input Stock */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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

                    {/* Input Category */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                            Kategori
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            placeholder="Contoh: electronics"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Modal Footer / Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
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
    )
}

export default ProductModal;