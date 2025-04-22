import { Player } from '@/types/player';

export type Formation = '4-4-2' | '4-3-3' | '3-5-2' | '4-2-3-1' | '5-3-2';

export interface PlayerWithPosition extends Player {
  isSelected?: boolean;
  positionInFormation?: string;
}

export interface GameSettings {
  formation: Formation;
  tacticalStyle: string;
  defensiveStyle: string;
  offensiveStyle: string;
  selectedPlayers: PlayerWithPosition[];
}

export const formationPositions: Record<Formation, string[]> = {
  '4-4-2': ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'],
  '4-3-3': ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CM', 'CM', 'LW', 'ST', 'RW'],
  '3-5-2': ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CDM', 'CM', 'RM', 'ST', 'ST'],
  '4-2-3-1': ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CDM', 'LM', 'CAM', 'RM', 'ST'],
  '5-3-2': ['GK', 'LB', 'CB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'ST', 'ST'],
};

export const compatiblePositions: Record<string, string[]> = {
  'GK': ['GK'],
  'CB': ['CB', 'CDM'],
  'LB': ['LB', 'LM', 'CB'],
  'RB': ['RB', 'RM', 'CB'],
  'CDM': ['CDM', 'CM'],
  'CM': ['CM', 'CDM', 'CAM'],
  'LM': ['LM', 'LW', 'LB', 'CM'],
  'RM': ['RM', 'RW', 'RB', 'CM'],
  'CAM': ['CAM', 'CM'],
  'LW': ['LW', 'LM', 'ST', 'CF'],
  'RW': ['RW', 'RM', 'ST', 'CF'],
  'ST': ['ST', 'CF', 'LW', 'RW'],
  'CF': ['CF', 'ST', 'CAM']
};