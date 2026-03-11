import React, { useMemo } from 'react';
import TypingTest from '../components/TypingTest';
import AdsPlaceholder from '../components/AdsPlaceholder';
import { useSettings } from '../store/SettingsContext';
import { modifyWordset, sampleWords } from '../utils/TestModifiers';

const Home: React.FC = () => {
    const { includePunctuation, includeNumbers } = useSettings();

    const text = useMemo(() => {
        const modified = modifyWordset(sampleWords, {
            includePunctuation,
            includeNumbers
        });
        return modified.join(' ');
    }, [includePunctuation, includeNumbers]);

    return (
        <div className="flex-grow flex flex-col pt-20">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-main/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none animate-pulse duration-[10s]"></div>
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-main/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none animate-pulse duration-[8s] delay-1000"></div>

            <div className="relative z-10 w-full">
                <TypingTest text={text} key={text} />
            </div>
            <div className="mt-auto">
                <AdsPlaceholder />
            </div>
        </div>
    );
};

export default Home;
