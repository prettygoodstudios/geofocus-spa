import {gql} from "@apollo/client";

export const GET_TOP_USERS = gql`
    query GetUsers {
        users {
            profile_url,
            display,
            photos {
                caption,
                url,
                width,
                height,
                zoom,
                offsetX,
                offsetY,
                views,
                user {
                    profile_url,
                    display
                }
            }
        }
    }
`;