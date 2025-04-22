import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Avatar,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import SaveGameButton from '@/components/SaveGameButton';
import { Team } from '@/types/team';
import { GameState } from '@/store/recoil';

interface TeamHeaderProps {
  team: Team;
  managerName: string;
  gameState: GameState;
}

const TeamHeader = ({ team, managerName, gameState }: TeamHeaderProps) => {
  return (
    <Box bg={team.colors.primary} color="white" py={4} px={8} boxShadow="md">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <Avatar
              bg={team.colors.secondary}
              color={team.colors.primary}
              name={team.shortName}
              size="md"
            />
            <VStack align="start" spacing={0}>
              <Heading size="md">{team.name}</Heading>
              <Text fontSize="sm">Técnico: {managerName}</Text>
            </VStack>
          </HStack>

          <HStack spacing={4}>
            <Stat size="sm">
              <StatLabel color="whiteAlpha.800">Orçamento</StatLabel>
              <StatNumber>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0
                }).format(gameState.finances.transferBudget)}
              </StatNumber>
            </Stat>

            <Stat size="sm">
              <StatLabel color="whiteAlpha.800">Data</StatLabel>
              <StatNumber>{dayjs(gameState.gameDate).format('DD/MM/YYYY')}</StatNumber>
            </Stat>

            <SaveGameButton size="sm" />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default TeamHeader;