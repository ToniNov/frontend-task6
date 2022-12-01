import { FC, useEffect } from "react";
import { Message } from "./Message/Message";
import { SendMessage } from "./SendMessage/SendMessage";
import { useGetAllMessagesMutation } from "api/appApi";
import { useSocket } from "hooks/useSocket";
import { NameChoise } from "pages/Messenger/NameChoise/NameChoise";
import { useAppDispatch, useAppSelector } from "store";
import { setMessages, setUser } from "store/appSlice/appSlice";
import { selectMessages, selectUser } from "store/appSlice/selectors";
import { Button } from "@mui/material/";
import { Grid } from "@mui/material";

export const Messenger: FC = () => {
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();

  const [getAllMessages, { data: allMessages, isSuccess: isGetAllMessagesSuccess }] =
    useGetAllMessagesMutation();

  useSocket(dispatch, isGetAllMessagesSuccess, user);

  useEffect(() => {
    if (allMessages) {
      dispatch(setMessages(allMessages));
    }
  }, [allMessages, dispatch, isGetAllMessagesSuccess]);

  useEffect(() => {
    if (user) {
      getAllMessages({ user });
    }
  }, [getAllMessages, user]);

  const onSignOutClick = (): void => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    dispatch(setUser(""));
    dispatch(setMessages([]));
  };

  return (
    <div>
      {user ? (
        <>
          <Button variant="contained" onClick={onSignOutClick}>
            Sign Out from: {user}
          </Button>

          <SendMessage />

          <div>
            {messages.map((message) => (
              <Message
                key={message.id}
                date={new Date(message.date).toLocaleString()}
                from={message.from}
                message={message.message}
                title={message.title}
              />
            ))}
          </div>
        </>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <NameChoise />
        </Grid>
      )}
    </div>
  );
};
