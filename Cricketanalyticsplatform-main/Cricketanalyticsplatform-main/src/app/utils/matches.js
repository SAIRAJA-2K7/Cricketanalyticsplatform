export function normalizeLiveMatch(match) {
  if (!match) return null;

  const fallbackTeams = match.teams || [];
  const apiTeam1 = match.teamInfo?.[0];
  const apiTeam2 = match.teamInfo?.[1];
  const sourceTeam1 = match.team1 || apiTeam1 || {};
  const sourceTeam2 = match.team2 || apiTeam2 || {};

  const team1Name = sourceTeam1.name || fallbackTeams[0] || 'Team 1';
  const team2Name = sourceTeam2.name || fallbackTeams[1] || 'Team 2';
  const team1Short = sourceTeam1.shortName || sourceTeam1.shortname || apiTeam1?.shortname || team1Name.slice(0, 3).toUpperCase();
  const team2Short = sourceTeam2.shortName || sourceTeam2.shortname || apiTeam2?.shortname || team2Name.slice(0, 3).toUpperCase();

  const scoreRows = Array.isArray(match.score) ? match.score : [];
  const score1 =
    scoreRows.find((entry) => entry?.inning?.includes(team1Name)) ||
    scoreRows[0] ||
    {
      r: sourceTeam1.score ? Number.parseInt(sourceTeam1.score.split('/')[0], 10) || 0 : 0,
      w: sourceTeam1.score ? Number.parseInt(sourceTeam1.score.split('/')[1], 10) || 0 : sourceTeam1.wickets || 0,
      o: sourceTeam1.overs || 0,
    };
  const score2 =
    scoreRows.find((entry) => entry?.inning?.includes(team2Name)) ||
    scoreRows[1] ||
    {
      r: sourceTeam2.score ? Number.parseInt(sourceTeam2.score.split('/')[0], 10) || 0 : 0,
      w: sourceTeam2.score ? Number.parseInt(sourceTeam2.score.split('/')[1], 10) || 0 : sourceTeam2.wickets || 0,
      o: sourceTeam2.overs || 0,
    };

  return {
    ...match,
    team1: {
      ...sourceTeam1,
      name: team1Name,
      shortName: team1Short,
      flag: sourceTeam1.flag || sourceTeam1.img || apiTeam1?.img || '',
    },
    team2: {
      ...sourceTeam2,
      name: team2Name,
      shortName: team2Short,
      flag: sourceTeam2.flag || sourceTeam2.img || apiTeam2?.img || '',
    },
    teamInfo: [
      {
        ...apiTeam1,
        ...sourceTeam1,
        name: team1Name,
        shortname: team1Short,
        img: sourceTeam1.flag || sourceTeam1.img || apiTeam1?.img || '',
      },
      {
        ...apiTeam2,
        ...sourceTeam2,
        name: team2Name,
        shortname: team2Short,
        img: sourceTeam2.flag || sourceTeam2.img || apiTeam2?.img || '',
      },
    ],
    score: [score1, score2],
    tossWinner: match.tossWinner || match.tossInfo?.split(' won the toss')[0] || '',
    tossChoice:
      match.tossChoice ||
      (match.tossInfo?.includes('elected to bat')
        ? 'bat'
        : match.tossInfo?.includes('elected to bowl')
          ? 'bowl'
          : ''),
    matchInfo: match.matchInfo || match.status || '',
  };
}

export function getTeamInitials(name) {
  if (!name) return 'TM';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
