import React from "react";
import {
    WithStyles,
    withStyles,
    createStyles,
    Theme,
} from "@material-ui/core/styles";
import { ReminderInterface } from "../../utils/reminderInterface";
import * as dateFns from "date-fns";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme: Theme) =>
    createStyles({
        ReminderItem: {
            color: '#FFFFFF'
        }
    });

interface Props extends WithStyles<typeof styles> {
    reminders: ReminderInterface[];
    date: Date;
    isEditButtonVisible: boolean;
    handleEdit: (reminder: ReminderInterface) => void;
}

const ReminderList = (props: Props) => {
    const { classes, reminders, date, handleEdit, isEditButtonVisible } = props;
    let currentReminders = reminders.filter(reminder => {
        return new Date(date).setHours(0, 0, 0, 0) === new Date(reminder.date).setHours(0, 0, 0, 0);
    });
    currentReminders = currentReminders.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const clickEdit = (reminder: ReminderInterface) => {
        handleEdit(reminder);
    }

    if (currentReminders.length > 0) {
        return (
            <List component="nav">
                {currentReminders.map(reminder => (
                    <ListItem key={reminder.id} style={{ background: reminder.color }}>
                        <ListItemText
                            classes={{ primary: classes.ReminderItem }}
                            primary={`${dateFns.format(reminder.date, "hh:mm a")} ${reminder.title}`} />
                        {isEditButtonVisible ? <ListItemIcon>
                            <EditIcon onClick={() => clickEdit(reminder)} />
                        </ListItemIcon> : undefined}
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
