// 7 - Male American voice
// 10 - Female Irish voice
// 17 - Female Australian voice
// 28 - Female Dutch voice
// 49 - Female American voice
// 50 - Female British voice
const voiceOptions = [7, 10, 17, 28, 49, 50];
const defaultVoice = 50;
let voiceSelection = defaultVoice;

function switchVoice(num) {
    console.log(num);
    if (voiceOptions.includes(Number(num))) {
        voiceSelection = num;
        say("How does this sound Josh?");
        return;
    }
    say("Sorry that is not a valid voice selection");
}

const setVoice = () => {
    voiceSelection = defaultVoice;
    say("Understood, reversing last command and aborting now");
};

function getLastWord(words) {
    var n = words.split(" ");
    return n[n.length - 1];
}

//Say Variables
var synth = window.speechSynthesis;
var cleo = window.speechSynthesis;
localStorage.setItem("isSpeaking", "false");

function chunkString(str = 0, length) {
    if (str.length > 0) {
        return str.match(new RegExp(".{1," + length + "}", "g"));
    }

    return [];
}

const say = (text) => {
    const chunkedText = chunkString(text, 150);

    var voices = synth.getVoices();

    let textToSpeak = [];

    chunkedText.forEach((text) => {
        textToSpeak.push(new SpeechSynthesisUtterance(text));
    });

    textToSpeak.forEach((text) => {
        text.voice = voices[voiceSelection];
        cleo.speak(text);
    });

    console.log(cleo);

    cleoIsSpeaking();
};

const cleoIsSpeaking = () => {
    setInterval(() => {
        if (cleo.speaking === true) {
            localStorage.setItem("isSpeaking", "true");
        } else {
            localStorage.setItem("isSpeaking", "false");
        }
    }, 200);
};

export { switchVoice, setVoice, getLastWord, say };
