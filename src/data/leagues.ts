import { League, Fixture } from "@/types/league";
import { teams } from "./teams";
import dayjs from "dayjs";

function generateFixtures(teams: any[], startDate: Date): Fixture[] {
  if (teams.length % 2 !== 0) {
    throw new Error("O número de times deve ser par para gerar as partidas.");
  }

  const fixtures: Fixture[] = [];
  let fixtureId = 1;
  let date = startDate;

  const numTeams = teams.length;
  let rotation = [...teams];

  const totalRounds = numTeams - 1;
  for (let round = 0; round < totalRounds; round++) {
    for (let i = 0; i < numTeams / 2; i++) {
      const homeTeam = rotation[i];
      const awayTeam = rotation[numTeams - 1 - i];

      fixtures.push({
        id: fixtureId++,
        matchday: round + 1,
        homeTeam,
        awayTeam,
        date,
        played: false
      });
    }

    date = dayjs(date).add(7, 'day').toDate();
    const fixed = rotation[0];
    const rotated = [fixed, ...rotation.slice(1).slice(-1), ...rotation.slice(1, -1)];
    rotation = rotated;
  }

  const firstTurnFixtures = [...fixtures];
  for (const fixture of firstTurnFixtures) {
    fixtures.push({
      id: fixtureId++,
      matchday: fixture.matchday + totalRounds,
      homeTeam: fixture.awayTeam,
      awayTeam: fixture.homeTeam,
      date,
      played: false
    });

    date = dayjs(date).add(7, 'day').toDate();
  }

  return fixtures;
}

function initializeStandings(teams: any[]) {
  return teams.map(team => ({
    team,
    position: 0,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: []
  }));
}

export const leagues: Array<League> = [{
  id: 1,
  name: "Brasileirão",
  country: "Brazil",
  teams: [...teams],
  season: "2025",
  startDate: new Date("2025-04-15"),
  currentMatchday: 1,
  totalMatchdays: (teams.length - 1) * 2,
  standings: initializeStandings(teams),
  fixtures: generateFixtures(teams, new Date("2025-04-15"))
}];