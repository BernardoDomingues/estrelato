import {
  Box,
  Container,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Badge,
  Button,
  Flex,
  IconButton,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { League, Fixture } from '@/types/league';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useGameSave } from '@/store/recoil';
import { cloneDeep } from 'lodash';

export default function LeagueTable() {
  const [league, setLeague] = useState<League | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { hasSavedGame, gameState, getLeagueData } = useGameSave();
  const { team } = gameState;
  
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const highlightColor = useColorModeValue('blue.50', 'blue.900');

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

  const getFormBadge = (result: string) => {
    switch (result) {
      case 'W':
        return <Badge colorScheme="green" mx="1">V</Badge>;
      case 'D':
        return <Badge colorScheme="yellow" mx="1">E</Badge>;
      case 'L':
        return <Badge colorScheme="red" mx="1">D</Badge>;
      default:
        return null;
    }
  };

  const getNextFixtures = () => {
    if (!league) return [];
    
    return league.fixtures
      .filter(fixture => !fixture.played)
      .sort((a, b) => a.matchday - b.matchday);
  };

  const formatMatchResult = (fixture: Fixture) => {
    if (!fixture.played || !fixture.result) {
      return 'vs';
    }
    return `${fixture.result.homeGoals} - ${fixture.result.awayGoals}`;
  };

  if (isLoading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Text>Carregando...</Text>
      </Flex>
    );
  }

  if (!league) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Text>Liga não encontrada. <Button onClick={() => router.push('/')}>Voltar</Button></Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="blue.600" color="white" py={4} px={8} boxShadow="md">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <IconButton
                aria-label="Voltar"
                icon={<ArrowBackIcon />}
                onClick={() => router.push('/dashboard')}
                variant="outline"
                colorScheme="whiteAlpha"
              />
              <Heading size="md">{league.name} - {league.season}</Heading>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Classificação</Tab>
            <Tab>Próximos Jogos</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
                <Heading size="md" mb={4}>Tabela de Classificação</Heading>
                
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th width="50px">Pos</Th>
                      <Th>Clube</Th>
                      <Th isNumeric>P</Th>
                      <Th isNumeric>J</Th>
                      <Th isNumeric>V</Th>
                      <Th isNumeric>E</Th>
                      <Th isNumeric>D</Th>
                      <Th isNumeric>GP</Th>
                      <Th isNumeric>GC</Th>
                      <Th isNumeric>SG</Th>
                      <Th>Últimos 5</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {league.standings.map((standing, index) => (
                      <Tr 
                        key={standing.team.id}
                        bg={standing.team.id === team?.id ? highlightColor : 'transparent'}
                        fontWeight={standing.team.id === team?.id ? "bold" : "normal"}
                      >
                        <Td>{index + 1}</Td>
                        <Td>
                          <HStack>
                            <Box 
                              w="3px" 
                              h="20px" 
                              bg={standing.team.colors.primary} 
                              borderRadius="full"
                            />
                            <Text>{standing.team.name}</Text>
                          </HStack>
                        </Td>
                        <Td isNumeric>{standing.points}</Td>
                        <Td isNumeric>{standing.played}</Td>
                        <Td isNumeric>{standing.won}</Td>
                        <Td isNumeric>{standing.drawn}</Td>
                        <Td isNumeric>{standing.lost}</Td>
                        <Td isNumeric>{standing.goalsFor}</Td>
                        <Td isNumeric>{standing.goalsAgainst}</Td>
                        <Td isNumeric>{standing.goalDifference}</Td>
                        <Td>
                          <HStack>
                            {standing.form.map((result, index) => (
                              <Box key={index}>
                                {getFormBadge(result)}
                              </Box>
                            ))}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>

            <TabPanel>
              <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
                <Heading size="md" mb={4}>Próximos Jogos</Heading>
                
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Rodada</Th>
                      <Th>Mandante</Th>
                      <Th textAlign="center">Resultado</Th>
                      <Th>Visitante</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {getNextFixtures().map((fixture) => (
                      <Tr key={fixture.id}>
                        <Td>{fixture.matchday}</Td>
                        <Td>
                          <HStack>
                            <Box 
                              w="3px" 
                              h="20px" 
                              bg={fixture.homeTeam.colors.primary} 
                              borderRadius="full"
                            />
                            <Text>{fixture.homeTeam.name}</Text>
                          </HStack>
                        </Td>
                        <Td textAlign="center">
                          {formatMatchResult(fixture)}
                        </Td>
                        <Td>
                          <HStack>
                            <Box 
                              w="3px" 
                              h="20px" 
                              bg={fixture.awayTeam.colors.primary} 
                              borderRadius="full"
                            />
                            <Text>{fixture.awayTeam.name}</Text>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}