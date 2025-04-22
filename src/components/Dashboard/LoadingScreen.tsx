import { Flex, Text } from '@chakra-ui/react';

const LoadingScreen = () => {
  return (
    <Flex height="100vh" align="center" justify="center">
      <Text>Carregando...</Text>
    </Flex>
  );
};

export default LoadingScreen;