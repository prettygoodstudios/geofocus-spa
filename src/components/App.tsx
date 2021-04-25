import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import UserFeed from './UserFeed';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserPage from './UserPage';

const client = new ApolloClient({ 
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
});

const useStyles = makeStyles({
    body: {
        fontFamily: "Avenir"
    }
})

const App = () => {
    const classes = useStyles();
    return (
    <div className={classes.body}>
        <Router>
            <ApolloProvider client={client}>
                <Switch>
                    <Route path="/user/:slug">
                        <UserPage/>
                    </Route>
                    <Route path="/">
                        <UserFeed/>
                    </Route>
                </Switch>
            </ApolloProvider>
        </Router>
    </div>
    )
}

export default App;