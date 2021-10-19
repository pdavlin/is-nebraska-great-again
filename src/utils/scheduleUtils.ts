import fetch from "node-fetch";
import "dotenv/config";

const url = "https://api.collegefootballdata.com/games?year=2021&team=Nebraska";

const getCfdbKey = (): string => {
  return process.env.CFDB_KEY;
};

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
  console.log(`${game.away_team} @ ${game.home_team}`);
  const startDate = game.start_date;
  console.log(startDate);
  const tbd = game.start_time_tbd;
  const gameDate = new Date(startDate);
  let output = gameDate
    .toLocaleDateString("en-US", { timeZone: "America/Chicago" })
    .slice(0, -5);
  if (!tbd)
    output = output.concat(" ").concat(
      gameDate
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Chicago",
        })
        .slice(0, -3)
    );
    console.log(output);
  return output;
};
