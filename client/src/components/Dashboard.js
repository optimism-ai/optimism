
import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import "./dashboard.css";
import CanvasJSReact from './canvasjs.react.js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
    const [showResult, setShowResult] = useState(false);
    const [apiMessage, setApiMessage] = useState("");

    const { isAuthenticated, loading, getTokenSilently } = useAuth0();
    if (loading) {
        return (
            <div></div>
        );
    }

    const callApi = async () => {
        try {
            const token = await getTokenSilently();

            const response = await fetch("/api/private/list/moods", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = await response.json();

            setShowResult(true);
            setApiMessage(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    callApi()

    const options = {
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
      },
      data: [{
        type: "bar",
        dataPoints: [
          { y: 5, label: "Work"},
          { y: 7, label: "Learning"},
          { y: 2, label: "Health"},
          { y: 8, label: "Social"},
          { y: 10, label: "Media"},
          { y: 6, label: "Mental"},
        ]
      }]

    return (
      <div>
      {isAuthenticated && (
        <div className="userInfo">
          <div className="usrPic">
            <h2>User Pic</h2>
          </div>
          <div class="usrName">
            <h2>John Doe</h2>
          </div>
          <div className="doSurvey">
            <Button variant="outline-primary">Do Survey</Button>
          </div>
        </div>
        <div className="container">
          <div className="aspectInfo">
            <CanvasJSChart options = {options} />
          </div>
          <div className="moodInfo">
            <div className="moodModule">
              <h5 className='moodHeading'>Mood 1</h5>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                 totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                 sunt explicabo. Nemo enim ipsam voluptatem</p>
            </div>
            <div className="moodModule">
              <h5 className='moodHeading'>Mood 2</h5>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem
              </p>
            </div>
            <div className="moodModule">
              <h5 className='moodHeading'>Mood 3</h5>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem
              </p>
            </div>
          </div>
        </div>
      )}
        {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
      </div>
    );
}

export default Dashboard;
