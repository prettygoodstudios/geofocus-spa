import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createMuiTheme, ThemeProvider} from "@material-ui/core";
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
import { useMemo, useReducer } from 'react';
import { reducer } from '../helpers/Reducer';
import LocationFormPage from './LocationFormPage';
import PhotoUploadPage from './PhotoUploadPage';
import {createUploadLink} from "apollo-upload-client";
import RegistrationPage from './RegistrationPage';
import Locations from './Locations';
import Styler from './Styler';
import useStandard from '../styles/standard';
import Admin from './Admin';
import UpdateProfilePage from './UpdateProfilePage';
import UserProvider from './UserProvider';

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

    const standard = useStandard(theme);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Styler>
                    <ApolloProvider client={client}>
                        <UserProvider>
                            <Nav/>
                            <Switch>
                                <Route path="/profile/update/">
                                    <UpdateProfilePage/>
                                </Route>
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
                                <Route path="/register">
                                    <RegistrationPage/>
                                </Route>
                                <Route path="/admin">
                                    <Admin/>
                                </Route>
                                <Route path="/">
                                    <Locations/>
                                    <h2 className={standard.standardMargin}>Top Users</h2>
                                    <UserFeed/>
                                </Route>
                            </Switch>
                        </UserProvider>
                    </ApolloProvider>
                </Styler>
            </ThemeProvider>  
        </Router>
    )
}

export default App;

