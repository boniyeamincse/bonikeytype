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
          <footer className="max-w-6xl mx-auto py-8 px-4 text-center text-sm" style={{ color: 'var(--sub-color)' }}>
            <div className="flex items-center justify-center gap-6">
              <Link to="/about" className="hover:text-text transition-colors">about</Link>
              <a href="https://github.com" className="hover:text-text transition-colors">github</a>
              <a href="https://twitter.com" className="hover:text-text transition-colors">twitter</a>
              <Link to="/security-policy" className="hover:text-text transition-colors">security policy</Link>
              <Link to="/terms" className="hover:text-text transition-colors">terms</Link>
              <Link to="/privacy" className="hover:text-text transition-colors">privacy</Link>
            </div>
          </footer>
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
