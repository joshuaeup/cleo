const ingredients = (props) => {
    return (
        <>
            <p id="main-container__text">
                Gather the following ingredients{" "}
                {props.data.ingredients.map((ingredient, index) => {
                    return (
                        <span key={index}>
                            {ingredient}
                            {", "}
                        </span>
                    );
                })}
            </p>
        </>
    );
};

export default ingredients;
