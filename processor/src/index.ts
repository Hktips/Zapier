import express from "express";
import {PrismaClient} from "@prisma/client";
import {kafka} from "kafkajs";
const TOPIC_NAME= new PrismaClient();
const client=new PrismaClient();
const client=new kafka({
    clientId: "outbox-processor",
    brocker: ['localhost']
})
const app=express();
async function main(){
    const producer=kafka.producer()
    await producer.connect();
app.post("",()=>{

})
while(1){
    const pendingRows=await client.zapRunOutbox.findMany({ 
        where:{},
        take: 10
    }
    )
    producer.send({
        topic:TOPIC_NAME,
        MESSAGES: pendingRows.map( r=>{
           return{
           value: r.zapRunId
           }
            
        })
    })
    await client.zapRunOutbox.delete({
        where:{
             id:{
                in:pendingRows.map(x=>x.id)
            }
        }
    })
}
}
main();