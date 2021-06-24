const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded())
app.get("/", function(req,res){
    res.sendFile(__dirname+"/front.html");   
});
app.post("/input",function(req,res)
{
    console.log(req.body);
});
app.listen(3001,function()
{

});