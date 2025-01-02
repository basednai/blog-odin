/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "postType" AS ENUM ('POST', 'COMMENT');

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parentCommentID_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postID_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "parentId" TEXT;

-- DropTable
DROP TABLE "comments";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
