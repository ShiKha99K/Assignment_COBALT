import axios from "axios";
import { readTokens, writeTokens } from "../utils/jsonStore.js";

export const redirectToSlack = (req, res) => {
  const url = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=chat:write,channels:read&redirect_uri=${process.env.SLACK_REDIRECT_URI}`;
  res.redirect(url);
};

export const slackCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post("https://slack.com/api/oauth.v2.access", null, {
      params: {
        code,
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        redirect_uri: process.env.SLACK_REDIRECT_URI,
      },
    });
    if (!response.data.ok) return res.status(400).send("Slack OAuth failed");

    // Save tokens to JSON file (keyed by team id)
    const tokens = await readTokens();
    tokens[response.data.team.id] = {
      accessToken: response.data.access_token,
      expiresAt: Date.now() + 3600 * 1000, 
    };
    await writeTokens(tokens);

    // Redirecting to frontend 
    res.redirect(`${process.env.FRONTEND_URL}/?connected=1`);
  } catch (err) {
    res.status(500).send("OAuth failed: " + err.message);
  }
};
