const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  // console.log(allListings);
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }

  let originalImageUrl=listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");

  res.render("listings/edit.ejs", { listing ,originalImageUrl});
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
  const reviews = listing.reviews;
  res.render("listings/show.ejs", { listing, reviews });
};

module.exports.createListing = async (req, res, next) => {
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

  let url=req.file.path;
  let filename=req.file.filename;

  let newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image={url,filename};

  req.flash("success", "New Listing Created!");
  await newlisting.save();
  res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file!=="undefined"){
  let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
