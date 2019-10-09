import React from "react";
import {Button} from"react-bootstrap";
import "./moodSelection.css";

const MoodSelection = () => {

        return (
            <div>
                <div className="heading">
                    <h1 className="pageTitle">
                        How Are You Feeling Today?
                    </h1>
                </div>
                <div className="moodChoices">
                    <label className="options">
                        <input type = "radio" value="option1" checked={true} />
                            Awful
                    </label>
                    <label className="options">
                        <input type = "radio" value="option2" />
                            Bad
                    </label>
                    <label className="options">
                        <input type = "radio" value="option3" />
                            Alright
                    </label>
                    <label className="options">
                        <input type = "radio" value="option4" />
                            Good
                    </label>
                    <label className = "options">
                        <input type = "radio" value="option5" />
                            Awesome
                    </label>
                </div>
                <footer className="buttonFooter">
                    <Button href="/dashboard">Exit Survey</Button>
                    <Button href="/factorselection">Next</Button>

                </footer>
            </div>
        );
    }

export default MoodSelection;