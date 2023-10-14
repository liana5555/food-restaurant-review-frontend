import React from "react";
import handleClosingError from "../functions/handleClosingError.mjs";


export default function ErrorUp(props) {
    return (
        <div className="error-up">
            <div className="error-up-text">{props.content}</div>
            <div className="closing-icon" onClick={() => handleClosingError(props.statehandling)}>
                    <span className="hamburger-top-line"></span>
                    <span className="hamburger-middle-line"></span>
                    <span className="hamburger-bottom-line"></span>
            </div>
        </div>
    )
}