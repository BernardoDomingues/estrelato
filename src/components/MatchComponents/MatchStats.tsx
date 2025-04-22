import { Box, Flex, Heading, Progress, Text, VStack } from '@chakra-ui/react';

type StatItemProps = {
  label: string;
  homeValue: number;
  awayValue: number;
  max?: number;
};

const StatItem = ({ label, homeValue, awayValue, max }: StatItemProps) => {
  const totalValue = max || (homeValue + awayValue || 1);
  
  return (
    <Box>
      <Text mb={1}>{label}</Text>
      <Flex align="center">
        <Text fontWeight="bold" w="40px">{homeValue}</Text>
        <Progress
          flex="1"
          value={homeValue}
          max={totalValue}
          colorScheme="blue"
          size="sm"
          borderRadius="md"
        />
        <Text fontWeight="bold" w="40px" textAlign="right">{awayValue}</Text>
      </Flex>
    </Box>
  );
};

type MatchStatsProps = {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  bgColor: string;
};

export const MatchStats = ({
  possession,
  shots,
  shotsOnTarget,
  corners,
  fouls,
  bgColor
}: MatchStatsProps) => {
  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Estatísticas</Heading>

      <VStack spacing={4} align="stretch">
        <StatItem 
          label="Posse de Bola" 
          homeValue={possession.home} 
          awayValue={possession.away} 
          max={100}
        />
        
        <StatItem 
          label="Finalizações" 
          homeValue={shots.home} 
          awayValue={shots.away} 
        />
        
        <StatItem 
          label="Finalizações no Gol" 
          homeValue={shotsOnTarget.home} 
          awayValue={shotsOnTarget.away} 
        />
        
        <StatItem 
          label="Escanteios" 
          homeValue={corners.home} 
          awayValue={corners.away} 
        />
        
        <StatItem 
          label="Faltas" 
          homeValue={fouls.home} 
          awayValue={fouls.away} 
        />
      </VStack>
    </Box>
  );
};