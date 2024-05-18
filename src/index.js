const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser())

const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("../src/db/index");

app.use(express.json({}));
//setting limit upto 50mb only
app.use(bodyParser.json({ limit: "50mb" }));


app.use(
  cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

//from the url
//plus % ymbols in the url not to take that
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

//anyone can access by statuc to store the pdf,images etc
app.use(express.static("public"));

//Imtegrating UserRoutes to the Server
const userRoutes = require("../src/routes/user_routes");
app.use(userRoutes);

//Integrating VaderRoute to the server
const vadarRoute = require("../src/routes/vader_route");
app.use(vadarRoute);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is Started >>> ", process.env.PORT);
    });
    console.log("MongoDb Connected Succesfully");
  })
  .catch((error) => {
    console.log("Error IN Connevtion", error);
  });


