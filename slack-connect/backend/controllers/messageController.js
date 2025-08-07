import { sendMessage } from "../services/slackService.js";
import { getTokenForAnyWorkspace } from "../services/tokenService.js";

export const sendMessageController = async (req, res) => {
  console.log("Received send-message request", req.body);
  try {
    const { channel, text } = req.body;
    const accessToken = await getTokenForAnyWorkspace();
    const result = await sendMessage(accessToken, channel, text);
    console.log("Slack API result:", result);
    if (result.ok) {
      res.json({ ok: true, ts: result.ts });
    } else {
      res.status(400).json({ ok: false, error: result.error });
    }
  } catch (e) {
    console.log("Error in sendMessageController:", e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
};
