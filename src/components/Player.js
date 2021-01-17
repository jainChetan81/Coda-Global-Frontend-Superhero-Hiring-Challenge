import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import MuiAlert from "@material-ui/lab/Alert";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Snackbar } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        width: 1100,
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const isSelected = (name, selectedPlayers) => {
    let matching = false;
    selectedPlayers?.forEach((player) => {
        if (player.Name === name) matching = true;
    });
    return matching;
};

export default function Player({
    playerList,
    searchString,
    filteredPlayerList,
    selectedPlayers,
    removePlayer,
    addPlayer,
}) {
    const [open, setOpen] = React.useState(false);
    const [players, setPlayers] = useState([...playerList]);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const determineFate = (player) => {
        const loss = player.Lost;
        const wins = player.Wins;
        const probability = 1 / 9 + loss / 9 - wins / 9;
        return "1 / 9";
    };

    const addPlayerInList = (player) => {
        if (selectedPlayers.length >= 9) setOpen(true);
        else addPlayer(player);
    };

    const classes = useStyles();
    let list = [...players];
    if (searchString !== "") list = [...filteredPlayerList];
    if (searchString !== "" && filteredPlayerList.length < 1)
        return <h3>No Player by name {searchString}</h3>;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Select</StyledTableCell>
                        <StyledTableCell>Player Name</StyledTableCell>
                        <StyledTableCell align="right">Fate</StyledTableCell>
                        <StyledTableCell align="right">Avatar</StyledTableCell>
                        <StyledTableCell align="right">Bet</StyledTableCell>
                        <StyledTableCell align="right">Wins</StyledTableCell>
                        <StyledTableCell align="right">Lost</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((player) => (
                        <StyledTableRow key={player.Name}>
                            <StyledTableCell align="left">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        isSelected(player.Name, selectedPlayers)
                                            ? removePlayer(player)
                                            : addPlayerInList(player);
                                    }}>
                                    {isSelected(player.Name, selectedPlayers)
                                        ? "Selected"
                                        : "Select"}
                                </button>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {player.Name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {determineFate(player)}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <img
                                    style={{ height: 30, width: 30 }}
                                    src={player["Profile Image"]}
                                    className="img rounded"
                                    alt="..."
                                />
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {player.Bet}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {player.Wins}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {player.Lost}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {player.Price}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                return (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        You have selected 9 players
                    </Alert>
                </Snackbar>
                );
            </Table>
        </TableContainer>
    );
}
