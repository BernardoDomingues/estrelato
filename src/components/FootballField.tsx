import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface FootballFieldProps {
  children?: ReactNode;
}

export default function FootballField({ children }: FootballFieldProps) {
  return (
    <Box
      position="relative"
      width="100%"
      height="400px"
      bg="green.500"
      borderRadius="md"
      overflow="hidden"
    >
      <Box
        position="absolute"
        width="100%"
        height="2px"
        bg="whiteAlpha.700"
        top="50%"
        left="0"
      />

      <Box
        position="absolute"
        width="100px"
        height="100px"
        borderRadius="50%"
        border="2px solid"
        borderColor="whiteAlpha.700"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />

      <Box
        position="absolute"
        width="6px"
        height="6px"
        borderRadius="50%"
        bg="whiteAlpha.700"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />

      <Box
        position="absolute"
        width="150px"
        height="60px"
        border="2px solid"
        borderColor="whiteAlpha.700"
        top="0"
        left="50%"
        transform="translateX(-50%)"
      />

      <Box
        position="absolute"
        width="220px"
        height="100px"
        border="2px solid"
        borderColor="whiteAlpha.700"
        top="0"
        left="50%"
        transform="translateX(-50%)"
      />

      <Box
        position="absolute"
        width="150px"
        height="60px"
        border="2px solid"
        borderColor="whiteAlpha.700"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
      />

      <Box
        position="absolute"
        width="220px"
        height="100px"
        border="2px solid"
        borderColor="whiteAlpha.700"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
      />

      {children}
    </Box>
  );
}