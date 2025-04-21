import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useGameSave } from '@/store/recoil/useGameSave';
import dayjs from 'dayjs';

export default function SavedGameInfo() {
  const { gameState, loadGame, resetGame } = useGameSave();
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleContinueGame = () => {
    loadGame();
    router.push('/dashboard');
  };

  const handleNewGame = () => {
    resetGame();
    router.push('/start');
  };

  if (!gameState.team) {
    return null;
  }

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor={borderColor}
      width="100%"
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md">Carreira Salva</Heading>
        
        <Flex align="center">
          <Avatar
            bg={gameState.team.colors.secondary}
            color={gameState.team.colors.primary}
            name={gameState.team.shortName}
            size="md"
            mr={4}
          />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{gameState.team.name}</Text>
            <Text>Técnico: {gameState.managerName}</Text>
            <Text fontSize="sm" color="gray.500">
              Última vez jogado: {dayjs(gameState.gameDate).format('DD/MM/YYYY')}
            </Text>
          </VStack>
        </Flex>

        <HStack spacing={4} pt={2}>
          <Button
            colorScheme="green"
            onClick={handleContinueGame}
            flex={1}
          >
            Continuar
          </Button>
          <Button
            variant="outline"
            onClick={handleNewGame}
            flex={1}
          >
            Novo Jogo
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}