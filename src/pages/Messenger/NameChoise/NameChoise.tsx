import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import { useSignUpMutation } from "api/appApi";
import { useAppDispatch } from "store";
import { setUser } from "store/appSlice/appSlice";
import { Button, Container, Stack, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

export const NameChoise: FC = () => {
  const dispatch = useAppDispatch();
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const [userInput, setUserInput] = useState("");
  const [remember, setRemember] = useState(false);
  const isSendDisable = isLoading || !userInput;

  useEffect(() => {
    if (isSuccess) {
      if (remember) localStorage.setItem("user", userInput);
      dispatch(setUser(userInput));
    }
  }, [isSuccess]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.target.value);
  };

  const onSignUpClick = (): void => {
    signUp({ user: userInput });
    sessionStorage.setItem("user", userInput);
  };

  const onSignUpEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (e.currentTarget.value) signUp({ user: userInput });
    }
  };

  const onRememberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRemember(e.currentTarget.checked);
  };

  return (
    <Container maxWidth="xs">
      <div>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <TextField
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={onNameChange}
            value={userInput}
            disabled={isLoading}
            onKeyDown={onSignUpEnter}
          />
          <label htmlFor="qwerty">
            <Checkbox id="qwerty" checked={remember} onChange={onRememberChange} />
            Remember me
          </label>
          <Button variant="contained" onClick={onSignUpClick} disabled={isSendDisable}>
            Sign Up
          </Button>
        </Stack>
      </div>
    </Container>
  );
};
