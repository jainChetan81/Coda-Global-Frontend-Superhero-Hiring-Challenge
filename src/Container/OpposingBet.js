import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/localStorage";
import PLayerCard from "./PlayerCard";

class OpposingBet extends Component {
    state = {
        selectedPlayers: [],
        opposingBet: null,
        asc: false,
        desc: false,
        price: false,
        bet: false,
    };

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

    sort(type) {
        let asc = this.state.asc;
        let desc = this.state.desc;
        let price = this.state.price;
        let bet = this.state.bet;
        let updatedSelectedPlayers = this.state.selectedPlayers;
        if (type === "asc") {
            asc = true;
            desc = false;
        }
        if (type === "desc") {
            desc = true;
            asc = false;
        }
        if (type === "price") {
            price = true;
            bet = false;
        }
        if (type === "bet") {
            bet = true;
            price = false;
        }
        let order = asc ? "asc" : "desc";
        let key = price ? "Price" : "Bet";
        console.log("key", key, updatedSelectedPlayers[0][key]);
        if (price && asc) {
            updatedSelectedPlayers.sort(function (a, b) {
                console.log(a.Price);
                console.log(a, b);
                var x = a[key];
                var y = b[key];
                return x < y ? -1 : x > y ? 1 : 0;
            });
        }
        console.log("updatedSelectedPlayers", updatedSelectedPlayers);
        this.setState({
            asc,
            desc,
            price,
            bet,
            selectedPlayers: updatedSelectedPlayers,
        });
    }

    render() {
        const { selectedPlayers, opposingBet } = this.state;
        if (selectedPlayers?.length !== 9)
            return (
                <h3 className="text-center">
                    You Need exact 9 names for placing bets Go Back to{" "}
                    <Link to="/">DashBoard</Link>
                </h3>
            );
        return (
            <div>
                <h3>Welcome! The Opposing Bet is {this.state.opposingBet}</h3>
                <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example">
                    <button
                        onClick={() => this.sort("asc")}
                        type="button"
                        class="btn btn-danger">
                        Ascending
                    </button>
                    <button
                        onClick={() => this.sort("desc")}
                        type="button"
                        class="btn btn-warning">
                        Descinding
                    </button>
                    <button
                        onClick={() => this.sort("price")}
                        type="button"
                        class="btn btn-success">
                        Price
                    </button>
                    <button
                        onClick={() => this.sort("bet")}
                        type="button"
                        class="btn btn-dark">
                        Bet
                    </button>
                </div>
                <h5>
                    Sorting by <b>{this.state.price ? "PRICE" : "BET"}</b> in{" "}
                    <b>{this.state.asc ? "ASCENDING" : "DESCENDING"}</b> order
                </h5>
                <PLayerCard
                    opposingBet={opposingBet}
                    selectedPlayers={selectedPlayers}
                />
            </div>
        );
    }
}
export default OpposingBet;
