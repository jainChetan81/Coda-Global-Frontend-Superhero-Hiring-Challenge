import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../Container/NotFound.js";
import routes from "./routes.js"; //TODO: this is bringing different routes in routes.js and sent to index.js

class ReactRouter extends Component {
    getRoutes = (routes) => {
        return routes.map((route, index) => {
            if (route.layout === "/") {
                return (
                    <Route
                        path={route.layout + route.path}
                        component={route.component}
                        key={index}
                    />
                );
            } else {
                return null;
            }
        });
    };

    render() {
        return (
            <Switch>
                {this.getRoutes(routes)}
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default ReactRouter;
