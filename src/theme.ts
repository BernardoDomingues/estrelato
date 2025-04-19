import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
    },
  },
  colors: {
    brand: {
      50: '#f0fff4',
      100: '#c6f6d5',
      500: '#38a169',
      600: '#2f855a',
      700: '#276749',
      900: '#1a4731',
    },
  },
})

export default theme