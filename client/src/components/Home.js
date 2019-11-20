import React from "react";
import "./home.css";
import banner_img from "./images/banner_dark.png";
import mood1 from "./images/mood1.png";
import mood2 from "./images/mood2.png";
import mood3 from "./images/mood3.png";

import act1 from "./images/act1.png";
import act2 from "./images/act2.png";
import act3 from "./images/act3.png";

import chart1 from "./images/chart1.png";
import chart2 from "./images/chart2.png";
import chart3 from "./images/chart3.png";

import arrow from "./images/arrow.png";

const Home = () => {
    return (
      <div className="homepage">
          
          <div className="description">
          <img className="banner" src={banner_img} alt="Optimism Logo"/>
          
            <p>
              Optimism is a daily mood tracker.
            </p>
            <p>
            We intend to improve, track, and
            </p>
            <p>
            maintain your overall happiness.
            </p>
          </div>

          <div className="how">
            <h2>
              How does it work?
            </h2>

            <div class="container">

            <div class="condiv">
              <img class="mood" src={mood1}/>
              <img class="mood" src={mood2}/>
              <img class="mood" src={mood3}/>
            </div>
            <div class="arrowdiv">
              <img class="arrow" src={arrow}/>
            </div>
            <div class="condiv">
              <img class="act" src={act1}/>
              <img class="act" src={act2}/>
              <img class="act" src={act3}/>
            </div>
            <div class="arrowdiv">
              <img class="arrow" src={arrow}/>
            </div>
            <div class="condiv">
              <img class="chart" src={chart1}/>
              <img class="chart" src={chart2}/>
              <img class="chart" src={chart3}/>
            </div>

            </div>

            <p className="howbody">
            The apps works by receiving input from the user which includes two things, their mood and what activities
            they have been up to. Once the user inputs their mood, our smart algorithms will give feedback and suggestions
            and also provide data and insights to their overall mood. Since Optimism (tm) strives to improve your
            mood, we will never share your data. It is all encrypted with the SHA-256 protocol etc. The apps works by
            receiving input from the user which includes two things, their mood and what activities
            they have been up to. Once the user inputs their mood, our smart algorithms will give feedback and suggestions
            and also provide data and insights to their overall mood. Since Optimism (tm) strives to improve your
            mood, we will never share your data. It is all encrypted with the SHA-256 protocol etc.
            </p>
          </div>
      </div>
   );
}

export default Home;
