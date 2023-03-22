import React from "react";
import Typography from "@material-ui/core/Typography";

interface Props {
  day: string;
}
// This component displays just the day of the week at the top of the calendar
const DayName = (props: Props) => (
  <Typography variant="h6">{props.day}</Typography>
);

export default DayName;
