import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Team } from '@/types/team';
import TeamSelector from '../TeamSelector';

interface ManagerFormProps {
  managerName: string;
  setManagerName: (name: string) => void;
  selectedTeamId: string;
  setSelectedTeamId: (id: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  teams: Team[];
}

const ManagerForm = ({
  managerName,
  setManagerName,
  selectedTeamId,
  setSelectedTeamId,
  isLoading,
  onSubmit,
  teams,
}: ManagerFormProps) => {
  return (
    <Box 
      as="form" 
      onSubmit={onSubmit}
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
  );
};

export default ManagerForm;