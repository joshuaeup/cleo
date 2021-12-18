const modal = (props) => {
    return (
        <>
            <div className={`overlay ${props.open ? "open" : ""}`}>
                <div className="home-grid-container">
                    <div
                        className={`home-grid-container__title ${
                            props.open ? "display" : ""
                        }`}
                    >
                        {props.data?.images[props.count] ? (
                            <img
                                id="recipe_modal_img"
                                alt="recipe_step"
                                src={props.data?.images[props.count]}
                            />
                        ) : (
                            <></>
                        )}
                        <h1>Transcript</h1>
                        <hr />
                        <p>{props.response}</p>
                        <span>
                            Say <b>dismiss</b> to close modal
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default modal;
