import {gql} from "@apollo/client";

export const GET_TOP_USERS = gql`
    query GetUsers {
        topUsers {
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

export const GET_USER = (slug: string) => gql`
user(slug:"${slug}"){
    display,
    bio,
    profile_url,
    zoom,
    width,
    height,
    offsetX,
    offsetY,
    photos{
      views,
      width,
      height,
      zoom,
      caption
    }
  }
`;