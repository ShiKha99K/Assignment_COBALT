import React, { useEffect, useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_BASE_URL;

export default function ScheduledMessagesList() {
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get(`${API}/scheduled-messages`).then(res => setMessages(res.data));
    const id = setInterval(() => setRefresh(r => r + 1), 7000);
    return () => clearInterval(id);
  }, [refresh]);

  const cancel = async (id) => {
    await axios.post(`${API}/cancel-scheduled-message`, { id });
    setRefresh(r => r + 1);
  };

  return (
    <div style={{ maxWidth: 440, margin: "1.2rem auto 0 auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(30,41,59,0.07)", padding: 18 }}>
      <h3 style={{ color: "#2563eb", margin: 0, fontSize: 18, fontWeight: 700 }}>Scheduled Messages</h3>
      <ul style={{ padding: 0, marginTop: 12, listStyle: "none" }}>
        {messages.length === 0 && <li style={{ color: "#64748b", fontSize: 15 }}>No scheduled messages.</li>}
        {messages.map(msg =>
          <li key={msg.id} style={{ marginBottom: 8, background: "#f1f5f9", borderRadius: 8, padding: "9px 11px" }}>
            <div>
              <b>Channel:</b> {msg.channel}<br />
              <b>Time:</b> {new Date(msg.sendAt).toLocaleString()}<br />
              <b>Status:</b> <span style={{ color: msg.status === "pending" ? "#fbbf24" : "#16a34a" }}>{msg.status}</span>
            </div>
            {msg.status === "pending" && (
              <button style={{
                marginTop: 5, background: "#e11d48", color: "#fff", border: "none", borderRadius: 7,
                padding: "3px 11px", fontWeight: 600, cursor: "pointer"
              }}
                onClick={() => cancel(msg.id)}>
                Cancel
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
