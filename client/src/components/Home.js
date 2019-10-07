import React from "react";
import "./home.css";
import WebLogo from "./images/banner_dark.png";
import HowArt from "./how.png";

const Home = () => {
    return (
      <div className="Home">

        <img className="banner" src={WebLogo} alt="Optimism Logo"></img>

        <div className="lander">

          <div className="description">

            <h1 className="quote">Be Happy, Stay Happy</h1>
            <p>
              Optimism will help you log your daily mood and activities. We intend to improve and maintain
              your happiness. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia
            </p>
          </div>

          <div className="demo">
            <h2 className="howTitle">
              How It Works!
            </h2>
            <div className="demo_pic">
              <img className="howClipArt" src={HowArt} alt="How it Works"></img>
            </div>
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
      </div>
   );
}

export default Home;
