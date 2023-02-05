import React, { useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import * as dateFns from "date-fns";
import { RemindersContext } from "../App/App";

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      maxHeight: "278px",
      marginTop: "10px",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    toolbarButtonHidden: {
      visibility: "hidden",
    },
    toolbarButtonVisible: {
      visibility: "visible",
    },
    dot: {
      height: "15px",
      width: "15px",
      borderRadius: "50%",
      display: "inline-block",
      marginRight: "5px"
    }
  });

interface Props extends WithStyles<typeof styles> {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, onClose } = props;
  const dateTitle = agendaStatus.date
  ? dateFns.format(agendaStatus.date, "LLLL do, yyyy")
  : "Closing";
  const remindersContext = useContext(RemindersContext);
  const selectedDate = agendaStatus.date;

  const getCurrentDayReminders = (reminders) => {
    const currentReminders = reminders.filter(reminder => dateFns.isSameDay(selectedDate, dateFns.parseISO(reminder.date)));
    const sortedReminders = currentReminders.sort((a, b) => {
      if (a.time < b.time) return -1;
      if (a.time > b.time) return 1;
      else return 0;
    });
    return (
      sortedReminders.map((reminder) => {
        return (
          <div key={reminder.id}>
            <Typography>
              <span className={classes.dot} style={{ backgroundColor: reminder.color }}></span>
              {dateFns.format(new Date(`2000-01-01T${reminder.time}:00`), 'h:mm aa')} {reminder.title}
            </Typography>
          </div>
        )
      })
    )
  }
  
  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        { getCurrentDayReminders(remindersContext.reminders) }
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AgendaDay);
