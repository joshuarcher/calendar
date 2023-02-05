import React, { useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ErrorMessage from "../../utils/ErrorMessage";
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import { Formik } from 'formik';
import { RemindersContext } from "../App/App";
import {v4 as uuidv4} from 'uuid';
import Notiflix from 'notiflix';

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: "250px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    submitButton: {
      display: "block",
      marginTop: "10px",
      padding: "8px",
      borderRadius: "4px",
    },
    formElement: {
      padding: "4px",
      width: "30%",
      fontFamily: "Roboto, sans-serif"
    },
    colorField: {
      borderRadius: "4px",
      width: "25px",
      height: "25px"
    }
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onClose: () => void;
}

const AddReminder = (props: Props) => {
  const { classes, isOpen, onClose } = props;
  const remindersContext = useContext(RemindersContext);

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
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.addReminderFormContainer}>
        <div>
          <Formik
            initialValues={{ title: "", date: "", time: "", color: "" }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);

                remindersContext.createReminder({ 
                  title: values.title, 
                  date: values.date, 
                  time: values.time, 
                  color: values.color,
                  id:  uuidv4()
                });

                Notiflix.Notify.success('Reminder created');
            }}
          >
            {({
              values,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                  <Typography>Title</Typography>
                </label>
                <input
                  type="title"
                  name="title"
                  maxLength={30}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  className={classes.formElement}
                />
                <ErrorMessage ifCondition={touched.title && !values.title}>A title is required.</ErrorMessage>
                <ErrorMessage ifCondition={values.title?.length >= 30}>The title cannot exceed 30 characters.</ErrorMessage>
                
                <label htmlFor="date">
                  <Typography>Date</Typography>
                </label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
                  className={classes.formElement}
                />
                <ErrorMessage ifCondition={touched.date && !values.date}>A date is required.</ErrorMessage>
                
                <label htmlFor="time">
                  <Typography>Time</Typography>
                </label>
                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.time}
                  className={classes.formElement}
                />
                <ErrorMessage ifCondition={touched.time && !values.time}>A time is required.</ErrorMessage>

                <label htmlFor="color">
                  <Typography>Color</Typography>
                </label>
                <input
                  type="color"
                  name="color"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.color}
                  className={classes.colorField}
                />
                <ErrorMessage ifCondition={touched.color && !values.color}>A color is required.</ErrorMessage>
                
                <Button 
                  type="submit" 
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !values.title || !values.date || !values.time || !values.color}
                  className={classes.submitButton}
                >
                  Submit
                </Button>
                
              </form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AddReminder);
