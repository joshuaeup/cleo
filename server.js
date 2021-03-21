// Package imports
const express = require("express");
const app = express();
const recipeRouter = require("./routes/recipeRoutes");

// Variables
const PORT = process.env.PORT || 4000;

// Middleware
app.use("/", recipeRouter);

// Server listening method
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});
