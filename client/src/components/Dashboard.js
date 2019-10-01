
import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import "./dashboard.css";

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

    return (
      <div>
      {isAuthenticated && (
        <div className="container">
            <div className="lhs">
                <div className="sidebar">
                    <h3>Username Picture</h3>
                    <h4>Username</h4>
                    <p>Do Daily Survey</p>
                </div>
                <div className="aspectScoreTb">
                    <ul>
                        <li>Aspect 1</li>
                        <li>Aspect 2</li>
                        <li>Aspect 3</li>
                        <li>Aspect 4</li>
                    </ul>
                </div>
            </div>
            <div className="rhs">
                <h2>Recent Moods</h2>
                <ul>
                    <li>Mood1</li>
                    <li>Mood2</li>
                    <li>Mood3</li>
                    <li>Mood4</li>
                </ul>
            </div>
        </div>
      )}
        {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
      </div>
    );
}

export default Dashboard;
