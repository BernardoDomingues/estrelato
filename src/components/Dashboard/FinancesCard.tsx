import { GameState } from '@/store/recoil';
import {
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';

interface FinancesCardProps {
  finances: GameState['finances'];
}

const FinancesCard = ({ finances }: FinancesCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Finanças</Heading>
      <Stat mb={4}>
        <StatLabel>Saldo</StatLabel>
        <StatNumber>
          {formatCurrency(finances.balance)}
        </StatNumber>
        <StatHelpText>Orçamento disponível para transferências</StatHelpText>
      </Stat>

      <Stat mb={4}>
        <StatLabel>Folha Salarial</StatLabel>
        <StatNumber>
          {formatCurrency(finances.weeklyWages)}
        </StatNumber>
        <StatHelpText>Valor semanal</StatHelpText>
      </Stat>
    </Box>
  );
};

export default FinancesCard;