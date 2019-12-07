import React from "react";
import {Button} from "react-bootstrap";
import "./factorSelection.css"

const FactorSelection = () => {
    return (
        <div>
            <div className="heading">
                <h1 className="pageTitle">
                    What Did You Do Today?
                </h1>
            </div>
            <div className="factorChoices">
                    <label className="options">
                        <input type = "checkbox" value="option1" />
                            Exercise
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option2" />
                            Sleep Well
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option3" />
                            No Sleep
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option4" />
                            Work
                    </label>
                    <label className = "options">
                        <input type = "checkbox" value="option5" />
                            Hang out with Friends
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option1" />
                            Played Video Games
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option2" />
                            Stuck in Traffic
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option3" />
                            Watched a show or movie
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option4" />
                            Act 1
                    </label>
                    <label className = "options">
                        <input type = "checkbox" value="option5" />
                            Act 2
                    </label>
            </div>
            <footer className="buttonFooter">
                <Button href="/dashboard">Exit Survey</Button>
                <Button href="/surveysummary" type="submit">Submit</Button>
            </footer>
        </div>
    );
}

export default FactorSelection;