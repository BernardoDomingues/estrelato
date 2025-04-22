import {
  Box,
  Container,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { League } from '@/types/league';
import { useGameSave } from '@/store/recoil';
import { cloneDeep } from 'lodash';
import { LoadingScreen } from '@/components/Dashboard';
import {
  LeagueNotFoundScreen,
  LeagueHeader,
  StandingsTable,
  FixturesTable,
} from '@/components/LeagueTable';

export default function LeagueTable() {
  const [league, setLeague] = useState<League | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { hasSavedGame, gameState, getLeagueData } = useGameSave();
  const { team } = gameState;
  
  const router = useRouter();

  useEffect(() => {
    if (!hasSavedGame()) {
      router.replace('/');
      return;
    }
  
    const brasileirao = cloneDeep(getLeagueData());
    if (brasileirao) {
      const sortedStandings = [...brasileirao.standings].sort((a, b) => {
        if (a.points !== b.points) {
          return b.points - a.points;
        } else if (a.goalDifference !== b.goalDifference) {
          return b.goalDifference - a.goalDifference;
        } else {
          return b.goalsFor - a.goalsFor;
        }
      });
      
      setLeague({
        ...brasileirao,
        standings: sortedStandings
      });
    }
    
    setIsLoading(false);
  }, [router]);

  const getNextFixtures = () => {
    if (!league) return [];
    
    return league.fixtures
      .filter(fixture => !fixture.played)
      .sort((a, b) => a.matchday - b.matchday);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!league) {
    return <LeagueNotFoundScreen />;
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <LeagueHeader 
        leagueName={league.name} 
        season={league.season} 
      />

      <Container maxW="container.xl" py={8}>
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Classificação</Tab>
            <Tab>Próximos Jogos</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <StandingsTable 
                standings={league.standings} 
                currentTeam={team} 
              />
            </TabPanel>

            <TabPanel>
              <FixturesTable fixtures={getNextFixtures()} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}