import { useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useGameSave } from '@/store/recoil/useGameSave';

export const useManagerForm = () => {
  const [managerName, setManagerName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { startNewGame } = useGameSave();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!managerName.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Por favor, insira seu nome para continuar.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (!selectedTeamId) {
      toast({
        title: 'Selecione um time',
        description: 'Por favor, selecione um time para continuar.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsLoading(true);

    const success = startNewGame(managerName, parseInt(selectedTeamId));

    if (success) {
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      setIsLoading(false);
      toast({
        title: 'Erro ao iniciar',
        description: 'Ocorreu um erro ao iniciar o jogo. Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    managerName,
    setManagerName,
    selectedTeamId,
    setSelectedTeamId,
    isLoading,
    handleSubmit,
  };
};