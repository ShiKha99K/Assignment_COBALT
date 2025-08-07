import { readTokens } from "../utils/jsonStore.js";

export async function getTokenForAnyWorkspace() {

  const tokens = await readTokens();
  const workspaceIds = Object.keys(tokens);
  if (!workspaceIds.length) throw new Error("No workspace connected.");
  return tokens[workspaceIds[0]].accessToken;
  
}
