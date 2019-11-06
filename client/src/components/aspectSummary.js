import React, {Component} from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import CanvasJSReact from "./canvasjs.react";

class AspectSummary extends Component {
    
    render() {
        const { isAuthenticated, loading, getTokenSilently, user } = useAuth0();
        if (loading || !user) {
            return (
                <div></div>
            );
        }

        const aspectChart = {
            title:{
                text:"Aspect Timeline"
            },
            axisX: {
                title:"Timeline"
            },
            axisY: {
                title: "Aspect"
            },
            data: [
                {
                    type: "area",
                    dataPoints: [
                        {x: new Date(2019, 10, 20), y: 5},
                        {x: new Date(2019, 10, 21), y: 1},
                        {x: new Date(2019, 10, 22), y: 2},
                        {x: new Date(2019, 10, 23), y: 6},
                        {x: new Date(2019, 10, 24), y: 10},
                        {x: new Date(2019, 10, 25), y: 4},
                    ]
                }]
        }
        return (
            <div>
                {isAuthenticated && (
                    <>
                        <CanvasJSReact chart = {aspectChart}/>
                    </>
                )}
            </div>
        );
    }
}
export default AspectSummary;