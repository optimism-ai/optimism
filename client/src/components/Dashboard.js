
import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import "./dashboard.css";
import CanvasJSReact from './canvasjs.react.js';
import {Link} from "react-router-dom";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

const Dashboard = () => {
    const [showAspects, setShowAspects] = useState(false);
    const [aspectsData, setAspectsData] = useState([]);

    const { isAuthenticated, loading, getTokenSilently, user } = useAuth0();
    if (loading || !user) {
        return (
            <div></div>
        );
    }

    const callApi = async () => {
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

    if (user && !showAspects) {
        callApi()
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

    return (
      <div>
      {isAuthenticated && (
      <>
        <div className="userInfo">
          <div>
            <img className="userPic" src={user.picture} />
          </div>
          <div>
            <h2 className="usrName">{user.name}</h2>
          </div>
          <div className="doSurvey">
            <Link to="/moodselection">Do Survey</Link>
          </div>
          <div className="aspectHistory">
            <Link to="/aspecthistory">Aspect History</Link>
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
        </>
      )}
      </div>
    );
}

export default Dashboard;
