const express=require("express");
const app=express();
let port =8080;
const mongoose=require("mongoose");


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

app.get("/",(req,res)=>{
    res.send("hi working");
})