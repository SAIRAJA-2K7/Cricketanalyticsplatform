import { useState } from 'react';
import { rankings } from '../../data/mockData.js';

export function RankingsSidebar() {
  const [activeFormat, setActiveFormat] = useState('odi');

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
        Rankings
      </h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveFormat('odi')}
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            activeFormat === 'odi'
              ? 'bg-primary text-white'
              : 'bg-muted text-foreground'
          }`}
        >
          ODI
        </button>
        <button
          onClick={() => setActiveFormat('t20')}
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            activeFormat === 't20'
              ? 'bg-primary text-white'
              : 'bg-muted text-foreground'
          }`}
        >
          T20
        </button>
        <button
          onClick={() => setActiveFormat('test')}
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            activeFormat === 'test'
              ? 'bg-primary text-white'
              : 'bg-muted text-foreground'
          }`}
        >
          Test
        </button>
      </div>
      <div className="space-y-3">
        {rankings[activeFormat].slice(0, 5).map((ranking) => (
          <div key={ranking.rank} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground w-4">
                {ranking.rank}
              </span>
              <span className="text-sm font-medium">{ranking.team}</span>
            </div>
            <span className="text-xs font-bold">{ranking.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
