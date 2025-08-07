import React from "react";
import ConnectSlackButton from "./components/ConnectSlackButton";
import MessageForm from "./components/MessageForm";
import ScheduledMessagesList from "./components/ScheduledMessagesList";

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#e0e7ff 0%,#f1f5f9 100%)", padding: "2rem 0" }}>
      <div style={{ maxWidth: 450, margin: "auto" }}>
        <h1 style={{
          textAlign: "center",
          color: "#2563eb",
          fontWeight: 800,
          marginBottom: "1.1rem",
          letterSpacing: 1.3,
          fontSize: "1.7rem"
        }}>
          Slack Connect
        </h1>
        <ConnectSlackButton />
        <MessageForm />
        <ScheduledMessagesList />
      </div>
    </div>
  );
}
export default App;
