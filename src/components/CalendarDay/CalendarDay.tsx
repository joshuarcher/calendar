import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { format, compareAsc, parseISO } from "date-fns";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { isSameMonth, isSameDay, getDate } from "date-fns";
import { EventItem } from "../../redux/actions";
import { useAppContext } from "../..";
import ReminderItem from "../ReminderItem/ReminderItem";

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      cursor: "pointer",
    },
    dayCellOutsideMonth: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      backgroundColor: "rgba( 211, 211, 211, 0.4 )",
      cursor: "pointer",
    },
    dateNumber: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "transparent",
    },
    todayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[400],
    },
    focusedAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "#f1f1f1",
    },
    focusedTodayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[800],
    },
    remindersContainer: {
      height: "100%",
    },
  });

interface DateObj {
  date: Date;
}

interface Props extends WithStyles<typeof styles> {
  calendarDate: Date;
  dateObj: DateObj;
  events: EventItem[];
  onDayClick: (dateObj: DateObj, displayAgenda: boolean) => void;
}

const CalendarDay = (props: Props) => {
  // we need to pass the events down to this calendar day component and then render through them in a loop

  const { classes, dateObj, calendarDate, onDayClick } = props;
  const [focused, setFocused] = useState(false);

  const isToday = isSameDay(dateObj.date, new Date());
  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber;

  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);

  // attempting to get the events passed down from the redux store.
  // If the store has an event that matches this date then we should create a reminder item to display in the calendar day box.
  // const EVENTS = { calId: {
  //   events:
  //   {
  //     20230322: [

  //     ]
  //   }
  // }}

  const eventLimit = 1; // the number of events to display in each block

  const appContext = useAppContext();

  const { events } = appContext;

  const eventDayUTC = format(dateObj.date, "yyyyMMdd");

  const todaysEvents = events[eventDayUTC] || [];
  const displayAgenda = todaysEvents.length > 0;

  todaysEvents.sort((eventA, eventB) => {
    return compareAsc(parseISO(eventA.date), parseISO(eventB.date));
  });

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj, displayAgenda)}
      className={
        isSameMonth(dateObj.date, calendarDate)
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={avatarClass}>{getDate(dateObj.date)}</Avatar>
      <div className={classes.remindersContainer}>
        {todaysEvents
          .filter((event, index) => index < eventLimit)
          .map((event, index) => (
            <ReminderItem {...event} key={index} />
          ))}
        {todaysEvents.length > eventLimit && (
          <div style={{ paddingLeft: ".7em" }}>
            {todaysEvents.length - eventLimit}+ events
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(CalendarDay);
