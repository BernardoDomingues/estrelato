import { Flex, Heading, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center"
      textAlign="center"
      py={{ base: 4, sm: 6, md: 8 }}
    >
      <Heading 
        as="h1" 
        size={{ base: "xl", sm: "2xl" }} 
        mb={{ base: 2, sm: 3, md: 4 }}
        bgGradient="linear(to-r, green.500, blue.500)"
        bgClip="text"
      >
        Estrelato Brasil
      </Heading>
      <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} maxW="600px" px={{ base: 2, sm: 0 }}>
        Comece sua jornada como técnico e leve seu time ao topo do futebol brasileiro.
      </Text>
    </Flex>
  );
};

export default Header;