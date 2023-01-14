// server
const express = require("express");
const path  = require("path");
const port = 8080;
const db = require("./config/mongoose");
const WorkItem = require("./models/workItems");

const app  = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded());

app.get("/",(req,res) =>{

    WorkItem.find({},function(err,workItem){
        if(err){
            console.log("error in feting items form db");
        }
        return res.render("home",{
        title:"TO-DO LIST",
        work_items :workItem,
       })

    })

   // return res.end("hello world !")
})


app.post("/create-item", (req, res) =>{
    WorkItem.create(
        {
            item : req.body.item,
            description : req.body.desc,
        },
        function(err,newworkItem){
            if(err){
                console.group("error in creating the item");
                return;
            }
            return res.redirect("back");

        }
    )
})


app.get("/delete-item/", (req,res) => {
    let id = req.query.id;
    WorkItem.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting")
        }
        return res.redirect("back");
    })
})



app.listen(port,function(err){
    if(err){console.log(err)}
    else{console.log("server running on port : ",port)}
});
