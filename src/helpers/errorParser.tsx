import { ApolloError } from "@apollo/client";

export default (error: ApolloError) => {
    const { message, graphQLErrors: { 0: { extensions } } } = error;
    return {
        message,
        fields: extensions!.fields
    }
};

