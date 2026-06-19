import { Play, Flame, Mail } from 'lucide-react';
import { newsArticles } from '../data/mockData.js';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function News() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const featured = newsArticles[0];
  const trending = newsArticles.slice(1, 4);
  const latest = useMemo(() => {
    if (activeFilter === 'All') return newsArticles.slice(0, 6);
    if (activeFilter === 'International') return newsArticles.filter((a) => a.category === 'News').slice(0, 6);
    if (activeFilter === 'IPL') return newsArticles.filter((a) => a.title.toLowerCase().includes('ipl')).slice(0, 6);
    if (activeFilter === 'Stats') return newsArticles.filter((a) => a.category.toLowerCase().includes('analysis')).slice(0, 6);
    if (activeFilter === 'Interviews') return newsArticles.filter((a) => a.category.toLowerCase().includes('interview')).slice(0, 6);
    return newsArticles.slice(0, 6);
  }, [activeFilter]);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Featured News Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8 group cursor-pointer relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
          <img
            src={featured.image}
            alt="Featured News"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              {featured.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-tighter">
              {featured.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  <img src={featured.authorImage} alt="Author" />
                </div>
                <span className="font-bold">{featured.author}</span>
              </div>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <span>{featured.readTime}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <span>{featured.publishedAt}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Trending Stories
            <Flame className="w-5 h-5 text-primary" />
          </h2>
          <div className="space-y-6">
            {trending.map((article) => (
              <div key={article.id} className="flex gap-4 group cursor-pointer">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={article.image}
                    alt="News"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {article.category} • {article.publishedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/news" className="block text-center w-full py-3 bg-muted hover:bg-border rounded-xl text-sm font-bold transition-all">
            View All Trending
          </Link>
        </div>
      </section>

      {/* News Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-bold">Latest Updates</h2>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {['All', 'International', 'IPL', 'Stats', 'Interviews'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`text-sm font-bold whitespace-nowrap transition-colors ${activeFilter === filter ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src={article.image}
                  alt="News"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {article.videoDuration && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
                    <Play className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold text-secondary">
                      {article.videoDuration}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                {article.category}
              </span>
              <h3 className="text-lg font-bold leading-tight mt-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                <span className="font-bold text-foreground">{article.author}</span>
                <span className="w-1 h-1 bg-border rounded-full"></span>
                <span>{article.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-20 bg-secondary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Never miss a boundary.</h2>
          <p className="text-white/70 mb-8">
            Get daily match previews, score alerts, and expert analysis delivered straight to your
            inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.trim()) {
                setMessage('Please enter an email address.');
                return;
              }
              setMessage('Subscribed successfully. Live digest enabled.');
              setEmail('');
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/60"
            />
            <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-all">
              Join 1M+ Fans
            </button>
          </form>
          {message && <p className="text-xs text-white/80 mt-3">{message}</p>}
        </div>
        <Mail className="absolute -right-12 -bottom-12 w-60 h-60 text-white/5 -rotate-12" />
      </section>
    </main>
  );
}
