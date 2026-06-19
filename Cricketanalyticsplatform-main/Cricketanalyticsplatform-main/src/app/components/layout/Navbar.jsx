import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Flame, Menu, Moon, Search, Sun } from 'lucide-react';
import { liveMatches, newsArticles, seriesList } from '../../data/mockData.js';

const quickTargets = [
  { label: 'Live Scores', path: '/', type: 'Page' },
  { label: 'Schedule', path: '/schedule', type: 'Page' },
  { label: 'Series', path: '/series', type: 'Page' },
  { label: 'Teams', path: '/teams', type: 'Page' },
  { label: 'News', path: '/news', type: 'Page' },
  ...liveMatches.map((match) => ({
    label: `${match.team1.shortName} vs ${match.team2.shortName}`,
    path: `/match/${match.id}`,
    type: 'Live',
  })),
  ...seriesList.map((series) => ({ label: series.name, path: '/series', type: 'Tournament' })),
  ...newsArticles.slice(0, 3).map((article) => ({ label: article.title, path: '/news', type: 'News' })),
];

const defaultRecent = ['India', 'IPL', 'Kohli'];
const defaultTrending = ['Powerplay wickets', 'Death over economy', 'Win probability'];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem('crivora.dark') === '1';
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', darkMode);
      window.localStorage.setItem('crivora.dark', darkMode ? '1' : '0');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleKeys = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }

      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  const isActive = (path) => location.pathname === path;

  const results = useMemo(() => {
    if (!query.trim()) {
      return quickTargets.slice(0, 6);
    }

    const input = query.toLowerCase();
    return quickTargets
      .filter((item) => item.label.toLowerCase().includes(input) || item.type.toLowerCase().includes(input))
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, searchOpen]);

  const openResult = (target) => {
    navigate(target.path);
    setSearchOpen(false);
    setQuery('');
  };

  const onSearchKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
    }

    if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      openResult(results[activeIndex]);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-secondary text-white border-b border-white/10 shadow-sm">
        <div className="max-w-[1540px] mx-auto px-3 md:px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-6 min-w-0">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">CRIVORA</span>
            </Link>
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
              <Link to="/" className={`${isActive('/') ? 'text-primary' : 'text-white/75 hover:text-white'}`}>
                Live Scores
              </Link>
              <Link to="/matches" className={`${isActive('/matches') ? 'text-primary' : 'text-white/75 hover:text-white'}`}>
                Matches
              </Link>
              <Link to="/series" className={`${isActive('/series') ? 'text-primary' : 'text-white/75 hover:text-white'}`}>
                Series
              </Link>
              <Link to="/players" className={`${isActive('/players') ? 'text-primary' : 'text-white/75 hover:text-white'}`}>
                Players
              </Link>
              <Link to="/countries" className={`${isActive('/countries') ? 'text-primary' : 'text-white/75 hover:text-white'}`}>
                Countries
              </Link>
              <Link to="/news" className={`${isActive('/news') ? 'text-primary' : 'text-white/75 hover:text-white'}`}>
                News
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex h-9 px-3 rounded-md bg-white/5 hover:bg-white/10 text-xs items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
              <span className="text-[10px] text-white/60">Ctrl K</span>
            </button>
            <Link to="/news" className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-white/10">
              <Bell className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-white/10"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/teams" className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-white/10">
              <Menu className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 p-4" onClick={() => setSearchOpen(false)}>
          <div
            className="max-w-2xl mx-auto mt-14 rounded-xl border border-border bg-card text-foreground shadow-xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-border px-4 h-12 flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="Search teams, players, tournaments, venues..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            {!query && (
              <div className="px-4 pt-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Recent</p>
                <div className="flex gap-2 mt-2 mb-3">
                  {defaultRecent.map((item) => (
                    <button key={item} type="button" onClick={() => setQuery(item)} className="h-7 px-2.5 text-xs border border-border rounded-md hover:bg-muted">
                      {item}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Trending</p>
                <div className="flex gap-2 mt-2 mb-1 flex-wrap">
                  {defaultTrending.map((item) => (
                    <button key={item} type="button" onClick={() => setQuery(item)} className="h-7 px-2.5 text-xs border border-border rounded-md hover:bg-muted">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="py-2 max-h-[320px] overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.label}-${index}`}
                  type="button"
                  onClick={() => openResult(result)}
                  className={`w-full h-10 px-4 text-left flex items-center justify-between text-sm ${
                    index === activeIndex ? 'bg-muted' : 'hover:bg-muted/70'
                  }`}
                >
                  <span className="truncate">{result.label}</span>
                  <span className="text-[11px] text-muted-foreground uppercase">{result.type}</span>
                </button>
              ))}
              {!results.length && <p className="px-4 py-3 text-sm text-muted-foreground">No matching results.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
