import { assetsUrl } from "../Config/apiUrl";
import { postCall, putCall } from "./apiCall";

export const getAssetUrl = (url: string) => `${assetsUrl}/${url}`;
export const createUserCall = postCall("/user");
export const connectToAgentCall = postCall("/user/connect-agent");
export const updateUserCall = putCall("/user");

export const getUserBotCall = `/user/chat-bot`;
