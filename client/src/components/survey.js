import React, { useState } from "react";
import {Row, Col, Pager, Form, ControlLabel, FormControl, Button, FormGroup, Radio} from"react-bootstrap";
import "./survey.css";
import { useAuth0 } from "../react-auth0-wrapper";
import { Redirect } from 'react-router-dom'

import Awful from "./images/awful.png"
import Sad from "./images/sad.png"
import Alright from "./images/alright.png"
import Good from "./images/good.png"
import Awesome from "./images/awesome.png"

const Survey = () => {
    const [showEntries, setShowEntries] = useState(false);
    const [entriesData, setEntriesData] = useState([]);
    const [moodsData, setMoodsData] = useState([]);
    const [showMoods, setShowMoods] = useState(false);
    const [showFactors, setShowFactors] = useState(false);
    const [factorsData, setFactorsData] = useState([]);
    const [formFactorsData, setFormFactorsData] = useState([]);
    const [formMoodsData, setFormMoodsData] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const { isAuthenticated, loading, getTokenSilently, user } = useAuth0();
    if (loading || !user) {
        return (
            <div></div>
        );
    }

    const images = {
        'awful' : Awful,
        'sad' : Sad,
        'alright' : Alright,
        'good' : Good,
        'awesome' : Awesome
    }

    const callMoodsApi = async () => {
        try {
            const token = await getTokenSilently();

            const response = await fetch("/moods/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            const responseData = await response.json();
            setShowMoods(true);
            setMoodsData(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    const callFactorsApi = async () => {
        try {
            const token = await getTokenSilently();

            const response = await fetch("/factors", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            const responseData = await response.json();
            setShowFactors(true);
            setFactorsData(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    const callEntriesApi = async () => {
        try {
            const token = await getTokenSilently();
            const data = {
                date: new Date(),
                email: user.email,
                mood: formMoodsData,
                factors: formFactorsData
            }
            const response = await fetch("http://localhost:5000/entries", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = await response.json();
            setEntriesData(responseData);
            setShowEntries(true);
        } catch (error) {
            console.error(error);
        }
    };

    if (user && !showMoods && !showFactors) {
        callMoodsApi()
        callFactorsApi()
    }

    if (showMoods) {
        var moodsRadios = moodsData.map((d) =>
            <Radio required onChange={onMoodChange}inline name="groupOptions" value={d.name}>
                <img
                    width={50}
                    height={50}
                    className="mr-3"
                    src={images[d.name]}
                    alt={d.name}
                />
            </Radio>
        );
    }
    
    if (showFactors) {
        var factorsSelection = factorsData.map((d) =>
            <option value={d}>{d}</option>
        );
    }

    function handleSubmit(event) {
        callEntriesApi()
    }

    function onMoodChange(event) {
        setFormMoodsData(event.target.value)
    }

    function onFactorChange(event) {
        var options = event.target.options;
        var values = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        setFormFactorsData(values)
    }

    return (
        <div style={ {marginTop: '10px', marginLeft: '50px', marginRight: '50px'} }>
        {isAuthenticated && (
        <>
            <Form name="surveyForm" horizontal onSubmit={handleSubmit} action="/dashboard">
            <FormGroup>
                <ControlLabel>
                    <h1><small>How are you feeling?</small></h1>
                </ControlLabel>
                <center>
                {showMoods && (
                <>
                    {moodsRadios}
                </>
                )}
                </center>
            </FormGroup>
            <FormGroup>
                <ControlLabel>
                    <h1><small>What made you feel that way?</small></h1>
                </ControlLabel>
                <center>
                <FormControl  style={{height: '200px', width: '500px'}} onChange={onFactorChange} required componentClass="select" multiple>
                    {showFactors && (
                        <>
                            {factorsSelection}
                        </>
                    )}
                </FormControl>
                </center>
            </FormGroup>
            <div style={{marginTop: '50px'}}>
            <footer className="buttonFooter">
                <Button href="/dashboard" bsStyle="danger">Home</Button>
                <Button type="submit" bsStyle="success">Submit</Button>
            </footer>
            </div>
            </Form>
            </>
        )}
        </div>
    );
}

export default Survey;
