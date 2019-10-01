import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";

import "./home.css";
import WebLogo from "./hireslogo.png";
import HowArt from "./how.png";

const Home = () => {
    return (
      <div>
        <div className="Home">
        <img src={WebLogo} alt="Optimism Logo"></img>
        <h3>Be Happy, Stay Happy</h3>
        <div className="lander">
            <div className="aboutUs">
                <p>
                Optimism will help you log your daily mood and activities. We intend to improve and maintain
                your happiness. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
            </div>
        <div className="howItWorks">
            <h2 className="howTitle">
            How It Works!
            </h2>
            <div className="howPic">
                <img className="howClipArt" src={HowArt} alt="How it Works"></img>
                </div>
                    <p className="howBody">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                    tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, 
                    quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
                    consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </p>
                </div>
            </div>
        </div>
      </div>
   );
}

export default Home;
