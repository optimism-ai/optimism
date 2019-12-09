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

        return (
            <div>
                <hi>TEST</hi>
                {isAuthenticated && (
                    <>
                        <h1>test</h1>
                    </>
                )}
            </div>
        );
    }

export default AspectHistory;