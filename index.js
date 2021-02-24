require("dotenv").config();
const express = require("express");
const cors = require("cors");
const  mongoose = require("mongoose");
const bodyParser = require('body-parser');
const db_url = process.env.url;
//database connection
const connection = mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
},(error)=>{
    if(error) {
        console.log(error);
    }else{
        console.log("db connection successful");
    }     
});
const port = process.env.PORT || 8080;
const app = express();
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Letsventure jobs!",
  });
});
const jobRoutes = require("./routes/job");
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use("/",jobRoutes);
app.listen(port, () => {
  console.log(`App started on port: ${port}`);
});