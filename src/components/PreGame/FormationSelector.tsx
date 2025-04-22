import { Select, Box, Text } from '@chakra-ui/react';
import { Formation } from './types';

interface FormationSelectorProps {
  formation: Formation;
  onFormationChange: (formation: Formation) => void;
}

const FormationSelector = ({ formation, onFormationChange }: FormationSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFormationChange(e.target.value as Formation);
  };

  return (
    <Box>
      <Text mb={2}>Formação</Text>
      <Select value={formation} onChange={handleChange}>
        <option value="4-3-3">4-3-3</option>
        <option value="4-4-2">4-4-2</option>
        <option value="3-5-2">3-5-2</option>
        <option value="4-2-3-1">4-2-3-1</option>
        <option value="5-3-2">5-3-2</option>
      </Select>
    </Box>
  );
};

export default FormationSelector;