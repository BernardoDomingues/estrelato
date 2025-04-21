import { atom } from 'recoil';
import { Team } from '@/types/team';
import { League } from '@/types/league';
import { leagues } from '@/data/leagues';

export interface GameState {
  managerName: string;
  teamId: number | null;
  team: Team | null;
  gameDate: Date;
  finances: {
    transferBudget: number;
    weeklyWages: number;
    balance: number;
  };
  league: League;
}

const initialGameState: GameState = {
  managerName: '',
  teamId: null,
  team: null,
  gameDate: new Date(),
  finances: {
    transferBudget: 0,
    weeklyWages: 0,
    balance: 0,
  },
  league: leagues[0],
};

export const gameStateAtom = atom<GameState>({
  key: 'gameState',
  default: initialGameState,
});