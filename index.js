const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const { initialiseDatabase } = require("./db/db.connect");

const Job = require("./models/job.model");

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());
initialiseDatabase();

app.get("/", (req, res) => {
  res.send("<h1>Hi, Welcome to homepage of this Backend App.</h1>");
});

app.post("/job", async (req, res) => {
  try {
    const job = new Job(req.body);
    const jobResponse = await job.save();
    if(!jobResponse)
        return res.status(400).json({error: "Invalid input. Check all fields and try again."});
    return res.status(200).json({message: "Job description added to DataBase."});
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log("\nServer is running on PORT:", PORT);
});
