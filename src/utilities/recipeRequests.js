import axios from "axios";

function requestFromDb() {
    axios
        .get("http://localhost:4000/recipe/all")
        .then(async (result) => {
            localStorage.setItem(
                "recipeNames",
                result.data.map((recipe) => recipe.name)
            );
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

export default requestFromDb;
