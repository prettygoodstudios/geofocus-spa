import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import UserFeed from './UserFeed';



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
        <ApolloProvider client={client}>
            <UserFeed/>
        </ApolloProvider>
    </div>
    )
}

export default App;