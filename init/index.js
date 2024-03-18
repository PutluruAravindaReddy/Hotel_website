const Listing=require("../models/listing");
const mongoose = require('mongoose');
const initData = require('./data');

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust'
main()
.then((res) =>{
    console.log("DB Connection Successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data added successfully");
}

initDB();