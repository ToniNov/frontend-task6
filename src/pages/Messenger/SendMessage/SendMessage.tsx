import { FC, SyntheticEvent } from "react";
import { useFormik } from "formik";
import { useCreateMessageMutation, useGetAllUserNameQuery } from "api/appApi";
import { MessageType } from "api/types";
import { useAppSelector } from "store";
import { selectUser } from "store/appSlice/selectors";
import { Autocomplete, Button, Paper, TextareaAutosize, TextField } from "@mui/material";

export const SendMessage: FC = () => {
  const { data: options } = useGetAllUserNameQuery();
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const user = useAppSelector(selectUser);

  const formik = useFormik({
    initialValues: {
      to: "",
      title: "",
      message: ""
    },
    validate({ message, to, title }) {
      const errors = {} as MessageType;

      if (!message) errors.message = "Required";
      if (!to) errors.to = "Required";
      if (options && !options) errors.to = "There is no such user";
      if (!title) errors.title = "Required";

      return errors;
    },
    onSubmit(values) {
      const message = { ...values } as MessageType;
      message.from = user;
      createMessage(message);
      values.title = "";
      values.message = "";
    }
  });

  const sendDisabled =
    !!formik.errors.message ||
    !!formik.errors.title ||
    !!formik.errors.to ||
    !formik.values.message ||
    !formik.values.title ||
    !formik.values.to ||
    isLoading;

  const handleInputChange = (event: SyntheticEvent, text: string) => {
    formik.setFieldValue("to", text, true);
  };

  if (!options) return null;

  return (
    <Paper sx={{ padding: 2, minHeight: 320 }}>
      <form onSubmit={formik.handleSubmit}>
        <Autocomplete
          id="to"
          placeholder="to"
          disabled={isLoading}
          renderInput={(options) => (
            <TextField
              {...options}
              label="Users"
              helperText={
                formik.getFieldMeta("to").touched && formik.getFieldMeta("to").error ? (
                  <div style={{ color: "red", fontStyle: "10px" }}>
                    {formik.getFieldMeta("to").error}
                  </div>
                ) : null
              }
            />
          )}
          options={options}
          onChange={formik.handleChange}
          onInputChange={handleInputChange}
          onBlur={() => formik.setTouched({ to: true }, true)}
        />
        <TextField
          fullWidth={true}
          type="title"
          placeholder="Title"
          disabled={isLoading}
          {...formik.getFieldProps("title")}
          helperText={
            formik.touched.title && formik.errors.title ? (
              <div style={{ color: "red", fontStyle: "10px" }}>{formik.errors.title}</div>
            ) : null
          }
        />
        <TextareaAutosize
          style={{ minWidth: 1115, maxWidth: 1115, maxHeight: 1115 }}
          minRows={10}
          disabled={isLoading}
          placeholder="Message"
          {...formik.getFieldProps("message")}
        />
        <div className="mb-1" style={{ height: "20px" }}>
          {formik.touched.message && formik.errors.message ? (
            <div style={{ color: "red", fontStyle: "10px" }}>{formik.errors.message}</div>
          ) : null}
        </div>
        <Button variant="contained" type="submit" disabled={sendDisabled}>
          Send
        </Button>
      </form>
    </Paper>
  );
};
