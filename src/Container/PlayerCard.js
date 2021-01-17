import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import {
    getFromStorage,
    removeFromStorage,
    setInStorage,
} from "../utils/localStorage";

function PlayerCard({ opposingBet, selectedPlayers }) {
    const [newSelectedPlayers] = useState([...selectedPlayers]);

    const checkForVictory = (player) => {
        const storedSelectedPlayers = getFromStorage("SelectedPlayers");
        const storedAllPlayers = getFromStorage("AllPlayers");
        removeFromStorage("SelectedPlayers");
        removeFromStorage("AllPlayers");
        const isLargeNumber = (element) => element.Name === player.Name;
        const idSelected = storedSelectedPlayers.findIndex(isLargeNumber);
        const idAll = storedAllPlayers.findIndex(isLargeNumber);
        storedSelectedPlayers.splice(idSelected, 1);
        storedAllPlayers.splice(idAll, 1);
        if (player.Bet === opposingBet.toString()) {
            player.Wins += 1;
            player.Price = player.Price.parseInt() + 100;
        }
        if (player.Bet !== opposingBet.toString()) {
            player.Lost += 1;
            player.Price = player.Price.parseInt() - 100;
        }
        storedSelectedPlayers.splice(idSelected, 0, player);
        storedAllPlayers.splice(idAll, 0, player);
        setInStorage("SelectedPlayers", storedSelectedPlayers);
        setInStorage("AllPlayers", storedAllPlayers);
        // setNewSelectedPlayers(storedSelectedPlayers);
        return null;
    };
    return (
        <Grid
            container
            spacing={4}
            direction="row"
            justify="center"
            alignItems="baseline">
            {newSelectedPlayers?.map((player) => (
                <Grid item xs key={player.Name}>
                    {checkForVictory(player)}
                    <div
                        className={`card border border-4 ${
                            player.Bet === opposingBet.toString()
                                ? "border-success"
                                : "border-danger"
                        }`}
                        style={{ width: "14rem", height: "20rem" }}>
                        <img
                            src={player["Profile Image"]}
                            style={{ height: 150 }}
                            className="card-img-top p-1"
                            alt={player.Name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{player.Name}</h5>
                            <p className="card-text">
                                {`Price: ${player.Price} Bet: ${player.Bet}`}
                                <br />
                                {`Wins: ${player.Wins}`}
                            </p>
                            <p
                                className={`lead text-center ${
                                    player.Bet === opposingBet.toString()
                                        ? "bg-success"
                                        : "bg-danger"
                                }`}>
                                <b>
                                    {player.Bet === opposingBet.toString()
                                        ? "Winner"
                                        : "Lose"}
                                </b>
                            </p>
                        </div>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}
export default PlayerCard;
