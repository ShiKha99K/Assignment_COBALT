import axios from "axios";

export async function sendMessage(accessToken, channel, text) {
  const resp = await axios.post(
    "https://slack.com/api/chat.postMessage",
    { channel, text },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return resp.data;
}
