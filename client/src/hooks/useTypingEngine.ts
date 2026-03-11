import { useState, useEffect, useCallback, useRef } from 'react';

export interface TypingStats {
    wpm: number;
    accuracy: number;
    rawWpm: number;
    errors: number;
    time: number;
    chars: number;
}

export const useTypingEngine = (text: string, duration: number = 30, difficulty: 'normal' | 'expert' | 'master' = 'normal') => {
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
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
        setIsFailed(false);
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

    const updateLiveStats = useCallback((currentInput: string) => {
        if (!startTime) return;

        const now = Date.now();
        const timeElapsed = (now - startTime) / 1000 / 60; // in minutes
        if (timeElapsed <= 0.001) return; // avoid division by near-zero

        const words = currentInput.length / 5;
        const rawWpm = Math.round(words / timeElapsed);

        let errors = 0;
        const inputChars = currentInput.split('');
        const originalChars = text.split('');

        inputChars.forEach((char, i) => {
            if (char !== originalChars[i]) errors++;
        });

        const correctChars = currentInput.length - errors;
        const wpm = Math.round((correctChars / 5) / timeElapsed);
        const accuracy = currentInput.length > 0 ? Math.round((correctChars / currentInput.length) * 100) : 100;

        setStats({
            wpm: Math.max(0, wpm),
            accuracy,
            rawWpm: Math.max(0, rawWpm),
            errors,
            time: Math.round(timeElapsed * 60),
            chars: currentInput.length
        });
    }, [startTime, text]);

    const handleKeyDown = (char: string) => {
        if (isFinished || isFailed) return;

        let newStartTime = startTime;
        if (!startTime) {
            newStartTime = Date.now();
            setStartTime(newStartTime);
        }

        if (char === 'Backspace') {
            const nextInput = userInput.slice(0, -1);
            setUserInput(nextInput);
            updateLiveStats(nextInput);
        } else if (char.length === 1) {
            const currentIdx = userInput.length;
            const expectedChar = text[currentIdx];

            // Master mode: Fail on any mistype
            if (difficulty === 'master' && char !== expectedChar) {
                setIsFailed(true);
                setIsFinished(true);
                setEndTime(Date.now());
                return;
            }

            // Expert mode: Fail on space if current word is incorrect
            if (difficulty === 'expert' && char === ' ') {
                const words = text.split(' ');
                const inputWords = (userInput + char).split(' ');
                const currentWordIdx = inputWords.length - 2; // -2 because we just added space
                if (currentWordIdx >= 0) {
                    const originalWord = words[currentWordIdx];
                    const typedWord = inputWords[currentWordIdx];
                    if (originalWord !== typedWord) {
                        setIsFailed(true);
                        setIsFinished(true);
                        setEndTime(Date.now());
                        return;
                    }
                }
            }

            const nextInput = userInput + char;
            setUserInput(nextInput);
            updateLiveStats(nextInput);

            if (nextInput.length >= text.length) {
                setEndTime(Date.now());
                setIsFinished(true);
            }
        }
    };

    return {
        userInput,
        isFinished,
        isFailed,
        stats,
        handleKeyDown,
        reset,
        timeLeft: Math.max(0, duration - (startTime ? Math.floor((Date.now() - startTime) / 1000) : 0))
    };
};
