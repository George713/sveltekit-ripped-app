-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastPlannedOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastFinishedEatingOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastHarvestOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD'),
ALTER COLUMN "lastWeeklyPicOn" SET DEFAULT to_date('1970-01-01', 'YYYY-MM-DD');

-- CreateTable
CREATE TABLE "DailyPlan" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DailyPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannedItem" (
    "id" SERIAL NOT NULL,
    "eaten" BOOLEAN NOT NULL DEFAULT false,
    "foodId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,

    CONSTRAINT "PlannedItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyPlan" ADD CONSTRAINT "DailyPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedItem" ADD CONSTRAINT "PlannedItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedItem" ADD CONSTRAINT "PlannedItem_planId_fkey" FOREIGN KEY ("planId") REFERENCES "DailyPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
