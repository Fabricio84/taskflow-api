/*
  Warnings:

  - You are about to drop the column `data_limite` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "data_limite",
ADD COLUMN     "dataLimite" TIMESTAMP(3);
