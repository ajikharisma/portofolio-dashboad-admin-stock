import { useState, useEffect } from 'react';

function useFetch(url) {
    // TODO 1: 3 State -> data (null), loading (true), error (null)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // TODO 2: useEffect yang berjalan setiap kali 'url' berubah
    useEffect(() => {
        // flag untuk menangani unmount / race condition
        let masihAktif = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null); //Reset error setiap kali ada requestt baru

            try {
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const hasil = await res.json();

                if (masihAktif) {
                    setData(hasil);
                }
            } catch (err) {
                if (masihAktif) {
                    setError(err.message);
                }
            } finally {
                if (masihAktif) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup function untuk mengubah flag jika komponen di-unmount
        return () => {
            masihAktif = false;
        };
    }, [url]);

    // TODO 3: return state data, loading, error
    return {data, loading, error};
}

export default useFetch;