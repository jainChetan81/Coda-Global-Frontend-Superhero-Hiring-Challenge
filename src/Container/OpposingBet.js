import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/localStorage";
import PLayerCard from "../components/PlayerCard/PlayerCard";

class OpposingBet extends Component {
    state = { selectedPlayers: [], opposingBet: null };

    componentDidMount() {
        this.getFromStorage();
        let num = Math.round(Math.random() * 10) + 1;
        while (num >= 10) {
            num = Math.round(Math.random() * 10) + 1;
        }
        this.setState({ opposingBet: num });
    }
    getFromStorage() {
        const storedPlayers = getFromStorage("SelectedPlayers");
        this.setState({
            selectedPlayers: storedPlayers,
        });
    }

    render() {
        const { selectedPlayers, opposingBet } = this.state;
        if (selectedPlayers.length !== 9)
            return (
                <h3 className="text-center">
                    You Need exact 9 names for placing bets Go Back to{" "}
                    <Link to="Dashboard">DashBoard</Link>
                </h3>
            );
        return (
            <div>
                <h3>Welcome! The Opposing Bet is {this.state.opposingBet}</h3>
                <PLayerCard
                    opposingBet={opposingBet}
                    selectedPlayers={selectedPlayers}
                />
            </div>
        );
    }
}
export default OpposingBet;
