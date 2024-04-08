const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync');
const {reviewSchema}=require('../schema');
const ExpressError=require('../utils/ExpressError');
const Listing = require("../models/listing");
const Review = require("../models/reviews");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    }
    else{
      next();
    }
  };


  router.post("/",wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    await newReview.save();
    listing.reviews.push(newReview);
    req.flash("success","New Review Created!");
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  }));
  
  router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
  
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
  }));

  module.exports=router;