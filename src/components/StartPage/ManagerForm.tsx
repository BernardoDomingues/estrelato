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
      p={{ base: 4, sm: 6, md: 8 }} 
      borderRadius="xl"
      boxShadow="xl"
      width="100%"
    >
      <VStack spacing={{ base: 4, sm: 6, md: 8 }} align="stretch">
        <FormControl isRequired>
          <FormLabel fontSize={{ base: "md", sm: "lg" }}>Seu nome</FormLabel>
          <Input 
            size={{ base: "md", sm: "lg" }}
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
          size={{ base: "md", sm: "lg" }} 
          colorScheme="green"
          isLoading={isLoading}
          loadingText="Iniciando carreira..."
          width="100%"
        >
          Iniciar Carreira
        </Button>
      </VStack>
    </Box>
  );
};

export default ManagerForm;