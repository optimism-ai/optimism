import React from "react";
import {useAuth0} from "../react-auth0-wrapper";
import CanvasJSReact from "./canvasjs.react.js";
import "./aspectHistory.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AspectHistory = () => {

    const { isAuthenticated, loading, user } = useAuth0();
    if (loading || !user) {
        return (
            <div></div>
        );
    }
        const histChart = {
            animationEnabled: true,
            axisX: {
                title: "Date"
            },
            axisY: {
                title:"Aspect Score"
            },
            data: [{
                type: "bar",
                dataPoints: [
                    {label: "5 days ago", y:10},
                    {label: "4 days ago", y:5},
                    {label: "3 days ago", y:2},
                    {label: "2 days ago", y:7},
                    {label: "Yesterday", y:4},
                ]
            }]
        }

        return (
            <div>
                {isAuthenticated && (
                    <>
                        <div className = "mentalChart">
                            <CanvasJSChart histChart = {histChart}/>
                        </div>
                    </>
                )}
            </div>
        );
    }

export default AspectHistory;