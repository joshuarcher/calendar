import Typography from "@mui/material/Typography";

interface Props {
  day: string;
}

const DayName = (props: Props) => (
  <Typography variant="h6">{props.day}</Typography>
);

export default DayName;
