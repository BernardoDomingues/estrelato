import { Button } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { Team } from '@/types/team';
import NextMatch from '@/components/NextMatch';

interface MatchControlsProps {
  team: Team;
  onStartMatch: () => void;
}

const MatchControls = ({ team, onStartMatch }: MatchControlsProps) => {
  return (
    <NextMatch team={team}>
      <Button
        rightIcon={<CheckIcon />}
        colorScheme="green"
        variant="solid"
        onClick={onStartMatch}
      >
        Iniciar Partida
      </Button>
    </NextMatch>
  );
};

export default MatchControls;