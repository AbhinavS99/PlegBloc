import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component = {}/>
                <Route path = "/signup" exact component = {}/>
                <Route path = "/signin" exact component = {}/>
                <PrivateRoute path = "/user/dashboard" exact component ={}/>
                <PrivateRoute path = "/user/dashboard/mycampaigns" exact component = {}/>
                <PrivateRoute path = "/user/dashboard/createcampaign" exact component = {}/>
                <PrivateRoute path = "/user/campaign" exact component = {}/>
            </Switch>
        </BrowserRouter>
    )
}