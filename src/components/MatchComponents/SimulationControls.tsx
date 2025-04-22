import { Button, HStack } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';

type SimulationControlsProps = {
  isSimulating: boolean;
  isGameOver: boolean;
  simulationSpeed: number;
  onPause: () => void;
  onResume: () => void;
  onSpeedChange: () => void;
  onFinish: () => void;
};

export const SimulationControls = ({
  isSimulating,
  isGameOver,
  simulationSpeed,
  onPause,
  onResume,
  onSpeedChange,
  onFinish
}: SimulationControlsProps) => {
  return (
    <HStack>
      {!isGameOver ? (
        <>
          {isSimulating ? (
            <Button
              colorScheme="yellow"
              onClick={onPause}
            >
              Pausar
            </Button>
          ) : (
            <Button
              colorScheme="green"
              onClick={onResume}
            >
              Continuar
            </Button>
          )}

          <Button
            leftIcon={<TimeIcon />}
            onClick={onSpeedChange}
            variant="outline"
            colorScheme="whiteAlpha"
          >
            {simulationSpeed}x
          </Button>
        </>
      ) : (
        <Button
          colorScheme="blue"
          onClick={onFinish}
        >
          Finalizar Partida
        </Button>
      )}
    </HStack>
  );
};