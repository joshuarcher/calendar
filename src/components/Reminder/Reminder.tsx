import React, { useState } from "react";
import {
    WithStyles,
    withStyles,
    createStyles,
    Theme,
} from "@material-ui/core/styles";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from "material-ui-pickers";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { ReminderInterface } from "../../utils/reminderInterface";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        TitleContainer: {
            margin: "10px",
            display: "flex"
        },
        DateContainer: {
            margin: "10px",
            display: "flex"
        },
        ColorContainer: {
            margin: "10px",
            display: "flex"
        },
        SubmitContainer: {
            margin: "30px",
            display: "flex"
        }
    });

interface Props extends WithStyles<typeof styles> {
    onSubmit: (reminder : ReminderInterface) => void;
}

const Reminder = (props: Props) => {
    const { classes, onSubmit } = props;
    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState(new Date());
    const [color, setColor] = useState("");
    const colors = {
        Red: "#CC2936",
        Yellow: "#C59849",
        Green: "#43AA8B",
        Blue: "#3F88C5",
        Purple: "#643A71"
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const reminder : ReminderInterface = {
            id: new Date().getTime(),
            title: title,
            date: dateTime,
            color: color
        }
        onSubmit(reminder);
    }

    const handleTitleValidation = (value: string) => {
        if(value.length <= 30) {
            setTitle(value);
        }
    }

    return (
        <div className={classes.root}>
            <Grid container direction="column" justify="flex-start" alignItems="stretch">
                <form onSubmit={e => { handleSubmit(e) }}>
                    <Grid item>
                        <TextField
                            required
                            className={classes.TitleContainer}
                            id="reminder-title"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={e => handleTitleValidation(e.target.value)}
                            helperText="Note: Reminder titles cannot be longer than 30 characters."
                        />
                    </Grid>
                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                className={classes.DateContainer}
                                value={dateTime}
                                onChange={setDateTime} />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <FormControl required variant="outlined" className={classes.ColorContainer}>
                            <InputLabel htmlFor="color">Color</InputLabel>
                            <Select value={color} onChange={e => setColor(e.target.value)}>
                                {Object.keys(colors).map(color => {
                                    return <MenuItem key={color} value={colors[color]}>
                                        {color}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            className={classes.SubmitContainer}
                            variant="contained"
                            type="submit"
                            color="primary">
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(Reminder);
