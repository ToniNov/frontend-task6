import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IncommingMessageType } from "api/types";
import { getTimeFromString } from "helpers/getTimeFromSting";

export const appSlice = createSlice({
  name: "app",
  initialState: { user: "", messages: [] as IncommingMessageType[] },
  reducers: {
    setUser(state, { payload }: PayloadAction<string>) {
      state.user = payload;
      return state;
    },
    setMessages(state, { payload }: PayloadAction<IncommingMessageType[]>) {
      state.messages = [...payload].sort(
        (a, b) => getTimeFromString(b.date) - getTimeFromString(a.date)
      );
      return state;
    },
    addMessage(state, { payload }: PayloadAction<IncommingMessageType>) {
      state.messages.unshift(payload);
      return state;
    }
  }
});

export const appReducer = appSlice.reducer;
export const { setUser, addMessage, setMessages } = appSlice.actions;
