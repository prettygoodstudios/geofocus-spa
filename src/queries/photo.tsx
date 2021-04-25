import gql from "graphql-tag";


export const GET_PHOTO = (slug: string) => gql`
    query GetPhoto {
        photo(slug: "${slug}") {
            url,
            caption,
            slug,
            views,
            user {
                display,
                zoom,
                width,
                height,
                profile_url,
                offsetX,
                offsetY,
                slug
            },
            location {
                title,
                slug
            }
        }
    }
`;