interface HuskerSchedule {
    date: string;
    away: boolean;
    opponentName: string;
    opponentScore?: number;
    huskerScore?: number;
}

export const huskerSchedule: HuskerSchedule[] = [
    {date: '8/28', away: true, opponentName: 'Illinois', opponentScore: 30, huskerScore: 22},
    {date: '9/4', away: false, opponentName: 'Fordham', opponentScore: 7, huskerScore: 52},
    {date: '9/11', away: false, opponentName: 'Buffalo', opponentScore: 3, huskerScore: 28},
    {date: '9/18', away: true, opponentName: 'Oklahoma'},
    {date: '9/25', away: true, opponentName: 'Michigan State'},
    {date: '10/2', away: false, opponentName: 'Northwestern'},
    {date: '10/9', away: false, opponentName: 'Michigan'},
    {date: '10/16', away: true, opponentName: 'Minnesota'},
    {date: '10/30', away: false, opponentName: 'Purdue'},
    {date: '11/6', away: false, opponentName: 'Ohio State'},
    {date: '11/20', away: true, opponentName: 'Wisconsin'},
    {date: '11/26', away: false, opponentName: 'Iowa'}
]