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
- To simply apply changes without migration protocol, run `npx prisma db push` instead

## Idea Backlog
- streak design for progress pictures: x consequitive pictures -> morph image/flipbook
- extend items/days to items/packs/days, e.g. I would often use a 'coffee & tea' pack and maybe a 'protein shake pack'
- Onboarding: Let the different actions unlock different aspects
- Headline on homepage: "F#%! willpower. Have your cookie. And still lose fat!"
- push notifications + 'if eaten it'
- Spinning wheel:
    - have it slow down slower to build more anticipation
    - add rarity tier to spin elements -> see gold rarity
- talk about transformation, not gamification (validated 3200 research papers)
- reference duolingo again