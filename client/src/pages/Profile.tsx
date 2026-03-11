import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { User, Award, History, TrendingUp } from 'lucide-react';

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, historyRes] = await Promise.all([
                    api.get('/auth/me'),
                    api.get('/api/stats/history')
                ]);
                setUserData(userRes.data);
                setHistory(historyRes.data);
            } catch (err) {
                console.error("Failed to fetch profile data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center mt-20">Loading profile...</div>;
    if (!userData) return <div className="text-center mt-20">Please login to view profile.</div>;

    return (
        <div className="max-w-5xl mx-auto py-16 px-4 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header Profile Card */}
            <div className="premium-card p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-10 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-main/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-main/10 transition-all duration-700"></div>

                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="w-32 h-32 rounded-3xl bg-black/20 flex items-center justify-center border border-white/5 shadow-inner group-hover:scale-105 transition-all duration-500" style={{ color: 'var(--main-color)' }}>
                        <User size={64} />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-5xl font-black uppercase tracking-tighter gradient-text">{userData.username}</h2>
                        <div className="flex items-center justify-center md:justify-start gap-6 mt-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">level</span>
                                <span className="text-2xl font-black italic">{userData.level}</span>
                            </div>
                            <div className="w-px h-8 bg-white/5"></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">xp</span>
                                <span className="text-2xl font-black italic" style={{ color: 'var(--main-color)' }}>{userData.xp}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-1 relative z-10">
                    <span className="text-xs font-black uppercase tracking-[0.4em] opacity-20">tests completed</span>
                    <span className="text-7xl font-black tracking-tighter opacity-40 group-hover:opacity-100 group-hover:text-main transition-all duration-500">{history.length}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="premium-card p-8 flex flex-col items-center text-center group">
                    <div className="p-4 rounded-2xl bg-black/20 mb-6 group-hover:text-main transition-colors" style={{ color: 'var(--main-color)' }}>
                        <TrendingUp size={28} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-2">highest wpm</span>
                    <span className="text-4xl font-black tracking-tighter italic">
                        {Math.max(...history.map(t => t.wpm), 0)}
                    </span>
                </div>

                <div className="premium-card p-8 flex flex-col items-center text-center group">
                    <div className="p-4 rounded-2xl bg-black/20 mb-6 group-hover:text-main transition-colors" style={{ color: 'var(--main-color)' }}>
                        <Award size={28} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-2">average wpm</span>
                    <span className="text-4xl font-black tracking-tighter italic" style={{ color: 'var(--main-color)' }}>
                        {history.length > 0
                            ? Math.round(history.reduce((acc, t) => acc + t.wpm, 0) / history.length)
                            : 0}
                    </span>
                </div>

                <div className="premium-card p-8 flex flex-col items-center text-center group">
                    <div className="p-4 rounded-2xl bg-black/20 mb-6 group-hover:text-main transition-colors" style={{ color: 'var(--main-color)' }}>
                        <History size={28} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-2">avg. accuracy</span>
                    <span className="text-4xl font-black tracking-tighter italic">
                        {history.length > 0
                            ? Math.round(history.reduce((acc, t) => acc + t.accuracy, 0) / history.length)
                            : 0}%
                    </span>
                </div>
            </div>

            {/* History Table */}
            <div className="mb-24">
                <div className="flex items-center gap-4 mb-8 ml-2">
                    <History size={20} className="opacity-30" />
                    <h3 className="text-xl font-black uppercase tracking-widest opacity-30">Recent History</h3>
                </div>

                <div className="premium-card overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/20 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                                <th className="px-8 py-6">WPM</th>
                                <th className="px-8 py-6">Accuracy</th>
                                <th className="px-8 py-6">Mode</th>
                                <th className="px-8 py-6 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {history.slice(0, 10).map((test, i) => (
                                <tr key={i} className="group hover:bg-white/5 transition-all duration-300">
                                    <td className="px-8 py-6 font-black italic text-xl group-hover:text-main transition-colors" style={{ color: 'var(--main-color)' }}>{test.wpm}</td>
                                    <td className="px-8 py-6 font-bold opacity-60 group-hover:opacity-100 transition-opacity">{test.accuracy}%</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 rounded-full bg-black/20 text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all border border-white/5">
                                            {test.mode} {test.mode_value}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right text-xs font-bold uppercase tracking-widest opacity-20 group-hover:opacity-40 transition-opacity">
                                        {new Date(test.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {history.length === 0 && (
                        <div className="p-20 text-center text-xs font-bold uppercase tracking-widest opacity-20">
                            no training sessions recorded yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
