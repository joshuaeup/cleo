import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [data, setData] = useState(undefined);
    let [count, setCount] = useState(-1);

    var synth = window.speechSynthesis;
    var voices = synth.getVoices();
    useEffect(() => {
        axios
            .get("http://localhost:4000/recipe")
            .then(result => {
                const recipes = result.data;
                setData(recipes);
            })
            .catch(err => {
                console.log(err);
            });
    });

    const viewContents = () => {
        console.log(count);
        console.log(data);
    };

    const increment = () => {
        if (count < data.steps.length - 1) {
            setCount(count + 1);
            speakAudio(`Step ${count + 2}. ${data.steps[count + 1]}`);
        } else {
            setCount(data.steps.length);
            speakAudio(`Recipe Complete`);
        }
    };

    const speakAudio = text => {
        var utterThis = new SpeechSynthesisUtterance(text);

        utterThis.voice = voices[17];
        synth.resume();
        synth.speak(utterThis);

        utterThis.onend = () => {
            console.log("Utterance has finished being spoken");
            synth.pause();
            synth.cancel();
        };
    };

    return (
        <div id="main-container">
            <h1 id="main-container__title" onClick={viewContents}>
                C.L.E.O
            </h1>
            {data ? (
                <>
                    {count === -1 ? (
                        <p id="main-container__text" onClick={increment}>
                            Gather the following ingredients{" "}
                            {data.ingredients.map((ingredient, index) => {
                                return (
                                    <span key={index}>
                                        {ingredient}
                                        {", "}
                                    </span>
                                );
                            })}
                        </p>
                    ) : (
                        <p id="main-container__text" onClick={increment}>
                            {}
                            {count - 1 <= data.ingredients.length ? (
                                <span>
                                    Step {count + 1}. {data.steps[count]}
                                </span>
                            ) : (
                                <span>Recipe Complete</span>
                            )}
                        </p>
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
