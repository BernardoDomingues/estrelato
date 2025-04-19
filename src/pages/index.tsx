import { Box, Container, Heading, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <Container maxW="container.xl" py={10}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Football Manager
        </Heading>
        <Text fontSize="xl">
          Bem-vindo ao seu novo jogo de gerenciamento de futebol!
        </Text>
      </Box>
    </Container>
  )
}