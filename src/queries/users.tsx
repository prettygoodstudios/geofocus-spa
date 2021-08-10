import {gql} from "@apollo/client";
import { PHOTO_FRAGMENT } from "./photo";

export const STANDARD_USER_FIELDS = `
    profile_url,
    display,
    slug,
    width,
    height,
    offsetX,
    offsetY,
    zoom,
    slug
`

const PHOTOS_SELECTOR =  `
    photos {
        ...PhotoFragment
    }
`

export const USER_FRAGMENT = gql`
    ${PHOTO_FRAGMENT}
    fragment PublicProfile on Profile {
        ${STANDARD_USER_FIELDS},
        ${PHOTOS_SELECTOR}
    }
`;

export const PRIVATE_USER_FRAGMENT = gql`
    fragment PrivateUserFragment on PrivateUserData {
        ${STANDARD_USER_FIELDS},
        role,
        bio,
        email
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
    ${PRIVATE_USER_FRAGMENT}
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ...PrivateUserFragment
        }
    }
`;


export const ME = gql`
    ${PRIVATE_USER_FRAGMENT}
    query me {
        me {
            ...PrivateUserFragment
        }
    }
`;

export const LOGOUT = gql`
    mutation logout {
        logout
    }
`;

export const REGISTER = gql`
    ${PRIVATE_USER_FRAGMENT}
    mutation register($display: String, $email: String, $password: String, $bio: String, $file: Upload, $offsetX: Float, $offsetY: Float, $width: Float, $height: Float, $zoom: Float) {
        register(display: $display, email: $email, password: $password, bio: $bio, file: $file, offsetX: $offsetX, offsetY: $offsetY, width: $width, height: $height, zoom: $zoom) {
            ...PrivateUserFragment
        }
    }
`;

export const UPDATE_PROFILE = gql`
    ${PRIVATE_USER_FRAGMENT}
    mutation editProfile($display: String, $email: String, $password: String, $bio: String, $file: Upload, $offsetX: Float, $offsetY: Float, $width: Float, $height: Float, $zoom: Float) {
        editProfile(display: $display, email: $email, password: $password, bio: $bio, file: $file, offsetX: $offsetX, offsetY: $offsetY, width: $width, height: $height, zoom: $zoom) {
            ...PrivateUserFragment
        }
    }
`;