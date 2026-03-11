import React from 'react';
import { useSettings } from '../store/SettingsContext';
import type { Theme } from '../store/SettingsContext';
import { Keyboard, Trophy, User, Settings as SettingsIcon, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const { theme, setTheme, focusMode } = useSettings();
    // We need to know if typing has started. This is tricky without a global state.
    // However, we can use a simpler approach: check for a global data attribute.
    const [isTyping, setIsTyping] = React.useState(false);

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            const typingVal = document.body.getAttribute('data-is-typing') === 'true';
            setIsTyping(typingVal);
        });
        observer.observe(document.body, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const themes: { name: string; id: Theme }[] = [
        { name: 'serika dark', id: 'default' },
        { name: 'dracula', id: 'dracula' },
        { name: 'carbon', id: 'carbon' },
        { name: 'light', id: 'light' },
    ];

    const hideHeader = focusMode && isTyping;

    return (
        <header className={`max-w-6xl mx-auto py-12 px-6 flex items-center justify-between transition-all duration-500 ${hideHeader ? 'opacity-0 -translate-y-12 pointer-events-none' : 'animate-in fade-in duration-1000'}`}>
            <div className="flex items-center gap-10">
                <Link to="/" className="flex items-center gap-4 group transition-all relative">
                    {/* Subtle Glow behind Logo */}
                    <div className="absolute inset-0 bg-main/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>

                    <img
                        src="/assets/logo.png"
                        alt="BoniTypes Logo"
                        style={{ height: '2.5rem', width: 'auto', mixBlendMode: 'screen' }}
                        className="group-hover:scale-110 transition-transform object-contain relative z-10"
                    />
                    <div className="flex flex-col leading-none relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30 group-hover:opacity-50 transition-opacity" style={{ color: 'var(--sub-color)' }}>type what you see</span>
                        <span className="text-2xl font-black tracking-tighter lowercase gradient-text">bonitypes</span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-10 ml-6">
                    <Link to="/" title="typing test" className="group relative py-2 transition-all" style={{ color: 'var(--sub-color)' }}>
                        <Keyboard size={20} className="group-hover:text-main group-hover:scale-110 transition-all" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-main opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link to="/multiplayer" title="multiplayer" className="group relative py-2 transition-all" style={{ color: 'var(--sub-color)' }}>
                        <Swords size={20} className="group-hover:text-main group-hover:scale-110 transition-all" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-main opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link to="/leaderboard" title="leaderboard" className="group relative py-2 transition-all" style={{ color: 'var(--sub-color)' }}>
                        <Trophy size={20} className="group-hover:text-main group-hover:scale-110 transition-all" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-main opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link to="/profile" title="profile" className="group relative py-2 transition-all" style={{ color: 'var(--sub-color)' }}>
                        <User size={20} className="group-hover:text-main group-hover:scale-110 transition-all" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-main opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link to="/settings" title="settings" className="group relative py-2 transition-all" style={{ color: 'var(--sub-color)' }}>
                        <SettingsIcon size={20} className="group-hover:text-main group-hover:scale-110 transition-all" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-main opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-8">
                {/* Custom Theme Switcher (Pro Look) */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/20 border border-white/5 shadow-inner">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            title={t.name}
                            className={`w-4 h-4 rounded-full transition-all hover:scale-125 border border-white/10 ${theme === t.id ? 'ring-2 ring-main ring-offset-2 ring-offset-bg opacity-100' : 'opacity-30'}`}
                            style={{
                                backgroundColor: t.id === 'default' ? '#e2b714' : t.id === 'dracula' ? '#bd93f9' : t.id === 'carbon' ? '#f66e0d' : '#000000',
                                boxShadow: theme === t.id ? 'var(--glow-shadow)' : 'none'
                            }}
                        />
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
