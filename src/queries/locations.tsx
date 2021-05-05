import {gql} from "@apollo/client";
import { PHOTO_FRAGMENT } from "./photo";

export const LOCATION_FRAGMENT = gql`
    ${PHOTO_FRAGMENT}
    fragment LocationFragment on Location {
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
            ...PhotoFragment
        }
    }
`;

export const GET_LOCATIONS = gql`
    ${LOCATION_FRAGMENT}
    query GetLocations {
        locations {
            ...LocationFragment
        }
    }
`;

export const GET_LOCATION = (slug: string) => gql`
    ${LOCATION_FRAGMENT}
    query GetLocation {
        location(slug: "${slug}") {
            ...LocationFragment
        }
    }
`;

export const UPDATE_LOCATION = gql`
    ${LOCATION_FRAGMENT}
    mutation updateLocation($title: String!, $address: String!, $city: String!, $state: String!, $country: String!, $slug: String!) {
        updateLocation(title: $title, address: $address, city: $city, state: $state, country: $country, slug: $slug) {
            ...LocationFragment
        }   
    }
`;

export const CREATE_LOCATION = gql`
    ${LOCATION_FRAGMENT}
    mutation createLocation($title: String!, $address: String!, $city: String!, $state: String!, $country: String!) {
        createLocation(title: $title, address: $address, city: $city, state: $state, country: $country) {
            ...LocationFragment
        }
    }
`;