import { env } from "process";
import fetch from 'node-fetch';
import "dotenv/config";

const url = "https://api.collegefootballdata.com/games?year=2021&team=Nebraska";

const getCfdbKey = (): string => {
  return process.env.CFDB_KEY;
};

export const fetchScores = async () => {
  getCfdbKey();
  const res = await fetch(url, {
    headers: {
      Authorization: getCfdbKey(),
    },
  });
  const data = await res.json();
  return data;
};

export const dateInPast = (date: string) => {
  const today = new Date();
  const gameDate = new Date(date);
  return gameDate < today;
};

export const getGameTimeFromString = (game) => {
  const startDate = game.start_date;
  const tbd = game.start_time_tbd;
  const gameDate = new Date(startDate);
  let output = gameDate
    .toLocaleDateString("en-US", { timeZone: "GMT" })
    .slice(0, -5);
  if (!tbd)
    output = output.concat(" ").concat(
      gameDate
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
        .slice(0, -3)
    );
  return output;
};

export const nebraskaWon = (
  home_team: string,
  home_points: number,
  away_points: number
) =>
  home_team === "Nebraska"
    ? away_points < home_points
    : home_points < away_points;

export const computeNumberOfWins = (schedule): number => {
  return schedule
    .map((game) =>
      game.home_team === "Nebraska"
        ? { huskerScore: game.home_points, opponentScore: game.away_points }
        : { huskerScore: game.away_points, opponentScore: game.home_points }
    )
    .map((game) => game.huskerScore && game.huskerScore > game.opponentScore)
    .reduce((acc, curr) => acc + curr);
};
