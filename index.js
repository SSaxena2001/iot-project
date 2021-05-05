const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ThingSpeakClient = require('thingspeakclient');
const port = process.env.PORT || 4000; 

const app = express();
app.set('view engine', 'ejs');
const client = new ThingSpeakClient();
app.use(express.json());
app.use(express.static('public'));

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

var fieldData;

client.getLastEntryInFieldFeed(12397,fieldId,(err,response)=>{
    if(!err){
        console.log(`Getting the data for ${fieldId}`);
        fieldData=response;
        console.log(fieldData.field1);
    }
    else {
        console.error(err);
    }
});


app.get('/', (req, res)=>{
    res.render('index',{
        entrydata: "No Motion Detected",
    });
});

app.get('/logs', (req, res)=>{
    res.render('index',{
        entrydata: fieldData.field1,
    });
});

app.post('/',(req, res)=>{
    res.redirect('/logs'); 
});

app.listen(port,()=>{
    console.log(`Listening at https://localhost:${port}`);
})