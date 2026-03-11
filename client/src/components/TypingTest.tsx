import React, { useEffect, useRef } from 'react';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { RefreshCw } from 'lucide-react';

interface TypingTestProps {
    text: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ text }) => {
    const { userInput, isFinished, stats, handleKeyDown, reset, timeLeft } = useTypingEngine(text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const focusInput = () => inputRef.current?.focus();
        window.addEventListener('click', focusInput);
        focusInput();
        return () => window.removeEventListener('click', focusInput);
    }, []);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' || e.key.length === 1) {
            handleKeyDown(e.key);
        }
        // Prevent scrolling with space
        if (e.key === ' ') {
            e.preventDefault();
        }
    };

    const renderText = () => {
        const chars = text.split('');
        const inputChars = userInput.split('');

        return chars.map((char, i) => {
            let status = 'untyped';
            if (i < inputChars.length) {
                status = inputChars[i] === char ? 'correct' : 'incorrect';
            }

            return (
                <span key={i} className={`char ${status}`}>
                    {i === inputChars.length && !isFinished && <span className="caret"></span>}
                    {char}
                </span>
            );
        });
    };

    if (isFinished) {
        return (
            <div className="max-w-4xl mx-auto mt-20 text-center animate-in fade-in duration-500">
                <div className="grid grid-cols-4 gap-8 mb-12">
                    <div className="flex flex-col">
                        <span className="text-2xl" style={{ color: 'var(--sub-color)' }}>wpm</span>
                        <span className="text-6xl font-bold" style={{ color: 'var(--main-color)' }}>{stats.wpm}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl" style={{ color: 'var(--sub-color)' }}>acc</span>
                        <span className="text-6xl font-bold" style={{ color: 'var(--main-color)' }}>{stats.accuracy}%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl" style={{ color: 'var(--sub-color)' }}>raw</span>
                        <span className="text-6xl font-bold" style={{ color: 'var(--sub-color)' }}>{stats.rawWpm}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl" style={{ color: 'var(--sub-color)' }}>time</span>
                        <span className="text-6xl font-bold" style={{ color: 'var(--sub-color)' }}>{stats.time}s</span>
                    </div>
                </div>
                <button
                    onClick={reset}
                    className="p-4 rounded-full hover:bg-black/10 transition-colors"
                    style={{ color: 'var(--sub-color)' }}
                >
                    <RefreshCw size={32} />
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-20 px-4 relative">
            <div className="mb-4 text-2xl font-mono" style={{ color: 'var(--main-color)' }}>
                {timeLeft}
            </div>

            <div className="typing-text mono relative select-none">
                {renderText()}
            </div>

            <input
                ref={inputRef}
                type="text"
                className="opacity-0 absolute pointer-events-none"
                onKeyDown={onKeyDown}
                autoFocus
            />

            <div className="mt-12 flex justify-center">
                <button
                    onClick={reset}
                    className="p-2 rounded hover:text-text transition-colors"
                    style={{ color: 'var(--sub-color)' }}
                >
                    <RefreshCw size={24} />
                </button>
            </div>
        </div>
    );
};

export default TypingTest;
