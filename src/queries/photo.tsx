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


export const UPLOAD_PHOTO = gql`
    mutation UploadPhoto($file: Upload!, $location: String, $offsetX: Float, $offsetY: Float $width: Float, $height: Float, $caption: String, $zoom: Float) {
        upload(file: $file, location: $location, offsetX: $offsetX, offsetY: $offsetY, width: $width, height: $height, caption: $caption, zoom: $zoom){
            slug,
            url
        }
    }
`;