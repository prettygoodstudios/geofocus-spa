import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import UserFeed from './UserFeed';



const client = new ApolloClient({ 
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
});

const App = () => {
    return <ApolloProvider client={client}>
        <UserFeed/>
    </ApolloProvider>
}

export default App;