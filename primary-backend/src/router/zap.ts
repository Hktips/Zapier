import {Router} from "express";
import { authMiddleware } from "../middleware";
const router=new Router();
router.post("/",authMiddleware,(req,res)=>{
    console.log("create a zap ");
})


router.get("/user",authMiddleware,(req,res)=>{
    console.log("user handler");
})

router.get("/:zapId",authMiddleware,(req,res)=>{
    console.log("user handler");
})


export const userRouter=router;