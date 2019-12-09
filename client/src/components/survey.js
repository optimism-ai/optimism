import React, {Component} from "react";
import {Button} from"react-bootstrap";
import "./survey.css";

class survey extends Component {
    constructor(){
        super();

        this.state = {
            moods: "awful",
            factors: "Sleep"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.setState({
            mood: event.target.value,
            factors: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        alert('You chose the ' + this.state.mood + ' and ' + this.state.factors)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div className="heading">
                    <h1 className="pageTitle">
                        How Are You Feeling Today?
                    </h1>
                </div>
                <div className="moodChoices">
                    <label className="options">
                        <input
                            type = "radio"
                            value = "awful"
                            checked={this.state.mood === "awful"}
                            onChange = {this.handleChange}
                        />
                        Awful
                    </label>
                    <label className="options">
                        <input
                            type = "radio"
                            value = "sad"
                            checked={this.state.mood ==="sad"}
                            onChange = {this.handleChange}
                        />
                        Sad
                    </label>
                    <label className="options">
                        <input
                            type = "radio"
                            value = "alright"
                            checked={this.state.mood === "alright"}
                            onChange = {this.handleChange}
                        />
                        Alright
                    </label>
                    <label className="options">
                        <input
                            type = "radio"
                            value = "good"
                            checked={this.state.mood === "good"}
                            onChange= {this.handleChange}
                        />
                        Happy
                    </label>
                    <label className="options">
                        <input
                            type = "radio"
                            value = "good"
                            checked={this.state.mood === "good"}
                            onChange = {this.handleChange}
                        />
                        Ecstatic
                    </label>
                </div>
                <div className="heading">
                    <h1 className="pageTitle">
                        What did you do today?
                    </h1>
                </div>
                <div className = "factorChoices">
                    <div className = "factorCol">
                        <label className="options">
                            <input type = "checkbox" value={this.state.factors}/>
                                Late for work
                        </label>
                        <label className="options">
                            <input type = "checkbox" value="Staff meeting" />
                                Staff meeting
                        </label>
                        <label className="options">
                            <input type = "checkbox" value="Sleep" />
                                Sleep
                        </label>
                        <label className = "options">
                            <input type = "checkbox" value="Relax" />
                                Relax
                        </label>
                        <label className="options">
                            <input type = "checkbox" value="Homework" />
                                Homework
                        </label>
                        <label className="options">
                            <input type="checkbox" value="Party" />
                                Party
                        </label>
                    </div>
                    <div className = "factorCol">
                        <label className="options">
                            <input type = "checkbox" value="Class" />
                                Class
                        </label>
                        <label className="options">
                            <input type = "checkbox" value="Work out" />
                                Work Out
                        </label>
                        <label className="options">
                            <input type = "checkbox" value="Eat food" />
                                Eat Food
                        </label>
                        <label className="options">
                            <input type = "checkbox" value="Watch movies" />
                                Watch Movies
                        </label>
                        <label className = "options">
                            <input type = "checkbox" value="Listen to music" />
                                Listen to Music
                        </label>
                        <label className = "options">
                            <input type = "checkbox" value="Time with family/friends" />
                                Time with Family and Friends
                        </label>
                    </div>
                </div>
                <footer className="buttonFooter">
                    <Button href="/dashboard">Exit Survey</Button>
                    <Button type="submit">Submit</Button>
                </footer>
                </form>
            </div>
        );
    }
}

export default survey;