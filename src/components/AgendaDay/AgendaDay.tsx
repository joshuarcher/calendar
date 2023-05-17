import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import * as dateFns from "date-fns";

interface Props {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { agendaStatus, onClose } = props;
  const dateTitle = agendaStatus.date
    ? dateFns.format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing";

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
          sx={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent sx={{ minHeight: "250px", marginTop: "10px" }}>
        <Typography>Use this space to list the reminders.</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AgendaDay;
