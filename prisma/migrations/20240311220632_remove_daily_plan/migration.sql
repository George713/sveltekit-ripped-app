/*
  Warnings:

  - You are about to drop the column `planId` on the `PlannedItem` table. All the data in the column will be lost.
  - You are about to drop the `DailyPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyPlan" DROP CONSTRAINT "DailyPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlannedItem" DROP CONSTRAINT "PlannedItem_planId_fkey";

-- AlterTable
ALTER TABLE "PlannedItem" DROP COLUMN "planId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastPlannedOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastFinishedEatingOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastHarvestOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastWeeklyPicOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD');

-- DropTable
DROP TABLE "DailyPlan";
