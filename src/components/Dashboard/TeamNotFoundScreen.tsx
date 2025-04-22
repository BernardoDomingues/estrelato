import { Flex, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const TeamNotFoundScreen = () => {
  const router = useRouter();
  
  return (
    <Flex height="100vh" align="center" justify="center">
      <Text>Time não encontrado. <Button onClick={() => router.push('/')}>Voltar</Button></Text>
    </Flex>
  );
};

export default TeamNotFoundScreen;