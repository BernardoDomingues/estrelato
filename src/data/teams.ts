import { Team } from "@/types/team";
import { players } from "./players";

export const teams: Array<Team> = [
  {
    id: 135,
    name: "Cruzeiro",
    shortName: "CRU",
    city: "Belo Horizonte",
    country: "Brazil",
    founded: new Date(1921, 0, 1),
    players: [...players[0]],
    finances: {
      transferBudget: 0,
      wageBudget: 0,
    },
    facilities: {
      stadium: {
        name: "Mineirão",
        capacity: 62170,
        condition: 0,
      },
    },
    colors: {
      primary: "#0000FF",
      secondary: "#FFFFFF",
    },
  },
  {
    id: 1062,
    name: "Atletico-MG",
    shortName: "CAM",
    city: "Belo Horizonte",
    country: "Brazil",
    founded: new Date(1908, 0, 1),
    players: [...players[1]],
    finances: {
      transferBudget: 0,
      wageBudget: 0,
    },
    facilities: {
      stadium: {
        name: "Arena MRV",
        capacity: 47465,
        condition: 0,
      },
    },
    colors: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
  },
  {
    id: 121,
    name: "Palmeiras",
    shortName: "PAL",
    city: "São Paulo",
    country: "Brazil",
    founded: new Date(1914, 0, 1),
    players: [...players[2]],
    finances: {
      transferBudget: 0,
      wageBudget: 0,
    },
    facilities: {
      stadium: {
        name: "Allianz Parque",
        capacity: 43713,
        condition: 0,
      },
    },
    colors: {
      primary: "#008000",
      secondary: "#FFFFFF",
    },
  },
  {
    id: 119,
    name: "Internacional",
    shortName: "INT",
    city: "Porto Alegre",
    country: "Brazil",
    founded: new Date(1909, 0, 1),
    players: [...players[3]],
    finances: {
      transferBudget: 0,
      wageBudget: 0,
    },
    facilities: {
      stadium: {
        name: "Beira Rio",
        capacity: 50128,
        condition: 0,
      },
    },
    colors: {
      primary: "#BA0C2F",
      secondary: "#FFFFFF",
    },
  },
];
