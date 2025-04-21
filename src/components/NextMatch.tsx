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
import dayjs from 'dayjs';
import { useGameSave } from '@/store/recoil';

export default function NextMatch({ team, children }: { team: Team, children: React.ReactNode }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const { getNextMatch, getNextRival } = useGameSave();
  const nextMatch = getNextMatch();
  const rival = getNextRival();

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

        {rival && (
          <>
            <VStack>
              <Badge colorScheme="green">Brasileirão</Badge>
              <Text fontWeight="bold">VS</Text>
              <Text fontSize="sm">{rival.facilities.stadium.name} - {dayjs(nextMatch?.date).format('DD/MM/YYYY')}</Text>
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