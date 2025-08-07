import React, { useState } from "react";
import axios from "axios";
import "./MessageForm.css";

const API = process.env.REACT_APP_API_BASE_URL;

export default function MessageForm() {
  const [channel, setChannel] = useState("");
  const [text, setText] = useState("");
  const [sendAt, setSendAt] = useState(""); // Local time string (YYYY-MM-DDTHH:mm)
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    setResult(null);
    try {
      // If sendAt is in the future, schedule, else send immediately
      if (sendAt && new Date(sendAt).getTime() > Date.now() + 60 * 1000) {
        await axios.post(`${API}/schedule-message`, { channel, text, sendAt });
        setResult("⏰ Scheduled!");
      } else {
        const res = await axios.post(`${API}/send-message`, { channel, text });
        setResult(res.data.ok ? "✅ Message sent!" : res.data.error);
      }
    } catch (e) {
      setResult("❌ " + (e.response?.data?.error || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Send Message to Slack</h2>
      <label>
        <span>Channel ID</span>
        <input
          type="text"
          placeholder="e.g. C099FE1LDAQ"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />
      </label>
      <label>
        <span>Message</span>
        <textarea
          rows={4}
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <label>
        <span>Schedule for future (optional):</span>
        <input
          type="datetime-local"
          value={sendAt}
          min={new Date(Date.now() + 60 * 1000).toISOString().slice(0, 16)}
          onChange={(e) => setSendAt(e.target.value)}
        />
      </label>
      <button
        className="send-btn"
        disabled={!channel || !text || loading}
        onClick={sendMessage}
      >
        {loading ? "Sending..." : "Send"}
      </button>
      {result && <div className="result">{result}</div>}
      <div className="tip">
        <b>Tip:</b> Channel ID looks like <code>C099FE1LDAQ</code>.
        <br />
        Leave schedule empty to send instantly.<br />
        Schedule at least 1 minute in the future.
      </div>
    </div>
  );
}

