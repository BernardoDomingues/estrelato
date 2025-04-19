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
        name: "Estádio Governador Magalhães Pinto",
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
    id: 124,
    name: "Fluminense",
    shortName: "FLU",
    city: "Rio de Janeiro",
    country: "Brazil",
    founded: new Date(1902, 0, 1),
    players: [...players[3]],
    finances: {
      transferBudget: 0,
      wageBudget: 0,
    },
    facilities: {
      stadium: {
        name: "Estadio Jornalista Mário Filho (Maracanã)",
        capacity: 78838,
        condition: 0,
      },
    },
    colors: {
      primary: "#800000",
      secondary: "#FFFFFF",
    },
  },
];
