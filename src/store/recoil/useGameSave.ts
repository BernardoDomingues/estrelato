import { useRecoilState } from 'recoil';
import { gameStateAtom, GameState } from './atoms';
import { teams } from '@/data/teams';
import { Team } from '@/types/team';
import { leagues } from '@/data/leagues';
import { Fixture, League } from '@/types/league';
import { GameEvent } from '@/types/game-event';
import { cloneDeep } from 'lodash';

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
        league: leagues[0],
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

  const getLeagueData = (): League => {
    return gameState.league;
  }

  const getNextMatch = (): Fixture | null => {
    return getLeagueData().fixtures.find(fixture => !fixture.played && (fixture.homeTeam.id === gameState.team?.id || fixture.awayTeam.id === gameState.team?.id)) ?? null;
  }

  const getNextRival = (): Team | null => {
    const nextMatch = getNextMatch();
    return nextMatch ? (nextMatch.homeTeam.id === gameState.team?.id ? nextMatch.awayTeam : nextMatch.homeTeam) : null;
  }

  const finishMatch = (
    fixtureId: number,
    events: GameEvent[],
    homeGoals: number,
    awayGoals: number,
    homeTeamId: number,
    awayTeamId: number
  ): void => {
    const cloneGameState = cloneDeep(gameState);

    const findIndex = cloneGameState.league.fixtures.findIndex((fixture) => fixture.id === fixtureId);
    cloneGameState.league.fixtures[findIndex].result = { events, homeGoals, awayGoals};
    cloneGameState.league.fixtures[findIndex].played = true;

    const homeStandingIndex = cloneGameState.league.standings.findIndex((standing) => standing.team.id === homeTeamId);
    const awayStandingIndex = cloneGameState.league.standings.findIndex((standing) => standing.team.id === awayTeamId);
    
    // Update matches played for both teams
    cloneGameState.league.standings[homeStandingIndex].played++;
    cloneGameState.league.standings[awayStandingIndex].played++;
    
    // Update goals for and against
    cloneGameState.league.standings[homeStandingIndex].goalsFor += homeGoals;
    cloneGameState.league.standings[homeStandingIndex].goalsAgainst += awayGoals;
    cloneGameState.league.standings[awayStandingIndex].goalsFor += awayGoals;
    cloneGameState.league.standings[awayStandingIndex].goalsAgainst += homeGoals;
    
    // Update goal difference
    cloneGameState.league.standings[homeStandingIndex].goalDifference = 
      cloneGameState.league.standings[homeStandingIndex].goalsFor - 
      cloneGameState.league.standings[homeStandingIndex].goalsAgainst;
    
    cloneGameState.league.standings[awayStandingIndex].goalDifference = 
      cloneGameState.league.standings[awayStandingIndex].goalsFor - 
      cloneGameState.league.standings[awayStandingIndex].goalsAgainst;
    
    // Update wins, draws, losses and points
    if (homeGoals > awayGoals) {
      // Home team wins
      cloneGameState.league.standings[homeStandingIndex].won++;
      cloneGameState.league.standings[homeStandingIndex].points += 3;
      cloneGameState.league.standings[homeStandingIndex].form.push('W');
      cloneGameState.league.standings[awayStandingIndex].lost++;
      cloneGameState.league.standings[awayStandingIndex].form.push('L');
    } else if (homeGoals < awayGoals) {
      // Away team wins
      cloneGameState.league.standings[awayStandingIndex].won++;
      cloneGameState.league.standings[awayStandingIndex].points += 3;
      cloneGameState.league.standings[awayStandingIndex].form.push('W');
      cloneGameState.league.standings[homeStandingIndex].lost++;
      cloneGameState.league.standings[homeStandingIndex].form.push('L');
    } else {
      // Draw
      cloneGameState.league.standings[homeStandingIndex].drawn++;
      cloneGameState.league.standings[homeStandingIndex].points += 1;
      cloneGameState.league.standings[homeStandingIndex].form.push('D');
      cloneGameState.league.standings[awayStandingIndex].drawn++;
      cloneGameState.league.standings[awayStandingIndex].points += 1;
      cloneGameState.league.standings[awayStandingIndex].form.push('D');
    }
    const updatedGameState = simulateOtherMatches(cloneGameState)
    setGameState(updatedGameState);
    localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(updatedGameState));
  }

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

  const simulateOtherMatches = (updatedGameState: GameState): GameState => {
    const cloneGameState = cloneDeep(updatedGameState);

    const unplayedFixtures = cloneGameState.league.fixtures.filter(fixture => {
      const nextMatch = getNextMatch();
      if (!nextMatch) return false;
      
      return !fixture.played && fixture.matchday === nextMatch.matchday && fixture.id !== nextMatch.id;
    });

    unplayedFixtures.forEach((fixture, index) => {
      // Calcula a força relativa dos times com base na classificação ou força do time
      const homeTeamStanding = cloneGameState.league.standings.find(s => s.team.id === fixture.homeTeam.id);
      const awayTeamStanding = cloneGameState.league.standings.find(s => s.team.id === fixture.awayTeam.id);
      
      if (!homeTeamStanding || !awayTeamStanding) return;
      
      // Fator de vantagem para o time da casa
      const homeAdvantage = 0.2;
      
      // Calcula a força relativa dos times (usando pontos + fator de casa)
      const homeStrength = homeTeamStanding.points + homeAdvantage;
      const awayStrength = awayTeamStanding.points;
      
      // Calcula a probabilidade de gols com base na força dos times
      // Times mais fortes têm maior probabilidade de marcar mais gols
      const homeExpectedGoals = 1 + (homeStrength / 20);
      const awayExpectedGoals = 0.7 + (awayStrength / 25);
      
      // Gera resultados aleatórios com base nas probabilidades
      const homeGoals = Math.max(0, Math.round(homeExpectedGoals * Math.random() * 2));
      const awayGoals = Math.max(0, Math.round(awayExpectedGoals * Math.random() * 2));
      
      // Atualiza a partida como jogada
      const fixtureIndex = cloneGameState.league.fixtures.findIndex(f => f.id === fixture.id);
      cloneGameState.league.fixtures[fixtureIndex].played = true;
      cloneGameState.league.fixtures[fixtureIndex].result = { 
        events: [], // Sem eventos simulados
        homeGoals, 
        awayGoals 
      };
      
      // Atualiza a tabela de classificação
      const homeStandingIndex = cloneGameState.league.standings.findIndex(s => s.team.id === fixture.homeTeam.id);
      const awayStandingIndex = cloneGameState.league.standings.findIndex(s => s.team.id === fixture.awayTeam.id);
      
      // Atualiza jogos disputados
      cloneGameState.league.standings[homeStandingIndex].played++;
      cloneGameState.league.standings[awayStandingIndex].played++;
      
      // Atualiza gols marcados e sofridos
      cloneGameState.league.standings[homeStandingIndex].goalsFor += homeGoals;
      cloneGameState.league.standings[homeStandingIndex].goalsAgainst += awayGoals;
      cloneGameState.league.standings[awayStandingIndex].goalsFor += awayGoals;
      cloneGameState.league.standings[awayStandingIndex].goalsAgainst += homeGoals;
      
      // Atualiza saldo de gols
      cloneGameState.league.standings[homeStandingIndex].goalDifference = 
        cloneGameState.league.standings[homeStandingIndex].goalsFor - 
        cloneGameState.league.standings[homeStandingIndex].goalsAgainst;
      
      cloneGameState.league.standings[awayStandingIndex].goalDifference = 
        cloneGameState.league.standings[awayStandingIndex].goalsFor - 
        cloneGameState.league.standings[awayStandingIndex].goalsAgainst;
      
      // Atualiza vitórias, empates, derrotas e pontos
      if (homeGoals > awayGoals) {
        // Vitória do time da casa
        cloneGameState.league.standings[homeStandingIndex].won++;
        cloneGameState.league.standings[homeStandingIndex].points += 3;
        cloneGameState.league.standings[homeStandingIndex].form.push('W');
        cloneGameState.league.standings[awayStandingIndex].lost++;
        cloneGameState.league.standings[awayStandingIndex].form.push('L');
      } else if (homeGoals < awayGoals) {
        // Vitória do time visitante
        cloneGameState.league.standings[awayStandingIndex].won++;
        cloneGameState.league.standings[awayStandingIndex].points += 3;
        cloneGameState.league.standings[awayStandingIndex].form.push('W');
        cloneGameState.league.standings[homeStandingIndex].lost++;
        cloneGameState.league.standings[homeStandingIndex].form.push('L');
      } else {
        // Empate
        cloneGameState.league.standings[homeStandingIndex].drawn++;
        cloneGameState.league.standings[homeStandingIndex].points += 1;
        cloneGameState.league.standings[homeStandingIndex].form.push('D');
        cloneGameState.league.standings[awayStandingIndex].drawn++;
        cloneGameState.league.standings[awayStandingIndex].points += 1;
        cloneGameState.league.standings[awayStandingIndex].form.push('D');
      }
    });
    
    return cloneGameState;
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
    getLeagueData,
    getNextMatch,
    getNextRival,
    finishMatch,
  };
};