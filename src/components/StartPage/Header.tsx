import { Flex, Heading, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center"
      textAlign="center"
      py={8}
    >
      <Heading 
        as="h1" 
        size="2xl" 
        mb={4}
        bgGradient="linear(to-r, green.500, blue.500)"
        bgClip="text"
      >
        Estrelato Brasil
      </Heading>
      <Text fontSize="xl" maxW="600px">
        Comece sua jornada como técnico e leve seu time ao topo do futebol brasileiro.
      </Text>
    </Flex>
  );
};

export default Header;