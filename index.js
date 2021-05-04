const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ThingSpeakClient = require('thingspeakclient');
const port = process.env.PORT || 4000; 

const app = express();
const client = new ThingSpeakClient();


client.attachChannel(channelId, { writeKey:'yourWriteKey', readKey:'yourReadKey'}, (err, response)=>{
    if(!err){
        console.log(`Connected the client at ${channelId}`);
        console.log(response);
    }
    else {
        console.error(err);
    }
});

client.getFieldFeed(channelId, fieldId, query, (err,response)=>{
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