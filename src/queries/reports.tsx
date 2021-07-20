import { gql } from "@apollo/client";

export const CREATE_REPORT = gql`
    mutation createReport($location: String, $review: String, $photo: String, $message: String) {
        report(location: $location, review: $review, photo: $photo, message: $message) {
            message
        }
    }

`;

export const GET_REPORTS = gql`
    query getReports {
        reports {
            message,
            location {
                slug,
                title
            },
            photo {
                slug,
                caption
            },
            review {
                slug,
                message,
                location {
                    slug
                }
            },
        }
    }
`;