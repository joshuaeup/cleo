import requestFromDb from "./recipeRequests";

requestFromDb();

const recipes = localStorage.getItem("recipeNames").split(",");

const greetings = [
    "hello cleo",
    "hello clio",
    "hi cleo",
    "hi clio",
    "hey cleo",
    "hey clio",
];

const launchGreeting = ["good morning", "goodmorning"];

const statusUpdate = ["status update", "status report"];

const time = [
    "what time is it",
    "what's the time",
    "can you tell me what time it is",
];

const date = [
    "what date is it",
    "what's the date",
    "what's today's date",
    "what is today's date",
];

const gratitude = [
    "thank you cleo",
    "thanks cleo",
    "i appreciate you cleo",
    "i appreciate it cleo",
    "thank you",
    "thank you very much",
];

const cookingRequest = [
    "i need help cooking",
    "i need some help cooking",
    "i would like some help cooking",
    "i could use some help cooking",
];

const recipeRequest = [
    "how many recipes do you know",
    "which recipes can i choose from",
    "which recipes do you know",
    "what are my recipe choices",
    "what are my recipe options",
    "what recipes do you know",
];

const aborts = ["abort cleo", "abort clio"];

const openTextModal = [
    "show text",
    "show transcript",
    "text show",
    "text open",
    "open text",
    "open transcript",
];

const closeTextModal = [
    "hide text",
    "hide transcript",
    "text hide",
    "text close",
    "close text",
    "close transcript",
    "dismiss",
];

const openCreateRecipeModal = [
    "create a new recipe",
    "create a recipe",
    "add a new recipe",
    "add a recipe",
];

const closeCreateRecipeModal = ["dismiss"];

const repeat = ["repeat", "say that again"];

export {
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
    openTextModal,
    closeTextModal,
    openCreateRecipeModal,
    closeCreateRecipeModal,
    repeat,
};
