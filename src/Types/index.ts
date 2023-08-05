export type ChatBotData = {
  _id: string;
  name: string;
  icon: string;
};

export interface MessageType {
  _id: string;
  to: string;
  senderType: string;
  status: number;
  message: { type: string; message: string }[];
  createdAt: string;
}