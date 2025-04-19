import { Contract } from "./player";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  founded: Date;
  contracts: Contract[];
  finances: TeamFinances;
  facilities: TeamFacilities;
  reputation: number; // 1-100
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