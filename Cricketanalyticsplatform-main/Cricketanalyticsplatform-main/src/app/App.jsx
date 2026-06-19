import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar.jsx';
import { LiveTicker } from './components/layout/LiveTicker.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { MobileNav } from './components/layout/MobileNav.jsx';
import { Home } from './pages/Home.jsx';
import { MatchDetail } from './pages/MatchDetail.jsx';
import { MatchesList } from './pages/MatchesList.jsx';
import { News } from './pages/News.jsx';
import { Schedule } from './pages/Schedule.jsx';
import { Series } from './pages/Series.jsx';
import { SeriesDetail } from './pages/SeriesDetail.jsx';
import { Teams } from './pages/Teams.jsx';
import { PlayersList } from './pages/PlayersList.jsx';
import { PlayerDetail } from './pages/PlayerDetail.jsx';
import { CountriesList } from './pages/CountriesList.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-background flex flex-col relative">
        <Navbar />
        <LiveTicker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match/:id" element={<MatchDetail />} />
          <Route path="/matches" element={<MatchesList />} />
          <Route path="/news" element={<News />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:id" element={<SeriesDetail />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<PlayersList />} />
          <Route path="/player/:id" element={<PlayerDetail />} />
          <Route path="/countries" element={<CountriesList />} />
        </Routes>
        <Footer />
        <MobileNav />
      </div>
    </BrowserRouter>
  );
}
