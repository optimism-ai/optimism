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
                            Factor
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option2" />
                            Factor
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option3" />
                            Factor
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option4" />
                            Factor
                    </label>
                    <label className = "options">
                        <input type = "checkbox" value="option5" />
                            Factor
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option1" />
                            Factor
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option2" />
                            Factor
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option3" />
                            Factor
                    </label>
                    <label className="options">
                        <input type = "checkbox" value="option4" />
                            Factor
                    </label>
                    <label className = "options">
                        <input type = "checkbox" value="option5" />
                            Factor
                    </label>
            </div>
            <footer className="buttonFooter">
                <Button href="/dashboard">Exit Survey</Button>
                <Button type="submit">Submit</Button>
            </footer>
        </div>
    );
}

export default FactorSelection;