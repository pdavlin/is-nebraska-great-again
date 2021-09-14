import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const url = 'https://api.collegefootballdata.com/games?year=2021&team=Nebraska';
const key = 'Bearer zQvynJBokwzQKCJgXmet5B7F/b+0IGeID8SmKb5jgc7aP2PPP+YcNb0oGDl5IpNK'

const handler: Handler = async () => {
  return fetch(url, { headers: { Accept: 'application/json', Authorization: key } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};

export { handler };
