import React from "react";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
// this will display the items of the agenda and should provide any aditional information.
// this is different from the reminder item as it may have different styles
const AgendaItem = (props: Props) => {
  const { classes, title, time } = props;
  return (
    <Typography variant="button">
      <div className={classes.reminderItem}>
        <div className={classes.title}>
          <span className={classes.calColor}></span>
          {title}
        </div>
        <span>{time || "All Day"}</span>
      </div>
    </Typography>
  );
};

export default withStyles(styles)(AgendaItem);
