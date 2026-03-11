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
        <div className="flex-grow flex items-center justify-center -mt-20">
            <TypingTest text={text} />
        </div>
    );
};

export default Home;
