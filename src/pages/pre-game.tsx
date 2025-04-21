import PreGameSection from "@/components/PreGameSection";
import { leagues } from "@/data/leagues";
import { useGameSave } from "@/store/recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PreGame() {
  const router = useRouter()
  const { hasSavedGame, gameState } = useGameSave();
  const { team } = gameState;
  const nextMatch = leagues[0].fixtures.find(fixture => !fixture.played && fixture.homeTeam.id === team?.id || fixture.awayTeam.id === team?.id);
  const rival = nextMatch ? (nextMatch.homeTeam.id === team?.id ? nextMatch.awayTeam : nextMatch.homeTeam) : null;

  useEffect(() => {
    if (!hasSavedGame()) {
      router.replace('/');
      return;
    }
  }, []);

  if (team && rival) {
    return (
      <PreGameSection team={team} opponent={rival} />
    );
  }
}