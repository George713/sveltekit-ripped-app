# Developer Setup

## Prerequisits

- Install node.js (64-bit version) from https://nodejs.org/en/download
- Install pnpm using `npm install -g pnpm`

## Installation

- Use `pnpm install` to install from package.json
- Setup a new database using `npx prisma db push`
- Update `.env` file for access to s3-bucket (ask someone for the credentials)
- Add roles `ADMIN` & `USER` to DB (run `npx prisma studio` and do it manually)

## Running the project

- The app: `pnpm run dev`
- Database viewer: `npx prisma studio`

## Working with prisma

- To update the local prisma client (e.g. when the schema has changed), run `npx prisma generate`
- To migrate db from schema to current, run `npx prisma migrate dev --name ~MIGRATIONNAME~`

## Idea Backlog
- streak design for progress pictures: x consequitive pictures -> morph image
- extend items/days to items/packs/days, e.g. I would often use a 'coffee & tea' pack and maybe a 'protein shake pack'