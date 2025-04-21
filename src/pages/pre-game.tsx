import PreGameSection from "@/components/PreGameSection";
import { useGameSave } from "@/store/recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PreGame() {
  const router = useRouter()
  const { hasSavedGame, gameState, getNextRival } = useGameSave();
  const { team } = gameState;
  const rival = getNextRival();

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