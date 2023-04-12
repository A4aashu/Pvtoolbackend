require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const check = require("./routes/check");

// database connection
connection();

// middlewares
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// routes
app.use("/api/check", check);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
