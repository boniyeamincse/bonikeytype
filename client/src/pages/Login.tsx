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
        <div className="max-w-md mx-auto mt-20 p-8 rounded-lg shadow-xl" style={{ backgroundColor: 'var(--sub-color)22' }}>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--main-color)' }}>login</h2>
            {error && <div className="mb-4 text-center" style={{ color: 'var(--error-color)' }}>{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 bg-black/20 rounded outline-none border-b-2 border-transparent focus:border-main-color transition-all"
                    style={{ color: 'var(--text-color)', borderBottomColor: 'var(--sub-color)' }}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 bg-black/20 rounded outline-none border-b-2 border-transparent focus:border-main-color transition-all"
                    style={{ color: 'var(--text-color)', borderBottomColor: 'var(--sub-color)' }}
                />
                <button
                    type="submit"
                    className="mt-4 p-3 font-bold rounded transition-all"
                    style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}
                >
                    sign in
                </button>
            </form>
            <p className="mt-8 text-center" style={{ color: 'var(--sub-color)' }}>
                don't have an account? <a href="/register" className="underline" style={{ color: 'var(--main-color)' }}>register</a>
            </p>
        </div>
    );
};

export default Login;
