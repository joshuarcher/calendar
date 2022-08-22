import React from "react";
import {
    WithStyles,
    withStyles,
    createStyles,
    Theme,
} from "@material-ui/core/styles";
import { ReminderInterface } from "../../utils/reminderInterface";
import * as dateFns from "date-fns";
import { List, ListItem, ListItemText } from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        ReminderItem: {
            color: '#FFFFFF'
        }
    });

interface Props extends WithStyles<typeof styles> {
    reminders: ReminderInterface[];
    date: Date;
}

const ReminderList = (props: Props) => {
    const { classes, reminders, date } = props;
    let currentReminders = reminders.filter(reminder => {
        return new Date(date).setHours(0, 0, 0, 0) === new Date(reminder.date).setHours(0, 0, 0, 0);
    });
    currentReminders = currentReminders.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    if (currentReminders.length > 0) {
        return (
            <List component="nav">
                {currentReminders.map(reminder => (
                    <ListItem key={reminder.id} style={{ background: reminder.color }}>
                        <ListItemText
                            classes={{ primary: classes.ReminderItem }}
                            primary={`${dateFns.format(reminder.date, "hh:mm a")} ${reminder.title}`} />
                    </ListItem>
                ))}
            </List>
        );
    } else {
        return (
            <div></div>
        );
    }
};

export default withStyles(styles)(ReminderList);
