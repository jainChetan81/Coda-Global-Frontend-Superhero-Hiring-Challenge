import { Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MetaPanel from "../components/MetaPanel";
import Players from "../components/Players";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedPlayers: [] };
        this.addPlayer = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
    }
    addPlayer(player) {
        console.log("this.state.selectedPlayers", this.state.selectedPlayers);
        const newList = [...this.state.selectedPlayers, player];
        this.setState({
            selectedPlayers: [...newList],
        });
    }
    removePlayer(player) {
        let updatedSelectedPlayers = [...this.state.selectedPlayers];
        const isLargeNumber = (element) => element.Name === player.Name;
        const id = updatedSelectedPlayers.findIndex(isLargeNumber);
        console.log("id", id);
        updatedSelectedPlayers.splice(id, 1);
        this.setState({
            selectedPlayers: updatedSelectedPlayers,
        });
    }

    render() {
        const { selectedPlayers } = this.state;

        return (
            <div>
                <div className="App">
                    <header className="App-header sticky-top">
                        <h1 className="App-title">Let's Play</h1>
                    </header>
                    <Grid container>
                        <Grid item xs={3}>
                            <MetaPanel
                                history={this.props.history}
                                selectedPlayers={selectedPlayers}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Players
                                selectedPlayers={selectedPlayers}
                                removePlayer={this.removePlayer}
                                addPlayer={this.addPlayer}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
