import { Avatar, Badge, Box, Flex, Heading, Progress, Text, VStack } from '@chakra-ui/react';
import { Team } from '@/types/team';

type ScoreBoardProps = {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  gameTime: number;
  bgColor: string;
};

export const ScoreBoard = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  gameTime,
  bgColor
}: ScoreBoardProps) => {
  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
      <Flex
        justify="space-between"
        align="center"
      >
        <VStack>
          <Avatar size="lg" name={homeTeam.name} bg={homeTeam.colors.primary} color="white" />
          <Text fontWeight="bold">{homeTeam.name}</Text>
        </VStack>

        <VStack>
          <Heading size="2xl">{homeScore} - {awayScore}</Heading>
          <Badge colorScheme="green" fontSize="md" px={3} py={1}>
            {gameTime}'
          </Badge>
          <Text fontSize="sm">{homeTeam.facilities.stadium.name} - Brasileirão</Text>
        </VStack>

        <VStack>
          <Avatar size="lg" name={awayTeam.name} bg={awayTeam.colors.primary} color="white" />
          <Text fontWeight="bold">{awayTeam.name}</Text>
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
  );
};