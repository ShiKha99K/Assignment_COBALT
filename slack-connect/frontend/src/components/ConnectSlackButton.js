import React from "react";
import "./ConnectSlackButton.css";

export default function ConnectSlackButton() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
      <a href={process.env.REACT_APP_AUTH_URL} className="slack-btn">
        <span className="slack-btn-text">Connect to Slack</span>
      </a>
    </div>
  );
}
