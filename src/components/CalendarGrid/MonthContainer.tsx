import CalendarDayContainer from "../CalendarDay/CalendarDayContainer";

interface Props {
  calendarCells: {
    date: Date;
  }[];
  date: Date;
}

const MonthContainer = (props: Props) => (
  <div css={{
    display: "flex",
    width: "100%",
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    border: "1px solid lightgray",
  }}>
    {props.calendarCells.map((dateObj, i) => (
      <CalendarDayContainer
        key={i}
        calendarDate={props.date}
        dateObj={dateObj}
      />
    ))}
  </div>
);

export default MonthContainer;
