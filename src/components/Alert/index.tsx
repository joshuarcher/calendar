import React, { useState } from "react";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { Typography } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    alertBox: {
      margin: 1,
      backgroundColor: red[100],
      padding: ".1em 1em",
    },
    alertMessage: {
      color: red[900],
    },
  });

interface Props extends WithStyles<typeof styles> {
  message: string;
}

const Alert = (props: Props) => {
  const { message, classes } = props;
  return (
    <div className={classes.alertBox}>
      <Typography className={classes.alertMessage}>{message}</Typography>
    </div>
  );
};

export default withStyles(styles)(Alert);
