import { liveMatches, newsArticles, rankings, seriesList, upcomingMatches } from '../data/mockData.js';

const countries = [
  { id: 'c1', name: 'India', genericFlag: 'https://flagcdn.com/in.svg' },
  { id: 'c2', name: 'Australia', genericFlag: 'https://flagcdn.com/au.svg' },
  { id: 'c3', name: 'England', genericFlag: 'https://flagcdn.com/gb.svg' },
  { id: 'c4', name: 'New Zealand', genericFlag: 'https://flagcdn.com/nz.svg' },
  { id: 'c5', name: 'Pakistan', genericFlag: 'https://flagcdn.com/pk.svg' },
  { id: 'c6', name: 'South Africa', genericFlag: 'https://flagcdn.com/za.svg' },
];

const players = [
  {
    id: 'p1',
    name: 'Virat Kohli',
    country: 'India',
    role: 'Top-order Batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1988-11-05',
    placeOfBirth: 'Delhi, India',
  },
  {
    id: 'p2',
    name: 'Hardik Pandya',
    country: 'India',
    role: 'All-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1993-10-11',
    placeOfBirth: 'Surat, India',
  },
  {
    id: 'p3',
    name: 'Mitchell Starc',
    country: 'Australia',
    role: 'Bowler',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Left-arm fast',
    dateOfBirth: '1990-01-30',
    placeOfBirth: 'Baulkham Hills, Australia',
  },
  {
    id: 'p4',
    name: 'Joe Root',
    country: 'England',
    role: 'Batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1990-12-30',
    placeOfBirth: 'Sheffield, England',
  },
];

const staticMatches = [
  ...liveMatches.map((match, index) => ({
    id: match.id,
    name: `${match.team1.name} vs ${match.team2.name}`,
    matchType: index === 1 ? 'test' : index === 2 ? 'odi' : 't20',
    status: match.matchInfo,
    venue: match.venue,
    date: new Date(Date.now() - index * 86400000).toISOString(),
    teams: [match.team1.name, match.team2.name],
    teamInfo: [
      { name: match.team1.name, shortname: match.team1.shortName, img: match.team1.flag },
      { name: match.team2.name, shortname: match.team2.shortName, img: match.team2.flag },
    ],
    score: [
      {
        inning: `${match.team1.name} Innings`,
        r: Number.parseInt(match.team1.score?.split('/')[0] || '0', 10),
        w: Number.parseInt(match.team1.score?.split('/')[1] || '0', 10),
        o: Number.parseFloat(match.team1.overs || '0'),
      },
      {
        inning: `${match.team2.name} Innings`,
        r: Number.parseInt(match.team2.score?.split('/')[0] || '0', 10),
        w: Number.parseInt(match.team2.score?.split('/')[1] || '0', 10),
        o: Number.parseFloat(match.team2.overs || '0'),
      },
    ],
    tossWinner: match.tossInfo?.split(' won the toss')[0] || '',
    tossChoice: match.tossInfo?.includes('elected to bat') ? 'bat' : 'bowl',
  })),
  ...upcomingMatches.map((match) => ({
    id: match.id,
    name: `${match.team1.name} vs ${match.team2.name}`,
    matchType: 't20',
    status: 'Upcoming fixture',
    venue: match.venue,
    date: new Date().toISOString(),
    teams: [match.team1.name, match.team2.name],
    teamInfo: [
      { name: match.team1.name, shortname: match.team1.shortName, img: match.team1.flag },
      { name: match.team2.name, shortname: match.team2.shortName, img: match.team2.flag },
    ],
    score: [],
  })),
];

const series = seriesList.map((item, index) => ({
  id: item.id,
  name: item.name,
  startDate: new Date(Date.now() - index * 86400000 * 7).toISOString(),
  endDate: new Date(Date.now() + (index + 1) * 86400000 * 10).toISOString(),
  matches: 6 + index * 4,
}));

const buildScorecard = (matchId) => {
  const match = staticMatches.find((item) => item.id === matchId) || staticMatches[0];
  const score = match.score || [];
  return {
    data: {
      scoreCard: score.map((innings, index) => ({
        innings: innings.inning,
        score: `${innings.r}/${innings.w}`,
        batsman:
          index === 0
            ? [
                { name: 'Top Batter', r: Math.max(35, innings.r - 104), b: 42, '4s': 5, '6s': 2 },
                { name: 'Support Batter', r: 24, b: 18, '4s': 2, '6s': 1 },
              ]
            : [
                { name: 'Chasing Batter', r: Math.max(28, innings.r - 120), b: 39, '4s': 4, '6s': 1 },
                { name: 'Finisher', r: 19, b: 11, '4s': 1, '6s': 1 },
              ],
      })),
    },
  };
};

const buildSquad = (matchId) => {
  const match = staticMatches.find((item) => item.id === matchId) || staticMatches[0];
  return {
    data: [
      {
        teamName: match.teamInfo[0].name,
        players: ['Captain', 'Opener', 'All-rounder', 'Spinner'],
      },
      {
        teamName: match.teamInfo[1].name,
        players: ['Captain', 'Anchor', 'Pacer', 'Finisher'],
      },
    ],
  };
};

export const mockApi = {
  getCurrentMatches: async () => ({ data: liveMatches }),
  getMatches: async (offset = 0) => ({ data: staticMatches.slice(offset, offset + 25) }),
  getSeries: async (offset = 0) => ({ data: series.slice(offset, offset + 25) }),
  getSeriesInfo: async (id) => {
    const info = series.find((item) => String(item.id) === String(id)) || series[0];
    return {
      data: {
        info: {
          id: info.id,
          name: info.name,
          startdate: new Date(info.startDate).toLocaleDateString(),
          enddate: new Date(info.endDate).toLocaleDateString(),
          matches: info.matches,
        },
        matchList: staticMatches.slice(0, 3),
      },
    };
  },
  getMatchInfo: async (id) => ({ data: staticMatches.find((item) => String(item.id) === String(id)) || staticMatches[0] }),
  getMatchScorecard: async (id) => buildScorecard(id),
  getMatchSquad: async (id) => buildSquad(id),
  getPlayers: async (offset = 0, search = '') => {
    const filtered = players.filter((player) => player.name.toLowerCase().includes(search.toLowerCase()));
    return { data: (search ? filtered : players).slice(offset, offset + 25) };
  },
  getPlayerInfo: async (id) => ({ data: players.find((player) => String(player.id) === String(id)) || players[0] }),
  getCountries: async () => ({ data: countries }),
};
