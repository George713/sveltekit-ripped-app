/*
  Warnings:

  - You are about to drop the column `dailyHarvest` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyHarvest",
ADD COLUMN     "lastHarvestOn" TIMESTAMP(3) NOT NULL DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastPlannedOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastFinishedEatingOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD');
