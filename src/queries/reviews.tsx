import { gql } from "@apollo/client";


export const REVIEW_FRAGMENT = gql`
    fragment ReviewFragment on Review {
        score,
        message,
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
`;

export const WRITE_REVIEW_MUTATION = gql`
    ${REVIEW_FRAGMENT}
    mutation writeReview($location: String, $message: String, $score: Float) {
        review(location: $location, message: $message, score: $score) {
            ...ReviewFragment
        }
    }
`;

export const DELETE_REVIEW_MUTATION = gql`
    mutation writeReview($location: String) {
        deleteReview(location: $location)
    }
`;