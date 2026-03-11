import { useTheme } from '../store/ThemeContext';
import { Keyboard, Trophy, User, Settings as SettingsIcon, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="max-w-6xl mx-auto py-10 px-6 flex items-center justify-between animate-in fade-in duration-700">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-3 group transition-all">
                    <Keyboard size={28} style={{ color: 'var(--main-color)' }} className="group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs uppercase tracking-widest opacity-50 font-bold" style={{ color: 'var(--sub-color)' }}>monkey see</span>
                        <span className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-color)' }}>bonikeytype</span>
                    </div>
                </Link>

                <nav className="flex items-center gap-8 ml-4">
                    <Link to="/" title="typing test" className="hover:text-text transition-all" style={{ color: 'var(--sub-color)' }}>
                        <Keyboard size={20} />
                    </Link>
                    <Link to="/multiplayer" title="multiplayer" className="hover:text-text transition-all" style={{ color: 'var(--sub-color)' }}>
                        <Swords size={20} />
                    </Link>
                    <Link to="/leaderboard" title="leaderboard" className="hover:text-text transition-all" style={{ color: 'var(--sub-color)' }}>
                        <Trophy size={20} />
                    </Link>
                    <Link to="/profile" title="profile" className="hover:text-text transition-all" style={{ color: 'var(--sub-color)' }}>
                        <User size={20} />
                    </Link>
                    <Link to="/settings" title="settings" className="hover:text-text transition-all" style={{ color: 'var(--sub-color)' }}>
                        <SettingsIcon size={20} />
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as any)}
                        className="bg-transparent border-none text-xs uppercase font-bold tracking-widest outline-none cursor-pointer hover:opacity-100 opacity-50 transition-opacity"
                        style={{ color: 'var(--sub-color)' }}
                    >
                        <option value="default" className="bg-[#323437]">serika dark</option>
                        <option value="dracula" className="bg-[#282a36]">dracula</option>
                        <option value="light" className="bg-[#ffffff]">light</option>
                        <option value="carbon" className="bg-[#161616]">carbon</option>
                    </select>
                </div>
            </div>
        </header>
    );
};

export default Header;
