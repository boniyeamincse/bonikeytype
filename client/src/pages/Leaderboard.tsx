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
        <div className="max-w-4xl mx-auto mt-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-12">
                <Trophy size={32} style={{ color: 'var(--main-color)' }} />
                <h2 className="text-4xl font-bold uppercase">all-time leaderboard</h2>
            </div>

            <div className="w-full bg-black/10 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead style={{ color: 'var(--sub-color)' }} className="bg-black/5">
                        <tr>
                            <th className="p-6">#</th>
                            <th className="p-6">user</th>
                            <th className="p-6 text-right">wpm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry, i) => (
                            <tr key={i} className="border-t border-black/5 hover:bg-black/5 transition-colors">
                                <td className="p-6 font-bold" style={{ color: i < 3 ? 'var(--main-color)' : 'var(--sub-color)' }}>
                                    {i === 0 ? <Medal size={24} /> : i + 1}
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        {entry.username}
                                    </div>
                                </td>
                                <td className="p-6 text-right font-bold text-2xl" style={{ color: 'var(--main-color)' }}>
                                    {Math.round(entry.best_wpm)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.length === 0 && (
                    <div className="p-12 text-center" style={{ color: 'var(--sub-color)' }}>
                        no data available yet. start typing to be the first!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
