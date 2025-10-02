/*
  Warnings:

  - You are about to drop the `AvailableTrigers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `triggerType` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Trigger" DROP CONSTRAINT "Trigger_triggerId_fkey";

-- AlterTable
ALTER TABLE "public"."Trigger" ADD COLUMN     "triggerType" "public"."TRIGGER" NOT NULL;

-- AlterTable
ALTER TABLE "public"."ZapRun" ADD CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."ZapRun_id_key";

-- DropTable
DROP TABLE "public"."AvailableTrigers";

-- CreateTable
CREATE TABLE "public"."AvailableTrigger" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "public"."AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
