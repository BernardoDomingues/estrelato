import { Button, useToast, ButtonProps } from '@chakra-ui/react';
import { useGameSave } from '@/store/recoil/useGameSave';

interface SaveGameButtonProps extends ButtonProps {
  onSaveSuccess?: () => void;
}

export default function SaveGameButton({ onSaveSuccess, ...props }: SaveGameButtonProps) {
  const { saveGame } = useGameSave();
  const toast = useToast();

  const handleSaveGame = () => {
    const success = saveGame();
    
    if (success) {
      toast({
        title: 'Jogo salvo',
        description: 'Seu progresso foi salvo com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } else {
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar o jogo. Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      onClick={handleSaveGame}
      colorScheme="blue"
      leftIcon={<span>💾</span>}
      {...props}
    >
      Salvar Jogo
    </Button>
  );
}