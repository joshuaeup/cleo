const steps = (props) => {
    return (
        <>
            <p id="main-container__text">
                {props.count < props.data.steps.length ? (
                    <span>
                        Step {props.count + 1}. {props.data.steps[props.count]}
                    </span>
                ) : (
                    <span>Recipe Complete</span>
                )}
            </p>
        </>
    );
};

export default steps;
