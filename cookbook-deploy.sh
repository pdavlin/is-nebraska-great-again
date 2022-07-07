cd "$(dirname "$0")";
npm run build
docker build -t is-nebraska-great-again .
docker-compose up -d --remove-orphans --force-recreate
# docker image prune -f
