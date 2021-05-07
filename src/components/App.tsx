import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createMuiTheme, ThemeProvider} from "@material-ui/core";
import UserFeed from './UserFeed';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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
import LocationFormPage from './LocationFormPage';
import PhotoUploadPage from './PhotoUploadPage';
import {createUploadLink} from "apollo-upload-client";
import RegistrationPage from './RegistrationPage';
import Locations from './Locations';
import Styler from './Styler';

const link = createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
});


const client = new ApolloClient({ 
    cache: new InMemoryCache(),
    link
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#9013FE",
        },
        secondary: {
            main: "#ECECEC",
        }
    },
    typography: {
        fontFamily: "Avenir"
    }
});

const App = () => {

    const [state, dispatch] = useReducer(reducer, {
        user: null,
        loaded: false
    });

    const context = useMemo(() => ({state, dispatch}), [state, dispatch]);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Styler> 
                    <ApolloProvider client={client}>
                        <UserContext.Provider value={context}>
                            <Nav/>
                            <Switch>
                                <Route path="/user/:slug">
                                    <UserPage/>
                                </Route>
                                <Route path="/photo/upload/new/:slug">
                                    <PhotoUploadPage/>
                                </Route>
                                <Route path="/photo/:slug">
                                    <PhotoPage/>
                                </Route>
                                <Route path="/location/form/create">
                                    <LocationFormPage create={true}/>
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
                                <Route path="/register">
                                    <RegistrationPage/>
                                </Route>
                                <Route path="/">
                                    <Locations/>
                                    <h2>Top Users</h2>
                                    <UserFeed/>
                                </Route>
                            </Switch>
                        </UserContext.Provider>
                    </ApolloProvider>
                </Styler>
            </ThemeProvider>  
        </Router>
    )
}

export default App;

