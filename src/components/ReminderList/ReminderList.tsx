import React from "react";
import {
    WithStyles,
    withStyles,
    createStyles,
    Theme,
} from "@material-ui/core/styles";
import { ReminderInterface } from "../../utils/reminderInterface";

const styles = (theme: Theme) =>
    createStyles({
    });

interface Props extends WithStyles<typeof styles> {
    reminders: ReminderInterface[];
}

const Reminder = (props: Props) => {
    const { classes, reminders } = props;

    if (reminders.length > 0) {
        return (
            <div>
                Hello World!
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
};

export default withStyles(styles)(Reminder);
