import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FaTrophy, FaUsers, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

export default function Home() {
  const bgGradient = useColorModeValue(
    'linear(to-r, green.100, blue.100)',
    'linear(to-r, green.900, blue.900)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box>
      <Box
        bgGradient={bgGradient}
        py={20}
        px={4}
      >
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={8}
            align="center"
            justify="space-between"
          >
            <VStack align="flex-start" spacing={4} maxW="600px">
              <Heading
                as="h1"
                size="2xl"
                bgGradient="linear(to-r, green.400, blue.500)"
                bgClip="text"
              >
                Estrelato Brasil
              </Heading>
              <Text fontSize="xl" color={textColor}>
                Assuma o controle de seu time do coração e leve-o ao topo do futebol.
                Gerencie jogadores, finanças e dispute os principais campeonatos.
              </Text>
              <Button
                size="lg"
                colorScheme="green"
                rightIcon={<Icon as={FaTrophy} />}
              >
                Começar Carreira
              </Button>
            </VStack>
            <Box
              boxSize={{ base: '300px', md: '400px' }}
              position="relative"
            >
              <Image
                src="../assets/stadium.jpg"
                alt="Estádio de futebol"
                borderRadius="xl"
                boxShadow="2xl"
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={8}
        >
          <FeatureCard
            icon={FaUsers}
            title="Gestão de Elenco"
            description="Monte seu time ideal com mais de 1000 jogadores reais. Desenvolva talentos e faça contratações estratégicas."
          />
          <FeatureCard
            icon={FaMoneyBillWave}
            title="Finanças"
            description="Administre o orçamento do clube, negocie contratos e mantenha as finanças saudáveis."
          />
          <FeatureCard
            icon={FaTrophy}
            title="Competições"
            description="Dispute o Brasileirão, Copa do Brasil e torneios continentais. Cada jogo é uma nova história."
          />
          <FeatureCard
            icon={FaChartLine}
            title="Desenvolvimento"
            description="Invista nas categorias de base e infraestrutura para garantir o futuro do clube."
          />
        </Grid>
      </Container>
    </Box>
  );
}

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      bg={cardBg}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
      }}
    >
      <Icon
        as={icon}
        w={10}
        h={10}
        mb={4}
        color="green.500"
      />
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color={textColor}>
        {description}
      </Text>
    </Box>
  );
}