import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Ingredients from "./components/ingredients/ingredients";
import Steps from "./components/steps/steps";

const App = () => {
    // State
    const [data, setData] = useState(undefined);
    let [count, setCount] = useState(-1);

    // Variables
    const triggerWord = "thank you";
    var cleo = window.speechSynthesis;
    var voices = cleo.getVoices();
    const recipes = ["pbj", "chicken and broccoli stir-fry"];

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
    };

    const say = (text) => {
        const textToSpeak = new SpeechSynthesisUtterance(text);

        cleo.speak(textToSpeak);

        textToSpeak.voice = voices[17];
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
        } else if (msg === `${triggerWord} next`) {
            increment();
        } else if (msg === `hello cleo` || msg === `hello clio`) {
            say("Hello Josh, How can I help you today?");
        } else if (msg === `i need help cooking`) {
            say(
                "I would be happy to help you cook. what would you like to make?"
            );
        } else if (msg === `abort cleo` || msg === `abort clio`) {
            say("Understood, reversing last command and aborting now");
            setData(undefined);
            setCount(-1);
        } else {
            console.log(msg);
            console.log("I don't recognize this command");
        }
    }

    return (
        <div id="main-container">
            <h1 id="main-container__title">C.L.E.O</h1>
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
            <div className="loop-structure" id="loop-3"></div>
        </div>
    );
};

export default App;
