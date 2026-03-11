import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Multiplayer from './pages/Multiplayer';
import SecurityPolicy from './pages/SecurityPolicy';
import Settings from './pages/Settings';
import About from './pages/About';
import { SettingsProvider } from './store/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-mono">
          <Header />
          <main className="flex-grow flex flex-col px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/multiplayer" element={<Multiplayer />} />
              <Route path="/security-policy" element={<SecurityPolicy />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <footer className="max-w-6xl mx-auto py-12 px-4 mt-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-xs font-bold uppercase tracking-[0.2em] opacity-30 hover:opacity-60 transition-opacity">
              <Link to="/about" className="hover:text-main transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-main"></span>
                about
              </Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-main transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-main"></span>
                github
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-main transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-main"></span>
                twitter
              </a>
              <Link to="/security-policy" className="hover:text-main transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-main"></span>
                security policy
              </Link>
              <Link to="/terms" className="hover:text-main transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-main"></span>
                terms
              </Link>
              <Link to="/privacy" className="hover:text-main transition-colors flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-main"></span>
                privacy
              </Link>
            </div>
            <div className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] opacity-10 text-center">
              bonitypes v1.1.0
            </div>
          </footer>
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
