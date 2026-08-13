import { useState } from "react";

function useMutateProduct() {
    // TODO 1: State loading & error untuk feedback ke UI saat mutasi data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // TODO 2: Function addProduct (POST)
    const addProduct = async (productData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!res.ok) {
                throw new Error(`Gagal menambahkan produk (Status: ${res.status})`);
            }

            const data = await res.json()
            return data;
        } catch (err) {
            setError(err.message);
            throw err; // Lempar ulang error agar komponen pemicu (UI) bisa menangani atau menampilkan alert
        } finally {
            setLoading(false);
        }
    };

    // TODO 3: Function updateProduct (PUT)
    const updateProduct = async (id, productData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!res.ok) {
                throw new Error(`Gagal memperbarui produk ID ${id} (Status: ${res.status})`);
            }

            const data = await res.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // TODO 4: Function deleteProduct (DELETE)
    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error(`Gagal menghapus produk ID ${id} (Status: ${res.status})`);
            }

            const data = await res.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // TODO 5: Return fungsi mutasi + state pendukung
    return{
        addProduct,
        updateProduct,
        deleteProduct,
        loading,
        error,
    };
}

export default useMutateProduct;