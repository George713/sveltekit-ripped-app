/*
  Warnings:

  - You are about to drop the column `weeklyPic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "weeklyPic",
ADD COLUMN     "lastWeeklyPicOn" TIMESTAMP(3) NOT NULL DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastPlannedOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastFinishedEatingOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastHarvestOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD');
