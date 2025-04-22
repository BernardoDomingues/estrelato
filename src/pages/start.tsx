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
      py={{ base: 4, sm: 6, md: 10 }}
      px={{ base: 2, sm: 4, md: 6 }}
    >
      <SavedGameChecker />
      <Container 
        maxW={{ base: "100%", sm: "90%", md: "container.md", lg: "container.lg" }}
        px={{ base: 2, sm: 4 }}
      >
        <VStack 
          spacing={{ base: 5, sm: 8, md: 10 }} 
          align="stretch"
        >
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