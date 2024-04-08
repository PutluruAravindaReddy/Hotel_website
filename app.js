const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require('./utils/ExpressError');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy = require('passport-local');
const User=require('./models/user');

const listingsRouter=require("./routes/listing");
const reviewsRouter=require("./routes/review");
const userRouter=require("./routes/user");


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


const sessionOptions={
  secret:"mysupersecretcode",
  resave:false,
  saveUnintialized:true,
	cookie:{
		expires:Date.now() + 7 * 24 * 60 * 60 * 1000, //For 7 days
		maxAge:7 * 24 * 60 * 60 * 1000,
		httpOnly : true,
	},
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// app.get("/demouser",async (req,res)=>{
//   let fakeUser=new User({
//     email:"student@gmail.com",
//     username:"delta-student"
//   })

//   let registerUser=await User.register(fakeUser,"helloworld");
//   res.send(registerUser);
// });

app.get("/", (req, res) => {
  res.send("Home page working");
});


app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode=500,message="Something Went Wrong" }=err;
  res.status(statusCode).render("error.ejs",{message});
});
