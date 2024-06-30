/*
  Warnings:

  - You are about to drop the column `userId` on the `Todos` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_userId_fkey";

-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "userId",
ALTER COLUMN "done" DROP NOT NULL;

-- DropTable
DROP TABLE "User";
