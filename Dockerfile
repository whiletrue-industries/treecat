FROM node:lts-bookworm-slim AS frontend

WORKDIR /app
RUN apt-get update
RUN apt-get install -y ca-certificates
COPY dist/treecat/ /app/
CMD node server/server.mjs
EXPOSE 4000