import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Team } from '@/types/team';

import {
  FormationSelector,
  TacticalSettings,
  TeamLineup,
  BenchPlayers,
  MatchControls,
  PlayerWithPosition,
  Formation,
  formationPositions,
  compatiblePositions,
  GameSettings
} from './PreGame';
import { useSetRecoilState } from 'recoil';
import { gameSettingsState, matchTeamsState } from '@/atoms/gameAtoms';

export default function PreGameSection({ team, opponent }: { team: Team, opponent: Team }) {
  const [isLoading, setIsLoading] = useState(true);
  const [formation, setFormation] = useState<Formation>('4-3-3');
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerWithPosition[]>([]);
  const [benchPlayers, setBenchPlayers] = useState<PlayerWithPosition[]>([]);
  const [tacticalStyle, setTacticalStyle] = useState('balanced');
  const [defensiveStyle, setDefensiveStyle] = useState('balanced');
  const [offensiveStyle, setOffensiveStyle] = useState('balanced');
  const [selectedBench, setSelectedBench] = useState<PlayerWithPosition | null>(null);
  const setGamegameSettingsState = useSetRecoilState(gameSettingsState);
  const setMatchTeamsState = useSetRecoilState(matchTeamsState);

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
  }, [team, formation]);

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
    setSelectedBench(null);
  };

  const startMatch = () => {
    const gameSettings: GameSettings = {
      formation,
      tacticalStyle,
      defensiveStyle,
      offensiveStyle,
      selectedPlayers
    };

    setGamegameSettingsState(gameSettings);
    setMatchTeamsState({ teamId: team.id, opponentId: opponent.id });

    toast({
      title: 'Partida iniciada!',
      description: 'Iniciando a simulação da partida...',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      router.push('/match-simulation');
    }, 1000);
  };

  const handleFormationChange = (newFormation: Formation) => {
    setFormation(newFormation);
  };

  const handleTacticalStyleChange = (style: string) => {
    setTacticalStyle(style);
  };

  const handleDefensiveStyleChange = (style: string) => {
    setDefensiveStyle(style);
  };

  const handleOffensiveStyleChange = (style: string) => {
    setOffensiveStyle(style);
  };

  const handleStarterClick = (player: PlayerWithPosition) => {
    if (selectedBench) {
      swapPlayers(player, selectedBench);
    }
  };

  const handleBenchPlayerSelect = (player: PlayerWithPosition) => {
    setSelectedBench(player);
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
        <Text>Time não encontrado. <button onClick={() => router.push('/')}>Voltar</button></Text>
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
            <MatchControls team={team} onStartMatch={startMatch} />
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
              <Heading size="md" mb={4}>Configurações Táticas</Heading>

              <FormationSelector
                formation={formation}
                onFormationChange={handleFormationChange}
              />

              <TacticalSettings
                tacticalStyle={tacticalStyle}
                defensiveStyle={defensiveStyle}
                offensiveStyle={offensiveStyle}
                onTacticalStyleChange={handleTacticalStyleChange}
                onDefensiveStyleChange={handleDefensiveStyleChange}
                onOffensiveStyleChange={handleOffensiveStyleChange}
              />
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 8 }}>
            <TeamLineup
              formation={formation}
              selectedPlayers={selectedPlayers}
              team={team}
              selectedBench={selectedBench}
              onPlayerClick={handleStarterClick}
            />
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 12 }}>
            <BenchPlayers
              benchPlayers={benchPlayers}
              selectedBench={selectedBench}
              onBenchPlayerSelect={handleBenchPlayerSelect}
            />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}