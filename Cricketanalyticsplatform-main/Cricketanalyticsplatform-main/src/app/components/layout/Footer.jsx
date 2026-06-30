import { Flame, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary text-white border-t border-white/10 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">crivora</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            The ultimate destination for cricket fans. Real-time scores, in-depth analysis, and the latest news from the world of cricket.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Matches</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/" className="hover:text-primary transition-colors">Live Scores</Link></li>
            <li><Link to="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
            <li><Link to="/schedule" className="hover:text-primary transition-colors">Recent Results</Link></li>
            <li><Link to="/teams" className="hover:text-primary transition-colors">International</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Series</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/series" className="hover:text-primary transition-colors">T20 World Cup</Link></li>
            <li><Link to="/series" className="hover:text-primary transition-colors">IPL 2024</Link></li>
            <li><Link to="/series" className="hover:text-primary transition-colors">The Ashes</Link></li>
            <li><Link to="/series" className="hover:text-primary transition-colors">Asia Cup</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/teams" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/news" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/news" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/news" className="hover:text-primary transition-colors">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/40">
        &copy; 2026 crivora. All rights reserved.
      </div>
    </footer>
  );
}
