import React, { Component } from "react";
import axios from "axios";
import Form from "../components/Form";
import Spinner from "../components/Spinner/Spinner";
import Player from "./Player";
import {
    getFromStorage,
    removeFromStorage,
    setInStorage,
} from "../utils/localStorage";

class Players extends Component {
    state = {
        playerList: [],
        loading: true,
        filteredPlayerList: [],
        searchString: "",
    };

    componentDidMount() {
        this.getNewsItems();
    }

    getPlayers = (e) => {
        e.preventDefault();
        const playerName = e.target.elements.playerName.value;
        const filteredPlayerList = this.state.playerList.filter((e) => {
            return e.Name.trim()
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(playerName.trim().replace(/\s+/g, "").toLowerCase());
        });
        console.log("filteredPlayerList", filteredPlayerList);

        this.setState({
            loading: false,
            filteredPlayerList: [...filteredPlayerList],
            searchString: playerName,
        });
    };

    getNewsItems() {
        console.log("getNewsItems");
        const storedPlayers = getFromStorage("AllPlayers");
        if (storedPlayers?.length === 30)
            this.setState({
                playerList: storedPlayers,
                loading: false,
            });
        if (storedPlayers?.length !== 30)
            axios
                .get(
                    "https://cors-anywhere.herokuapp.com/https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json"
                )
                .then((res) => {
                    let updatedPlayerList = [];
                    console.log("res.data", res.data);
                    res.data.forEach((item) =>
                        updatedPlayerList.push({ ...item, Wins: 0, Lost: 0 })
                    );
                    this.setState({
                        playerList: updatedPlayerList,
                        loading: false,
                    });
                    removeFromStorage("AllPlayers");
                    setInStorage("AllPlayers", updatedPlayerList);
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({ loading: true });
                });
    }
    render() {
        const { playerList, filteredPlayerList, searchString } = this.state;
        const { selectedPlayers, removePlayer, addPlayer } = this.props;
        return (
            <>
                <Form getPlayers={this.getPlayers} />
                {this.state.loading ? (
                    <Spinner />
                ) : playerList.length < 1 ? (
                    <p>Player List can't be loaded</p>
                ) : (
                    <Player
                        playerList={playerList}
                        filteredPlayerList={filteredPlayerList}
                        searchString={searchString}
                        selectedPlayers={selectedPlayers}
                        removePlayer={removePlayer}
                        addPlayer={addPlayer}
                    />
                )}
            </>
        );
    }
}
export default Players;
