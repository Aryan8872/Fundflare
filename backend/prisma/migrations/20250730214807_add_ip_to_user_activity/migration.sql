-- AlterTable
ALTER TABLE "UserLog" ADD COLUMN     "ip" TEXT,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 200;
