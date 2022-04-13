npm run build
docker build -t is-nebraska-great-again .
docker run -it --rm -p 3001:3001 is-nebraska-great-again:latest