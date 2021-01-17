import { Grid } from "@material-ui/core";
import React from "react";

function PlayerCard({ opposingBet, selectedPlayers }) {
    return (
        <Grid
            container
            spacing={4}
            direction="row"
            justify="center"
            alignItems="baseline">
            {selectedPlayers?.map((player) => (
                <Grid item xs key={player.Name}>
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
