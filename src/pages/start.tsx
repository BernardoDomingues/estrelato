import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TeamSelector from '../components/TeamSelector';
import { teams } from '@/data/teams';
import { useGameSave } from '@/store/recoil/useGameSave';

export default function Start() {
  const [managerName, setManagerName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { startNewGame, hasSavedGame, loadGame } = useGameSave();

  useEffect(() => {
    if (hasSavedGame() && loadGame()) {
      router.push('/dashboard');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!managerName.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Por favor, insira seu nome para continuar.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (!selectedTeamId) {
      toast({
        title: 'Selecione um time',
        description: 'Por favor, selecione um time para continuar.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsLoading(true);

    const success = startNewGame(managerName, parseInt(selectedTeamId));

    if (success) {
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      setIsLoading(false);
      toast({
        title: 'Erro ao iniciar',
        description: 'Ocorreu um erro ao iniciar o jogo. Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box 
      minH="100vh"
      bgGradient="linear(to-b, green.50, blue.50)"
      py={10}
    >
      <Container maxW="container.lg">
        <VStack spacing={10} align="stretch">
          <Flex 
            direction="column" 
            align="center" 
            justify="center"
            textAlign="center"
            py={8}
          >
            <Heading 
              as="h1" 
              size="2xl" 
              mb={4}
              bgGradient="linear(to-r, green.500, blue.500)"
              bgClip="text"
            >
              Estrelato Brasil
            </Heading>
            <Text fontSize="xl" maxW="600px">
              Comece sua jornada como técnico e leve seu time ao topo do futebol brasileiro.
            </Text>
          </Flex>

          <Box 
            as="form" 
            onSubmit={handleSubmit}
            bg="white" 
            p={8} 
            borderRadius="xl"
            boxShadow="xl"
          >
            <VStack spacing={8} align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="lg">Seu nome</FormLabel>
                <Input 
                  size="lg"
                  placeholder="Como deseja ser chamado?"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  focusBorderColor="green.500"
                />
              </FormControl>
              
              <TeamSelector 
                teams={teams} 
                onChange={setSelectedTeamId}
                value={selectedTeamId}
              />
              
              <Button 
                type="submit" 
                size="lg" 
                colorScheme="green"
                isLoading={isLoading}
                loadingText="Iniciando carreira..."
              >
                Iniciar Carreira
              </Button>
            </VStack>
          </Box>

          <Text textAlign="center" fontSize="sm" color="gray.600">
            © 2025 Estrelato Brasil - Todos os direitos reservados
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}