import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import NextMatch from '@/components/NextMatch';
import { useGameSave } from '@/store/recoil/useGameSave';
import { cloneDeep } from 'lodash';
import {
  LoadingScreen,
  TeamNotFoundScreen,
  TeamHeader,
  SquadTable,
  StandingsTable,
  FinancesCard,
  PreGameButton
} from '@/components/Dashboard';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { gameState, loadGame, hasSavedGame, getLeagueData } = useGameSave();
  const { managerName, team } = gameState;
  const league = getLeagueData();

  const standings = useMemo(() => {
    return cloneDeep(league).standings
      .sort((a, b) => b.points - a.points)
      .slice(0, 4)
  }, [league]);

  useEffect(() => {
    if (!hasSavedGame()) {
      router.replace('/');
      return;
    }

    const success = loadGame();
    if (!success) {
      router.replace('/');
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!team) {
    return <TeamNotFoundScreen />;
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <TeamHeader 
        team={team} 
        managerName={managerName} 
        gameState={gameState} 
      />

      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={{ base: 12, md: 8 }}>
            <NextMatch team={team}>
              <PreGameButton />
            </NextMatch>

            <SquadTable team={team} />
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 4 }}>
            <StandingsTable 
              standings={standings} 
              currentTeam={team} 
            />

            <FinancesCard finances={gameState.finances} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}