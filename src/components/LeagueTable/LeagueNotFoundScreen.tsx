import { Flex, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const LeagueNotFoundScreen = () => {
  const router = useRouter();
  
  return (
    <Flex height="100vh" align="center" justify="center">
      <Text>Liga não encontrada. <Button onClick={() => router.push('/')}>Voltar</Button></Text>
    </Flex>
  );
};

export default LeagueNotFoundScreen;