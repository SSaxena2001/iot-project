const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ThingSpeakClient = require('thingspeakclient');
const port = process.env.PORT || 4000; 

const app = express();
const client = new ThingSpeakClient();
app.use(express.json());

const channelid=12397; //Public Channel is being used for now. 
const fieldId=1;
//Attaching channel is not nessesary for Public Channel.
client.attachChannel(12397, (err, response)=>{
    if(!err){
        console.log(`Connected the client at ${channelid}`);
        console.log(response);
    }
    else {
        console.error(err);
    }
});

client.getLastEntryInFieldFeed(12397,fieldId,(err,response)=>{
    if(!err){
        console.log(`Getting the data for ${fieldId}`);
        console.log(response);
    }
    else {
        console.error(err);
    }
});


app.listen(port,()=>{
    console.log(`Listening at https://localhost:${port}`);
})