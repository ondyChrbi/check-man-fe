import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {JWT_TOKEN_KEY} from "../../features/authentication/helper";

const httpLink = createHttpLink({
    uri: 'http://localhost:9001/graphql'
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    return {
        headers: {
            ...headers,
            'Access-Control-Allow-Origin' : '*',
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});

export default new ApolloClient({
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),
});