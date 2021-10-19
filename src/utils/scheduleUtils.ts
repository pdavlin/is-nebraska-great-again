import fetch from "node-fetch";
import "dotenv/config";
import { format, isPast, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { WinsAndRemainingGames } from "./types";

const url = "https://api.collegefootballdata.com/games?year=2021&team=Nebraska";

const getCfdbKey = (): string => process.env.CFDB_KEY;

const organizeAsHuskerAndOpponentScores = (schedule) => {
  return schedule.map((game) =>
    game.home_team === "Nebraska"
      ? { huskerScore: game.home_points, opponentScore: game.away_points }
      : { huskerScore: game.away_points, opponentScore: game.home_points }
  );
};

export const computeNumberOfWinsAndRemainingGames = (
  schedule
): WinsAndRemainingGames => {
  const organizedSchedule = organizeAsHuskerAndOpponentScores(schedule);
  return {
    wins: organizedSchedule
      .map((game) => game.huskerScore && game.huskerScore > game.opponentScore)
      .reduce((acc, curr) => acc + curr),
    remainingGames: organizedSchedule
      .map((game) => !!game.huskerScore)
      .reduce((acc, curr) => acc + curr),
  };
};

export const fetchScores = async () => {
  const res = await fetch(url, {
    headers: {
      Authorization: getCfdbKey(),
    },
  });
  const data = await res.json();
  return data;
};

export const dateInPast = (date: string) => {
  // console.log("dateInPast");
  return isPast(parseISO(date));
};

export const formatWinLossString = (
  home_team: string,
  home_points: number,
  away_points: number
) =>
  home_team === "Nebraska"
    ? home_points > away_points
      ? `W ${home_points}-${away_points}`
      : `L ${home_points}-${away_points}`
    : away_points > home_points
    ? `W ${away_points}-${home_points}`
    : `L ${away_points}-${home_points}`;

export const getGameTimeFromString = (game) => {
  // console.log("getGameTimeFromString");
  return format(
    utcToZonedTime(parseISO(game.start_date), "America/Chicago"),
    game.start_time_tbd ? "MM/dd" : "MM/dd h:mmaaaaa"
  );
};

export const bowlIneligible = (warg: WinsAndRemainingGames): boolean =>
  6 - warg.wins > warg.remainingGames;

export const getRandomNoMessage = (warg: WinsAndRemainingGames): string =>
  bowlIneligible(warg)
    ? "Not in 2021."
    : ["Not yet.", "No, fam.", "Nope!", "*sigh...*", "Try next week."][
        Math.floor(Math.random() * 5)
      ];
