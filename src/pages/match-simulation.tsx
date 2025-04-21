import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Team } from '../types/team';
import Match from '@/components/Match';
import { useGameSave } from '@/store/recoil';

export default function MatchSimulation() {
  const [opponent, setOpponent] = useState<Team | null>(null);
  const router = useRouter();
  const { hasSavedGame, gameState, getNextRival } = useGameSave();
  const { team } = gameState;

  useEffect(() => {
    if (!hasSavedGame()) {
      router.replace('/');
      return;
    }

    if (team) {
      const rival = getNextRival();

      if (rival) {
        setOpponent(rival);
      }
    }
  }, []);

  if (team && opponent) return <Match team={team} opponent={opponent} />
}