import gql from "graphql-tag";


export const PHOTO_FRAGMENT = gql`
    fragment PhotoFragment on Photo {
        url,
        caption,
        slug,
        views,
        offsetX,
        offsetY,
        zoom,   
        width,
        height,
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
`;


export const GET_PHOTO = (slug: string) => gql`
    ${PHOTO_FRAGMENT}
    query GetPhoto {
        photo(slug: "${slug}") {
            ...PhotoFragment
        }
    }
`;


export const UPLOAD_PHOTO = gql`
    mutation UploadPhoto($file: Upload, $location: String, $offsetX: Float, $offsetY: Float $width: Float, $height: Float, $caption: String, $zoom: Float) {
        upload(file: $file, location: $location, offsetX: $offsetX, offsetY: $offsetY, width: $width, height: $height, caption: $caption, zoom: $zoom){
            slug,
            url
        }
    }
`;

export const DELETE_PHOTO = gql`
    mutation DeletePhoto($slug: String!) {
        deletePhoto(slug: $slug)
    }
`;