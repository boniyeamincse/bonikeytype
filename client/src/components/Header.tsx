import { useTheme } from '../store/ThemeContext';
import { Keyboard, Trophy, User, Settings as SettingsIcon, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="max-w-6xl mx-auto py-8 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--main-color)' }}>
                    <Keyboard size={32} />
                    <span>bonikeytype</span>
                </h1>

                <nav className="flex items-center gap-6 ml-8 text-sub">
                    <Link to="/" className="hover:text-text transition-colors flex items-center gap-1" style={{ color: 'var(--sub-color)' }}>
                        <Keyboard size={18} />
                    </Link>
                    <Link to="/multiplayer" className="hover:text-text transition-colors flex items-center gap-1" style={{ color: 'var(--sub-color)' }}>
                        <Swords size={18} />
                    </Link>
                    <Link to="/leaderboard" className="hover:text-text transition-colors flex items-center gap-1" style={{ color: 'var(--sub-color)' }}>
                        <Trophy size={18} />
                    </Link>
                    <Link to="/profile" className="hover:text-text transition-colors flex items-center gap-1" style={{ color: 'var(--sub-color)' }}>
                        <User size={18} />
                    </Link>
                    <Link to="/settings" className="hover:text-text transition-colors flex items-center gap-1" style={{ color: 'var(--sub-color)' }}>
                        <SettingsIcon size={18} />
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as any)}
                    className="bg-transparent border-none text-sm outline-none cursor-pointer"
                    style={{ color: 'var(--sub-color)' }}
                >
                    <option value="default">default</option>
                    <option value="dracula">dracula</option>
                    <option value="light">light</option>
                    <option value="carbon">carbon</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
