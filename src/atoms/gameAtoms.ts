import { atom } from 'recoil';
import { MatchSettings } from '@/types/match-settings';

export const gameSettingsState = atom<MatchSettings>({
  key: 'gameSettingsState',
  default: {
    formation: '4-3-3',
    tacticalStyle: 'balanced',
    defensiveStyle: 'balanced',
    offensiveStyle: 'balanced',
    selectedPlayers: [],
  },
});

export const matchTeamsState = atom<{
  teamId: number | null;
  opponentId: number | null;
}>({
  key: 'matchTeamsState',
  default: {
    teamId: null,
    opponentId: null,
  },
});