import { Button, Paper } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        fontSize: 1,
        backgroundColor: theme.palette.background.paper,
        height: 61,
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    text: {
        fontSize: 1,
    },
}));

const clicked = (history) => {
    history.push("/");
};

function MetaPanel({ selectedPlayers, history }) {
    console.log("history", history);
    const classes = useStyles();
    return (
        <Paper
            elevation={3}
            style={{
                height: 590,
                textAlign: "center",
                width: 340,
                marginLeft: 20,
                position: "fixed",
            }}>
            Playing {selectedPlayers.length}{" "}
            <Button
                type="button"
                className={
                    selectedPlayers.length === 9
                        ? "btn btn-primary m-0"
                        : "btn btn-secondary"
                }
                onClick={() => clicked(history)}
                disabled={selectedPlayers.length !== 9}>
                {selectedPlayers.length === 9 ? "Start" : "Select 9"}
            </Button>
            {selectedPlayers?.map((player) => (
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.small}
                                alt="Remy Sharp"
                                src={player["Profile Image"]}></Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className={classes.text}
                            primary={`${player.Name} (Price: ${player.Price})`}
                            secondary={`Wins: ${player.Wins} Lost: ${player.Lost}`}
                        />
                    </ListItem>
                </List>
            ))}
        </Paper>
    );
}

export default MetaPanel;
