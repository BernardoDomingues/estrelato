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
  Badge,
  Button,
  Progress,
  IconButton,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Team } from '../types/team';
import { ArrowBackIcon, TimeIcon } from '@chakra-ui/icons';
import { GameEvent, GameEventType } from '@/types/game-event';

export default function Match({ team, opponent }: { team: Team; opponent: Team; }) {
  const [gameTime, setGameTime] = useState(0); // 0-90 minutos
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [possession, setPossession] = useState({ home: 50, away: 50 });
  const [shots, setShots] = useState({ home: 0, away: 0 });
  const [shotsOnTarget, setShotsOnTarget] = useState({ home: 0, away: 0 });
  const [corners, setCorners] = useState({ home: 0, away: 0 });
  const [fouls, setFouls] = useState({ home: 0, away: 0 });
  const [gameEvents, setGameEvents] = useState<GameEvent[]>([]);
  const [isSimulating, setIsSimulating] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(2); // 1x, 2x, 4x
  
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');

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
            ...prev,
            {
              type: 'possession',
              minute: 90,
              side: 'home',
              team,
              playerName: '',
              description: 'Fim de jogo!'
            }
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
        setScore(prev => ({
          ...prev,
          [teamSide]: prev[teamSide] + 1
        }));
        setShotsOnTarget(prev => ({
          ...prev,
          [teamSide]: prev[teamSide] + 1
        }));
        setShots(prev => ({
          ...prev,
          [teamSide]: prev[teamSide] + 1
        }));
        break;
        
      case 'yellowCard':
        newEvent.description = `Cartão amarelo para ${player.name} do ${currentTeam.name}.`;
        setFouls(prev => ({
          ...prev,
          [teamSide]: prev[teamSide] + 1
        }));
        break;
        
      case 'chance':
        newEvent.description = `Chance para ${currentTeam.name}! ${player.name} finaliza, mas a bola vai para fora.`;
        setShots(prev => ({
          ...prev,
          [teamSide]: prev[teamSide] + 1
        }));
        break;
        
      case 'possession':
        const possessionChange = Math.floor(Math.random() * 10) + 5; // 5-15%
        setPossession(prev => {
          const homeChange = isHomeTeam ? possessionChange : -possessionChange;
          const newHomePossession = Math.max(30, Math.min(70, prev.home + homeChange));
          return {
            home: newHomePossession,
            away: 100 - newHomePossession
          };
        });
        newEvent.description = `${currentTeam.name} mantém a posse de bola.`;
        break;
        
      case 'corner':
        newEvent.description = `Escanteio para ${currentTeam.name}.`;
        setCorners(prev => ({
          ...prev,
          [teamSide]: prev[teamSide] + 1
        }));
        break;
    }

    setGameEvents(prev => [newEvent, ...prev]);
  };

  const startSimulation = () => {
    setIsSimulating(true);

    setGameEvents([{
      type: 'possession',
      minute: 0,
      side: 'home',
      team,
      playerName: '',
      description: 'A partida Começou!'
    }]);
  };

  const pauseSimulation = () => {
    setIsSimulating(false);
  };

  const changeSimulationSpeed = () => {
    setSimulationSpeed(prev => prev === 1 ? 2 : prev === 2 ? 4 : 1);
  };

  const retomeSimulation = () => {
    setIsSimulating(true);
  }

  const finishMatch = () => {
    router.push('/dashboard');
  };

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
                isDisabled={!isGameOver && isSimulating}
              />
              <Heading size="md">Partida em Andamento</Heading>
            </HStack>
            
            <HStack>
              {!isGameOver ? (
                <>
                  {isSimulating ? (
                    <Button
                      colorScheme="yellow"
                      onClick={pauseSimulation}
                    >
                      Pausar
                    </Button>
                  ) : (
                    <Button
                      colorScheme="green"
                      onClick={retomeSimulation}
                    >
                      Continuar
                    </Button>
                  )}
                  
                  <Button
                    leftIcon={<TimeIcon />}
                    onClick={changeSimulationSpeed}
                    variant="outline"
                    colorScheme="whiteAlpha"
                  >
                    {simulationSpeed}x
                  </Button>
                </>
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={finishMatch}
                >
                  Finalizar Partida
                </Button>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={{ base: 12, md: 12 }}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
              <Flex 
                justify="space-between" 
                align="center"
              >
                <VStack>
                  <Avatar size="lg" name={team.name} bg={team.colors.primary} color="white" />
                  <Text fontWeight="bold">{team.name}</Text>
                </VStack>
                
                <VStack>
                  <Heading size="2xl">{score.home} - {score.away}</Heading>
                  <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                    {gameTime}'
                  </Badge>
                  <Text fontSize="sm">Brasileirão</Text>
                </VStack>
                
                <VStack>
                  <Avatar size="lg" name={opponent?.name} bg={opponent?.colors.primary} color="white" />
                  <Text fontWeight="bold">{opponent?.name}</Text>
                </VStack>
              </Flex>
              
              <Progress 
                value={gameTime} 
                max={90} 
                mt={6} 
                colorScheme="green" 
                size="sm" 
                borderRadius="md"
              />
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 8 }}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4}>Eventos da Partida</Heading>
              
              <List spacing={3}>
                {gameEvents.map((event, index) => (
                  <ListItem key={index} display="flex" alignItems="center" backgroundColor={event.type === 'goal' ? 'red.100' : 'transparent'}>
                    <Badge mr={2} colorScheme="green">{event.minute}'</Badge>
                    <Text>
                      {event.type === 'goal' && <Badge colorScheme="yellow">GOL</Badge>}
                      {' '}
                      {event.description}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4}>Estatísticas</Heading>
              
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text mb={1}>Posse de Bola</Text>
                  <Flex align="center">
                    <Text fontWeight="bold" w="40px">{possession.home}%</Text>
                    <Progress 
                      flex="1" 
                      value={possession.home} 
                      colorScheme="blue" 
                      size="sm" 
                      borderRadius="md"
                    />
                    <Text fontWeight="bold" w="40px" textAlign="right">{possession.away}%</Text>
                  </Flex>
                </Box>
                
                <Box>
                  <Text mb={1}>Finalizações</Text>
                  <Flex align="center">
                    <Text fontWeight="bold" w="40px">{shots.home}</Text>
                    <Progress 
                      flex="1" 
                      value={shots.home} 
                      max={shots.home + shots.away || 1}
                      colorScheme="blue" 
                      size="sm" 
                      borderRadius="md"
                    />
                    <Text fontWeight="bold" w="40px" textAlign="right">{shots.away}</Text>
                  </Flex>
                </Box>
                
                <Box>
                  <Text mb={1}>Finalizações no Gol</Text>
                  <Flex align="center">
                    <Text fontWeight="bold" w="40px">{shotsOnTarget.home}</Text>
                    <Progress 
                      flex="1" 
                      value={shotsOnTarget.home} 
                      max={shotsOnTarget.home + shotsOnTarget.away || 1}
                      colorScheme="blue" 
                      size="sm" 
                      borderRadius="md"
                    />
                    <Text fontWeight="bold" w="40px" textAlign="right">{shotsOnTarget.away}</Text>
                  </Flex>
                </Box>
                
                <Box>
                  <Text mb={1}>Escanteios</Text>
                  <Flex align="center">
                    <Text fontWeight="bold" w="40px">{corners.home}</Text>
                    <Progress 
                      flex="1" 
                      value={corners.home} 
                      max={corners.home + corners.away || 1}
                      colorScheme="blue" 
                      size="sm" 
                      borderRadius="md"
                    />
                    <Text fontWeight="bold" w="40px" textAlign="right">{corners.away}</Text>
                  </Flex>
                </Box>
                
                <Box>
                  <Text mb={1}>Faltas</Text>
                  <Flex align="center">
                    <Text fontWeight="bold" w="40px">{fouls.home}</Text>
                    <Progress 
                      flex="1" 
                      value={fouls.home} 
                      max={fouls.home + fouls.away || 1}
                      colorScheme="blue" 
                      size="sm" 
                      borderRadius="md"
                    />
                    <Text fontWeight="bold" w="40px" textAlign="right">{fouls.away}</Text>
                  </Flex>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}