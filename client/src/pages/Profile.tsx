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
        <div className="max-w-4xl mx-auto mt-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-12 p-8 rounded-lg bg-black/10">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center bg-black/20" style={{ color: 'var(--main-color)' }}>
                        <User size={48} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold uppercase">{userData.username}</h2>
                        <div className="flex items-center gap-4 mt-2" style={{ color: 'var(--sub-color)' }}>
                            <span>level {userData.level}</span>
                            <span>{userData.xp} xp</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm uppercase mb-1" style={{ color: 'var(--sub-color)' }}>tests completed</div>
                    <div className="text-4xl font-bold" style={{ color: 'var(--main-color)' }}>{history.length}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 rounded-lg bg-black/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp size={20} style={{ color: 'var(--main-color)' }} />
                        Statistics
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span style={{ color: 'var(--sub-color)' }}>highest wpm</span>
                            <span className="font-bold">{Math.max(...history.map(t => t.wpm), 0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: 'var(--sub-color)' }}>average wpm</span>
                            <span className="font-bold">
                                {history.length > 0
                                    ? Math.round(history.reduce((acc, t) => acc + t.wpm, 0) / history.length)
                                    : 0}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span style={{ color: 'var(--sub-color)' }}>average accuracy</span>
                            <span className="font-bold">
                                {history.length > 0
                                    ? Math.round(history.reduce((acc, t) => acc + t.accuracy, 0) / history.length)
                                    : 0}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-lg bg-black/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award size={20} style={{ color: 'var(--main-color)' }} />
                        Badges
                    </h3>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center opacity-30" title="10 Tests Completion">
                            <History size={24} />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center opacity-30" title="60+ WPM">
                            <Award size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-20">
                <h3 className="text-xl font-bold mb-6">Recent History</h3>
                <div className="w-full overflow-hidden rounded-lg whitespace-nowrap overflow-x-auto">
                    <table className="w-full text-left" style={{ color: 'var(--text-color)' }}>
                        <thead style={{ color: 'var(--sub-color)' }}>
                            <tr>
                                <th className="pb-4 pr-4">wpm</th>
                                <th className="pb-4 pr-4">accuracy</th>
                                <th className="pb-4 pr-4">mode</th>
                                <th className="pb-4 pr-4">date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((test, i) => (
                                <tr key={i} className="border-t border-black/5">
                                    <td className="py-4 pr-4 font-bold" style={{ color: 'var(--main-color)' }}>{test.wpm}</td>
                                    <td className="py-4 pr-4">{test.accuracy}%</td>
                                    <td className="py-4 pr-4">{test.mode} {test.mode_value}</td>
                                    <td className="py-4 pr-4" style={{ color: 'var(--sub-color)' }}>
                                        {new Date(test.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Profile;
