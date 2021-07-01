const apiKey = "a4eb999802c63cfbfdee3872f3529cb1";
const https = require('https');
// const inputCity = "";
const express = require("express");
var expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/front.html");   
});

app.post("/input", function(req,res)
{
    console.log(req.body);
    if(req.body.place=='' || req.body.name=='')
    {
        res.render("front");
    }
    else
    {
        const name=req.body.name;
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
                console.log(temp, typeof(temp))
                if((temp>290 || temp<273) || cond=="Rain")
                {
                    suggestion="Not advised to travell";
                }
                else
                {
                    suggestion="Good condition to  travell";
                }
                console.log(suggestion);
                res.render("result",{Name:name,Cond:cond,Desc:desc,Temp:temp,Feels:feels,Min:min_temp,Max:max_temp,Humidity:humidity,Visibility:visibility,Sugst:suggestion});
            });
            // The whole response has been received. Print out the result.
        });
    }
    
    // const resUrl2="https://api.openweathermap.org/data/2.5/forecast?q="+ inputCity + "&appid=" + apiKey;
    // https.get(resUrl2,function(ress2){
    //     ress2.on("data",function(resh2)
    //     {
    //         console.log(JSON.parse(resh2));
    //     })
    // });

});

// https://api.openweathermap.org/data/2.5/forecast?q=paris&appid=a4eb999802c63cfbfdee3872f3529cb1

app.listen(process.env.PORT || 3001,function(){});

