import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-700">
            <div className="premium-card w-full max-w-md p-10 relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-main/10 rounded-full blur-3xl group-hover:bg-main/20 transition-all duration-700"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-main/5 rounded-full blur-3xl group-hover:bg-main/10 transition-all duration-700"></div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-2 text-center uppercase tracking-tighter gradient-text">login</h2>
                    <p className="text-center text-xs font-bold uppercase tracking-[0.3em] opacity-30 mb-10">welcome back</p>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 ml-2">email</label>
                            <input
                                type="email"
                                placeholder="example@bonitypes.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 bg-black/20 rounded-2xl outline-none border border-white/5 focus:border-main/50 focus:bg-black/40 transition-all font-mono text-sm"
                                style={{ color: 'var(--text-color)' }}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 ml-2">password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 bg-black/20 rounded-2xl outline-none border border-white/5 focus:border-main/50 focus:bg-black/40 transition-all font-mono text-sm"
                                style={{ color: 'var(--text-color)' }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full p-4 font-black uppercase tracking-[0.3em] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-main/20"
                            style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                        >
                            sign in
                        </button>
                    </form>

                    <p className="mt-10 text-center text-xs font-bold uppercase tracking-widest opacity-40">
                        don't have an account? <a href="/register" className="text-main hover:underline decoration-2 underline-offset-4" style={{ color: 'var(--main-color)' }}>register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
