import {
  Box,
  Container,
  VStack,
} from '@chakra-ui/react';
import { teams } from '@/data/teams';
import { useManagerForm } from '@/hooks/useManagerForm';
import { 
  Header, 
  ManagerForm, 
  Footer,
  SavedGameChecker 
} from '@/components/StartPage';

export default function Start() {
  const {
    managerName,
    setManagerName,
    selectedTeamId,
    setSelectedTeamId,
    isLoading,
    handleSubmit,
  } = useManagerForm();

  return (
    <Box 
      minH="100vh"
      bgGradient="linear(to-b, green.50, blue.50)"
      py={10}
    >
      <SavedGameChecker />
      <Container maxW="container.lg">
        <VStack spacing={10} align="stretch">
          <Header />

          <ManagerForm
            managerName={managerName}
            setManagerName={setManagerName}
            selectedTeamId={selectedTeamId}
            setSelectedTeamId={setSelectedTeamId}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            teams={teams}
          />

          <Footer />
        </VStack>
      </Container>
    </Box>
  );
}