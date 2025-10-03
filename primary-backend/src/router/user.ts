import {Router} from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { PrismaClient } from "../db";
import jwt from "jsonwebtoken"
const router = Router();

router.post("/signup",async (req , res)=>{
    const body=req.body.username;
    const parsedData=SignupSchema.safeParse(body);
    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
    const userExit= await PrismaClient.user.findFirst({
        where:{
            email:parsedData.data.username
        }
    });
   if(userExit){
    return res.status(403).json({
        messae:"user alrady exists"
    })
   }
   await PrismaClient.user.create({
    data:{
        email:parsedData.data.username,
        //dont storte passwords in pain text, hash it
        password: parsedData.data.password,
        name:parsedData.data.name

    }
   })
   //await sendEmail();
   return res.json({
    message:"please verify your account by checking your email"
   });

})

router.post("/signin",async(req, res)=>{
    const body=req.body.username;
    const parsedData=SigninSchema.safeParse(body);
    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const user=await PrismaClient.user.findFirst({
        where:{
            email:parsedData.data.username,
            pasword: parsedData.data.password
        }
    })
    if(!user){
        return res.status(403).json({
            message:"Sorry credentials are incorrect"
        });
    }
    const token = jwt.sign({
        id:user.id

    }, JWT_PASSWORD);
    res.json({
        token:token,
    })
})


router.get("/user",authMiddleware,async(req,res)=>{
    const id =req.id;
    const user=await PrismaClient.user.findFirst({
        where:{
            id
        },
        select:{
            name:true,
            email:true
        }
    })
    return res.json({
        user
    });
})

export const zapRouter=router;