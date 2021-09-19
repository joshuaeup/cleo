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

const say = (text) => {
    const textToSpeak = new SpeechSynthesisUtterance(text);

    var voices = synth.getVoices();

    textToSpeak.voice = voices[voiceSelection];

    cleo.speak(textToSpeak);
};

export { switchVoice, setVoice, getLastWord, say };
