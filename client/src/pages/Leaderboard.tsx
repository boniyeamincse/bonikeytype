import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Trophy, Medal } from 'lucide-react';

const Leaderboard: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/stats/leaderboard');
                setData(res.data);
            } catch (err) {
                console.error("Failed to fetch leaderboard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    if (loading) return <div className="text-center mt-20">Loading leaderboard...</div>;

    return (
        <div className="max-w-5xl mx-auto py-16 px-4 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="flex items-center gap-6">
                    <div className="p-5 rounded-3xl bg-main/10 shadow-glow" style={{ color: 'var(--main-color)' }}>
                        <Trophy size={48} />
                    </div>
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter gradient-text">Leaderboard</h2>
                        <p className="text-xs font-black uppercase tracking-[0.4em] opacity-30 mt-1">Global all-time rankings</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-black/10 border border-white/5 text-xs font-bold uppercase tracking-widest opacity-60">
                        Time: 15s | 30s | 60s
                    </div>
                </div>
            </header>

            <div className="premium-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/20 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                            <th className="px-8 py-6 w-24">Rank</th>
                            <th className="px-8 py-6">User</th>
                            <th className="px-8 py-6 text-right w-40">WPM</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((entry, i) => (
                            <tr key={i} className="group hover:bg-white/5 transition-all duration-300">
                                <td className="px-8 py-6 font-black italic text-xl">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/20 group-hover:bg-main/10 transition-colors" style={{ color: i < 3 ? 'var(--main-color)' : 'var(--sub-color)' }}>
                                        {i === 0 ? <Medal size={22} className="text-main" /> : i + 1}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-sub/20 flex items-center justify-center font-bold text-xs uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                                            {entry.username[0]}
                                        </div>
                                        <span className="text-lg font-bold tracking-tight group-hover:text-main transition-colors">
                                            {entry.username}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className="text-3xl font-black tracking-tighter" style={{ color: 'var(--main-color)' }}>
                                            {Math.round(entry.best_wpm)}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-20">wpm</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center opacity-20">
                            <Trophy size={32} />
                        </div>
                        <div className="text-sm font-bold uppercase tracking-widest opacity-30">
                            no results yet. start your first race!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
