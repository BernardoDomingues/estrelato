import { useState, useEffect } from 'react';
import { Team } from '../types/team';
import { GameEvent, GameEventType } from '@/types/game-event';

type MatchStats = {
  score: { home: number; away: number };
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
};

type SimulationState = {
  gameTime: number;
  isSimulating: boolean;
  isGameOver: boolean;
  simulationSpeed: number;
  gameEvents: GameEvent[];
  stats: MatchStats;
};

type SimulationActions = {
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  changeSimulationSpeed: () => void;
  finishMatch: () => void;
};

export const useMatchSimulation = (
  team: Team,
  opponent: Team,
  onMatchFinished?: (events: GameEvent[], homeScore: number, awayScore: number, homeTeamId: number, awayTeamId: number) => void
): [SimulationState, SimulationActions] => {
  const [gameTime, setGameTime] = useState(0); // 0-90 minutos
  const [isSimulating, setIsSimulating] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(2); // 1x, 2x, 4x
  
  const [stats, setStats] = useState<MatchStats>({
    score: { home: 0, away: 0 },
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
  });

  const [gameEvents, setGameEvents] = useState<GameEvent[]>([{
    type: 'possession',
    minute: 0,
    side: 'home',
    team,
    playerName: '',
    description: 'A partida Começou!'
  }]);

  useEffect(() => {
    if (!isSimulating || isGameOver) return;

    const interval = setInterval(() => {
      setGameTime(prevTime => {
        const newTime = prevTime + 1;

        if (newTime >= 90) {
          setIsSimulating(false);
          setIsGameOver(true);
          clearInterval(interval);

          setGameEvents(prev => [
            {
              type: 'possession',
              minute: 90,
              side: 'home',
              team,
              playerName: '',
              description: 'Fim de jogo!'
            },
            ...prev
          ]);

          return 90;
        }

        if (Math.random() < 0.1) {
          generateRandomEvent(newTime);
        }

        return newTime;
      });
    }, 1000 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isSimulating, isGameOver, simulationSpeed]);

  const generateRandomEvent = (minute: number) => {
    const isHomeTeam = Math.random() > 0.5;
    const currentTeam = isHomeTeam ? team : opponent;
    const teamSide = isHomeTeam ? 'home' : 'away';

    const randomPlayerIndex = Math.floor(Math.random() * currentTeam.players.length);
    const player = currentTeam.players[randomPlayerIndex];

    const eventTypes: GameEventType[] = ['goal', 'yellowCard', 'chance', 'possession', 'corner'];
    const weights = [0.1, 0.15, 0.4, 0.25, 0.1];

    let randomValue = Math.random();
    let cumulativeWeight = 0;
    let selectedEventType: GameEventType = 'chance';

    for (let i = 0; i < eventTypes.length; i++) {
      cumulativeWeight += weights[i];
      if (randomValue <= cumulativeWeight) {
        selectedEventType = eventTypes[i];
        break;
      }
    }

    let newEvent: GameEvent = {
      type: selectedEventType,
      minute,
      side: teamSide,
      team: currentTeam,
      playerName: player.name,
      description: ''
    };

    switch (selectedEventType) {
      case 'goal':
        newEvent.description = `${player.name} marca para o ${currentTeam.name}!`;
        setStats(prev => ({
          ...prev,
          score: {
            ...prev.score,
            [teamSide]: prev.score[teamSide] + 1
          },
          shotsOnTarget: {
            ...prev.shotsOnTarget,
            [teamSide]: prev.shotsOnTarget[teamSide] + 1
          },
          shots: {
            ...prev.shots,
            [teamSide]: prev.shots[teamSide] + 1
          }
        }));
        break;

      case 'yellowCard':
        newEvent.description = `Cartão amarelo para ${player.name} do ${currentTeam.name}.`;
        setStats(prev => ({
          ...prev,
          fouls: {
            ...prev.fouls,
            [teamSide]: prev.fouls[teamSide] + 1
          }
        }));
        break;

      case 'chance':
        newEvent.description = `Chance para ${currentTeam.name}! ${player.name} finaliza, mas a bola vai para fora.`;
        setStats(prev => ({
          ...prev,
          shots: {
            ...prev.shots,
            [teamSide]: prev.shots[teamSide] + 1
          }
        }));
        break;

      case 'possession':
        const possessionChange = Math.floor(Math.random() * 10) + 5; // 5-15%
        setStats(prev => {
          const homeChange = isHomeTeam ? possessionChange : -possessionChange;
          const newHomePossession = Math.max(30, Math.min(70, prev.possession.home + homeChange));
          return {
            ...prev,
            possession: {
              home: newHomePossession,
              away: 100 - newHomePossession
            }
          };
        });
        newEvent.description = `${currentTeam.name} mantém a posse de bola.`;
        break;

      case 'corner':
        newEvent.description = `Escanteio para ${currentTeam.name}.`;
        setStats(prev => ({
          ...prev,
          corners: {
            ...prev.corners,
            [teamSide]: prev.corners[teamSide] + 1
          }
        }));
        break;
    }

    setGameEvents(prev => [newEvent, ...prev]);
  };

  const pauseSimulation = () => {
    setIsSimulating(false);
  };

  const resumeSimulation = () => {
    setIsSimulating(true);
  };

  const changeSimulationSpeed = () => {
    setSimulationSpeed(prev => prev === 1 ? 2 : prev === 2 ? 4 : 1);
  };

  const finishMatch = () => {
    if (onMatchFinished) {
      onMatchFinished(
        gameEvents,
        stats.score.home,
        stats.score.away,
        team.id,
        opponent.id
      );
    }
  };

  return [
    {
      gameTime,
      isSimulating,
      isGameOver,
      simulationSpeed,
      gameEvents,
      stats,
    },
    {
      pauseSimulation,
      resumeSimulation,
      changeSimulationSpeed,
      finishMatch,
    }
  ];
};