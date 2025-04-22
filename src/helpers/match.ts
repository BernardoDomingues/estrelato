import { GameState } from "@/store/recoil";
import { GameEvent } from "@/types/game-event";
import { Fixture } from "@/types/league";
import { cloneDeep } from "lodash";

const simulateOtherMatches = (updatedGameState: GameState, nextMatch: Fixture): GameState => {
  const cloneGameState = cloneDeep(updatedGameState);

  const unplayedFixtures = cloneGameState.league.fixtures.filter(fixture => {
    return !fixture.played && fixture.matchday === nextMatch.matchday && fixture.id !== nextMatch.id;
  });

  unplayedFixtures.forEach((fixture) => {
    // Calcula a força relativa dos times com base na classificação ou força do time
    const homeTeamStanding = cloneGameState.league.standings.find(s => s.team.id === fixture.homeTeam.id);
    const awayTeamStanding = cloneGameState.league.standings.find(s => s.team.id === fixture.awayTeam.id);
    
    if (!homeTeamStanding || !awayTeamStanding) return;
    
    // Fator de vantagem para o time da casa
    const homeAdvantage = 0.2;
    
    // Calcula a força relativa dos times (usando pontos + fator de casa)
    const homeStrength = homeTeamStanding.points + homeAdvantage;
    const awayStrength = awayTeamStanding.points;
    
    // Calcula a probabilidade de gols com base na força dos times
    // Times mais fortes têm maior probabilidade de marcar mais gols
    const homeExpectedGoals = 1 + (homeStrength / 20);
    const awayExpectedGoals = 0.7 + (awayStrength / 25);
    
    // Gera resultados aleatórios com base nas probabilidades
    const homeGoals = Math.max(0, Math.round(homeExpectedGoals * Math.random() * 2));
    const awayGoals = Math.max(0, Math.round(awayExpectedGoals * Math.random() * 2));
    
    // Atualiza a partida como jogada
    const fixtureIndex = cloneGameState.league.fixtures.findIndex(f => f.id === fixture.id);
    cloneGameState.league.fixtures[fixtureIndex].played = true;
    cloneGameState.league.fixtures[fixtureIndex].result = { 
      events: [], // Sem eventos simulados
      homeGoals, 
      awayGoals 
    };
    
    // Atualiza a tabela de classificação
    const homeStandingIndex = cloneGameState.league.standings.findIndex(s => s.team.id === fixture.homeTeam.id);
    const awayStandingIndex = cloneGameState.league.standings.findIndex(s => s.team.id === fixture.awayTeam.id);
    
    // Atualiza jogos disputados
    cloneGameState.league.standings[homeStandingIndex].played++;
    cloneGameState.league.standings[awayStandingIndex].played++;
    
    // Atualiza gols marcados e sofridos
    cloneGameState.league.standings[homeStandingIndex].goalsFor += homeGoals;
    cloneGameState.league.standings[homeStandingIndex].goalsAgainst += awayGoals;
    cloneGameState.league.standings[awayStandingIndex].goalsFor += awayGoals;
    cloneGameState.league.standings[awayStandingIndex].goalsAgainst += homeGoals;
    
    // Atualiza saldo de gols
    cloneGameState.league.standings[homeStandingIndex].goalDifference = 
      cloneGameState.league.standings[homeStandingIndex].goalsFor - 
      cloneGameState.league.standings[homeStandingIndex].goalsAgainst;
    
    cloneGameState.league.standings[awayStandingIndex].goalDifference = 
      cloneGameState.league.standings[awayStandingIndex].goalsFor - 
      cloneGameState.league.standings[awayStandingIndex].goalsAgainst;
    
    // Atualiza vitórias, empates, derrotas e pontos
    if (homeGoals > awayGoals) {
      // Vitória do time da casa
      cloneGameState.league.standings[homeStandingIndex].won++;
      cloneGameState.league.standings[homeStandingIndex].points += 3;
      cloneGameState.league.standings[homeStandingIndex].form.push('W');
      cloneGameState.league.standings[awayStandingIndex].lost++;
      cloneGameState.league.standings[awayStandingIndex].form.push('L');
    } else if (homeGoals < awayGoals) {
      // Vitória do time visitante
      cloneGameState.league.standings[awayStandingIndex].won++;
      cloneGameState.league.standings[awayStandingIndex].points += 3;
      cloneGameState.league.standings[awayStandingIndex].form.push('W');
      cloneGameState.league.standings[homeStandingIndex].lost++;
      cloneGameState.league.standings[homeStandingIndex].form.push('L');
    } else {
      // Empate
      cloneGameState.league.standings[homeStandingIndex].drawn++;
      cloneGameState.league.standings[homeStandingIndex].points += 1;
      cloneGameState.league.standings[homeStandingIndex].form.push('D');
      cloneGameState.league.standings[awayStandingIndex].drawn++;
      cloneGameState.league.standings[awayStandingIndex].points += 1;
      cloneGameState.league.standings[awayStandingIndex].form.push('D');
    }
  });
  
  return cloneGameState;
};


export const finishMatch = (
  gameState: GameState,
  nextMatch: Fixture,
  fixtureId: number,
  events: GameEvent[],
  homeGoals: number,
  awayGoals: number,
  homeTeamId: number,
  awayTeamId: number
): GameState => {
  const cloneGameState = cloneDeep(gameState);

  const findIndex = cloneGameState.league.fixtures.findIndex((fixture) => fixture.id === fixtureId);
  cloneGameState.league.fixtures[findIndex].result = { events, homeGoals, awayGoals};
  cloneGameState.league.fixtures[findIndex].played = true;

  const homeStandingIndex = cloneGameState.league.standings.findIndex((standing) => standing.team.id === homeTeamId);
  const awayStandingIndex = cloneGameState.league.standings.findIndex((standing) => standing.team.id === awayTeamId);
  
  // Update matches played for both teams
  cloneGameState.league.standings[homeStandingIndex].played++;
  cloneGameState.league.standings[awayStandingIndex].played++;
  
  // Update goals for and against
  cloneGameState.league.standings[homeStandingIndex].goalsFor += homeGoals;
  cloneGameState.league.standings[homeStandingIndex].goalsAgainst += awayGoals;
  cloneGameState.league.standings[awayStandingIndex].goalsFor += awayGoals;
  cloneGameState.league.standings[awayStandingIndex].goalsAgainst += homeGoals;
  
  // Update goal difference
  cloneGameState.league.standings[homeStandingIndex].goalDifference = 
    cloneGameState.league.standings[homeStandingIndex].goalsFor - 
    cloneGameState.league.standings[homeStandingIndex].goalsAgainst;
  
  cloneGameState.league.standings[awayStandingIndex].goalDifference = 
    cloneGameState.league.standings[awayStandingIndex].goalsFor - 
    cloneGameState.league.standings[awayStandingIndex].goalsAgainst;
  
  // Update wins, draws, losses and points
  if (homeGoals > awayGoals) {
    // Home team wins
    cloneGameState.league.standings[homeStandingIndex].won++;
    cloneGameState.league.standings[homeStandingIndex].points += 3;
    cloneGameState.league.standings[homeStandingIndex].form.push('W');
    cloneGameState.league.standings[awayStandingIndex].lost++;
    cloneGameState.league.standings[awayStandingIndex].form.push('L');
  } else if (homeGoals < awayGoals) {
    // Away team wins
    cloneGameState.league.standings[awayStandingIndex].won++;
    cloneGameState.league.standings[awayStandingIndex].points += 3;
    cloneGameState.league.standings[awayStandingIndex].form.push('W');
    cloneGameState.league.standings[homeStandingIndex].lost++;
    cloneGameState.league.standings[homeStandingIndex].form.push('L');
  } else {
    // Draw
    cloneGameState.league.standings[homeStandingIndex].drawn++;
    cloneGameState.league.standings[homeStandingIndex].points += 1;
    cloneGameState.league.standings[homeStandingIndex].form.push('D');
    cloneGameState.league.standings[awayStandingIndex].drawn++;
    cloneGameState.league.standings[awayStandingIndex].points += 1;
    cloneGameState.league.standings[awayStandingIndex].form.push('D');
  }

  return simulateOtherMatches(cloneGameState, nextMatch);
}