const apiKey = "a4eb999802c63cfbfdee3872f3529cb1";
const https = require('https');
// const inputCity = "";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs")
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
            //console.log(JSON.parse(resh).weather[0].main);
            const cond=JSON.parse(resh).weather[0].main;
            const desc=JSON.parse(resh).weather[0].description;
            const temp=JSON.parse(resh).main.temp;
            const feels=JSON.parse(resh).main.feels_like;
            const min_temp=JSON.parse(resh).main.temp_min;
            const max_temp=JSON.parse(resh).main.temp_max;
            const humidity=JSON.parse(resh).main.humidity;
            const visibility=JSON.parse(resh).visibility;
            let suggestion="";
            if(temp>305 && temp<273)
            {
                suggestion="Not advised to travell";
            }
            else if(cond=="Rain")
            {
                suggestion="It's rainy today you can't travell just sit in your house and enjoy tea and biscuit.";
            }
            else
            {
                suggestion="Good condition to  travell";
            }
            console.log(suggestion);
        });
        // The whole response has been received. Print out the result.
    });
    // const resUrl2="https://api.openweathermap.org/data/2.5/forecast?q="+ inputCity + "&appid=" + apiKey;
    // https.get(resUrl2,function(ress2){
    //     ress2.on("data",function(resh2)
    //     {
    //         console.log(JSON.parse(resh2));
    //     })
    // });

});

// https://api.openweathermap.org/data/2.5/forecast?q=paris&appid=a4eb999802c63cfbfdee3872f3529cb1

app.listen(3001,function(){});

