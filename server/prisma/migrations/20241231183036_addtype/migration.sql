/*
  Warnings:

  - The values [POST,COMMENT] on the enum `postType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "postType_new" AS ENUM ('post', 'comment');
ALTER TABLE "posts" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "posts" ALTER COLUMN "type" TYPE "postType_new" USING ("type"::text::"postType_new");
ALTER TYPE "postType" RENAME TO "postType_old";
ALTER TYPE "postType_new" RENAME TO "postType";
DROP TYPE "postType_old";
ALTER TABLE "posts" ALTER COLUMN "type" SET DEFAULT 'post';
COMMIT;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "type" SET DEFAULT 'post';
