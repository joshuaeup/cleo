const createRecipeModal = (props) => {
    function addStep(e) {
        e.preventDefault();

        console.log("New Step");
    }

    return (
        <>
            <div
                className={`overlay-from-right ${
                    props.open ? "open-from-right" : ""
                }`}
            >
                <div className="home-grid-container">
                    <div
                        className={`home-grid-container__body ${
                            props.open ? "display" : ""
                        }`}
                    >
                        <h1>Create Recipe</h1>
                        <hr id="create-recipe__title__underline" />
                        <div className="create-recipe__container">
                            <i className="fas fa-images create-recipe__container__icon">
                                <input type="file" />
                            </i>
                            <textarea
                                className="create-recipe__container__textarea"
                                placeholder="Description"
                            />
                        </div>
                        <button onClick={addStep}>
                            <i className="fas fa-plus"></i> Add Step
                        </button>
                    </div>
                </div>
                <button>Complete Recipe</button>
            </div>
        </>
    );
};

export default createRecipeModal;
