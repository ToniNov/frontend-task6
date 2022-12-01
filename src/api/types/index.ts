export type MessageType = {
  from: string;
  title: string;
  message: string;
  to: string;
};

export type IncommingMessageType = {
  id: string;
  from: string;
  title: string;
  message: string;
  to: string;
  date: string;
};
