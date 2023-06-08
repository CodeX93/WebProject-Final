const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const PaymentRoute = require("./Routes/PaymentRoute");
const InsuranceRoute = require("./Routes/InsuranceRoute");
const ProjectManagementRoute = require("./Routes/ProjectManagementRoute");

const app = express();
app.use(cors());

const DB_URI = process.env.DB_URI;
const port = process.env.PORT || 3090;

mongoose
  .connect(DB_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB"));

app.listen(port, () => {
  console.log(`The Server is running on Port ${port}`);
});

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/payment", PaymentRoute);
app.use("/insurance", InsuranceRoute);
app.use("/project", ProjectManagementRoute);

app.get("/getfile", (req, res) => {
  const filePath = path.join(__dirname, req.query.file);
  res.download(filePath, (err) => {
    if (err) {
      console.log("Error downloading file:", err);
      // Handle error, such as sending an error response to the client
      res.status(500).send("Error downloading file");
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
