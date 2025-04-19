import { Team } from './team';

export interface League {
  id: string;
  name: string;
  country: string;
  teams: Team[];
}