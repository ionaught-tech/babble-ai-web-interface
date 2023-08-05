export const USER_TYPES = {
  Organization: 1,
  ResetPassword: 2,
  User: 3,
  ChatBot: 4,
} as const;

export const MESSAGE_STATUS = {
  Send: 1,
  Received: 2,
  Read: 3,
  Replayed: 4,
} as const;

export const LIVE_AGENT_OPTION_TYPES = {
  redirect: 1,
  chat: 2,
  crm: 3,
} as const;

export const LIVE_AGENT_CONNECTION_STATUS = {
  Connected: 1,
  Disconnected: 2,
  Pending: 3,
} as const;


export const localStorage_TOKEN_KEY = 'babble-ai-chat-token'
