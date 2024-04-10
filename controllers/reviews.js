const Listing=require("../models/listing");
const Review=require("../models/reviews");

module.exports.createReview=async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author=req.user._id;

    await newReview.save();
    listing.reviews.push(newReview);
    req.flash("success","New Review Created!");
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
};


module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
  
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};



