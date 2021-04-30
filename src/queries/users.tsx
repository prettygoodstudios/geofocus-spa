import {gql} from "@apollo/client";

export const GET_TOP_USERS = gql`
    query GetUsers {
        topUsers {
            profile_url,
            display,
            slug,
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
                    slug
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
                location {
                    title,
                    slug
                },
                user {
                    profile_url,
                    display,
                    slug
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
                    slug
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
                    slug
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