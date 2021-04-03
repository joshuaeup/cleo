import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [data, setData] = useState(undefined);
    let [count, setCount] = useState(-1);
    let mealInput = React.createRef();

    var synth = window.speechSynthesis;
    var voices = synth.getVoices();

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:4000/recipe")
    //         .then(result => {
    //             const recipes = result.data;
    //             setData(recipes);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // });

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:4000/recipe")
    //         .then(result => {
    //             const recipes = result.data;
    //             if (recipes.name === "pbj") {
    //                 setData(recipes);
    //             } else {
    //                 console.log("No match");
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // });

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

    const onChangeHandler = () => {
        console.log(mealInput.current.value);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log(`FINAL VALUE: ${mealInput.current.value}`);
        function onSpeak(e) {
            // Path to access value
            const msg = e.results[0][0].transcript;
            console.log(msg);

            // // Call functions
            // writeMessage(msg);
            // checkNumber(msg);
            // axios
            //     .get("http://localhost:4000/recipe", {
            //         params: {
            //             name: mealInput.current.value
            //         }
            //     })
            //     .then(async result => {
            //         const recipes = result.data;
            //         // if (recipes.name === mealInput.current.value) {
            //         await setData(recipes);
            //         console.log(recipes);
            //         // } else {
            //         //     console.log("No match");
            //         // }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    };

    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    let recognition = new window.SpeechRecognition();

    recognition.start();

    recognition.addEventListener("result", onSpeak);
    // recognition.continuous = true;
    // Capture the input from the user
    function onSpeak(e) {
        // Path to access value
        const msg = e.results[0][0].transcript;
        console.log(msg);
        axios
            .get("http://localhost:4000/recipe", {
                params: {
                    name: msg
                }
            })
            .then(async result => {
                const recipes = result.data;
                // if (recipes.name === mealInput.current.value) {
                await setData(recipes);
                console.log(recipes);
                // } else {
                //     console.log("No match");
                // }
            })
            .catch(err => {
                console.log(err);
            });

        // // Call functions
        // writeMessage(msg);
        // checkNumber(msg);
    }

    return (
        <div id="main-container">
            <h1 id="main-container__title" onClick={viewContents}>
                C.L.E.O
            </h1>
            <input
                placeholder="Enter meal here"
                ref={mealInput}
                onChange={onChangeHandler}
            />
            <button onClick={onSubmitHandler}>Submit</button>
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
