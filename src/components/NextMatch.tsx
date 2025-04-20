import {
  Box,
  Heading,
  Text,
  Flex,
  Avatar,
  HStack,
  VStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { Team } from '@/types/team';
import { leagues } from '@/data/leagues';
import dayjs from 'dayjs';

export default function NextMatch({ team, children }: { team: Team, children: React.ReactNode }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const nextMatch = leagues[0].fixtures.find(fixture => !fixture.played && fixture.homeTeam.id === team.id || fixture.awayTeam.id === team.id);
  const rival = nextMatch ? (nextMatch.homeTeam.id === team.id ? nextMatch.awayTeam : nextMatch.homeTeam) : null;

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
      <Heading size="md" mb={4}>Próxima Partida</Heading>
      <Flex
        justify="space-between"
        align="center"
        bg="gray.50"
        p={4}
        borderRadius="md"
      >
        <HStack spacing={4}>
          <Avatar name={team.name} bg={team.colors.primary} color="white" />
          <Text fontWeight="bold">{team.name}</Text>
        </HStack>

        {nextMatch && rival && (
          <>
            <VStack>
              <Badge colorScheme="green">Brasileirão</Badge>
              <Text fontWeight="bold">VS</Text>
              <Text fontSize="sm">{rival.facilities.stadium.name} - {dayjs(nextMatch.date).format('DD/MM/YYYY')}</Text>
            </VStack>
    
            <HStack spacing={4}>
              <Text fontWeight="bold">{rival.name}</Text>
              <Avatar name={rival.name} bg={rival.colors.primary} color="white" />
            </HStack>
          </>
        )}
      </Flex>

      <Flex justify="center" mt={4}>
        {children}
      </Flex>
    </Box>
  )
}