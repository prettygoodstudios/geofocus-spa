import {gql} from "@apollo/client";

export const GET_LOCATIONS = gql`
    query GetLocations {
        locations {
            slug,
            title,
            address,
            state,
            city,
            latitude,
            longitude,
            photos {
                url,
                user {
                    slug,
                    bio,
                    width,
                    height,
                    zoom
                },
                slug
            }
        }
    }
`;