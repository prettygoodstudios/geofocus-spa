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
            id,
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

export const DELETE_REPORT = gql` 
    mutation deleteReport($id: Int) {
        deleteReport(id: $id)
    }
`;