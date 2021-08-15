import "./App.css";
import React, { useState } from "react";
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
    // var voices = cleo.getVoices();
    const recipes = ["pbj", "chicken and broccoli stir-fry"];

    // Command Words
    const greetings = [
        "hello cleo",
        "hello clio",
        "hi cleo",
        "hi clio",
        "he cleo",
        "he clio",
        "hey cleo",
        "hey clio",
    ];
    const aborts = ["abort cleo", "abort clio"];

    const voiceOptions = [7, 10, 17, 28, 49, 50];
    const defaultVoice = 50;
    let voiceSelection = defaultVoice;

    // Initializers
    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    let listenToUser = new window.SpeechRecognition();

    listenToUser.continuous = true;

    listenToUser.start();

    listenToUser.addEventListener("result", onSpeak);

    var synth = window.speechSynthesis;

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

    const say = (text) => {
        const textToSpeak = new SpeechSynthesisUtterance(text);

        var voices = synth.getVoices();

        // 7 - Male American voice
        // 10 - Female Irish voice
        // 17 - Female Australian voice
        // 28 - Female Dutch voice
        // 49 - Female American voice
        // 50 - Female British voice
        textToSpeak.voice = voices[voiceSelection];

        cleo.speak(textToSpeak);
    };

    function getLastWord(words) {
        var n = words.split(" ");
        return n[n.length - 1];
    }

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
        } else if (msg.includes("cleo switch your voice selection to")) {
            switchVoice(getLastWord(msg));
        } else if (msg === `${triggerWord} next`) {
            increment();
        } else if (greetings.includes(msg)) {
            say("Hello Josh, How can I help you today?");
        } else if (msg === `i need help cooking`) {
            say(
                "I would be happy to help you cook. What would you like to make?"
            );
        } else if (aborts.includes(msg)) {
            voiceSelection = defaultVoice;
            say("Understood, reversing last command and aborting now");
            setData(undefined);
            setCount(-1);
        } else {
            console.log(msg);
            console.log("I don't recognize this command");
        }
    }

    function switchVoice(num) {
        console.log(num);
        if (voiceOptions.includes(Number(num))) {
            voiceSelection = num;
            say("How does this sound Josh?");
            return;
        }
        say("Sorry that is not a valid voice selection");
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
            <div className="loop-structure" id="loop-3"></div>
        </div>
    );
};

export default App;
