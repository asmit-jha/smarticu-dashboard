const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Define Schema and Model
const VitalSchema = new mongoose.Schema({
  patientName: String,
  heartRate: Number,
  bloodPressure: String,
  oxygenSaturation: Number,
  timestamp: { type: Date, default: Date.now },
});

const Vital = mongoose.model("Vital", VitalSchema);

// API Endpoints
app.get("/api/vitals", async (req, res) => {
  const vitals = await Vital.find();
  console.log(vitals)
  res.json(vitals);
});

app.post("/api/vitals", async (req, res) => {
  const newVital = new Vital(req.body);
  await newVital.save();
  res.json(newVital);
});

app.get("/api/vitals/first", async (req, res) => {
  try {
    const firstVital = await Vital.findOne(); // Retrieve the first patient
    res.json(firstVital); // Send the first patient's details
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch first patient" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
