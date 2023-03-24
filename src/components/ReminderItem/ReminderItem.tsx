import React from "react";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { format } from "date-fns";
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
      // background: "red",
      marginRight: ".5em",
      borderRadius: "100px",
    },
  });

interface DateObj {
  date: Date;
}

interface Props extends WithStyles<typeof styles> {
  title: string;
  date?: string;
  color: string; // TODO: Change to ENUM
  // onDayClick: (dateObj: DateObj) => void;
}

const ReminderItem = (props: Props) => {
  const { classes, title, date, color } = props;
  const eventClicked = () => {
    console.log("eventClicked");
  };
  return (
    <Button onClick={(e) => eventClicked()}>
      <Typography variant="button">
        <div className={classes.reminderItem}>
          {/* Display the title and color of the event */}
          <div className={classes.title}>
            <span
              className={classes.calColor}
              style={{ backgroundColor: color }}
            ></span>
            {title}
          </div>
          {/* This will display the time of the event in the users time zone */}
          <span>{format(new Date(date), "h:mm bbb") || "All Day"}</span>
        </div>
      </Typography>
    </Button>
  );
};

export default withStyles(styles)(ReminderItem);
