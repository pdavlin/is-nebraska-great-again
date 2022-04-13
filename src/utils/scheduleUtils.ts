import fetch from "node-fetch";
import "dotenv/config";
import { format, isPast, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { WinsAndRemainingGames } from "./types";

const url = "https://api.collegefootballdata.com/games?year=2022&team=Nebraska";

const getCfdbKey = (): string => process.env.CFDB_KEY;

const organizeAsHuskerAndOpponentScores = (schedule) =>
  schedule.map((game) =>
    game.home_team === "Nebraska"
      ? { huskerScore: game.home_points, opponentScore: game.away_points }
      : { huskerScore: game.away_points, opponentScore: game.home_points }
  );

export const computeNumberOfWinsAndRemainingGames = (
  schedule
): WinsAndRemainingGames => {
  const organizedSchedule = organizeAsHuskerAndOpponentScores(schedule);
  return {
    wins: organizedSchedule
      .map((game) => game.huskerScore && game.huskerScore > game.opponentScore)
      .reduce((acc, curr) => acc + curr),
    remainingGames: organizedSchedule
      .map((game) => (game.huskerScore ? 0 : 1))
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

export const dateInPast = (date: string) => isPast(parseISO(date));
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

export const getGameTimeFromString = (game) =>
  format(
    utcToZonedTime(parseISO(game.start_date), "America/Chicago"),
    game.start_time_tbd ? "MM/dd" : "MM/dd h:mmaaaaa"
  );

export const seasonStarted = (remainingGames: number): boolean =>
  remainingGames < 12;

export const getSubtitle = (warg: WinsAndRemainingGames): string => {
  if (!seasonStarted(warg.remainingGames)) {
    const today = new Date();
    const kickoff = new Date(today.getFullYear(), 7, 26);
    return `${Math.ceil(
      (kickoff.getTime() - today.getTime()) / 86400000
    )} days to kickoff`;
  } else {
    return `${warg.wins} in 2022`;
  }
};

export const bowlIneligible = (warg: WinsAndRemainingGames): boolean =>
  6 - warg.wins > warg.remainingGames;

export const getRandomNoMessage = (warg: WinsAndRemainingGames): string =>
  bowlIneligible(warg) ? "Not in 2022." : "Not Yet.";
