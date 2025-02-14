const express=require("express");
const app=express();
let port =8080;
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const path=require("path");



async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

main().then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log('listening to server');

});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.send("hi working");
})

// app.get("/testinglist", async (req,res)=>{
    
//     //creating new object or document
//     let samplelisting=new Listing({
//         title:"my room",
//         description:"in usa",
//         price:1222,
//         location:"washington dc",
//         country:"usa"
//     })
//   await  samplelisting.save();
//   console.log("sample was saved");
//   res.send("sucess")
// })

app.get("/listings",async (req,res)=>{
  const alllistings= await Listing.find({});
  res.render("listings/index.ejs",{alllistings});
})

