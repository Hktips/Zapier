import express from "express"
import { zapRouter } from "./router/user";
import { userRouter } from "./router/zap";
import cors from "cors";
const app=express()
app.use(express.json());
app.use(cors())
app.use("/api/v1/user/user",userRouter);
app.use("/api/v1/zap",zapRouter);