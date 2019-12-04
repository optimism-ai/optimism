// src/components/Profile.js

import React, { Fragment } from "react";
import "./profile.css"
import { useAuth0 } from "../react-auth0-wrapper";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <div></div>
    );
  }

  return (
    <Fragment>
      <div class = "profileContainer">
        <img class="userpic" src={user.picture} alt="Profile" />
        <h2 class="username">{user.name}</h2>
        <p class="useremail">{user.email}</p>
      </div>
    </Fragment>
  );
};

export default Profile;
