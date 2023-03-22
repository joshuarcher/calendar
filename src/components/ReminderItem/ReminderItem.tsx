import React from "react";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
// import { isSameMonth, isSameDay, getDate } from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    reminderItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid lightgray",
      cursor: "pointer",
      margin: ".2em",
      padding: ".2em",
    },
    title: {
      display: "flex",
      alignItems: "center",
    },
    calColor: {
      height: ".8em",
      width: ".8em",
      background: "red",
      marginRight: ".5em",
      borderRadius: "100px",
    },
  });

interface DateObj {
  date: Date;
}

interface Props extends WithStyles<typeof styles> {
  title: String;
  time?: String;
  // onDayClick: (dateObj: DateObj) => void;
}

const ReminderItem = (props: Props) => {
  const { classes, title, time } = props;
  const eventClicked = () => {
    console.log("eventClicked");
  };
  return (
    <Button onClick={(e) => eventClicked()}>
      <Typography variant="button">
        <div className={classes.reminderItem}>
          <div className={classes.title}>
            <span className={classes.calColor}></span>
            {title}
          </div>
          <span>{time || "All Day"}</span>
        </div>
      </Typography>
    </Button>
  );
};

export default withStyles(styles)(ReminderItem);
