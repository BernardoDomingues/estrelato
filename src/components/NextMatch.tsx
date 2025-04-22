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
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
} from '@chakra-ui/react';
import { Team } from '@/types/team';
import dayjs from 'dayjs';
import { useGameSave } from '@/store/recoil';
import { useRouter } from 'next/router';

export default function NextMatch({ team, children }: { team: Team, children: React.ReactNode }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const { getNextMatch, isLeagueFinished, resetGame, getLeagueData } = useGameSave();
  const nextMatch = getNextMatch();
  const leagueFinished = isLeagueFinished();
  const performance = getLeagueData().standings.find(standing => standing.team.id === team.id);
  const router = useRouter();

  const handleNewGame = () => {
    resetGame();
    router.push('/start');
  };

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
      {!leagueFinished ? (
        <>
          <Heading size="md" mb={4}>Próxima Partida</Heading>
          <Flex
            justify="space-between"
            align="center"
            bg="gray.50"
            p={4}
            borderRadius="md"
          >
            <HStack spacing={4}>
              <Avatar name={nextMatch?.homeTeam.name} bg={nextMatch?.homeTeam.colors.primary} color="white" />
              <Text fontWeight="bold">{nextMatch?.homeTeam.name}</Text>
            </HStack>

            <VStack>
              <Badge colorScheme="green">Brasileirão</Badge>
              <Text fontWeight="bold">VS</Text>
              <Text fontSize="sm">{nextMatch?.homeTeam.facilities.stadium.name} - {dayjs(nextMatch?.date).format('DD/MM/YYYY')}</Text>
            </VStack>
    
            <HStack spacing={4}>
              <Text fontWeight="bold">{nextMatch?.awayTeam.name}</Text>
              <Avatar name={nextMatch?.awayTeam.name} bg={nextMatch?.awayTeam.colors.primary} color="white" />
            </HStack>
          </Flex>
        </>
      ) : (
        <>
          <Heading size="md" mb={4}>Temporada Concluída</Heading>
          <Flex
            direction="column"
            bg="gray.50"
            p={4}
            borderRadius="md"
          >
            <HStack spacing={4} mb={4}>
              <Avatar name={team.name} bg={team.colors.primary} color="white" size="lg" />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" fontSize="xl">{team.name}</Text>
                <Badge colorScheme="green">Brasileirão {new Date().getFullYear()}</Badge>
              </VStack>
            </HStack>
            
            <Divider my={3} />
            
            <Heading size="sm" mb={3}>Desempenho da Temporada</Heading>
            
            <StatGroup mb={4}>
              <Stat>
                <StatLabel>Vitórias</StatLabel>
                <StatNumber>{performance?.won}</StatNumber>
              </Stat>
              
              <Stat>
                <StatLabel>Empates</StatLabel>
                <StatNumber>{performance?.drawn}</StatNumber>
              </Stat>
              
              <Stat>
                <StatLabel>Derrotas</StatLabel>
                <StatNumber>{performance?.lost}</StatNumber>
              </Stat>
            </StatGroup>
            
            <StatGroup mb={4}>
              <Stat>
                <StatLabel>Gols Marcados</StatLabel>
                <StatNumber>{performance?.goalsFor}</StatNumber>
              </Stat>
              
              <Stat>
                <StatLabel>Gols Sofridos</StatLabel>
                <StatNumber>{performance?.goalsAgainst}</StatNumber>
              </Stat>
              
              <Stat>
                <StatLabel>Saldo de Gols</StatLabel>
                <StatNumber>{performance?.goalDifference}</StatNumber>
              </Stat>
            </StatGroup>
            
            <Button colorScheme="blue" size="lg" onClick={handleNewGame} mt={2}>
              Iniciar Nova Temporada
            </Button>
          </Flex>
        </>
      )}

      {!leagueFinished && (
        <Flex justify="center" mt={4}>
          {children}
        </Flex>
      )}
    </Box>
  )
}