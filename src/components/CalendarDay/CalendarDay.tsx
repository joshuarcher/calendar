import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import deepPurple from "@mui/material/colors/deepPurple";
import { isSameMonth, isSameDay, getDate } from "date-fns";
import { SxProps } from '@mui/system';

import { css } from "@emotion/react";

const dayCellStyles = (isSameMonth) => css`
  display: flex;
  flex: 1 0 13%;
  flex-direction: column;
  border: 1px solid lightgray;
  cursor: pointer;

  ${isSameMonth ||
  `
    background-color: rgba(211, 211, 211, 0.4); 
  `}
`;

const avatarStyle = ({ isFocussed, isToday }) => css`
  margin: 5px;
  height: 28px;
  width: 28px;
  font-size: 0.85rem;
  color: #000;
  background-color: transparent;

  ${isToday && css`
    color: #fff;
    background-color: ${deepPurple[400]};
  `}

  ${isFocussed && css`
    color: #000;
    background-color: #f1f1f1
  `}

  ${isToday && isFocussed && css`
    color: #fff;
    background-color: ${deepPurple[700]}; 
  `}
`;

interface DateObj {
  date: Date;
}

interface Props {
  calendarDate: Date;
  dateObj: DateObj;
  onDayClick: (dateObj: DateObj) => void;
}

const CalendarDay = (props: Props) => {
  const { dateObj, calendarDate, onDayClick } = props;
  const [isFocussed, setFocused] = useState(false);

  const isToday = isSameDay(dateObj.date, new Date());

  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj)}
      css={dayCellStyles(isSameMonth(dateObj.date, calendarDate))}
    >
      <Avatar sx={avatarStyle({ isFocussed, isToday })}>{getDate(dateObj.date)}</Avatar>
      <div
        css={{
          height: "100%",
        }}
      >
        {/* reminders go here */}
      </div>
    </div>
  );
};

export default CalendarDay;
