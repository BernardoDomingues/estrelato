import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Team } from '../types/team';
import { teams } from '@/data/teams';
import Match from '@/components/Match';
import { leagues } from '@/data/leagues';

export default function MatchSimulation() {
  const [team, setTeam] = useState<Team | null>(null);
  const [opponent, setOpponent] = useState<Team | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTeamId = localStorage.getItem('teamId');
    
    if (!storedTeamId) {
      router.replace('/');
      return;
    }
    
    const selectedTeam = teams.find(t => t.id === parseInt(storedTeamId));
    if (selectedTeam) {
      setTeam(selectedTeam);
      const nextMatch = leagues[0].fixtures.find(fixture => !fixture.played && fixture.homeTeam.id === selectedTeam.id || fixture.awayTeam.id === selectedTeam.id);
      const rival = nextMatch ? (nextMatch.homeTeam.id === selectedTeam.id ? nextMatch.awayTeam : nextMatch.homeTeam) : null;

      if (rival) {
        setOpponent(rival);
      }
    }
  }, [router]);

  if (team && opponent) return <Match team={team} opponent={opponent} />
}