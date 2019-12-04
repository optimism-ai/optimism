import React from "react";
import "./moodSelection.css";

const MoodSelection = () => {

        return (
            <div>
                <div className="heading">
                    <h1 className="pageTitle">
                        How are you feeling today?
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
            </div>
        );
    }

export default MoodSelection;