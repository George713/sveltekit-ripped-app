/*
  Warnings:

  - You are about to drop the column `dailyEaten` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyEaten",
ADD COLUMN     "lastFinishedEatingOn" TIMESTAMP(3) NOT NULL DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastPlannedOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD');
