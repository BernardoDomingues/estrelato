import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGameSave } from '@/store/recoil/useGameSave';

const SavedGameChecker = () => {
  const router = useRouter();
  const { hasSavedGame, loadGame } = useGameSave();

  useEffect(() => {
    if (hasSavedGame() && loadGame()) {
      router.push('/dashboard');
    }
  }, []);

  return null;
};

export default SavedGameChecker;