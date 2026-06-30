const liveMatches = [
  {
    id: '1',
    name: 'India vs Australia, Super 8',
    matchType: 't20',
    status: 'India need 42 runs in 14 balls',
    venue: 'Sydney Cricket Ground',
    date: '2026-06-30T12:00:00.000Z',
    teams: ['India', 'Australia'],
    teamInfo: [
      { name: 'India', shortname: 'IND', img: 'https://flagcdn.com/in.svg' },
      { name: 'Australia', shortname: 'AUS', img: 'https://flagcdn.com/au.svg' },
    ],
    score: [
      { inning: 'India Innings', r: 182, w: 4, o: 17.4 },
      { inning: 'Australia Innings', r: 224, w: 6, o: 20 },
    ],
    tossWinner: 'Australia',
    tossChoice: 'bat',
  },
  {
    id: '2',
    name: 'England vs New Zealand, 3rd Test',
    matchType: 'test',
    status: '2nd innings, Day 2',
    venue: "Lord's Cricket Ground, London",
    date: '2026-06-30T08:00:00.000Z',
    teams: ['England', 'New Zealand'],
    teamInfo: [
      { name: 'England', shortname: 'ENG', img: 'https://flagcdn.com/gb-eng.svg' },
      { name: 'New Zealand', shortname: 'NZ', img: 'https://flagcdn.com/nz.svg' },
    ],
    score: [
      { inning: 'England Innings', r: 156, w: 2, o: 42 },
      { inning: 'New Zealand Innings', r: 144, w: 10, o: 48.3 },
    ],
    tossWinner: 'England',
    tossChoice: 'bowl',
  },
];

const matches = [
  ...liveMatches,
  {
    id: '3',
    name: 'Pakistan vs South Africa, Group Stage',
    matchType: 'odi',
    status: 'South Africa need 99 runs in 70 balls',
    venue: 'R. Premadasa Stadium, Colombo',
    date: '2026-06-29T12:00:00.000Z',
  },
  {
    id: '4',
    name: 'Mumbai Indians vs Chennai Super Kings',
    matchType: 't20',
    status: 'Upcoming',
    venue: 'Wankhede Stadium, Mumbai',
    date: '2026-07-01T14:00:00.000Z',
  },
];

const series = [
  { id: 's1', name: 'T20 World Cup 2026', startDate: '2026-06-01', endDate: '2026-07-15', matches: 24 },
  { id: 's2', name: 'The Ashes 2026', startDate: '2026-06-10', endDate: '2026-08-01', matches: 5 },
];

const seriesInfo = {
  s1: {
    info: { id: 's1', name: 'T20 World Cup 2026', startdate: '2026-06-01', enddate: '2026-07-15', matches: 24 },
    matchList: matches.slice(0, 3),
  },
  s2: {
    info: { id: 's2', name: 'The Ashes 2026', startdate: '2026-06-10', enddate: '2026-08-01', matches: 5 },
    matchList: matches.slice(1, 3),
  },
};

const players = [
  { id: 'p1', name: 'Virat Kohli', country: 'India' },
  { id: 'p2', name: 'Hardik Pandya', country: 'India' },
  { id: 'p3', name: 'Mitchell Starc', country: 'Australia' },
  { id: 'p4', name: 'Joe Root', country: 'England' },
];

const playerInfo = {
  p1: {
    id: 'p1',
    name: 'Virat Kohli',
    country: 'India',
    role: 'Top-order Batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1988-11-05',
    placeOfBirth: 'Delhi, India',
  },
  p2: {
    id: 'p2',
    name: 'Hardik Pandya',
    country: 'India',
    role: 'All-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1993-10-11',
    placeOfBirth: 'Surat, India',
  },
  p3: {
    id: 'p3',
    name: 'Mitchell Starc',
    country: 'Australia',
    role: 'Bowler',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Left-arm fast',
    dateOfBirth: '1990-01-30',
    placeOfBirth: 'Baulkham Hills, Australia',
  },
  p4: {
    id: 'p4',
    name: 'Joe Root',
    country: 'England',
    role: 'Batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1990-12-30',
    placeOfBirth: 'Sheffield, England',
  },
};

const countries = [
  { id: 'c1', name: 'India', genericFlag: 'https://flagcdn.com/in.svg' },
  { id: 'c2', name: 'Australia', genericFlag: 'https://flagcdn.com/au.svg' },
  { id: 'c3', name: 'England', genericFlag: 'https://flagcdn.com/gb.svg' },
  { id: 'c4', name: 'New Zealand', genericFlag: 'https://flagcdn.com/nz.svg' },
];

const scorecards = {
  '1': {
    scoreCard: [
      {
        innings: 'Australia Innings',
        score: '224/6',
        batsman: [
          { name: 'D. Warner', r: 66, b: 39, '4s': 8, '6s': 2 },
          { name: 'M. Marsh', r: 48, b: 27, '4s': 4, '6s': 3 },
        ],
      },
      {
        innings: 'India Innings',
        score: '182/4',
        batsman: [
          { name: 'Virat Kohli', r: 78, b: 42, '4s': 7, '6s': 2 },
          { name: 'Hardik Pandya', r: 24, b: 12, '4s': 2, '6s': 1 },
        ],
      },
    ],
  },
  '2': {
    scoreCard: [
      {
        innings: 'New Zealand Innings',
        score: '144/10',
        batsman: [
          { name: 'K. Williamson', r: 54, b: 101, '4s': 6, '6s': 0 },
          { name: 'T. Latham', r: 31, b: 73, '4s': 4, '6s': 0 },
        ],
      },
    ],
  },
};

const squads = {
  '1': [
    { teamName: 'India', players: ['Virat Kohli', 'Hardik Pandya', 'Rohit Sharma', 'Jasprit Bumrah'] },
    { teamName: 'Australia', players: ['David Warner', 'Mitchell Starc', 'Pat Cummins', 'Glenn Maxwell'] },
  ],
  '2': [
    { teamName: 'England', players: ['Joe Root', 'Ben Stokes', 'Zak Crawley', 'Stuart Broad'] },
    { teamName: 'New Zealand', players: ['Kane Williamson', 'Tim Southee', 'Tom Latham', 'Matt Henry'] },
  ],
};

module.exports = {
  liveMatches,
  matches,
  series,
  seriesInfo,
  players,
  playerInfo,
  countries,
  scorecards,
  squads,
};
