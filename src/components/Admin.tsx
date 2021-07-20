import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_REPORTS } from "../queries/reports";
import { PhotoData } from "../types";
import Error from "../widgets/Error";
import Loading from "../widgets/Loading";

type Report = {
    location: Location, 
    photo: PhotoData, 
    review: {
        slug: string, 
        message: string,
        location: Location
    }, 
    message: string
} 
 
type ReportsData = {
    reports: Report[]
}

export const Admin = () => {
    
    const {error, loading, data}: {error?: any, loading?: any, data?: ReportsData} = useQuery(GET_REPORTS);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Error/>;
    }

    const linkFactory = ({location, review, photo}: any) => {
        if (location) {
            return <Link to={`/location/${location.slug}`}>View Location: {location.title.slice(0, 10)}</Link>;
        }
        if (review) {
            return <Link to={`/location/${review.location.slug}`}>View Review: {review.message.slice(0, 10)}</Link>;
        }
        if (photo) {
            return <Link to={`/photo/${photo.slug}`}>View Photo: {photo.caption.slice(0, 10)}</Link>;
        }
    };

    return <>
        <h1>Admin</h1>
        <h2>Reports</h2>
        <ul>
            {
                data && data.reports.map(({location, photo, review, message}, i) => (
                    <li key={i}>
                        {linkFactory({location, photo, review})} 
                        <p>{ message }</p>
                    </li>
                ))
            }
        </ul>
    </>;
}

export default Admin;