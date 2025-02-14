const mongoose=require("mongoose");
const initdata=require("./data.js");

const Listing=require("../models/listing.js")

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

main().then((res)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

//initializing data from data.js

const initDB=async () => {
await Listing.deleteMany({});
await Listing.insertMany(initdata.data)
console.log("data was initialised");
}

initDB();
