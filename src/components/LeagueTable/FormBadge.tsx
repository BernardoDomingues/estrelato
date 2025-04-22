import { Badge } from '@chakra-ui/react';

interface FormBadgeProps {
  result: string;
}

const FormBadge = ({ result }: FormBadgeProps) => {
  switch (result) {
    case 'W':
      return <Badge colorScheme="green" mx="1">V</Badge>;
    case 'D':
      return <Badge colorScheme="yellow" mx="1">E</Badge>;
    case 'L':
      return <Badge colorScheme="red" mx="1">D</Badge>;
    default:
      return null;
  }
};

export default FormBadge;