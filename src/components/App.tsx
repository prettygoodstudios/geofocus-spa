import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import UserFeed from './UserFeed';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import UserPage from './UserPage';
import PhotoPage from './PhotoPage';
import Nav from './Nav';
import LocationPage from './LocationPage';
import LoginPage from './LoginPage';
import { UserContext } from '../helpers/UserContext';
import { useMemo, useReducer } from 'react';
import { reducer } from '../helpers/Reducer';
import MePage from './MePage';

const client = new ApolloClient({ 
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
    credentials: "include"
});

const useStyles = makeStyles({
    body: {
        fontFamily: "Avenir"
    }
})

const App = () => {
    const classes = useStyles();

    const [state, dispatch] = useReducer(reducer, {
        user: null
    });

    const context = useMemo(() => ({state, dispatch}), [state, dispatch]);

    return (
    <div className={classes.body}>
        <Router>
            <ApolloProvider client={client}>
                <UserContext.Provider value={context}>
                    <Nav/>
                    <Switch>
                        <Route path="/user/:slug">
                            <UserPage/>
                        </Route>
                        <Route path="/photo/:slug">
                            <PhotoPage/>
                        </Route>
                        <Route path="/location/:slug">
                            <LocationPage/>
                        </Route>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="/me">
                            <MePage/>
                        </Route>
                        <Route path="/">
                            <h1>Welcome to GeoFocus!</h1>
                            <h2>These are our top users.</h2>
                            <UserFeed/>
                        </Route>
                    </Switch>
                </UserContext.Provider>
            </ApolloProvider>
        </Router>
    </div>
    )
}

export default App;

