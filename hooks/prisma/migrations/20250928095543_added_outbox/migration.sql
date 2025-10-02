-- CreateTable
CREATE TABLE "public"."ZapRun" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "public"."ZapRunOutbox" (
    "id" TEXT NOT NULL,
    "zapRunId" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRun_id_key" ON "public"."ZapRun"("id");

-- AddForeignKey
ALTER TABLE "public"."ZapRun" ADD CONSTRAINT "ZapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "public"."Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "public"."ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
