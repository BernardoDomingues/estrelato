import { PlayerWithPosition } from '@/types/match-settings';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface BenchPlayersProps {
  benchPlayers: PlayerWithPosition[];
  selectedBench: PlayerWithPosition | null;
  onBenchPlayerSelect: (player: PlayerWithPosition) => void;
}

const BenchPlayers = ({ benchPlayers, selectedBench, onBenchPlayerSelect }: BenchPlayersProps) => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Banco de Reservas</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Posição</Th>
                  <Th isNumeric>Idade</Th>
                  <Th isNumeric>Overall</Th>
                </Tr>
              </Thead>
              <Tbody>
                {benchPlayers.map((player) => (
                  <Tr
                    key={player.id}
                    _hover={{ bg: "gray.100" }}
                    backgroundColor={selectedBench && selectedBench.id === player.id ? 'green.100' : 'transparent'}
                    cursor="pointer"
                    onClick={() => onBenchPlayerSelect(player)}
                  >
                    <Td>{player.name}</Td>
                    <Td>{player.position}</Td>
                    <Td isNumeric>{dayjs().diff(player.birth, 'year')}</Td>
                    <Td isNumeric>
                      <Badge colorScheme={player.overall > 80 ? 'green' : player.overall > 60 ? 'yellow' : 'red'}>
                        {player.overall}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default BenchPlayers;