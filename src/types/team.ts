import { Player } from "./player";

export interface Team {
  id: number;
  name: string;
  shortName: string;
  city: string;
  country: string;
  founded: Date;
  players: Player[];
  finances: TeamFinances;
  facilities: TeamFacilities;
  colors: {
    primary: string;
    secondary: string;
  };
}

export interface TeamFinances {
  transferBudget: number;
  wageBudget: number;
}

export interface TeamFacilities {
  stadium: {
    name: string;
    capacity: number;
    condition: number; // 1-100
  };
}