import { IncommingMessageType } from "api/types";
import { RootState } from "store";

export const selectUser = (state: RootState): string => state.app.user;
export const selectMessages = (state: RootState): IncommingMessageType[] =>
  state.app.messages;
