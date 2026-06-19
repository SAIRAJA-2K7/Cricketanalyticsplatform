import { Flame, Trophy, Newspaper, Menu, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function MobileNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-secondary/95 backdrop-blur text-white border-t border-white/10 px-4 py-2.5 flex justify-between items-center z-50">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-white/60'}`}>
        <Flame className="w-5 h-5" />
        <span className="text-[10px] font-bold">Live</span>
      </Link>
      <Link to="/matches" className={`flex flex-col items-center gap-1 ${isActive('/matches') ? 'text-primary' : 'text-white/60'}`}>
        <Activity className="w-5 h-5" />
        <span className="text-[10px] font-bold">Matches</span>
      </Link>
      <Link to="/series" className={`flex flex-col items-center gap-1 ${isActive('/series') ? 'text-primary' : 'text-white/60'}`}>
        <Trophy className="w-5 h-5" />
        <span className="text-[10px] font-bold">Series</span>
      </Link>
      <Link to="/players" className={`flex flex-col items-center gap-1 ${isActive('/players') ? 'text-primary' : 'text-white/60'}`}>
        <Newspaper className="w-5 h-5" />
        <span className="text-[10px] font-bold">Players</span>
      </Link>
      <Link to="/teams" className={`flex flex-col items-center gap-1 ${isActive('/teams') ? 'text-primary' : 'text-white/60'}`}>
        <Menu className="w-5 h-5" />
        <span className="text-[10px] font-bold">More</span>
      </Link>
    </nav>
  );
}

