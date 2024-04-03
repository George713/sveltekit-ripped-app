/*
  Warnings:

  - You are about to drop the column `eatenAmount` on the `FoodItem` table. All the data in the column will be lost.
  - You are about to drop the column `intendedAmount` on the `FoodItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FoodItem" DROP COLUMN "eatenAmount",
DROP COLUMN "intendedAmount";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastPlannedOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastFinishedEatingOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastHarvestOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastWeeklyPicOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD');
