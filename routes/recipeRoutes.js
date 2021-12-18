// Package imports
const express = require("express");
const router = express.Router();
const RecipeModel = require("../models/RecipeModel");

router.get("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.find({ name: req.query.name });
        res.send(recipe[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/all", async (req, res) => {
    try {
        const recipe = await RecipeModel.find({});
        res.send(recipe);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body);
    console.log(req.body);

    try {
        await recipe.save();
        res.send(recipe);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
