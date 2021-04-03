// Package imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const RecipeRouter = require("./routes/RecipeRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Variables
const PORT = process.env.PORT || 4000;

// Middleware
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.o83bc.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(cors({ allowedHeaders: "Content-Type, Cache-Control" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/recipe", RecipeRouter);

// Server listening method
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});
