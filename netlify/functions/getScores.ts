import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { cfdbKey } from '../../secrets/cfdb';
import { env } from 'process';

const url = 'https://api.collegefootballdata.com/games?year=2021&team=Nebraska';

const handler: Handler = async () => {
  return fetch(url, { headers: { Accept: 'application/json', Authorization: env.cfdbKey } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({ statusCode: 422, body: error }));
};

export { handler };
