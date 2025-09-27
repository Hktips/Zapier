import express from "express"
const app=express()
// https:/hooks.zapier.com/hooks/catch/12232323/122123/
app.post("/hooks/catch/:userId/:zapId",(req,res)=>{
    const userId=req.params.userId;
    const zapId=req.params.zapId;
   // store in db new trigger


   //push it on to a queue(radis and kafka)
   

})