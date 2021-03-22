const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    steps: {
        type: Array,
        required: true
    }
});

const Recipe = mongoose.model("recipe", RecipeSchema);
module.exports = Recipe;
