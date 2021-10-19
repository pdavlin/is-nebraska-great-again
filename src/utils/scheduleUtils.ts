import fetch from "node-fetch";
import "dotenv/config";
import { isPast, parseISO } from "date-fns";
import { format } from "date-fns-tz";

const url = "https://api.collegefootballdata.com/games?year=2021&team=Nebraska";

const getCfdbKey = (): string => process.env.CFDB_KEY;

export const computeNumberOfWins = (schedule): number =>
  schedule
    .map((game) =>
      game.home_team === "Nebraska"
        ? { huskerScore: game.home_points, opponentScore: game.away_points }
        : { huskerScore: game.away_points, opponentScore: game.home_points }
    )
    .map((game) => game.huskerScore && game.huskerScore > game.opponentScore)
    .reduce((acc, curr) => acc + curr);

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

export const getGameTimeFromGame = (game) =>
  format(
    parseISO(game.start_date),
    game.start_time_tbd ? "MM/dd" : "MM/dd h:mmaaaaa",
    {timeZone: "America/Chicago"}
  );
