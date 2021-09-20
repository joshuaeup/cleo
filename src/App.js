import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import Ingredients from "./components/ingredients/ingredients";
import Steps from "./components/steps/steps";
import { switchVoice, setVoice, getLastWord, say } from "./utilities/utilities";
import {
    recipes,
    recipeRequest,
    greetings,
    aborts,
    time,
    date,
    gratitude,
    cookingRequest,
} from "./utilities/launchWords";

// Libraries
const moment = require("moment");

// Main Method
const App = () => {
    // State
    const [data, setData] = useState(undefined);
    let [count, setCount] = useState(-1);

    // Initializers
    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    let listenToUser = new window.SpeechRecognition();

    listenToUser.continuous = true;

    listenToUser.start();

    listenToUser.addEventListener("result", onSpeak);

    const increment = () => {
        if (count < data.steps.length - 1) {
            setCount(count + 1);
            say(`Step ${count + 2}. ${data.steps[count + 1]}`);
        } else {
            setCount(data.steps.length);
            say(`Recipe Complete`);
        }

        console.log("Count = " + count);
    };

    // Capture the input from the user
    function onSpeak(e) {
        let count = e.results.length - 1;
        let msg = e.results[count][0].transcript.toLowerCase().trim();

        if (recipes.includes(msg)) {
            axios
                .get("http://localhost:4000/recipe", {
                    params: {
                        name: msg,
                    },
                })
                .then(async (result) => {
                    const recipes = result.data;
                    await setData(recipes);
                    console.log(recipes);
                    say(
                        "Wonderful first you will need to grab these ingredients?"
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (recipeRequest.includes(msg)) {
            say(
                `I currently know ${recipes.length} recipes including ${recipes}. Would you like to make any of these?`
            );
        } else if (msg.includes("cleo switch your voice selection to")) {
            switchVoice(getLastWord(msg));
        } else if (msg === `thank you next`) {
            increment();
        } else if (greetings.includes(msg)) {
            say("Hello Josh, How can I help you today?");
        } else if (cookingRequest.includes(msg)) {
            say(
                "I would be happy to help you cook. What would you like to make?"
            );
        } else if (time.includes(msg)) {
            say(`The current time is ${moment().format("LT")}`);
        } else if (date.includes(msg)) {
            say(`The date is ${moment().format("MMMM Do YYYY")}`);
        } else if (gratitude.includes(msg)) {
            say("You're very welcome Josh");
        } else if (aborts.includes(msg)) {
            setVoice();
            setData(undefined);
            setCount(-1);
        } else {
            console.log(msg);
            console.log("I don't recognize this command");
        }
    }

    return (
        <div id="main-container">
            {count === -1 ? (
                <>
                    <h1 id="main-container__title">C.L.E.O</h1>
                </>
            ) : (
                <>
                    {data?.images[count] ? (
                        <img
                            id="recipe_img"
                            alt="recipe_step"
                            src={data?.images[count]}
                        />
                    ) : (
                        <h1 id="main-container__title">C.L.E.O</h1>
                    )}
                </>
            )}
            {data ? (
                <>
                    {count === -1 ? (
                        <Ingredients data={data} />
                    ) : (
                        <Steps data={data} count={count} />
                    )}
                </>
            ) : (
                <div>
                    <p id="main-container__text">Hello Josh</p>
                </div>
            )}

            <div className="loop-structure" id="loop-1"></div>
            <div className="loop-structure" id="loop-2"></div>
            <div
                className="loop-structure"
                id="loop-3"
                onClick={() => listenToUser.start()}
            ></div>
        </div>
    );
};

export default App;
