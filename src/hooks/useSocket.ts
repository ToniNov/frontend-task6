import { useEffect, useRef } from "react";
import { AppDispatch } from "../store";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { addMessage } from "../store/appSlice/appSlice";

export const useSocket = (
  dispatch: AppDispatch,
  isGetAllMessagesSuccess: boolean,
  user: string
): void => {
  const tempSocket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  useEffect(() => {
    if (isGetAllMessagesSuccess && user && !tempSocket.current) {
      const socket = io("https://backend-task6.vercel.app/", {
        path: "/socket"
      });

      tempSocket.current = socket;
      socket.on("connect", () => {
        socket.emit("userName", user);
        socket.on("newMessage", (message) => {
          console.log("mess", message);
          dispatch(addMessage(message));
        });
      });
    }
    if (!user && tempSocket.current) {
      tempSocket.current.disconnect();
      tempSocket.current = null;
    }
  }, [dispatch, isGetAllMessagesSuccess, user]);
};
