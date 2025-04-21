import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Flex,
  Avatar,
  HStack,
  VStack,
  Button,
  Select,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Player } from '../types/player';
import dayjs from 'dayjs';
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import FootballField from '@/components/FootballField';
import NextMatch from '@/components/NextMatch';
import { Team } from '@/types/team';

type Formation = '4-4-2' | '4-3-3' | '3-5-2' | '4-2-3-1' | '5-3-2';

interface PlayerWithPosition extends Player {
  isSelected?: boolean;
  positionInFormation?: string;
}

const formationPositions: Record<Formation, string[]> = {
  '4-4-2': ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'],
  '4-3-3': ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CM', 'CM', 'LW', 'ST', 'RW'],
  '3-5-2': ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CDM', 'CM', 'RM', 'ST', 'ST'],
  '4-2-3-1': ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CDM', 'LM', 'CAM', 'RM', 'ST'],
  '5-3-2': ['GK', 'LB', 'CB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'ST', 'ST'],
};


const compatiblePositions: Record<string, string[]> = {
  'GK': ['GK'],
  'CB': ['CB', 'CDM'],
  'LB': ['LB', 'LM', 'CB'],
  'RB': ['RB', 'RM', 'CB'],
  'CDM': ['CDM', 'CM'],
  'CM': ['CM', 'CDM', 'CAM'],
  'LM': ['LM', 'LW', 'LB', 'CM'],
  'RM': ['RM', 'RW', 'RB', 'CM'],
  'CAM': ['CAM', 'CM'],
  'LW': ['LW', 'LM', 'ST', 'CF'],
  'RW': ['RW', 'RM', 'ST', 'CF'],
  'ST': ['ST', 'CF', 'LW', 'RW'],
  'CF': ['CF', 'ST', 'CAM']
};

export default function PreGameSecton({ team, opponent }: { team: Team, opponent: Team }) {
  const [isLoading, setIsLoading] = useState(true);
  const [formation, setFormation] = useState<Formation>('4-3-3');
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerWithPosition[]>([]);
  const [benchPlayers, setBenchPlayers] = useState<PlayerWithPosition[]>([]);
  const [tacticalStyle, setTacticalStyle] = useState('balanced');
  const [defensiveStyle, setDefensiveStyle] = useState('balanced');
  const [offensiveStyle, setOffensiveStyle] = useState('balanced');
  const [selectedBench, setSelectedBench] = useState<Player | null>(null);

  const router = useRouter();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    const playersWithPosition = team.players.map(player => ({
      ...player,
      isSelected: false,
      positionInFormation: '',
    }));

    const sortedPlayers = [...playersWithPosition].sort((a, b) => {
      if (a.position !== b.position) {
        const positionOrder: Record<string, number> = {
          'GK': 1,
          'CB': 2, 'LB': 3, 'RB': 4,
          'CDM': 5, 'CM': 6, 'LM': 7, 'RM': 8, 'CAM': 9,
          'LW': 10, 'RW': 11, 'ST': 12, 'CF': 13
        };
        return positionOrder[a.position] - positionOrder[b.position];
      }
      return b.overall - a.overall;
    });

    const positions = formationPositions[formation];
    const selected: PlayerWithPosition[] = [];
    const remaining: PlayerWithPosition[] = [];

    positions.forEach(positionNeeded => {
      const playerIndex = sortedPlayers.findIndex(
        p => !p.isSelected && p.position === positionNeeded
      );

      if (playerIndex !== -1) {
        const player = { ...sortedPlayers[playerIndex] };
        player.isSelected = true;
        player.positionInFormation = positionNeeded;
        selected.push(player);
        sortedPlayers[playerIndex] = player;
      } else {
        const compatibleIndex = sortedPlayers.findIndex(
          p => !p.isSelected && compatiblePositions[positionNeeded]?.includes(p.position)
        );

        if (compatibleIndex !== -1) {
          const player = { ...sortedPlayers[compatibleIndex] };
          player.isSelected = true;
          player.positionInFormation = positionNeeded;
          selected.push(player);
          sortedPlayers[compatibleIndex] = player;
        }
      }
    });

    sortedPlayers.forEach(player => {
      if (!player.isSelected) {
        remaining.push(player);
      }
    });

    setSelectedPlayers(selected);
    setBenchPlayers(remaining);

    setIsLoading(false);
  }, [router, formation]);

  const handleFormationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormation(e.target.value as Formation);
  };

  const handleTacticalStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTacticalStyle(e.target.value);
  };

  const handleDefensiveStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDefensiveStyle(e.target.value);
  };

  const handleOffensiveStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOffensiveStyle(e.target.value);
  };

  const swapPlayers = (starter: PlayerWithPosition, bench: PlayerWithPosition) => {
    const positionInFormation = starter.positionInFormation || '';

    if (!compatiblePositions[positionInFormation]?.includes(bench.position)) {
      toast({
        title: 'Posição incompatível',
        description: `${bench.name} não pode jogar como ${positionInFormation}`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newBench = { ...starter };
    newBench.isSelected = false;
    newBench.positionInFormation = '';

    const newStarter = { ...bench };
    newStarter.isSelected = true;
    newStarter.positionInFormation = positionInFormation;

    const updatedStarters = selectedPlayers.map(p =>
      p.id === starter.id ? newStarter : p
    );

    const updatedBench = benchPlayers.map(p =>
      p.id === bench.id ? newBench : p
    );

    setSelectedPlayers(updatedStarters);
    setBenchPlayers(updatedBench);
  };

  const startMatch = () => {
    toast({
      title: 'Partida iniciada!',
      description: 'Iniciando a simulação da partida...',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    localStorage.setItem('formation', formation);
    localStorage.setItem('tacticalStyle', tacticalStyle);
    localStorage.setItem('defensiveStyle', defensiveStyle);
    localStorage.setItem('offensiveStyle', offensiveStyle);
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));

    setTimeout(() => {
      router.push('/match-simulation');
    }, 1000);
  };

  if (isLoading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Text>Carregando...</Text>
      </Flex>
    );
  }

  if (!team || !opponent) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Text>Time não encontrado. <Button onClick={() => router.push('/')}>Voltar</Button></Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg={team.colors.primary} color="white" py={4} px={8} boxShadow="md">
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
              <Heading size="md">Preparação para a Partida</Heading>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={{ base: 12, md: 12 }}>
            <NextMatch team={team}>
              <Button
                rightIcon={<CheckIcon />}
                colorScheme="green"
                variant="solid"
                onClick={startMatch}
              >
                Iniciar Partida
              </Button>
            </NextMatch>
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
              <Heading size="md" mb={4}>Configurações Táticas</Heading>

              <VStack spacing={4} align="stretch">
                <Box>
                  <Text mb={2}>Formação</Text>
                  <Select value={formation} onChange={handleFormationChange}>
                    <option value="4-3-3">4-3-3</option>
                    <option value="4-4-2">4-4-2</option>
                    <option value="3-5-2">3-5-2</option>
                    <option value="4-2-3-1">4-2-3-1</option>
                    <option value="5-3-2">5-3-2</option>
                  </Select>
                </Box>

                <Box>
                  <Text mb={2}>Estilo de Jogo</Text>
                  <Select value={tacticalStyle} onChange={handleTacticalStyleChange}>
                    <option value="possession">Posse de Bola</option>
                    <option value="counter">Contra-Ataque</option>
                    <option value="balanced">Equilibrado</option>
                    <option value="direct">Jogo Direto</option>
                  </Select>
                </Box>

                <Box>
                  <Text mb={2}>Estilo Defensivo</Text>
                  <Select value={defensiveStyle} onChange={handleDefensiveStyleChange}>
                    <option value="high-press">Pressão Alta</option>
                    <option value="balanced">Equilibrado</option>
                    <option value="defensive">Defensivo</option>
                    <option value="park-the-bus">Retrancado</option>
                  </Select>
                </Box>

                <Box>
                  <Text mb={2}>Estilo Ofensivo</Text>
                  <Select value={offensiveStyle} onChange={handleOffensiveStyleChange}>
                    <option value="attacking">Ofensivo</option>
                    <option value="balanced">Equilibrado</option>
                    <option value="creative">Criativo</option>
                    <option value="cautious">Cauteloso</option>
                  </Select>
                </Box>
              </VStack>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 8 }}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
              <Heading size="md" mb={4}>Escalação: {formation}</Heading>

              <Box
                borderRadius="md"
                p={4}
                height="400px"
                position="relative"
              >
                <FootballField>
                  {selectedPlayers.map((player, index) => {
                    const positions: Record<Formation, Record<number, { top: string, left: string }>> = {
                      '4-3-3': {
                        0: { top: '85%', left: '50%' }, // GK
                        1: { top: '65%', left: '20%' }, // LB
                        2: { top: '65%', left: '35%' }, // CB
                        3: { top: '65%', left: '65%' }, // CB
                        4: { top: '65%', left: '80%' }, // RB
                        5: { top: '45%', left: '50%' }, // CDM
                        6: { top: '45%', left: '30%' }, // CM
                        7: { top: '45%', left: '70%' }, // CM
                        8: { top: '25%', left: '20%' }, // LW
                        9: { top: '15%', left: '50%' }, // ST
                        10: { top: '25%', left: '80%' } // RW
                      },
                      '4-4-2': {
                        0: { top: '85%', left: '50%' }, // GK
                        1: { top: '65%', left: '20%' }, // LB
                        2: { top: '65%', left: '35%' }, // CB
                        3: { top: '65%', left: '65%' }, // CB
                        4: { top: '65%', left: '80%' }, // RB
                        5: { top: '45%', left: '20%' }, // LM
                        6: { top: '45%', left: '35%' }, // CM
                        7: { top: '45%', left: '65%' }, // CM
                        8: { top: '45%', left: '80%' }, // RM
                        9: { top: '15%', left: '35%' }, // ST
                        10: { top: '15%', left: '65%' } // ST
                      },
                      '3-5-2': {
                        0: { top: '85%', left: '50%' }, // GK
                        1: { top: '65%', left: '30%' }, // CB
                        2: { top: '65%', left: '50%' }, // CB
                        3: { top: '65%', left: '70%' }, // CB
                        4: { top: '45%', left: '15%' }, // LM
                        5: { top: '45%', left: '35%' }, // CM
                        6: { top: '45%', left: '50%' }, // CDM
                        7: { top: '45%', left: '65%' }, // CM
                        8: { top: '45%', left: '85%' }, // RM
                        9: { top: '15%', left: '35%' }, // ST
                        10: { top: '15%', left: '65%' } // ST
                      },
                      '4-2-3-1': {
                        0: { top: '85%', left: '50%' }, // GK
                        1: { top: '65%', left: '20%' }, // LB
                        2: { top: '65%', left: '35%' }, // CB
                        3: { top: '65%', left: '65%' }, // CB
                        4: { top: '65%', left: '80%' }, // RB
                        5: { top: '50%', left: '35%' }, // CDM
                        6: { top: '50%', left: '65%' }, // CDM
                        7: { top: '30%', left: '20%' }, // LM
                        8: { top: '30%', left: '50%' }, // CAM
                        9: { top: '30%', left: '80%' }, // RM
                        10: { top: '15%', left: '50%' } // ST
                      },
                      '5-3-2': {
                        0: { top: '85%', left: '50%' }, // GK
                        1: { top: '65%', left: '15%' }, // LB
                        2: { top: '65%', left: '30%' }, // CB
                        3: { top: '65%', left: '50%' }, // CB
                        4: { top: '65%', left: '70%' }, // CB
                        5: { top: '65%', left: '85%' }, // RB
                        6: { top: '45%', left: '30%' }, // CM
                        7: { top: '45%', left: '50%' }, // CM
                        8: { top: '45%', left: '70%' }, // CM
                        9: { top: '15%', left: '35%' }, // ST
                        10: { top: '15%', left: '65%' } // ST
                      }
                    };

                    const position = positions[formation][index];

                    return (
                      <Box
                        key={player.id}
                        position="absolute"
                        top={position.top}
                        left={position.left}
                        transform="translate(-50%, -50%)"
                        textAlign="center"
                      >
                        <Avatar
                          size="sm"
                          name={player.name}
                          src={player.photo}
                          bg={team.colors.primary}
                          color="white"
                          mb={1}
                          cursor={selectedBench ? 'pointer' : 'default'}
                          onClick={() => {
                            if (selectedBench) {
                              swapPlayers(player, selectedBench);
                              setSelectedBench(null)
                            } else {
                              toast({
                                title: 'Selecione um jogador do banco de reservas',
                                status: 'warning',
                                duration: 3000,
                                isClosable: true,
                              });
                            }
                          }
                          }
                        />
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          bg="white"
                          px={1}
                          borderRadius="sm"
                        >
                          {player.name}
                        </Text>
                        <Text
                          fontSize="xs"
                          bg="blackAlpha.700"
                          color="white"
                          px={1}
                          borderRadius="sm"
                        >
                          {player.positionInFormation} ({player.overall})
                        </Text>
                      </Box>
                    );
                  })}
                </FootballField>
              </Box>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 12 }}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <Tabs variant="enclosed">
                <TabList>
                  <Tab>Banco de Reservas</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Nome</Th>
                          <Th>Posição</Th>
                          <Th isNumeric>Idade</Th>
                          <Th isNumeric>Overall</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {benchPlayers.map((player) => (
                          <Tr key={player.id}
                            _hover={{ bg: "gray.100" }}
                            backgroundColor={selectedBench && selectedBench.id === player.id ? 'green.100' : 'transparent'}
                            cursor="pointer"
                            onClick={() => {
                              setSelectedBench(player)
                            }}>
                            <Td>{player.name}</Td>
                            <Td>{player.position}</Td>
                            <Td isNumeric>{dayjs().diff(player.birth, 'year')}</Td>
                            <Td isNumeric><Badge colorScheme={player.overall > 80 ? 'green' : player.overall > 60 ? 'yellow' : 'red'}>{player.overall}</Badge></Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}