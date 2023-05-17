import DaysRow from "./DaysRow";
import MonthContainer from "./MonthContainer";
import { getMonthCells } from "../../utils/dateUtils";

interface Props {
  date: Date;
}

const CalendarGrid = (props: Props) => {
  const { date } = props;
  const calendarCells = getMonthCells(date);
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <DaysRow />
      <MonthContainer date={date} calendarCells={calendarCells} />
    </div>
  );
};

export default CalendarGrid;
