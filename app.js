const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing");
const wrapAsync=require('./utils/wrapAsync');
const ExpressError=require('./utils/ExpressError');
const {listingSchema}=require('./schema');

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

const MONGO_URL = "mongodb://localhost:27017/wanderlust";
main()
  .then((res) => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(port, () => {
  console.log("Server is listening on port 8080");
});

// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute,goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("Successfully Saved");
//     res.send("Successfully Saved");
// });

app.get("/", (req, res) => {
  res.send("Home page working");
});

const validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
}

app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  // console.log(allListings);
  res.render("listings/index.ejs", { allListings });
}));

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

app.post("/listings",validateListing, wrapAsync(async(req, res, next) => {
  // let {title,description,image,price,location,country}=req.body;
  // let newlisting=new Listing({
  //     title:`${title}`,
  //     description:`${description}`,
  //     image:`${image}`,
  //     price:`${price}`,
  //     location:`${location}`,
  //     country:`${country}`,
  // });
  //   newlisting.save();
  // or we can also do like
  // getting object directly from that form for that we need to save the input field name as object


    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }
    let newlisting = new Listing(req.body.listing);

    await newlisting.save();
    res.redirect("/listings");
}));

app.put("/listings/:id", validateListing,wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode=500,message="Something Went Wrong" }=err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs",{message});
});
