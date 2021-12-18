import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Ingredients from "./components/ingredients/ingredients";
import Steps from "./components/steps/steps";
import { switchVoice, setVoice, getLastWord, say } from "./utilities/utilities";
import {
    recipes,
    recipeRequest,
    statusUpdate,
    greetings,
    launchGreeting,
    aborts,
    time,
    date,
    gratitude,
    cookingRequest,
} from "./utilities/launchWords";

const admin = "Josh";

// Libraries
const moment = require("moment");

// Main Method
const App = () => {
    // State
    const [data, setData] = useState(undefined);
    let [count, setCount] = useState(-1);
    const [isSpeaking, setIsSpeaking] = useState(false);

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

        if (mapOverSentences(recipes, msg)) {
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
        } else if (mapOverSentences(statusUpdate, msg)) {
            say(
                `${getPhrase([
                    "Of course",
                    "My pleasure",
                    "No problem",
                ])}! Today's date is ${getDate()} and the current time is ${getTime()}, you have no new alerts and shield health is at 100%`
            );
        } else if (mapOverSentences(recipeRequest, msg)) {
            say(
                `I currently know ${recipes.length} recipes including ${recipes}. Would you like to make any of these?`
            );
        } else if (msg.includes("cleo switch your voice selection to")) {
            switchVoice(getLastWord(msg));
        } else if (msg === `thank you next`) {
            increment();
        } else if (mapOverSentences(greetings, msg)) {
            say(
                `${getPhrase([
                    "Hello",
                    "Hi",
                    "Hey",
                ])} ${admin}, How can I help you today?`
            );
        } else if (mapOverSentences(launchGreeting, msg)) {
            say(`Good Morning ${admin}`);
        } else if (mapOverSentences(cookingRequest, msg)) {
            say(
                "I would be happy to help you cook. What would you like to make?"
            );
        } else if (mapOverSentences(time, msg)) {
            say(`The current time is ${getTime()}`);
        } else if (mapOverSentences(date, msg)) {
            say(`The date is ${getDate()}`);
        } else if (mapOverSentences(gratitude, msg)) {
            say(
                `${getPhrase([
                    "You're very welcome",
                    "It's my pleasure",
                    "No problem",
                ])} ${admin}`
            );
        } else if (mapOverSentences(aborts, msg)) {
            setVoice();
            setData(undefined);
            setCount(-1);
        } else {
            console.log(msg);
            console.log("I don't recognize this command");
        }
    }

    useEffect(() => {
        setInterval(() => {
            // Update state when cleo is speaking
            if (isSpeaking !== JSON.parse(localStorage.getItem("isSpeaking"))) {
                setIsSpeaking(JSON.parse(localStorage.getItem("isSpeaking")));
            }
        }, 200);
    });

    const getPhrase = (phrases) => {
        return phrases[Math.floor(Math.random() * phrases.length)];
    };

    const mapOverSentences = (sentences, msg) => {
        return (
            sentences.filter((sentence) => msg.includes(sentence)).length > 0
        );
    };

    const getTime = () => {
        return moment().format("LT");
    };

    const getDate = () => {
        return moment().format("MMMM Do YYYY");
    };
    return (
        <div id="main-container">
            {count === -1 ? (
                <>
                    <h1
                        className={`main-container__title ${
                            isSpeaking ? "pulseTitle" : ""
                        }`}
                    >
                        C.L.E.O
                    </h1>
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
                        <h1
                            className={`main-container__title ${
                                isSpeaking ? "pulseTitle" : ""
                            }`}
                        >
                            C.L.E.O
                        </h1>
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
                    <p id="main-container__text">{`Hello ${admin}`}</p>
                </div>
            )}

            <div
                className={`loop-structure loop-1  ${
                    isSpeaking ? "pulseLoop" : ""
                }`}
            ></div>
            <div
                className={`loop-structure loop-2 ${
                    isSpeaking ? "pulseLoop" : ""
                }`}
            ></div>
            <div
                className={`loop-structure loop-3 `}
                onClick={() => listenToUser.start()}
            ></div>
        </div>
    );
};

export default App;
