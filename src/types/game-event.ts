import { Team } from "./team";

export type GameEventType = 'goal' | 'yellowCard' | 'redCard' | 'substitution' | 'chance' | 'injury' | 'possession' | 'corner';

export interface GameEvent {
  type: GameEventType;
  minute: number;
  side: 'home' | 'away';
  team: Team;
  playerName: string;
  description: string;
}