import { atom } from 'recoil';
import { Team } from '@/types/team';

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
};

export const gameStateAtom = atom<GameState>({
  key: 'gameState',
  default: initialGameState,
});