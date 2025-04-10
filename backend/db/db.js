require("dotenv").config();
const mongoose = require("mongoose");



// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
  
module.exports=mongoose