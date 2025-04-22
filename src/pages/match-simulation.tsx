import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Text, Flex, Spinner } from '@chakra-ui/react';
import { Team } from '@/types/team';
import Match from '@/components/Match';
import { teams } from '@/data/teams';
import { gameSettingsState, matchTeamsState } from '@/atoms/gameAtoms';
import { useRecoilValue } from 'recoil';

const fetchTeam = async (teamId: number): Promise<Team | null> => {
  return teams.find((team) => team.id === teamId) || null;
};

export default function MatchSimulation() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState<Team | null>(null);
  const [opponent, setOpponent] = useState<Team | null>(null);
  const getMatchTeamsState = useRecoilValue(matchTeamsState);
  const gameSettings = useRecoilValue(gameSettingsState);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { teamId, opponentId } = getMatchTeamsState;
    
        if (!teamId || !opponentId) {
          throw new Error('Team ID or Opponent ID is missing');
        };

        const [teamData, opponentData] = await Promise.all([
          fetchTeam(teamId),
          fetchTeam(opponentId)
        ]);

        setTeam(teamData);
        setOpponent(opponentData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados da partida:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Spinner size="xl" />
        <Text ml={4}>Carregando simulação da partida...</Text>
      </Flex>
    );
  }

  if (!gameSettings) {
    return (
      <Flex height="100vh" align="center" justify="center" direction="column">
        <Text mb={4}>Configurações da partida não encontradas.</Text>
        <button onClick={() => router.push('/dashboard')}>Voltar para o Dashboard</button>
      </Flex>
    );
  }

  if (team && opponent) {
    return (
      <Match team={team} opponent={opponent} />
    );
  }
}