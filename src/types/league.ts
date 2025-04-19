import { Team } from './team';

export interface League {
  id: number;
  name: string;
  country: string;
  teams: Team[];
}