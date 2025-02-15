const express=require("express");
const app=express();
let port =8080;
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const path=require("path");
const methodOverride=require("method-override")



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
app.use(express.urlencoded({extended:true})) //to parse data coming from data.js
app.use(methodOverride("_method"))


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


//index route
app.get("/listings",async (req,res)=>{
  const alllistings= await Listing.find({});
  res.render("listings/index.ejs",{alllistings});
})


//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})


//to insert the new data in db// create route
app.post("/listings",(req,res)=>{
    let{title,description,image,price,location,country}=req.body;
    let newlist=new Listing({
        title:title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country
    })
    newlist.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/listings");

})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})


//update route
app.put("/listings/:id", (req,res)=>{
    let {id}=req.params;
   
    Listing.findByIdAndUpdate(id,{...req.body.listing}).then((res)=>{
        console.log(res);
    })
res.redirect("/listings");
})



//show route
app.get("/listings/:id",async (req,res)=>{

    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
  })


