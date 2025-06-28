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

//Route to add a new JOB.
app.post("/job", async (req, res) => {
  try {
    const job = new Job(req.body);
    const jobResponse = await job.save();
    if (!jobResponse)
      return res
        .status(400)
        .json({ error: "Invalid input. Check all fields and try again." });
    return res
      .status(200)
      .json({ message: "Job description added to DataBase." });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

// use -- "/job?jobId=..." to fetch a particular job or dont use query params to fetch all jobs;
app.get("/job", async (req, res) => {
  try {
    if (req.query.jobId) {
      const jobResponse = await Job.findById(req.query.jobId).exec();
      if (!jobResponse)
        return res
          .status(404)
          .json({
            error:
              "Jobs with given JobId can't be found. Try again with correct ID.",
          });
      return res.status(200).json(jobResponse);
    } else {
      const jobResponse = await Job.find();
      if (!jobResponse)
        return res
          .status(404)
          .json({
            error: "Some error occurred with the request. Please try again.",
          });
      return res.status(200).json(jobResponse);
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to delete a Job with Job-ID.
app.delete("/job/:jobId", async (req, res) => {
  try {
    const jobResponse = await Job.findByIdAndDelete(req.params.jobId);
    if(!jobResponse)
        return res.status(400).json({error: "Either the given Job-Id doesn't exist or there is some other issue. Please try again with correct Job-ID."});
    return res.status(200).json({message: "Success. Job Deleted."});
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
