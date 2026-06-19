// Mock cricket match data

export const liveMatches = [
  {
    id: '1',
    status: 'live',
    tournament: 'ICC T20 World Cup • Super 8',
    venue: 'Sydney Cricket Ground',
    team1: {
      name: 'India',
      shortName: 'IND',
      flag: 'https://flagcdn.com/in.svg',
      score: '182/4',
      overs: '17.4',
      wickets: 4
    },
    team2: {
      name: 'Australia',
      shortName: 'AUS',
      flag: 'https://flagcdn.com/au.svg',
      score: '224/6',
      overs: '20.0',
      wickets: 6
    },
    matchInfo: 'India need 42 runs in 14 balls',
    crr: '10.32',
    rrr: '18.00',
    batting: [
      { name: 'V. Kohli*', score: '78 (42)' },
      { name: 'H. Pandya', score: '24 (12)' }
    ],
    bowling: [
      { name: 'M. Starc*', figures: '1/34 (3.4)' },
      { name: 'P. Cummins', figures: '2/28 (4.0)' }
    ],
    tossInfo: 'Australia won the toss and elected to bat'
  },
  {
    id: '2',
    status: 'live',
    tournament: 'The Ashes 2024 • 3rd Test',
    venue: 'Lord\'s Cricket Ground, London',
    team1: {
      name: 'England',
      shortName: 'ENG',
      flag: 'https://flagcdn.com/gb-eng.svg',
      score: '156/2',
      overs: '42.0',
      wickets: 2
    },
    team2: {
      name: 'New Zealand',
      shortName: 'NZ',
      flag: 'https://flagcdn.com/nz.svg',
      score: '144/10',
      overs: '48.3',
      wickets: 10
    },
    matchInfo: '2nd Innings - Day 2',
    crr: '3.71',
    batting: [
      { name: 'J. Root*', score: '68 (124)' },
      { name: 'B. Duckett', score: '42 (65)' }
    ],
    bowling: [
      { name: 'T. Southee*', figures: '1/38 (12.0)' },
      { name: 'M. Henry', figures: '1/32 (10.0)' }
    ],
    tossInfo: 'England won the toss and elected to bowl'
  },
  {
    id: '3',
    status: 'live',
    tournament: 'Asia Cup 2024 • Group Stage',
    venue: 'R. Premadasa Stadium, Colombo',
    team1: {
      name: 'Pakistan',
      shortName: 'PAK',
      flag: 'https://flagcdn.com/pk.svg',
      score: '310/8',
      overs: '50.0',
      wickets: 8
    },
    team2: {
      name: 'South Africa',
      shortName: 'SA',
      flag: 'https://flagcdn.com/za.svg',
      score: '212/4',
      overs: '38.2',
      wickets: 4
    },
    matchInfo: 'South Africa need 99 runs in 70 balls',
    crr: '5.53',
    rrr: '8.49',
    batting: [
      { name: 'Q. de Kock*', score: '85 (92)' },
      { name: 'A. Markram', score: '54 (58)' }
    ],
    bowling: [
      { name: 'S. Afridi*', figures: '2/42 (8.2)' },
      { name: 'H. Rauf', figures: '1/38 (8.0)' }
    ],
    tossInfo: 'Pakistan won the toss and elected to bat'
  }
];

export const upcomingMatches = [
  {
    id: '4',
    status: 'upcoming',
    tournament: 'IPL 2024 • Playoffs',
    venue: 'Wankhede Stadium, Mumbai',
    team1: {
      name: 'Mumbai Indians',
      shortName: 'MI',
      flag: 'https://flagcdn.com/in.svg'
    },
    team2: {
      name: 'Chennai Super Kings',
      shortName: 'CSK',
      flag: 'https://flagcdn.com/in.svg'
    },
    date: 'Tomorrow',
    time: '19:30 IST'
  },
  {
    id: '5',
    status: 'upcoming',
    tournament: 'T20 World Cup 2024 • Semi Final',
    venue: 'Eden Gardens, Kolkata',
    team1: {
      name: 'India',
      shortName: 'IND',
      flag: 'https://flagcdn.com/in.svg'
    },
    team2: {
      name: 'West Indies',
      shortName: 'WI',
      flag: 'https://flagcdn.com/jm.svg'
    },
    date: 'May 12, 2026',
    time: '14:30 IST'
  }
];

export const newsArticles = [
  {
    id: '1',
    title: '"We are ready for the challenge," says Rohit Sharma ahead of Border-Gavaskar Trophy.',
    excerpt: 'Indian captain Rohit Sharma expresses confidence team prepares for the crucial series in Australia.',
    category: 'Exclusive Interview',
    author: 'Harsha Bhogle',
    authorImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    readTime: '15 mins read',
    publishedAt: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=800&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'How Mitchell Starc\'s new action is terrorizing batsmen in Perth.',
    excerpt: 'An in-depth analysis of the technical changes that have made Starc even more lethal.',
    category: 'Analysis',
    author: 'Ian Chappell',
    publishedAt: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=600&h=375&fit=crop'
  },
  {
    id: '3',
    title: 'BCCI considering new rules for IPL 2025 mega auction.',
    excerpt: 'Major changes could be coming to the IPL auction format next season.',
    category: 'News',
    author: 'Cricinfo Staff',
    publishedAt: '8 hours ago',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=375&fit=crop'
  },
  {
    id: '4',
    title: 'The rise of associate nations T20 World Cup 2024 is different.',
    excerpt: 'Smaller cricketing nations are making their mark on the world stage.',
    category: 'Features',
    author: 'Peter Della Penna',
    publishedAt: '12 hours ago',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=375&fit=crop'
  },
  {
    id: '5',
    title: 'Breaking down Virat Kohli\'s masterclass against Pakistan in Melbourne.',
    excerpt: 'A deep dive into the technique and temperament that fueled one of the greatest T20 innings ever played.',
    category: 'Video Analysis',
    author: 'Aakash Chopra',
    publishedAt: '1 day ago',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=375&fit=crop',
    videoDuration: '02:45'
  },
  {
    id: '6',
    title: 'Why Jasprit Bumrah is currently the most complete bowler in world cricket.',
    excerpt: 'From yorkers to slower balls, we analyze the data behind Bumrah\'s dominance across all three formats.',
    category: 'Editor\'s Pick',
    author: 'Sid Monga',
    publishedAt: '2 days ago',
    image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=600&h=375&fit=crop'
  }
];

export const seriesList = [
  {
    id: '1',
    name: 'T20 World Cup 2024',
    status: '24 Matches Remaining',
    active: true
  },
  {
    id: '2',
    name: 'IPL 2024',
    status: 'Playoffs Stage',
    active: true
  },
  {
    id: '3',
    name: 'The Ashes 2024',
    status: '3rd Test, Day 2',
    active: true
  },
  {
    id: '4',
    name: 'Asia Cup Qualifiers',
    status: 'Group Stage',
    active: true
  }
];

export const rankings = {
  odi: [
    { rank: 1, team: 'India', points: 121 },
    { rank: 2, team: 'Australia', points: 118 },
    { rank: 3, team: 'Pakistan', points: 112 },
    { rank: 4, team: 'England', points: 108 },
    { rank: 5, team: 'South Africa', points: 104 }
  ],
  t20: [
    { rank: 1, team: 'Australia', points: 125 },
    { rank: 2, team: 'India', points: 123 },
    { rank: 3, team: 'England', points: 119 },
    { rank: 4, team: 'Pakistan', points: 115 },
    { rank: 5, team: 'West Indies', points: 110 }
  ],
  test: [
    { rank: 1, team: 'India', points: 128 },
    { rank: 2, team: 'Australia', points: 124 },
    { rank: 3, team: 'England', points: 120 },
    { rank: 4, team: 'New Zealand', points: 115 },
    { rank: 5, team: 'Pakistan', points: 110 }
  ]
};
