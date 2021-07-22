const express= require("express");
const bodyParser= require("body-parser");

const app= express();
const port=3000;

var items=["Buy Food","MaSke Food","Eat Food"];
var workList=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.get("/",function(req,res){

  var today = new Date();
  var currentDay = today.getDay();
  var options = {
  weekday: 'long', 
  day: 'numeric',
  month: 'long'
 }; 
var day =today.toLocaleDateString("en-US",options);
  
  res.render("list",{listTitle:day,newListItems:items });
})

app.post("/",function(req,res){
  var item=req.body.newItem;

  if(req.body.list === "Work"){
    workList.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
  
})

app.get("/work",function(req,res){
      res.render("list",{listTitle:"Work",newListItems:workList });
})
app.post("/work",function(req,res){
  let item=res.body.newItem;
  workList.push(item);
  res.redirect("/work");
})

app.get("/about",function(req,res){
  res.render("/about");
})

app.listen(port,function(){
    console.log("Server started on port 3000.");
})
