const mongoose = require('mongoose');

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
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
