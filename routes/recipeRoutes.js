// Package imports
const express = require("express");
const router = express.Router();
const RecipeModel = require("../models/RecipeModel");

router.get("/", async (req, res) => {
    const recipe = await RecipeModel.find({});

    try {
        res.send(recipe[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    // const recipe = new RecipeModel({
    //     name: "pbj",
    //     ingredients: ["Peanut butter", "Jelly", "Sandwich Bread"],
    //     steps: [
    //         "Pull out two slices of bread and lay side by side on the plate.",
    //         "Spread the Peanut Butter Onto One Slice of Bread",
    //         "Spread the Jelly Onto the other Slice of Bread",
    //         "Combine the Two Slices",
    //         "Cut the sandwich in Half"
    //     ]
    // });

    try {
        await recipe.save();
        res.send(recipe);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
