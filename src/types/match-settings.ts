import { Player } from '@/types/player';

export type Formation = '4-4-2' | '4-3-3' | '3-5-2' | '4-2-3-1' | '5-3-2';

export interface PlayerWithPosition extends Player {
  isSelected?: boolean;
  positionInFormation?: string;
}

export interface MatchSettings {
  formation: Formation;
  tacticalStyle: string;
  defensiveStyle: string;
  offensiveStyle: string;
  selectedPlayers: PlayerWithPosition[];
}