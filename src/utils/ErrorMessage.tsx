import React from "react";
import { Typography } from "@material-ui/core";
import {
    WithStyles,
    withStyles,
    createStyles,
    Theme,
} from "@material-ui/core/styles";

const styles = (theme: Theme) =>
createStyles({
errorStyle: {
    color: "red",
    fontSize: "10px"
}
});

interface Props extends WithStyles<typeof styles> {
    ifCondition: boolean;
    children: string;
}

const ErrorMessage = (props: Props) => {
    const { ifCondition, classes } = props;
    return (!!ifCondition ? 
        <Typography className={classes.errorStyle}>
            {props.children}
        </Typography>
        : null
    );
};

export default withStyles(styles)(ErrorMessage);