const express = require('express')
const app = express()
const webPush = require('web-push')
const cors = require('cors')
const path = require('path')
const { MongoClient } = require("mongodb");
// s
app.use(express.json())

app.use(cors())


const url = "mongodb+srv://djd:xFyJBEhWmMyL1Aau@cluster0.5ftqt.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
// const publicvidkey ="BKoQKT0Fgo5NBXCQu-YAeCWZAw8dj-HcJnqDyS5qkYBZYGAhrZ7JByt1eFQzdqaCMsQzL95beJfgOiyTK_TRlgg "
// const privatevidkey = "bWlzmatH7YoKfPAzba6NqBAKyFLuDx0OE9tvId4kQk4"
const vapidKeys = {
    publicKey: "BKoQKT0Fgo5NBXCQu-YAeCWZAw8dj-HcJnqDyS5qkYBZYGAhrZ7JByt1eFQzdqaCMsQzL95beJfgOiyTK_TRlgg"
      ,
    privateKey: "bWlzmatH7YoKfPAzba6NqBAKyFLuDx0OE9tvId4kQk4" ,
  };
webPush.setVapidDetails(
    'mailto:web-push-book@gauntface.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
  );


app.post('/subscribe',(req,res)=>{
    




    

async function run() {
    try {
        await client.connect();
        const database = client.db("pushnotification");
        console.log(req.body)
        const haiku = database.collection("subscription");
        const result = await haiku.insertOne(req.body);
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    
}
run()
res.send({"body":"done"})
})
app.post("/sendnotification",(req,res)=>{

    async function run() {
        try {
            await client.connect();
            const database = client.db("pushnotification");
            const haiku = database.collection("subscription");
            const result = await haiku.find({}).toArray();
            console.log("result",result)

            for (let i = 0; i < result.length; i++) {
                const subscription = result[i];
               
                 
                 webPush.sendNotification(subscription, JSON.stringify(req.body))
                
              }
            
        } catch (err) {
            console.log(err.stack);
        }
        
    }
    run()
    res.send({"body":"success"})

})


const port = process.env.PORT || 3000 ;

app.listen(port,()=>{console.log('running on port 3000')})