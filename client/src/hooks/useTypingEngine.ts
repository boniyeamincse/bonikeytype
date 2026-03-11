import { useState, useEffect, useCallback, useRef } from 'react';

export interface TypingStats {
    wpm: number;
    accuracy: number;
    rawWpm: number;
    errors: number;
    time: number;
    chars: number;
}

export const useTypingEngine = (text: string, duration: number = 30) => {
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [stats, setStats] = useState<TypingStats>({
        wpm: 0,
        accuracy: 0,
        rawWpm: 0,
        errors: 0,
        time: 0,
        chars: 0,
    });

    const timerRef = useRef<any>(null);

    const reset = useCallback(() => {
        setUserInput('');
        setStartTime(null);
        setEndTime(null);
        setIsFinished(false);
        setStats({
            wpm: 0,
            accuracy: 0,
            rawWpm: 0,
            errors: 0,
            time: 0,
            chars: 0,
        });
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    const calculateStats = useCallback(() => {
        if (!startTime) return;

        const now = endTime || Date.now();
        const timeElapsed = (now - startTime) / 1000 / 60; // in minutes
        if (timeElapsed <= 0) return;

        const words = userInput.length / 5;
        const rawWpm = Math.round(words / timeElapsed);

        let errors = 0;
        const currentInput = userInput.split('');
        const originalText = text.split('');

        currentInput.forEach((char, i) => {
            if (char !== originalText[i]) errors++;
        });

        const correctChars = userInput.length - errors;
        const wpm = Math.round((correctChars / 5) / timeElapsed);
        const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;

        setStats({
            wpm: Math.max(0, wpm),
            accuracy,
            rawWpm: Math.max(0, rawWpm),
            errors,
            time: Math.round(timeElapsed * 60),
            chars: userInput.length
        });
    }, [userInput, text, startTime, endTime]);

    useEffect(() => {
        if (startTime && !isFinished) {
            timerRef.current = setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000;
                if (elapsed >= duration) {
                    setEndTime(Date.now());
                    setIsFinished(true);
                    if (timerRef.current) clearInterval(timerRef.current);
                }
                calculateStats();
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [startTime, isFinished, duration, calculateStats]);

    const handleKeyDown = (char: string) => {
        if (isFinished) return;

        if (!startTime) {
            setStartTime(Date.now());
        }

        if (char === 'Backspace') {
            setUserInput(prev => prev.slice(0, -1));
        } else if (char.length === 1) {
            setUserInput(prev => prev + char);
            if (userInput.length + 1 >= text.length) {
                setEndTime(Date.now());
                setIsFinished(true);
            }
        }
    };

    return {
        userInput,
        isFinished,
        stats,
        handleKeyDown,
        reset,
        timeLeft: Math.max(0, duration - (startTime ? Math.floor((Date.now() - startTime) / 1000) : 0))
    };
};
