const Listing=require("./models/listing");
const Review=require("./models/reviews");
const ExpressError=require('./utils/ExpressError');
const {listingSchema,reviewSchema}=require('./schema');

module.exports.isLoggedIn=(req,res,next)=>{
if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","You must have logged in to create listing");
    return res.redirect("/login");
  }
  next();
}


module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner=async(req,res,next)=>{
  let { id } = req.params;
  let listing=await Listing.findById(id);
  if (!req.user || !req.user._id.equals(listing.owner._id)) {
    req.flash("error","You are not the owner of this");
   return  res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
  let { id,reviewId } = req.params;
  let review=await Review.findById(reviewId);
  if (!review || !review.author ||!review.author._id.equals(req.user._id)) {
    req.flash("error","You are not the author of this review");
   return  res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};