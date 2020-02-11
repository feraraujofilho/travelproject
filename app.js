require("dotenv").config();

const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
//const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require("passport")

mongoose
  .connect("mongodb://localhost/travelproject", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.log("Error occured", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}))

//Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.locals.title = "Travel Portal";

app.use(
  session({
    secret: process.env.SECRETKEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.use(flash());
require("./configs/passport");

//routes
const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)

const Users = require("./routes/profile")
app.use("/api/profile", Users)

const amadeus = require("./routes/amadeus");
app.use("/", amadeus);

const cities = require("./routes/cities")
app.use("/api/cities", cities)

module.exports = app
