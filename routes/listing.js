const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync');
const {listingSchema}=require('../schema');
const ExpressError=require('../utils/ExpressError');
const Listing = require("../models/listing");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }
    else{
      next();
    }
  };



router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
  }));
  
  router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for does not exist");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }));
  
  router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    if(!listing){
      req.flash("error","Listing you requested for does not exist");
      res.redirect("/listings");
    }
    const reviews=listing.reviews;
    res.render("listings/show.ejs", { listing,reviews });
  }));

  

router.post("/", wrapAsync(async(req, res, next) => {
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
      req.flash("success","New Listing Created!");
      await newlisting.save();
      res.redirect("/listings");
  }));
  
  router.put("/:id",wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
  }));
  
  router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
  }));


  module.exports=router;
  