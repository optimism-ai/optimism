
import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import "./dashboard.css";
import CanvasJSReact from './canvasjs.react.js';
import {Link} from "react-router-dom";
import {PageHeader, Pager, Container, Row, Col, Media, Button, ButtonGroup, Grid, Panel} from 'react-bootstrap';

import Awful from "./images/awful.png"
import Sad from "./images/sad.png"
import Alright from "./images/alright.png"
import Good from "./images/good.png"
import Awesome from "./images/awesome.png"

const Dashboard = () => {
    const [showAspects, setShowAspects] = useState(false);
    const [aspectsData, setAspectsData] = useState([]);
    const [showEntries, setShowEntries] = useState(false);
    const [entriesData, setEntriesData] = useState([]);
    const [range, setRange] = useState({'start': 1, 'end': 6});

    const { isAuthenticated, loading, getTokenSilently, user } = useAuth0();

    const images = {
        'awful' : Awful,
        'sad' : Sad,
        'alright' : Alright,
        'good' : Good,
        'awesome' : Awesome
    }

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
        return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    }

    const callAspectsApi = async () => {
        try {
            const token = await getTokenSilently();

            const response = await fetch("/aspects/" + user.email, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            const responseData = await response.json();

            for (var i = 0; i < responseData.length; i++) {
                responseData[i].y = scaleBetween(responseData[i].score, 0, 10, -2, 2)
                responseData[i].label = responseData[i].name
                delete responseData[i].name
                delete responseData[i].score
                delete responseData[i].description
            }
            setShowAspects(true);
            setAspectsData(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    const callEntriesApi = async () => {
        try {
            const token = await getTokenSilently();

            const response = await fetch("/entries/" + user.email + "/" + range.start.toString() + "-" + range.end.toString(), {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const responseData = await response.json();
            setShowEntries(true);
            setEntriesData(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    if (user && !showAspects) {
        callAspectsApi()
        callEntriesApi()
    }

    useEffect(() => {
        callEntriesApi()
    }, [range])

    function nextEntries() {
        if (entriesData.length == 5) {
            setRange({'start': range.start + 5, 'end': range.end + 5})
        }
    }
    function prevEntries() {
        if (range.start > 1) {
            setRange({'start': range.start - 5, 'end': range.end - 5})
        }
    }

    if (showEntries) {
        var entriesList = entriesData.map((d) =>
            <Media>
                <Media.Left>
                    <img
                        width={50}
                        height={50}
                        className="mr-3"
                        src={images[d.mood.name]}
                        alt={d.mood.name}
                    />
                </Media.Left>
                <Media.Body>
                    <h5>{new Date(d.date['$date']).toString()}</h5>
                    <p>
                        <div>{d.factors.map((f) => <Button>{f.name}</Button>)}</div>
                    </p>
                </Media.Body>
            </Media>
        );
    }

    const options = {
        animationEnabled: true,
        axisX: {
            gridThickness: 0,
            tickThickness: 0,
            lineThickness: 0,
        },
        axisY: {
            gridThickness: 0,
            tickThickness: 0,
            lineThickness: 0,
            labelFontSize: 0,
            maximum: 10
        },
        data: [{
            type: "bar",
            dataPoints: aspectsData
        }]
    }

    if (loading || !user) {
        return (
            <div></div>
        );
    }

    return (
      <div style={ {marginTop: '10px'} }>
      {isAuthenticated && (
      <>
        <Grid fluid>
          <Row>
            <Col sm={6} md={6}>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Summary</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <center>
                            <div style={ {marginTop: '20px'} }>
                            <img className="userPic" src={user.picture} />
                                <h2 className="usrName">{user.name}</h2>
                            </div>
                        </center>
                        <div style={ {marginTop: '20px'} }>
                            <CanvasJSChart options = {options} />
                        </div>
                    </Panel.Body>
                </Panel>
            </Col>
            <Col sm={6} md={6}>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Recent Surveys</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Pager>
                            <Pager.Item previous href="#" onClick={prevEntries}>
                                &larr; Previous Page
                            </Pager.Item>
                            <Button> <Link to="/survey">New Survey</Link> </Button>
                            <Pager.Item next href="#" onClick={nextEntries}>
                                Next Page &rarr;
                            </Pager.Item>
                        </Pager>
                        {showEntries && (
                        <>
                            {entriesList}
                        </>
                        )}
                    </Panel.Body>
                </Panel>
            </Col>
            </Row>
          </Grid>
        </>
      )}
      </div>
    );
}

export default Dashboard;
