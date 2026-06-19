import { LineChart, Line, ResponsiveContainer, ReferenceDot } from 'recharts';

function buildSeries(match) {
  const source = match?.momentum?.length ? match.momentum : [48, 52, 46, 58, 62, 55, 63, 60];
  return source.map((value, index) => ({ over: index + 1, value }));
}

export function MomentumPanel({ match }) {
  const data = buildSeries(match);

  return (
    <section className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Live Momentum Engine</h3>
        <span className="text-[11px] text-muted-foreground">Phase dominance</span>
      </div>

      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={false} isAnimationActive={false} />
            <ReferenceDot x={data.length - 1} y={data[data.length - 1]?.value} r={3.5} fill="var(--color-primary)" stroke="none" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 text-[11px]">
        <div className="border border-border rounded-md p-2">
          <p className="text-muted-foreground">Projected</p>
          <p className="font-semibold">{match?.projectedScore || '198-204'}</p>
        </div>
        <div className="border border-border rounded-md p-2">
          <p className="text-muted-foreground">Pressure</p>
          <p className="font-semibold">{match?.pressureIndex || 'High'}</p>
        </div>
        <div className="border border-border rounded-md p-2">
          <p className="text-muted-foreground">Impact</p>
          <p className="font-semibold">{match?.wicketImpact || '+12%'}</p>
        </div>
      </div>
    </section>
  );
}
