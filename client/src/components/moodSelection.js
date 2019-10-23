import React, {Component} from "react";
import {Button} from"react-bootstrap";
import {RadioGroup, RadioButton} from 'react-radio-buttons';
import "./moodSelection.css";

class MoodSelection extends Component {
    constructor(){
        super();

        this.state = {
            mood:'awful'
        };

        this.onRadioChange = this.onRadioChange.bind(this);
    }

    onRadioChange = (e) => {
        this.setState({
            mood: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="heading">
                    <h1 className="pageTitle">
                        How Are You Feeling Today?
                    </h1>
                </div>
                <div className="moodChoices">
                    <RadioGroup horizontal>
                        <RadioButton 
                            value="awful"
                            checked={this.state.mood === "awful"}
                            onChange={this.onRadioChange}>
                            Awful
                        </RadioButton>
                        <RadioButton
                            value="bad"
                            checked={this.state.mood === "bad"}
                            onChange={this.onRadioChange}>
                            Bad
                        </RadioButton>
                        <RadioButton
                            value="alright"
                            checked={this.state.mood === "alright"}
                            onChange={this.onRadioChange}>
                            Alright
                        </RadioButton>
                        <RadioButton
                            value="good"
                            checked={this.state.mood ==="good"}
                            onChange={this.onRadioChange}>
                            Good
                        </RadioButton>
                        <RadioButton
                            value="great"
                            checked={this.state.mood === "great"}
                            onChange={this.onRadioChange}>
                            Great
                        </RadioButton>
                    </RadioGroup>
                </div>
                <footer className="buttonFooter">
                    <Button href="/dashboard">Exit Survey</Button>
                    <Button href="/factorselection">Next</Button>

                </footer>
            </div>
        );
    }
}

export default MoodSelection;