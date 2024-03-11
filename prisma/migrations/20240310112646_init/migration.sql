/*
  Warnings:

  - You are about to drop the column `dailyPlanned` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyPlanned",
ADD COLUMN     "lastPlannedOn" TIMESTAMP(3) NOT NULL DEFAULT to_date('1970-01-01', 'YYYY-MM-DD');
