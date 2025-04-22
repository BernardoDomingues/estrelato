import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import FormBadge from './FormBadge';
import { Team } from '@/types/team';
import { LeagueStanding } from '@/types/league';

interface StandingsTableProps {
  standings: LeagueStanding[];
  currentTeam?: Team | null;
}

const StandingsTable = ({ standings, currentTeam }: StandingsTableProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const highlightColor = useColorModeValue('blue.50', 'blue.900');

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Tabela de Classificau00e7u00e3o</Heading>
      
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
            <Th>u00daltimos 5</Th>
          </Tr>
        </Thead>
        <Tbody>
          {standings.map((standing, index) => (
            <Tr 
              key={standing.team.id}
              bg={standing.team.id === currentTeam?.id ? highlightColor : 'transparent'}
              fontWeight={standing.team.id === currentTeam?.id ? "bold" : "normal"}
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
                      <FormBadge result={result} />
                    </Box>
                  ))}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StandingsTable;