import { Box, Container, Flex, Heading, HStack } from '@chakra-ui/react';
import { Team } from '@/types/team';
import { SimulationControls } from './SimulationControls';

type MatchHeaderProps = {
  team: Team;
  isSimulating: boolean;
  isGameOver: boolean;
  simulationSpeed: number;
  onPause: () => void;
  onResume: () => void;
  onSpeedChange: () => void;
  onFinish: () => void;
};

export const MatchHeader = ({
  team,
  isSimulating,
  isGameOver,
  simulationSpeed,
  onPause,
  onResume,
  onSpeedChange,
  onFinish
}: MatchHeaderProps) => {
  return (
    <Box bg={team.colors.primary} color="white" py={4} px={8} boxShadow="md">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <Heading size="md">Partida em Andamento</Heading>
          </HStack>

          <SimulationControls
            isSimulating={isSimulating}
            isGameOver={isGameOver}
            simulationSpeed={simulationSpeed}
            onPause={onPause}
            onResume={onResume}
            onSpeedChange={onSpeedChange}
            onFinish={onFinish}
          />
        </Flex>
      </Container>
    </Box>
  );
};