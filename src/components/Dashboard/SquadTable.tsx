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
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

interface SquadTableProps {
  team: Team;
}

const SquadTable = ({ team }: SquadTableProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Elenco</Heading>
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
          {team.players.map((player) => (
            <Tr key={player.id} _hover={{ bg: "gray.100" }}>
              <Td>
                <Flex align="center">
                  <Avatar
                    size="sm"
                    name={player.name}
                    src={player.photo}
                    bg={team.colors.primary}
                    color="white"
                    mr={2}
                  />
                  {player.name}
                </Flex>
              </Td>
              <Td>{player.position}</Td>
              <Td isNumeric>{dayjs().diff(player.birth, 'year')}</Td>
              <Td isNumeric>{player.overall}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SquadTable;