import { VStack, Box, Text, Select } from '@chakra-ui/react';

interface TacticalSettingsProps {
  tacticalStyle: string;
  defensiveStyle: string;
  offensiveStyle: string;
  onTacticalStyleChange: (style: string) => void;
  onDefensiveStyleChange: (style: string) => void;
  onOffensiveStyleChange: (style: string) => void;
}

const TacticalSettings = ({
  tacticalStyle,
  defensiveStyle,
  offensiveStyle,
  onTacticalStyleChange,
  onDefensiveStyleChange,
  onOffensiveStyleChange,
}: TacticalSettingsProps) => {
  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text mb={2}>Estilo de Jogo</Text>
        <Select
          value={tacticalStyle}
          onChange={(e) => onTacticalStyleChange(e.target.value)}
        >
          <option value="possession">Posse de Bola</option>
          <option value="counter">Contra-Ataque</option>
          <option value="balanced">Equilibrado</option>
          <option value="direct">Jogo Direto</option>
        </Select>
      </Box>

      <Box>
        <Text mb={2}>Estilo Defensivo</Text>
        <Select
          value={defensiveStyle}
          onChange={(e) => onDefensiveStyleChange(e.target.value)}
        >
          <option value="high-press">Pressão Alta</option>
          <option value="balanced">Equilibrado</option>
          <option value="defensive">Defensivo</option>
          <option value="park-the-bus">Retrancado</option>
        </Select>
      </Box>

      <Box>
        <Text mb={2}>Estilo Ofensivo</Text>
        <Select
          value={offensiveStyle}
          onChange={(e) => onOffensiveStyleChange(e.target.value)}
        >
          <option value="attacking">Ofensivo</option>
          <option value="balanced">Equilibrado</option>
          <option value="creative">Criativo</option>
          <option value="cautious">Cauteloso</option>
        </Select>
      </Box>
    </VStack>
  );
};

export default TacticalSettings;