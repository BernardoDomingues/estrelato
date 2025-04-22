import {
  Box,
  Container,
  Heading,
  Flex,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

interface LeagueHeaderProps {
  leagueName: string;
  season: string;
}

const LeagueHeader = ({ leagueName, season }: LeagueHeaderProps) => {
  const router = useRouter();
  
  return (
    <Box bg="blue.600" color="white" py={4} px={8} boxShadow="md">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <IconButton
              aria-label="Voltar"
              icon={<ArrowBackIcon />}
              onClick={() => router.push('/dashboard')}
              variant="outline"
              colorScheme="whiteAlpha"
            />
            <Heading size="md">{leagueName} - {season}</Heading>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default LeagueHeader;