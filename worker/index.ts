import express from "express";
import {PrismaClient} from "@prisma/client";
import {kafka} from "kafkajs";
const TOPIC_NAME= new PrismaClient();
const client=new PrismaClient();
const client=new kafka({
    clientId: "outbox-processor",
    brockers: ['localhost:9092']
})
const app=express();
async function main(){
    const consumer = kafka.consumer({groupId: 'main-worker'})
    await consumer.connect();
    await consumer.subscribe({topic: TOPIC_NAME,fromBeginning: true})
    await consumer.run({
        eachMessage: async ({topic,partition, message})=>{
            console.log({
                partition,
                offset:message.offset,
                value:message.value?.toString(),
            })
            await new Promise(r=> setTimeout(r,1000));
            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partititon: partition,
                offset: message.offset
            }])
        }
    })
while(1){

}

}