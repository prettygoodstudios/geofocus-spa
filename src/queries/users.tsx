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
                    display
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
                slug
            }
        }
    }
`;