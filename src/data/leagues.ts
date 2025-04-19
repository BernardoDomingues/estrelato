import { League } from "@/types/league";
import { teams } from "./teams";

export const leagues: Array<League> = [{
  id: 1,
  name: "Brasileirão",
  country: "Brazil",
  teams: [...teams],
}];