import React, { useEffect, useRef } from 'react';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { useSettings } from '../store/SettingsContext';
import { RefreshCw } from 'lucide-react';

interface TypingTestProps {
    text: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ text }) => {
    const { userInput, isFinished, stats, handleKeyDown, reset, timeLeft } = useTypingEngine(text);
    const { fontSize, caretStyle, blindMode, quickRestart } = useSettings();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const focusInput = () => inputRef.current?.focus();
        window.addEventListener('click', focusInput);
        focusInput();

        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab' && quickRestart) {
                e.preventDefault();
                reset();
                return;
            }
            if (e.key === 'Tab') {
                e.preventDefault();
            }
            if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'BUTTON') {
                reset();
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('click', focusInput);
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [reset]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            return;
        }
        if (e.key === 'Backspace' || e.key.length === 1) {
            handleKeyDown(e.key);
        }
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
                const isCorrect = inputChars[i] === char;
                status = isCorrect ? 'correct' : (blindMode ? 'untyped' : 'incorrect');
            }

            return (
                <span key={i} className={`char ${status}`}>
                    {i === inputChars.length && !isFinished && (
                        <span className={`caret caret-${caretStyle}`}></span>
                    )}
                    {char}
                </span>
            );
        });
    };

    if (isFinished) {
        return (
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in zoom-in-95 duration-500 w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 w-full max-w-5xl">
                    <div className="flex flex-col items-start border-l-2 border-sub-color pl-6 transition-all hover:translate-x-1">
                        <span className="text-xl font-bold uppercase tracking-widest opacity-40 mb-2" style={{ color: 'var(--sub-color)' }}>wpm</span>
                        <span className="text-8xl font-bold leading-none tracking-tighter" style={{ color: 'var(--main-color)' }}>{stats.wpm}</span>
                    </div>
                    <div className="flex flex-col items-start border-l-2 border-sub-color pl-6 transition-all hover:translate-x-1">
                        <span className="text-xl font-bold uppercase tracking-widest opacity-40 mb-2" style={{ color: 'var(--sub-color)' }}>acc</span>
                        <span className="text-8xl font-bold leading-none tracking-tighter" style={{ color: 'var(--main-color)' }}>{stats.accuracy}%</span>
                    </div>
                    <div className="flex flex-col items-start border-l-2 border-sub-color/20 pl-6 transition-all hover:translate-x-1">
                        <span className="text-xl font-bold uppercase tracking-widest opacity-40 mb-2" style={{ color: 'var(--sub-color)' }}>raw</span>
                        <span className="text-8xl font-bold leading-none tracking-tighter opacity-40" style={{ color: 'var(--sub-color)' }}>{stats.rawWpm}</span>
                    </div>
                    <div className="flex flex-col items-start border-l-2 border-sub-color/20 pl-6 transition-all hover:translate-x-1">
                        <span className="text-xl font-bold uppercase tracking-widest opacity-40 mb-2" style={{ color: 'var(--sub-color)' }}>time</span>
                        <span className="text-8xl font-bold leading-none tracking-tighter opacity-40" style={{ color: 'var(--sub-color)' }}>{stats.time}s</span>
                    </div>
                </div>

                <div className="flex gap-8">
                    <button
                        onClick={reset}
                        title="restart test (tab + enter)"
                        className="group flex flex-col items-center gap-4 p-8 rounded-2xl hover:bg-white/5 transition-all duration-300"
                        style={{ color: 'var(--sub-color)' }}
                    >
                        <RefreshCw size={48} className="group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
                        <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">restart</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-4 relative min-h-[70vh] w-full">
            <div className="mb-16 flex items-center gap-10 bg-black/10 px-10 py-4 rounded-2xl backdrop-blur-md self-center shadow-xl animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60">
                    <span style={{ color: 'var(--main-color)' }} className="cursor-pointer">time</span>
                    <span className="hover:opacity-100 cursor-pointer" style={{ color: 'var(--sub-color)' }}>words</span>
                    <span className="hover:opacity-100 cursor-pointer" style={{ color: 'var(--sub-color)' }}>quote</span>
                </div>
                <div className="w-px h-4 bg-sub-color/20"></div>
                <div className="flex items-center gap-4 text-xs font-bold tracking-widest opacity-60">
                    <span className="hover:opacity-100 cursor-pointer" style={{ color: 'var(--sub-color)' }}>15</span>
                    <span style={{ color: 'var(--main-color)' }} className="cursor-pointer underline decoration-2 underline-offset-4">30</span>
                    <span className="hover:opacity-100 cursor-pointer" style={{ color: 'var(--sub-color)' }}>60</span>
                    <span className="hover:opacity-100 cursor-pointer" style={{ color: 'var(--sub-color)' }}>120</span>
                </div>
            </div>

            <div className="w-full relative py-10">
                <div className="absolute top-0 left-0 text-3xl font-bold opacity-0 transition-opacity duration-300" style={{ color: 'var(--main-color)' }}>
                    {timeLeft}
                </div>

                <div
                    className="typing-text mono relative select-none animate-in fade-in slide-in-from-bottom-2 duration-700"
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.5em' }}
                >
                    {timeLeft < 30 && userInput.length > 0 && (
                        <div className="absolute -top-16 left-0 text-3xl font-bold transition-all" style={{ color: 'var(--main-color)' }}>
                            {timeLeft}
                        </div>
                    )}
                    {renderText()}
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    className="opacity-0 absolute pointer-events-none"
                    onKeyDown={onKeyDown}
                    autoFocus
                />
            </div>

            <button
                onClick={reset}
                className="mt-20 p-2 rounded hover:text-text transform hover:rotate-180 transition-all duration-500 "
                style={{ color: 'var(--sub-color)' }}
            >
                <RefreshCw size={24} />
            </button>

            <div className="mt-20 text-xs font-bold uppercase tracking-[0.2em] opacity-30 flex items-center gap-4" style={{ color: 'var(--sub-color)' }}>
                <span>tab + enter - restart test</span>
                <div className="w-1 h-1 rounded-full bg-sub-color"></div>
                <span>esc or ctrl+shift+p - command line</span>
            </div>
        </div>
    );
};

export default TypingTest;
