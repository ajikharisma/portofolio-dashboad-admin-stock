import React from 'react';
import useFetch from '../hooks/useFetch';
import StatsCard from '../components/StatsCard';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const CHART_COLORS = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#06B6D4', '#6366F1', '#14B8A6', '#F97316'
];

function Dashboard() {
    const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=100');

    if (loading) {
        return (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium text-xs sm:text-sm">Menyiapkan analitik...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-rose-50 border border-rose-200 p-4 sm:p-6 rounded-2xl text-rose-700 space-y-1">
                <h3 className="font-bold text-sm sm:text-base">Gagal Memuat Analitik</h3>
                <p className="text-xs sm:text-sm">{error}</p>
            </div>
        );
    }

    const products = data?.products || [];

    const categoryCounts = {};
    products.forEach((p) => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const chartData = Object.entries(categoryCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
    }));

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Kartu Ringkasan */}
            <StatsCard products={products} />

            {/* Visual Chart Card */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                        📊 Sebaran Produk Berdasarkan Kategori
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Komposisi total barang per kategori dalam sistem.
                    </p>
                </div>

                {/* Chart Container dengan adaptasi tinggi untuk mobile */}
                <div className="w-full h-72 sm:h-80 md:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="75%"
                                innerRadius="40%"
                                paddingAngle={2}
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0F172A',
                                    borderRadius: '10px',
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '11px',
                                    padding: '6px 10px'
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={48}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;