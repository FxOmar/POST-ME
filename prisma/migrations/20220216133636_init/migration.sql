/*
  Warnings:

  - You are about to alter the column `likes` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `likes` INTEGER NULL;
