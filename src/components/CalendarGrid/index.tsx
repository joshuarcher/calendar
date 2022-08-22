import React from "react";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import DaysRow from "./DaysRow";
import MonthContainer from "./MonthContainer";
import { getMonthCells } from "../../utils/dateUtils";
import { ReminderInterface } from "../../utils/reminderInterface";

const styles = (theme: Theme) =>
  createStyles({
    calendarGrid: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
  });

interface Props extends WithStyles<typeof styles> {
  date: Date;
  reminders: ReminderInterface[];
}

const CalendarGrid = (props: Props) => {
  const { classes, date, reminders } = props;
  const calendarCells = getMonthCells(date);
  return (
    <div className={classes.calendarGrid}>
      <DaysRow />
      <MonthContainer date={date} calendarCells={calendarCells} reminders={reminders} />
    </div>
  );
};

export default withStyles(styles)(CalendarGrid);
