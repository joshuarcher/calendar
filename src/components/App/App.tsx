import React, { Component } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import green from "@mui/material/colors/green";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as dateFns from "date-fns";
import CalendarGrid from "../CalendarGrid";
import AgendaDayContainer from "../AgendaDay/AgendaDayContainer";
import AddReminderContainer from "../AddReminder/AddReminderContainer";
import "./App.css";
import styled from "@emotion/styled";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  width: 100%;
`;

interface Props {
  onFabAddClick: () => void;
}

interface State {
  date: Date;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  compnentDidMount() {}

  // arrow functions to skip binding in constructor
  prevMonth = () => {
    this.setState({ date: dateFns.subMonths(this.state.date, 1) });
  };

  nextMonth = () => {
    this.setState({ date: dateFns.addMonths(this.state.date, 1) });
  };

  render() {
    const { onFabAddClick } = this.props;
    const { date } = this.state;

    const month = date.toLocaleString("en-us", { month: "long" });
    const year = dateFns.getYear(date);

    return (
      <Root>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            margin: "25px",
            width: "100%",
            height: "90%",
          }}
        >
          <CalendarHeader>
            <IconButton aria-label="Last Month" onClick={this.prevMonth}>
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
            <Typography variant="h3">
              {month} {year}
            </Typography>
            <IconButton aria-label="Next Month" onClick={this.nextMonth}>
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>
          </CalendarHeader>
          <CalendarGrid date={date} />
          <Fab
            aria-label="Add"
            sx={{
              position: "absolute",
              bottom: "60px",
              right: "50px",
              color: "#FFF",
              backgroundColor: green[600],
              "&:hover": {
                backgroundColor: green[800],
              },
            }}
            onClick={onFabAddClick}
          >
            <AddIcon />
          </Fab>
        </Paper>
        <AgendaDayContainer />
        <AddReminderContainer />
      </Root>
    );
  }
}

export default App;
