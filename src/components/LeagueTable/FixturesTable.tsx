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
import { Fixture } from '@/types/league';

interface FixturesTableProps {
  fixtures: Fixture[];
}

const FixturesTable = ({ fixtures }: FixturesTableProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  const formatMatchResult = (fixture: Fixture) => {
    if (!fixture.played || !fixture.result) {
      return 'vs';
    }
    return `${fixture.result.homeGoals} - ${fixture.result.awayGoals}`;
  };

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Pru00f3ximos Jogos</Heading>
      
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Rodada</Th>
            <Th>Mandante</Th>
            <Th textAlign="center">Resultado</Th>
            <Th>Visitante</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fixtures.map((fixture) => (
            <Tr key={fixture.id}>
              <Td>{fixture.matchday}</Td>
              <Td>
                <HStack>
                  <Box 
                    w="3px" 
                    h="20px" 
                    bg={fixture.homeTeam.colors.primary} 
                    borderRadius="full"
                  />
                  <Text>{fixture.homeTeam.name}</Text>
                </HStack>
              </Td>
              <Td textAlign="center">
                {formatMatchResult(fixture)}
              </Td>
              <Td>
                <HStack>
                  <Box 
                    w="3px" 
                    h="20px" 
                    bg={fixture.awayTeam.colors.primary} 
                    borderRadius="full"
                  />
                  <Text>{fixture.awayTeam.name}</Text>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default FixturesTable;