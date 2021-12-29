const textModal = (props) => {
    return (
        <>
            <div
                className={`overlay-from-left ${
                    props.open ? "open-from-left" : ""
                }`}
            >
                <div className="home-grid-container">
                    <div
                        className={`home-grid-container__body ${
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

export default textModal;
