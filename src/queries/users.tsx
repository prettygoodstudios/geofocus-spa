import {gql} from "@apollo/client";

export const GET_TOP_USERS = gql`
    query GetUsers {
        topUsers {
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
    }
`;

export const GET_USER = (slug: string) => gql`
    query GetUser {
        user(slug:"${slug}"){
            display,
            bio,
            profile_url,
            zoom,
            width,
            height,
            offsetX,
            offsetY,
            slug,
            photos{
                views,
                width,
                height,
                zoom,
                caption,
                url,
                slug,
                offsetX,
                offsetY,
                location {
                    title,
                    slug
                },
                user {
                    profile_url,
                    display,
                    slug,
                    width,
                    height,
                    offsetX,
                    offsetY,
                    zoom
                }
            }
        }
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            display,
            bio,
            profile_url,
            zoom,
            width,
            height,
            offsetX,
            offsetY,
            slug,
            photos{
                views,
                width,
                height,
                zoom,
                caption,
                url,
                slug,
                offsetX,
                offsetY,
                location {
                    title,
                    slug
                },
                user {
                    profile_url,
                    display,
                    slug,
                    width,
                    height,
                    offsetX,
                    offsetY,
                    zoom
                }
            }
        }
    }
`;


export const ME = gql`
    query me {
        me {
            display,
            bio,
            profile_url,
            zoom,
            width,
            height,
            offsetX,
            offsetY,
            slug,
            photos{
                views,
                width,
                height,
                zoom,
                caption,
                url,
                slug,
                offsetX,
                offsetY,
                location {
                    title,
                    slug
                },
                user {
                    profile_url,
                    display,
                    slug,
                    width,
                    height,
                    offsetX,
                    offsetY,
                    zoom
                }
            }
        }
    }
`;

export const LOGOUT = gql`
    mutation logout {
        logout
    }
`;

export const REGISTER = gql`
    mutation register($display: String, $email: String, $password: String, $bio: String, $file: Upload!, $offsetX: Float, $offsetY: Float $width: Float, $height: Float, $zoom: Float) {
        register(display: $display, email: $email, password: $password, bio: $bio, file: $file, offsetX: $offsetX, offsetY: $offsetY, width: $width, height: $height, zoom: $zoom) {
            display,
            bio,
            profile_url,
            zoom,
            width,
            height,
            offsetX,
            offsetY,
            slug,
            photos{
                views,
                width,
                height,
                zoom,
                caption,
                url,
                slug,
                offsetX,
                offsetY,
                location {
                    title,
                    slug
                },
                user {
                    profile_url,
                    display,
                    slug,
                    width,
                    height,
                    offsetX,
                    offsetY,
                    zoom
                }
            }
        }
    }
`;