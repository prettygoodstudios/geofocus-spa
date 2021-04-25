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

export const GET_LOCATION = (slug: string) => gql`
    query GetLocation {
        location(slug: "${slug}") {
            slug,
            title,
            address,
            state,
            city,
            latitude,
            longitude,
            photos {
                url,
                width,
                height,
                offsetX,
                offsetY,
                zoom,
                views,
                user {
                    slug,
                    bio,
                  	display,
                    width,
                    height,
                    offsetX,
                    offsetY,
                    zoom,
                    profile_url
                },
                slug,
              	caption
            }
        }
    }
`;