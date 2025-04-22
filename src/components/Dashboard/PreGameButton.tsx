import { Button, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const PreGameButton = () => {
  const router = useRouter();
  
  return (
    <Button
      colorScheme="green"
      size="md"
      onClick={() => router.push('/pre-game')}
      leftIcon={<Box as="span" fontSize="lg">⚽</Box>}
    >
      Preparar para a Partida
    </Button>
  );
};

export default PreGameButton;