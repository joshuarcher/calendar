import DayName from "./DayName";
import { daysArr } from "../../utils/dateUtils";

const DaysRow = () => (
  <div
    css={{
      display: "flex",
      width: "100%",
      flexBasis: "50px",
      justifyContent: "space-evenly",
      alignItems: "center",
    }}
  >
    {daysArr.map((day, i) => (
      <DayName key={i} day={day} />
    ))}
  </div>
);

export default DaysRow;
