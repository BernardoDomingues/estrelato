import { GameEvent } from './game-event';
import { Team } from './team';

export interface League {
  id: number;
  name: string;
  country: string;
  teams: Team[];
  season: string;
  startDate: Date;
  currentMatchday: number;
  totalMatchdays: number;
  standings: LeagueStanding[];
  fixtures: Fixture[];
}

export interface LeagueStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

export interface Fixture {
  id: number;
  matchday: number;
  homeTeam: Team;
  awayTeam: Team;
  date: Date;
  played: boolean;
  result?: {
    homeGoals: number;
    awayGoals: number;
    events: GameEvent[];
  };
}