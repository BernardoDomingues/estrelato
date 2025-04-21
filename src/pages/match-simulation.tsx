import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Team } from '../types/team';
import Match from '@/components/Match';
import { leagues } from '@/data/leagues';
import { useGameSave } from '@/store/recoil';

export default function MatchSimulation() {
  const [opponent, setOpponent] = useState<Team | null>(null);
  const router = useRouter();
  const { hasSavedGame, gameState } = useGameSave();
  const { team } = gameState;

  useEffect(() => {
    if (!hasSavedGame()) {
      router.replace('/');
      return;
    }

    if (team) {
      const nextMatch = leagues[0].fixtures.find(fixture => !fixture.played && fixture.homeTeam.id === team?.id || fixture.awayTeam.id === team?.id);
      const rival = nextMatch ? (nextMatch.homeTeam.id === team?.id ? nextMatch.awayTeam : nextMatch.homeTeam) : null;

      if (rival) {
        setOpponent(rival);
      }
    }
  }, []);

  if (team && opponent) return <Match team={team} opponent={opponent} />
}