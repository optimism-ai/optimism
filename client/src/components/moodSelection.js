import React, {Component} from "react";
import {Button} from"react-bootstrap";
import "./moodSelection.css";

class MoodSelection extends Component {
    constructor(){
        super();

        this.state = {
            mood:'awful'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            mood: event.target.value
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
                    <label>
                        <input
                            type = "radio"
                            value = "awful"
                            checked={this.state.mood === "awful"}
                            onChange = {this.handleChange}
                        />
                        Awful
                    </label>
                    <label>
                        <input
                            type = "radio"
                            value = "sad"
                            checked={this.state.mood ==="sad"}
                            onChange = {this.handleChange}
                        />
                        Sad
                    </label>
                    <label>
                        <input
                            type = "radio"
                            value = "alright"
                            checked={this.state.mood === "alright"}
                            onChange = {this.handleChange}
                        />
                        Alright
                    </label>
                    <label>
                        <input
                            type = "radio"
                            value = "happy"
                            checked={this.state.mood === "happy"}
                            onChange= {this.handleChange}
                        />
                        Happy
                    </label>
                    <label>
                        <input
                            type = "radio"
                            value = "ecstatic"
                            checked={this.state.mood === "ecstatic"}
                            onChange = {this.handleChange}
                        />
                        Ecstatic
                    </label>
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