import {gql} from "@apollo/client";

export const GET_TOP_USERS = gql`
    query GetUsers {
        users {
            profile_url,
            display,
            photos {
                caption,
                url,
                user {
                    profile_url,
                    display
                }
            }
        }
    }
`;