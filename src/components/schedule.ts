interface HuskerSchedule {
  date: string;
  away: boolean;
  opponentName: string;
  opponentScore?: number;
  huskerScore?: number;
}

let schedule;

export const localWins = 2;

export const getSchedule = async () => {
  if (!!!schedule)
    schedule = fetch('/.netlify/functions/getScores').then((response) =>
      response.json()
    );
  return schedule;
};

export const localSchedule = [
  {
    start_date: '2021-08-28T17:20:00.000Z',
    start_time_tbd: false,
    home_team: 'Illinois',
    home_points: 30,
    away_team: 'Nebraska',
    away_points: 22,
  },
  {
    start_date: '2021-09-04T16:00:00.000Z',
    start_time_tbd: false,
    home_team: 'Nebraska',
    home_points: 52,
    away_team: 'Fordham',
    away_points: 7,
  },
  {
    start_date: '2021-09-11T19:30:00.000Z',
    start_time_tbd: false,
    home_team: 'Nebraska',
    home_points: 28,
    away_team: 'Buffalo',
    away_points: 3,
  },
  {
    start_date: '2021-09-18T11:00:00.000Z',
    start_time_tbd: false,
    home_team: 'Oklahoma',
    home_points: null,
    away_team: 'Nebraska',
    away_points: null,
  },
  {
    start_date: '2021-09-25T04:00:00.000Z',
    start_time_tbd: true,
    home_team: 'Michigan State',
    home_points: null,
    away_team: 'Nebraska',
    away_points: null,
  },
  {
    start_date: '2021-10-02T17:30:00.000Z',
    start_time_tbd: false,
    home_team: 'Nebraska',
    home_points: null,
    away_team: 'Northwestern',
    away_points: null,
  },
  {
    start_date: '2021-10-09T04:00:00.000Z',
    start_time_tbd: true,
    home_team: 'Nebraska',
    home_points: null,
    away_team: 'Michigan',
    away_points: null,
  },
  {
    start_date: '2021-10-16T04:00:00.000Z',
    start_time_tbd: true,
    home_team: 'Minnesota',
    home_points: null,
    away_team: 'Nebraska',
    away_points: null,
  },
  {
    start_date: '2021-10-30T04:00:00.000Z',
    start_time_tbd: true,
    home_team: 'Nebraska',
    home_points: null,
    away_team: 'Purdue',
    away_points: null,
  },
  {
    start_date: '2021-11-06T04:00:00.000Z',
    start_time_tbd: true,
    home_team: 'Nebraska',
    home_points: null,
    away_team: 'Ohio State',
    away_points: null,
  },
  {
    start_date: '2021-11-20T05:00:00.000Z',
    start_time_tbd: true,
    home_team: 'Wisconsin',
    home_points: null,
    away_team: 'Nebraska',
    away_points: null,
  },
  {
    start_date: '2021-11-26T12:30:00.000Z',
    start_time_tbd: false,
    home_team: 'Nebraska',
    home_points: null,
    away_team: 'Iowa',
    away_points: null,
  },
];
