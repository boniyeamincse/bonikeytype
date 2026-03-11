import React, { useState, useEffect } from 'react';
import TypingTest from '../components/TypingTest';
import api from '../utils/api';

const Home: React.FC = () => {
    const [text, setText] = useState<string>("the quick brown fox jumps over the lazy dog");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await api.get('/quotes/random');
                setText(res.data.text);
            } catch (err) {
                console.error("Failed to fetch quote", err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuote();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center">
            <div className="w-8 h-8 rounded-full border-4 border-sub-color border-t-main-color animate-spin" style={{ borderColor: 'var(--sub-color)', borderTopColor: 'var(--main-color)' }}></div>
        </div>
    );

    return (
        <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-main/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none animate-pulse duration-[10s]"></div>
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-main/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none animate-pulse duration-[8s] delay-1000"></div>

            <div className="relative z-10 w-full">
                <TypingTest text={text} />
            </div>
        </div>
    );
};

export default Home;
