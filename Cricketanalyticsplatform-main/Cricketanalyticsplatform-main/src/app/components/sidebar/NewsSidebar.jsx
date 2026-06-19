import { newsArticles } from '../../data/mockData.js';
import { Link } from 'react-router-dom';

export function NewsSidebar() {
  const latestNews = newsArticles.slice(1, 4);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-muted/30">
        <h2 className="text-sm font-bold uppercase tracking-wide">Latest News</h2>
      </div>
      <div className="p-4 space-y-4">
        <Link to="/news" className="group cursor-pointer block">
          <div className="aspect-video rounded-lg overflow-hidden mb-2">
            <img
              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=225&fit=crop"
              alt="News"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h3 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">
            BCCI announces squad for upcoming Australia series; Rohit to lead.
          </h3>
          <p className="text-[10px] text-muted-foreground mt-1">
            2 hours ago • Cricket India
          </p>
        </Link>
        <div className="space-y-3 pt-2 border-t border-border">
          {latestNews.map((article) => (
            <Link key={article.id} to="/news" className="group cursor-pointer block">
              <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1">
                {article.publishedAt}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Link to="/news" className="block text-center w-full p-3 text-xs font-bold bg-muted/50 hover:bg-muted text-foreground transition-colors">
        Read All News
      </Link>
    </div>
  );
}
