const mongoose = require('mongoose');
const Review=require('./reviews');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        set: (v) => (v === "") ? "https://www.enwallpaper.com/wp-content/uploads/photo-1570712699560-90346772c774-scaled.jpg" : v,
        default: 'https://www.enwallpaper.com/wp-content/uploads/photo-1570712699560-90346772c774-scaled.jpg',
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        },
    ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
