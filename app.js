const apiKey = "a4eb999802c63cfbfdee3872f3529cb1";
const https = require('https');
// const inputCity = "";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/front.html");   
});

app.post("/input", function(req,res)
{
    console.log(req.body);
    const inputCity = req.body.place;
    const resUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + apiKey;
    https.get(resUrl, function(ress) {

        // A chunk of data has been received.
        // console.log(ress);
        ress.on("data", function(resh){
            //console.log(JSON.parse(resh).main.temp);
            console.log(JSON.parse(resh));
            console.log(JSON.parse(resh).coord);
            console.log(JSON.parse(resh).weather.main);
            const cond=JSON.parse(resh).weather.main;
            console.log(cond);
        });
        // The whole response has been received. Print out the result.
    });
    const resUrl2="https://api.openweathermap.org/data/2.5/forecast?q="+ inputCity + "&appid=" + apiKey;
    https.get(resUrl2,function(ress2){
        ress2.on("data",function(resh2)
        {
            //console.log(JSON.parse(resh2).main.temp);
        })
    });

});



app.listen(3001,function(){});

