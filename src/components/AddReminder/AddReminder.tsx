import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddReminder = (props: Props) => {
  const { isOpen, onClose } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Add Reminder
        <IconButton
          aria-label="Close"
          sx={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent
        sx={{
          minHeight: "250px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography>
          Use this space to create the UI to add a reminder to the calendar.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminder;
