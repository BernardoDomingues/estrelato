import { useRecoilState } from 'recoil';
import { gameStateAtom, GameState } from './atoms';
import { teams } from '@/data/teams';
import { Team } from '@/types/team';

const GAME_SAVE_KEY = 'estrelato_game_save';

export const useGameSave = () => {
  const [gameState, setGameState] = useRecoilState(gameStateAtom);

  const saveGame = () => {
    try {
      localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(gameState));
      return true;
    } catch (error) {
      console.error('Erro ao salvar o jogo:', error);
      return false;
    }
  };

  const loadGame = (): boolean => {
    try {
      const savedGame = localStorage.getItem(GAME_SAVE_KEY);
      if (savedGame) {
        const parsedState = JSON.parse(savedGame) as GameState;
        setGameState(parsedState);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao carregar o jogo:', error);
      return false;
    }
  };

  const startNewGame = (managerName: string, teamId: number): boolean => {
    try {
      const selectedTeam = teams.find(t => t.id === teamId);
      
      if (!selectedTeam) {
        throw new Error('Time não encontrado');
      }

      const newGameState: GameState = {
        managerName,
        teamId,
        team: selectedTeam,
        gameDate: new Date(),
        finances: {
          transferBudget: selectedTeam.finances.transferBudget,
          weeklyWages: 0,
          balance: 0,
        },
      };

      setGameState(newGameState);
      localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(newGameState))
      return true;
    } catch (error) {
      console.error('Erro ao iniciar novo jogo:', error);
      return false;
    }
  };

  const hasSavedGame = (): boolean => {
    return localStorage.getItem(GAME_SAVE_KEY) !== null;
  };

  const getManagerName = (): string => {
    return gameState.managerName;
  };

  const getSelectedTeam = (): { id: number | null, team: Team | null } => {
    return { id: gameState.teamId, team: gameState.team };
  };

  const updateGameState = (newState: Partial<GameState>): void => {
    setGameState(currentState => ({
      ...currentState,
      ...newState,
    }));
    saveGame();
  };

  const resetGame = (): void => {
    localStorage.removeItem(GAME_SAVE_KEY);
  };

  return {
    gameState,
    saveGame,
    loadGame,
    startNewGame,
    hasSavedGame,
    getManagerName,
    getSelectedTeam,
    updateGameState,
    resetGame,
  };
};