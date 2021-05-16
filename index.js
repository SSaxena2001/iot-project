const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const ThingSpeakClient = require('thingspeakclient');
const client = new ThingSpeakClient();
const port = process.env.PORT || 4000; 
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended: true}));

const channelid=12397; //Public Channel is being used for now. 
const fieldId=1;
//Attaching channel is not neccessary for Public Channel.
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

setTimeout(() => {
    client.getLastEntryInFieldFeed(12397,fieldId,(err,response)=>{
        if(!err){
            console.log(`Getting the data for ${fieldId}`);
            fieldData=response;
            console.log(fieldData);
        }
        else {
            console.error(err);
        }
    });
}, 10000);



app.get('/', (req, res)=>{
    res.render('login');
});

app.get('/logs', (req, res)=>{
    if(!fieldData){
        res.render('index',{
            motion: "No Motion Detected",
        });
    } else {
        res.render('index',{
            motion: fieldData.field1,
        });
    }
});

app.post('/',(req, res)=>{
    console.log(req.body);
    res.redirect('/logs'); 
});

app.listen(port,()=>{
    console.log(`Listening at https://localhost:${port}`);
})