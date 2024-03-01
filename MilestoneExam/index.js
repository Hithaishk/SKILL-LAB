const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const env=require("env");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const DBURL = process.env.DatabaseURL;
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully😎");
  })
  .catch((err) => {
    console.log(err, "something went wrong");
  });

const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes=require("./routes/orderRoutes");


app.use("/user", userRoutes);
app.use("/food", foodRoutes);
app.use("/order", orderRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
