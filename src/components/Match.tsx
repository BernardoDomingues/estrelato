import {
  Box,
  Container,
  Grid,
  GridItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { Team } from '../types/team';
import { GameState, useGameSave } from '@/store/recoil';
import { useRouter } from 'next/router';
import { useMatchSimulation } from '@/hooks';
import {
  EventsList,
  MatchHeader,
  MatchStats,
  ScoreBoard,
} from './MatchComponents';
import { GameEvent } from '@/types/game-event';
import { finishMatch } from '@/helpers/match';

export default function Match({ team, opponent }: { team: Team; opponent: Team; }) {
  const router = useRouter();
  const { getNextMatch, updateGameState } = useGameSave();
  const bgColor = useColorModeValue('white', 'gray.800');
  const currentMatch = getNextMatch();

  const handleMatchFinished = (
    gameState: GameState,
    gameEvents: GameEvent[],
    homeScore: number,
    awayScore: number,
    homeTeamId: number,
    awayTeamId: number
  ) => {
    if (currentMatch && gameState) {
      const newGameState = finishMatch(
        gameState,
        currentMatch,
        currentMatch.id,
        gameEvents,
        homeScore,
        awayScore,
        homeTeamId,
        awayTeamId
      );
      updateGameState(newGameState);
      router.push('/dashboard');
    }
  };

  const [
    { gameTime, isSimulating, isGameOver, simulationSpeed, gameEvents, stats },
    { pauseSimulation, resumeSimulation, changeSimulationSpeed, finishMatch: finishSimulation }
  ] = useMatchSimulation(currentMatch?.homeTeam.id === team.id ? team : opponent, currentMatch?.awayTeam.id === team.id ? team : opponent, handleMatchFinished);

  const handleFinishMatch = () => {
    if (currentMatch) {
      finishSimulation();
    }
  };

  if (currentMatch) {
    return (
      <Box minH="100vh" bg="gray.50">
        <MatchHeader
          team={team}
          isSimulating={isSimulating}
          isGameOver={isGameOver}
          simulationSpeed={simulationSpeed}
          onPause={pauseSimulation}
          onResume={resumeSimulation}
          onSpeedChange={changeSimulationSpeed}
          onFinish={handleFinishMatch}
        />

        <Container maxW="container.xl" py={8}>
          <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            <GridItem colSpan={{ base: 12, md: 12 }}>
              <ScoreBoard
                homeTeam={currentMatch.homeTeam}
                awayTeam={currentMatch.awayTeam}
                homeScore={stats.score.home}
                awayScore={stats.score.away}
                gameTime={gameTime}
                bgColor={bgColor}
              />
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 8 }}>
              <EventsList
                events={gameEvents}
                bgColor={bgColor}
              />
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 4 }}>
              <MatchStats
                possession={stats.possession}
                shots={stats.shots}
                shotsOnTarget={stats.shotsOnTarget}
                corners={stats.corners}
                fouls={stats.fouls}
                bgColor={bgColor}
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    );
  }
}