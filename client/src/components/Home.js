import React from "react";
import "./home.css";
import banner_img from "./images/banner_dark.png";
import diagram_img from "./how.png";

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
            <img className="diagram" src={diagram_img} alt="Diagram Image"/>
            <p className="howBody">
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
