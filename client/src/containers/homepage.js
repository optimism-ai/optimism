import React, { Component } from "react";
import {Button} from "react-bootstrap";
import "./homepage.css";
import CanvasJSReact from './canvasjs.react.js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class homepage extends Component {
  render() {
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
    }

    return (      
      <div>
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
      </div>
    );
  }
}