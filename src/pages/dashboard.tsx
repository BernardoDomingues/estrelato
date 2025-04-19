import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Avatar,
  HStack,
  VStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Team } from '../types/team';
import { teams } from '@/data/teams';
import { leagues } from '@/data/leagues';
import dayjs from 'dayjs';

export default function Dashboard() {
  const [managerName, setManagerName] = useState('');
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    const storedName = localStorage.getItem('managerName');
    const storedTeamId = localStorage.getItem('teamId');
    
    if (!storedName || !storedTeamId) {
      router.replace('/');
      return;
    }
    
    setManagerName(storedName);

    const selectedTeam = teams.find(t => t.id === parseInt(storedTeamId));
    if (selectedTeam) {
      setTeam(selectedTeam);
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Text>Carregando...</Text>
      </Flex>
    );
  }

  if (!team) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Text>Time não encontrado. <Button onClick={() => router.push('/')}>Voltar</Button></Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
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
                  }).format(team.finances.transferBudget)}
                </StatNumber>
              </Stat>
              
              <Stat size="sm">
                <StatLabel color="whiteAlpha.800">Data</StatLabel>
                <StatNumber>01/01/2023</StatNumber>
              </Stat>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={{ base: 12, md: 8 }}>
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
                
                <VStack>
                  <Badge colorScheme="green">Brasileirão</Badge>
                  <Text fontWeight="bold">VS</Text>
                  <Text fontSize="sm">15/01/2023 - 16:00</Text>
                </VStack>
                
                <HStack spacing={4}>
                  <Text fontWeight="bold">Palmeiras</Text>
                  <Avatar name="Palmeiras" bg="green.500" color="white" />
                </HStack>
              </Flex>
            </Box>
            
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
                      <Td>{player.name}</Td>
                      <Td>{player.position}</Td>
                      <Td isNumeric>{dayjs().diff(player.birth, 'year')}</Td>
                      <Td isNumeric>{player.overall}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={6}>
              <Heading size="md" mb={4}>Classificação</Heading>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Time</Th>
                    <Th isNumeric>Pts</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {leagues[0].teams.map((standing) => (
                    <Tr 
                      key={standing.id}
                      bg={standing.id === team.id ? `${team.colors.primary}10` : undefined}
                      fontWeight={standing.id === team.id ? "bold" : "normal"}
                    >
                      <Td>{standing.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <Heading size="md" mb={4}>Finanças</Heading>
              <Stat mb={4}>
                <StatLabel>Saldo</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0
                  }).format(team.finances.transferBudget)}
                </StatNumber>
                <StatHelpText>Receita mensal: +R$ 1.2M</StatHelpText>
              </Stat>
              
              <Stat mb={4}>
                <StatLabel>Folha Salarial</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0
                  }).format(team.finances.wageBudget)}
                </StatNumber>
                <StatHelpText>Por mês</StatHelpText>
              </Stat>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}