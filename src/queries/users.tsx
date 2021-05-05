import {gql} from "@apollo/client";

export const USER_FRAGMENT = gql`
    fragment PublicProfile on Profile {
        profile_url,
        display,
        slug,
        width,
        height,
        offsetX,
        offsetY,
        zoom,
        photos {
            caption,
            url,
            width,
            height,
            zoom,
            offsetX,
            offsetY,
            slug,
            views,
            user {
                profile_url,
                display,
                slug,
                width,
                height,
                offsetX,
                offsetY,
                zoom
            },
            location {
                title,
                slug
            }
        }
    }
`;

export const GET_TOP_USERS = gql`
    ${USER_FRAGMENT}
    query GetUsers {
        topUsers {
            ...PublicProfile   
        }
    }
`;

export const GET_USER = (slug: string) => gql`
    ${USER_FRAGMENT}
    query GetUser {
        user(slug:"${slug}"){
            ...PublicProfile   
        }
    }
`;

export const LOGIN = gql`
    ${USER_FRAGMENT}
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ...PublicProfile
        }
    }
`;


export const ME = gql`
    ${USER_FRAGMENT}
    query me {
        me {
            ...PublicProfile   
        }
    }
`;

export const LOGOUT = gql`
    mutation logout {
        logout
    }
`;

export const REGISTER = gql`
    ${USER_FRAGMENT}
    mutation register($display: String, $email: String, $password: String, $bio: String, $file: Upload!, $offsetX: Float, $offsetY: Float $width: Float, $height: Float, $zoom: Float) {
        register(display: $display, email: $email, password: $password, bio: $bio, file: $file, offsetX: $offsetX, offsetY: $offsetY, width: $width, height: $height, zoom: $zoom) {
            ...PublicProfile
        }
    }
`;