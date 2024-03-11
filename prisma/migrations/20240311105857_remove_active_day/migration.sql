/*
  Warnings:

  - You are about to drop the column `activeDay` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activeDay",
ALTER COLUMN "lastPlannedOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastFinishedEatingOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastHarvestOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastWeeklyPicOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD');
