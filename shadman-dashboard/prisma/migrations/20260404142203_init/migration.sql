/*
  Warnings:

  - You are about to drop the column `Status` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "Status",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'under_review';
