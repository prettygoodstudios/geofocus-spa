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
            country,
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
            country,
            user {
                slug
            },
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
              	caption,
                location {
                    title,
                    slug
                }
            }
        }
    }
`;

export const UPDATE_LOCATION = gql`
    mutation updateLocation($title: String!, $address: String!, $city: String!, $state: String!, $country: String!, $slug: String!) {
        updateLocation(title: $title, address: $address, city: $city, state: $state, country: $country, slug: $slug) {
            slug,
            title,
            address,
            state,
            city,
            latitude,
            longitude,
            country
        }
    }
`;

export const CREATE_LOCATION = gql`
    mutation createLocation($title: String!, $address: String!, $city: String!, $state: String!, $country: String!) {
        createLocation(title: $title, address: $address, city: $city, state: $state, country: $country) {
            slug,
            title,
            address,
            state,
            city,
            latitude,
            longitude,
            country
        }
    }
`;