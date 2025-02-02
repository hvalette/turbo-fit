/*
  Warnings:

  - Added the required column `success` to the `ChallengeActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChallengeActivity" ADD COLUMN     "success" BOOLEAN NOT NULL;
