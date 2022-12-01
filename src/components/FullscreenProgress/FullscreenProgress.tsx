import React, { FC } from "react";
import { CircularProgress, Grid } from "@mui/material";

export const FullscreenProgress: FC = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <CircularProgress size="300px" />
    </Grid>
  );
};
