import React, { useEffect, useRef } from 'react';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { useSettings } from '../store/SettingsContext';
import { RefreshCw } from 'lucide-react';

interface TypingTestProps {
    text: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ text }) => {
    const { fontSize, caretStyle, blindMode, quickRestart, difficulty } = useSettings();
    const { userInput, isFinished, isFailed, stats, handleKeyDown, reset, timeLeft } = useTypingEngine(text, 30, difficulty);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const focusInput = () => inputRef.current?.focus();
        window.addEventListener('click', focusInput);
        focusInput();

        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            const isRestartKey =
                (quickRestart === 'tab' && e.key === 'Tab') ||
                (quickRestart === 'enter' && e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'BUTTON') ||
                (quickRestart === 'esc' && e.key === 'Escape');

            if (isRestartKey) {
                e.preventDefault();
                reset();
                return;
            }

            if (e.key === 'Tab') {
                e.preventDefault();
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
            <div className={`max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in zoom-in-95 duration-1000 w-full ${isFailed ? 'bg-red-500/5' : ''}`}>
                <div className="premium-card w-full max-w-5xl p-12 relative overflow-hidden group">
                    {/* Background Glows for Results */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-main/10 rounded-full blur-[100px] group-hover:bg-main/20 transition-all duration-1000"></div>
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-main/5 rounded-full blur-[100px] group-hover:bg-main/15 transition-all duration-1000"></div>

                    {isFailed && (
                        <div className="mb-12 text-center relative z-10">
                            <div className="text-5xl font-black uppercase tracking-[0.6em] text-red-500 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                test failed
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mt-4 text-red-500">try again with more focus</div>
                        </div>
                    )}

                    {!isFailed && (
                        <div className="mb-12 text-center relative z-10">
                            <div className="text-xs font-black uppercase tracking-[0.6em] opacity-20 mb-2">test complete</div>
                            <h2 className="text-3xl font-black uppercase tracking-tight gradient-text">performance breakdown</h2>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 relative z-10">
                        <div className="flex flex-col items-start p-6 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1">
                            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-2" style={{ color: 'var(--sub-color)' }}>wpm</span>
                            <span className="text-6xl font-black leading-none tracking-tighter" style={{ color: isFailed ? 'var(--sub-color)' : 'var(--main-color)' }}>
                                {isFailed ? '-' : stats.wpm}
                            </span>
                        </div>
                        <div className="flex flex-col items-start p-6 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1">
                            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-2" style={{ color: 'var(--sub-color)' }}>acc</span>
                            <span className="text-6xl font-black leading-none tracking-tighter" style={{ color: 'var(--main-color)' }}>{stats.accuracy}%</span>
                        </div>
                        <div className="flex flex-col items-start p-6 rounded-2xl bg-black/10 border border-white/5 opacity-40 hover:opacity-100 transition-all hover:-translate-y-1">
                            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-2" style={{ color: 'var(--sub-color)' }}>raw</span>
                            <span className="text-6xl font-black leading-none tracking-tighter" style={{ color: 'var(--sub-color)' }}>{stats.rawWpm}</span>
                        </div>
                        <div className="flex flex-col items-start p-6 rounded-2xl bg-black/10 border border-white/5 opacity-40 hover:opacity-100 transition-all hover:-translate-y-1">
                            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-2" style={{ color: 'var(--sub-color)' }}>time</span>
                            <span className="text-6xl font-black leading-none tracking-tighter" style={{ color: 'var(--sub-color)' }}>{stats.time}s</span>
                        </div>
                    </div>

                    <div className="flex justify-center pt-8 border-t border-white/5 relative z-10">
                        <button
                            onClick={reset}
                            title="restart test (tab + enter)"
                            className="group flex flex-col items-center gap-4 px-10 py-6 rounded-2xl bg-black/20 hover:bg-main/10 transition-all duration-300 border border-white/5 hover:border-main/20"
                            style={{ color: 'var(--sub-color)' }}
                        >
                            <RefreshCw size={32} className="group-hover:rotate-180 group-hover:text-main transition-all duration-700 ease-in-out" />
                            <span className="text-[10px] uppercase tracking-[0.5em] font-black group-hover:text-main opacity-40 group-hover:opacity-100 transition-all">restart</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-4 relative min-h-[80vh] w-full">
            {/* Mode Indicator - Monkeytype Style */}
            <div className="mb-20 flex items-center gap-10 bg-black/20 px-10 py-4 rounded-3xl border border-white/5 backdrop-blur-xl self-center shadow-2xl animate-in fade-in slide-in-from-top-8 duration-1000">
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                    <span style={{ color: 'var(--main-color)' }} className="cursor-pointer opacity-100 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-main"></span>
                        time
                    </span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity" style={{ color: 'var(--sub-color)' }}>words</span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity" style={{ color: 'var(--sub-color)' }}>quote</span>
                </div>
                <div className="w-px h-6 bg-white/5"></div>
                <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.3em] opacity-40">
                    <span className="hover:opacity-100 cursor-pointer transition-opacity" style={{ color: 'var(--sub-color)' }}>15</span>
                    <span style={{ color: 'var(--main-color)' }} className="cursor-pointer opacity-100 underline decoration-2 underline-offset-8">30</span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity" style={{ color: 'var(--sub-color)' }}>60</span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity" style={{ color: 'var(--sub-color)' }}>120</span>
                </div>
            </div>

            <div className="w-full relative py-10">
                <div
                    className="typing-text mono relative select-none animate-in fade-in slide-in-from-bottom-4 duration-1000 filter drop-shadow-sm"
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.5em' }}
                >
                    {timeLeft < 30 && userInput.length > 0 && (
                        <div className="absolute -top-24 left-0 text-5xl font-black italic transition-all animate-bounce" style={{ color: 'var(--main-color)', opacity: 0.1 }}>
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

            <div className="mt-32 flex flex-col items-center gap-12">
                <button
                    onClick={reset}
                    title="restart (tab)"
                    className="p-6 rounded-2xl bg-black/10 hover:bg-black/20 text-sub-color hover:text-main hover:rotate-180 transition-all duration-700 shadow-lg border border-white/5"
                    style={{ color: 'var(--sub-color)' }}
                >
                    <RefreshCw size={24} />
                </button>

                <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-10 flex flex-wrap justify-center items-center gap-x-12 gap-y-4" style={{ color: 'var(--sub-color)' }}>
                    <span className="flex items-center gap-2"><span className="p-1 px-2 rounded-md bg-black/20 border border-white/5">tab</span> + <span className="p-1 px-2 rounded-md bg-black/20 border border-white/5">enter</span> - restart test</span>
                    <span className="flex items-center gap-2"><span className="p-1 px-2 rounded-md bg-black/20 border border-white/5">esc</span> - command line</span>
                </div>
            </div>
        </div>
    );
};

export default TypingTest;
