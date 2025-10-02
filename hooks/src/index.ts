import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import express, { Request, Response } from "express";
const client = new PrismaClient();
const app = express()        
app.use(express.json());

// https:/hooks.zapier.com/hooks/catch/12232323/122123/
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    // store in db new trigger
 await client.$transaction(async (tx: Prisma.TransactionClient) => {
  const run = await tx.zapRun.create({
    data: {
      zapId: zapId,
      metadata: body,
    },
  });

  await tx.zapRunOutbox.create({
    data: {
      zapRunId: run.id,
    },
  });
});


    res.json({message: "successs fully recived"})

})
app.listen(3000, () => {
    console.log("server listen on 3000 port");
})