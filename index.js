const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const ThingSpeakClient = require("thingspeakclient");
const client = new ThingSpeakClient();
const port = process.env.PORT || 4000;
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyparser.urlencoded({
    extended: true
}));

const channelid = 709806; //Public Channel is being used for now.
const fieldId = 1;
//Attaching channel is not neccessary for Public Channel.
client.attachChannel(channelid, (err, response) => {
    if (!err) {
        console.log(`Connected the client at ${channelid}`);
        console.log(response);
    } else {
        console.error(err);
    }
});

var fieldData;
const getFieldData = () => {
    client.getLastEntryInFieldFeed(channelid, fieldId, (err, response) => {
        if (!err) {
            console.log(`Getting the data for ${fieldId}`);
            fieldData = response;
            console.log(fieldData);
        } else {
            console.error(err);
        }
    });
}

const validation = (email, pass) => {
    const emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passregex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (email.match(emailregex)) {
        if (pass.match(passregex)) {
            return "Success";
        } else {
            return "Wrong Password, Try Again!";
        }
    } else {
        return "Wrong Password or Email, Try Again!";
    }
}
app.get("/", (req, res) => {
    res.render("login", {
        LoginStatus: "",
    });
});

app.get("/logs", (req, res) => {
    getFieldData();
    if (!fieldData) {
        res.render("index", {
            motion: "No Motion Detected",
        });
    } else {
        res.render("index", {
            motion: fieldData.field1,
        });
    }
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        getFieldData();
    }
});

app.post("/", (req, res) => {
    const email = req.body.user;
    const pass = req.body.pass;
    const validate = validation(email, pass);
    if (validate === "Success") {
        res.redirect("/logs");
    } else {
        res.render('/', {
            LoginStatus: validate,
        })
    }
});

app.listen(port, () => {
    console.log(`Listening at httpnpm ://localhost:${port}`);
});