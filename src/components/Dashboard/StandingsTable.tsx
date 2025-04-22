import { LeagueStanding } from '@/types/league';
import { Team } from '@/types/team';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface StandingsTableProps {
  standings: LeagueStanding[];
  currentTeam: Team;
}

const StandingsTable = ({ standings, currentTeam }: StandingsTableProps) => {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Classificação</Heading>
        <Button
          size="sm"
          colorScheme="blue"
          variant="outline"
          onClick={() => router.push('/league-table')}
        >
          Ver Tabela Completa
        </Button>
      </Flex>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Time</Th>
            <Th isNumeric>Pts</Th>
          </Tr>
        </Thead>
        <Tbody>
          {standings?.map((standing, index) => {
            return (
              <Tr
                key={standing.team.id}
                bg={standing.team.id === currentTeam.id ? `${currentTeam.colors.primary}10` : undefined}
                fontWeight={standing.team.id === currentTeam.id ? "bold" : "normal"}
              >
                <Td>{index + 1}</Td>
                <Td>{standing.team.name}</Td>
                <Td isNumeric>{standing.points}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StandingsTable;