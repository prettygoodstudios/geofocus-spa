import { gql } from "@apollo/client";

export const CREATE_REPORT = gql`
    mutation createReport($location: String, $review: String, $photo: String, $message: String) {
        report(location: $location, review: $review, photo: $photo, message: $message) {
            message,
            location,
            photo,
            review
        }
    }

`;